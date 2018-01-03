(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('jobsList', {
            templateUrl: './app/jobs/jobs-list/jobs-list.html',
            controller: jobsController,
            controllerAs: '$ctrl',
            bindings: {
                status: '@',
                myJobs: '<'
            },
        })

    jobsController.$inject = ['$scope', '$filter', 'jobs-serv', 'users-serv', '$q']

    function jobsController($scope, $filter, jobs, users, $q) {
        var $ctrl = this;
        this.filterLauncher = true;
        this.showHideFilter = "Filter results"

        this.toggleFilterView = function () {
            if (this.filterLauncher === true) {
                this.filterLauncher = false;
                this.showHideFilter = "Hide Filter"
            } else {
                this.filterLauncher = true;
                this.showHideFilter = "Filter results"
            }
        }

        this.getAllJobs = function () {
            $q.resolve(
                    jobs.getJobs()
                    .then((jobs) => {
                        $ctrl.myJobs = $filter('limitTo')(jobs, 20)
                    }))
                .catch((err) => {
                    $ctrl.myJobs = "Error fetching job list."
                })
        }

        $scope.$on('filterbySkills', function (eventObj, skills) {
            var skillsIdArr = []
            for(var skill of skills) {
                skillsIdArr.push((JSON.parse(skill))._id)
            }
            jobs.getFilteredJobs('skills', skillsIdArr)
                .then(jobs => {
                    $ctrl.myJobs = $filter('limitTo')(jobs, 20)
                })
                .catch(err => {
                    $ctrl.myJobs = "Error fetching job list."
                })
        })

        $scope.$on('filterbyUsers', function (eventObj, users) {
            jobs.getFilteredJobs('users', users)
                .then(jobs => {
                    $ctrl.myJobs = $filter('limitTo')(jobs, 20)
                })
                .catch(err => {
                    $ctrl.myJobs = "Error fetching job list."
                })
        })

        $scope.$on('requestShowAll', () => {
            this.getAllJobs()
        })

        $scope.$on('authenticated', (eventObj, user) => {
            this.authenticated = true
        })

        $scope.$on('logged-out', (eventObj) => {
            this.authenticated = false
        })

        $ctrl.$onInit = function () {
            $ctrl.getAllJobs()
            $ctrl.authenticated = users.checkLogin();
            $ctrl.allowFiltering = true;
        }
        $ctrl.$onChanges = function (changesObj) {}
        $ctrl.$onDestroy = function () {}
    }
})()