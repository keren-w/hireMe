var myUsers = require('./users')
var myJobs = require('./jobs')
var mySkills = require('./skills')

function createDB(db) {

    var currJobs = db.createCollection('jobs')
        .then(jobs => {
            jobs.insertMany(myJobs)
                .then(() => {
                    //add a skill indexes array to each job document
                    jobs.find().toArray(function (err, jobsArr) {
                        addSkillsTojobs(jobs, jobsArr)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })

    db.createCollection('users')
        .then(users => {
            users.insertMany(myUsers)
                .then(() => {
                    //add a skill indexes array to each user (for agent)
                    users.find().toArray(function (err, usersArr) {
                        addSkillsTojobs(users, usersArr)
                    })
                })
        })
        .catch((err) => {
            console.log(err)
        })

    db.createCollection('skills')
        .then(skills => {
            skills.insertMany(mySkills)
        })
        .catch((err) => {
            console.log(err)
        })
}

function addSkillsTojobs(col, colArr) {
    for (var i = 1; i <= colArr.length+1; ++i) {
        var skillsArr = createSkillsArray()
        col.updateOne({
            _id: i
        }, {
            $set: {
                'skills': skillsArr
            }
        })
    }
}

function createSkillsArray() {
    var skillsArr = [];
    for (var i = 0; i < 3; ++i) {
        var tmpRandom = random(1, 50)
        skillsArr.push(tmpRandom + 1)
    }
    return skillsArr;
}

function random(min, max) {
    return Math.round(Math.random() * (max - min))
}

module.exports = createDB