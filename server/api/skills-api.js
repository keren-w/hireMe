var querySkills = require('../models/skills-model');
var express = require('express');
var router = express.Router();
var checkLogin = require('../router/check-login') //token authentication middleware

router.get('/', function (req, res) {
    sendSkillsList(req, res);
});

function sendSkillsList(req, res) {
    querySkills.getSkillsList()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
           res.send(err); 
        });
};

module.exports = router;