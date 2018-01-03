angular.module('hireMe').factory('jobs-serv', ['$rootScope', '$http', '$filter', 'users-serv', function ($rootScope, $http, $filter, users) {

    var localjobsList = ""

    function getJobs() {
        return new Promise((resolve, reject) => {
            if (localjobsList) {
                resolve(localjobsList);
            } else {
                return $http({
                        method: 'GET',
                        url: './api/jobs'
                    })
                    .then(jobsList => {
                        localjobsList = jobsList.data
                        resolve(localjobsList);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    }

    function getJobsAppliedByUser(appliedArr) {
        return new Promise((resolve, reject) => {
                getJobs()
                    .then(jobslist => {
                        var userApplications = []
                        for (var i = 0; i < appliedArr.length; ++i) {
                            var resJob = ($filter('filter')(jobslist, {
                                _id: appliedArr[i]
                            }, true)[0])
                            userApplications.push(resJob)
                        }
                        resolve(userApplications)
                    })
            })
            .then(myjobslist => {
                var filteredJobs = []
                for (var i = 0; i < appliedArr.length; ++i) {
                    filteredJobs.push(($filter('filter')(myjobslist, {
                        _id: appliedArr[i]
                    }))[0])
                }
                return filteredJobs
            })
    }

    function getFilteredJobs(filterName, filter) {
        var paramsObj = {}
        paramsObj[filterName] = filter

        return $http({
            method: 'GET',
            url: './api/jobs/',
            params: paramsObj
        }).
        then(filteredJobsList => {
            return filteredJobsList.data;
        })
    }

    function requestShowAll() {
        $rootScope.$broadcast('requestShowAll')
    }

    function updateApplicantsLocalJob(jobID, userID) {
        return new Promise((resolve, reject) => {
                resolve(localjobsList.findIndex(function (element) {
                    if (element._id === jobID) {
                        return true;
                    } else {
                        return false;
                    }
                }))
            })
            .then(jobIndex => {
                var jobApplicants = localjobsList[jobIndex].applicants;
                if (!jobApplicants.includes(userID)) {
                    jobApplicants.push(userID);
                    return (jobApplicants)
                }
            })
    }

    function applyToJob(jobId) {
        userId = users.getUserProfile()._id;
        var dataObj = {
            jobId: jobId,
            userId: userId,
            token: localStorage.getItem('hireMe_token')
        }
        return new Promise((resolve, reject) => {
            $http({
                    method: 'PUT',
                    url: './api/jobs',
                    headers: {
                        contentType: 'application/json'
                    },
                    data: dataObj
                })
                .then((response) => {
                    users.updateUserApplication(jobId) //update user locally
                    updateApplicantsLocalJob(jobId, userId)
                    resolve(response.data)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    return {
        getJobs,
        getJobsAppliedByUser,
        getFilteredJobs,
        requestShowAll,
        applyToJob
    }
}]);