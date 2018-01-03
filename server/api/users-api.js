var queryUsers = require('../models/users-model')
var express = require('express')
var router = express.Router()
var auth = require('basic-auth')
var checkLogin = require('../router/check-login') //token authentication middleware

router.get('/', sendUsersList)

router.get('/:username', checkLogin, function (req, res) {
    queryUsers.getUserProfile(req.params.username)
        .then(userProfile => {
            res.send(userProfile)
        })
        .catch(() => {
            res.status(500).send({
                success: false,
                message: "Database error"
            })
        })
})

router.post('/verify', function (req, res) {
    queryUsers.verifyToken(req.headers.token)
        .then(decoded => {
            res.send(decoded);
        })
        .catch(err => {
            res.status(403).json({
                message: 'Token is outdated'
            });
        })
})

router.post('/authenticate', function (req, res) {
    var user = auth(req)
    queryUsers.checkLogin(user.name, user.pass)
        .then(resObject => res.json(resObject))
})

function sendUsersList(req, res) {
    queryUsers.getUsersList()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports = router