var express = require('express');
var queryJobs = require('../models/jobs-model/job-queries');
var router = express.Router();
var checkLogin = require('../router/check-login') //token authentication middleware

router.get('/', function (req, res) {
    sendJobsList(req, res);
})

// router.get('/jobs/:id', function (req, res, next) {});

router.put('/', checkLogin, function (req, res) {
    queryJobs.addApplication(req.body)
        .then((resObj) => {
            res.json(resObj)
        })
        .catch((rejObj) => {
            res.json(rejObj)
        })
})

function sendJobsList(req, res) {
    var listPromise;
    var reqParams = req.query;
    if (isEmpty(reqParams)) {
        listPromise = queryJobs.getFullList()
    } else {
        if ('skills' in reqParams) {
            var skillsParams = reqParams.skills;
            listPromise = queryJobs.filterJobs('skills', skillsParams)
        } else if ('users' in reqParams) {
            var skillsParams = reqParams.users;
            listPromise = queryJobs.filterJobs('users', skillsParams)
        }

    }
    listPromise
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        });
};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false
    }
    return true
}

// function getSingleItem(config) {};

module.exports = router