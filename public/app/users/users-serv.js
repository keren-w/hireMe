(function () {
    'use strict';

    angular
        .module('hireMe')
        .factory('users-serv', usersServe);

    usersServe.$inject = ['$rootScope', '$http', '$q', '$filter'];

    function usersServe($rootScope, $http, $q, $filter) {
        var userProfile = null;

        function getUsersList() {
            return new Promise((resolve, reject) => {
                if (this.usersList) {
                    resolve(this.usersList)
                } else {
                    $http({
                            method: 'GET',
                            url: './api/users'
                        })
                        .then(usersList => {
                            this.usersList = usersList.data
                            resolve(usersList.data)
                        })
                        .catch(err => {
                            reject(err)
                        })
                }
            })
        }

        function requestUserFiltering(users) {
            $rootScope.$broadcast('filterbyUsers', users);
        }

        function getUserProfile() {
            return userProfile;
        }

        function sendLogin(user, pass) {
            return new Promise((resolve, reject) => {
                $http({
                        method: 'POST',
                        url: './api/users/authenticate',
                        withCredentials: true,
                        headers: {
                            'Authorization': 'Basic ' + btoa(user + ":" + pass)
                        }
                    })
                    .then((res) => {
                        if (res.data.success === true) {
                            userProfile = res.data.user;
                            localStorage.setItem('hireMe_token', res.data.token); //save fot 12h
                            $rootScope.$broadcast('authenticated', {
                                loggedIn: true,
                                userId: res.data.userId,
                                username: user
                            })
                            resolve()
                        } else {
                            reject()
                        }
                    })
            })
        }

        function checkLogin() {
            var hasToken = localStorage.getItem('hireMe_token');
            if (hasToken) {
                if (userProfile) {
                    return true;
                } else {
                    return $http({
                            method: 'POST',
                            url: './api/users/verify',
                            withCredentials: true,
                            headers: {
                                token: hasToken
                            }
                        })
                        .then(res => {
                            if (res.data.message === "jwt expired") {
                                return false
                            }
                            userProfile = res.data;
                            return true;
                        })
                        .catch(err => {
                            console.log(err);
                            return false;
                        })
                }
            } else {
                // token was not found locally
                return false;
            }
        }

        function updateUserApplication(jobId) {
            if (!userProfile['applications'].includes(jobId)) {
                userProfile['applications'].push(jobId)
            }
        }

        function checkAppliedByUser(jobID) {
            function equalsJob(element) {
                if (element === jobID) {
                    return true;
                }
                return false;
            }
            if (userProfile.applications.find(equalsJob)) {
                return true;
            }
            return false;
        }

        function logout() {
            localStorage.removeItem('hireMe_token')
            $rootScope.$broadcast('logged-out')
            userProfile = null
        }

        function getApplicantsUsernames(applicantsIdArr) {
            // console.log(this.usersList)
            // console.log(applicantsIdArr)

            var applicantsUsernames = []
            for (var i = 0; i < applicantsIdArr.length; ++i) {
                var currUser = ($filter('filter')(this.usersList, {
                    _id: applicantsIdArr[i]
                }, true)[0])
                applicantsUsernames.push(currUser)
            }
            return applicantsUsernames;
        }

        return {
            getUsersList,
            getUserProfile,
            requestUserFiltering,
            updateUserApplication,
            checkAppliedByUser,
            getApplicantsUsernames,
            sendLogin,
            checkLogin,
            logout
        }
    }

})();