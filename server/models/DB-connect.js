var http = require('http')
var createDB = require('./DB/create-DB')
var MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/mydb"

var conn = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}()

function getCollection(colName) {
  return conn
    .then(db => {
      return db.collection(colName).find().sort({
        published: -1
      }).toArray()
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

function getUsersCollection() {
  return conn
    .then(db => {
      return db.collection('users').find({}, {
        username: 1
      }).sort({
        username: 1
      }).toArray()
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

function getJobsBySkills(skillsChosen) {
  return conn
    .then(db => {
      return db.collection('jobs').find({
        skills: {
          $in: skillsChosen
        }
      }, {}).sort({
        published: -1
      }).toArray()
    })
}

function getJobsByUsers(usersChosen) {
  return conn
    .then(db => {
      return db.collection('jobs').find({
        publisher: {
          $in: usersChosen
        }
      }, {}).sort({
        published: -1
      }).toArray()
    })
}

function authenticate(username, password) {
  return new Promise(function (resolve, reject) {
    conn
      .then(db => {
        db.collection('users').findOne({
            username: username
          })
          .then(user => {
            if (user) {
              if (user.password === password) {
                resolve({
                  success: true,
                  user: user // need to remove "password property from  returned user
                })
              } else {
                resolve({
                  success: false
                })
              }
            } else {
              resolve({
                success: false
              })
            }
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function addApplicationToUser(jobId, userId) {
  return conn
    .then(db => {
      return db.collection('users').updateOne({
        _id: userId
      }, {
        $addToSet: {
          applications: jobId
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

function addApplicationToJob(jobId, userId) {
  return conn
    .then(db => {
      return db.collection('jobs').updateOne({
        _id: jobId
      }, {
        $addToSet: {
          applicants: userId
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

function registerApplication(jobId, userId) {
  return new Promise((resolve, reject) => {
    var addUserToJob = addApplicationToJob(jobId, userId)
    var addJobToUser = addApplicationToUser(jobId, userId)
    Promise.all([addUserToJob, addJobToUser])
      .then((results) => {
        resolve()
      })
      .catch(err => reject(err))
  })
}

function getUserProfile(username) {
  return conn
    .then(db => {
      return db.collection('users').findOne({
        username: username
      }, {
        password: 0
      })
    })
}

module.exports = {
  getCollection,
  registerApplication,
  getUsersCollection,
  getJobsBySkills,
  getJobsByUsers,
  authenticate,
  getUserProfile
}