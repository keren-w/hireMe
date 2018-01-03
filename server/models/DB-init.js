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

conn
.then(db => {
  db.dropCollection('users')
  db.dropCollection('jobs')
  db.dropCollection('skills')
  console.log("db cleared")
})
.catch(err => console.log(err))

conn
.then(db => createDB(db))
.catch(err => console.log(err))

function printCollection(colString) {
  conn
  .then(db => {
    db.collection(colString).find().toArray()
    .then (arr => console.log(arr))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

printCollection('jobs')