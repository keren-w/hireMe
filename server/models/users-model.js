var DB = require('./DB-connect')
var jwt = require('jsonwebtoken')
var superSecret = 'jklsdjkljwssddffehkhlwef'

function getUsersList() {
    return DB.getUsersCollection()
}

function getUserProfile(username) {
    return DB.getUserProfile(username);
}

function checkLogin(username, password) {
    return DB.authenticate(username, password)
        .then(loginResponse => {
            if (loginResponse.success === true) {
                var token = jwt.sign({
                    username: username
                }, superSecret, {
                    expiresIn: "12h"
                })
                return {
                    success: true,
                    user: loginResponse.user,
                    message: 'Enjoy your token!',
                    token: token
                }
            } else {
                return {
                    success: false,
                    message: 'Authentication failed.'
                }
            }
        })
}

function verifyToken(userToken, callback) {
    return new Promise((resolve, reject) => {
            jwt.verify(userToken, superSecret, (err, decoded) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            })
        })
        .then(decoded => {
           return getUserProfile(decoded.username);
        })
        .catch(err => {
            return err;
        })
}


module.exports = {
    getUsersList,
    checkLogin,
    verifyToken,
    jwt,
    superSecret,
    getUserProfile
};