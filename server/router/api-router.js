var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

var jobs = require('../api/jobs-api');
var users = require('../api/users-api');
var skills = require('../api/skills-api');

//route to different REST services
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false,
}));
router.use('/jobs', jobs);
router.use('/skills', skills);
router.use('/users', users);

module.exports = router;