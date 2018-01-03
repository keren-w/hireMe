var mongoDB = require('../DB-connect')

// returns a job list including the offeres name and skill titles
function formatJobList(jobListPromise) {
    var jobUsersPromise = mongoDB.getCollection('users')
    var jobSkillsPromise = mongoDB.getCollection('skills')
    return Promise.all([jobListPromise, jobUsersPromise, jobSkillsPromise]).then(values => {
        return attachExtras(values[0], values[1], values[2]);
    });
}

function attachExtras(jobs, users, skills) {
    for (var i = 0; i < jobs.length; ++i) {
        addDaysSincePublished(jobs[i])
        attachUserToJob(jobs[i], users)
        attachSkillsToJob(jobs[i], skills)
    }
    console.log(jobs)
    return jobs;
}

function addDaysSincePublished(job) {
    var pubDate = new Date(job.published);
    job.daysAgo = calcDaysSince(pubDate);
}

function attachUserToJob(job, users) {
    var publisherID = job.publisher
    var publisherUserId = users[publisherID - 1]; //ID indexes begin at 1, Array indexes at 0

    var publisherDetails = {
        _id: publisherUserId._id,
        username: publisherUserId.username
    }

    job.publisher = publisherDetails  
}

function attachSkillsToJob(job, skills) {
    var jobSkills = job.skills;
    for (var i = 0; i < jobSkills.length; ++i) {
        var currSkill = skills[jobSkills[i] - 1] //ID indexes begin at 1, Array indexes at 0
        
        var skillDetails = {
            _id: currSkill._id,
            skill_title: currSkill.skill_title
        }
        jobSkills[i] = skillDetails
    }
}

function calcDaysSince(pubDate) {
    var now = new Date();
    var msDiff = now.getTime() - pubDate.getTime();
    msDiff /= 86400000; // one day in milliseconds
    msDiff = Math.floor(msDiff);
    return msDiff;
}

module.exports = {
    formatJobList
}