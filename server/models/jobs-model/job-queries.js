var DB = require('../DB-connect')
var format = require('./format')

function getFullList() {
    var jobsPromise = DB.getCollection('jobs');
    return format.formatJobList(jobsPromise)
}

function filterJobs(filterType, filterParams) {
    var filterArr = makeArray(filterParams)

    switch (filterType) {
        case 'skills':
            var jobsPromise = DB.getJobsBySkills(filterArr)
            break
        case 'users':
            var jobsPromise = DB.getJobsByUsers(filterArr)
            break
    }
    return format.formatJobList(jobsPromise)
}

function addApplication(appDetails) {
    return DB.registerApplication(appDetails.jobId, appDetails.userId)
        .then(() => {
            return {
                success: true
            }
        })
        .catch(err => {
            return {
                success: false,
                msg: err
            }
        })

}

module.exports = {
    getFullList,
    filterJobs,
    addApplication
}

function makeArray(stringArr) {
    var newArr = []
    if (typeof (stringArr) === "string") {
        return [parseInt(stringArr)]
    } else {
        for (var i = 0; i < stringArr.length; ++i) {
            newArr.push(parseInt(stringArr[i]))
        }
        return newArr
    }
}