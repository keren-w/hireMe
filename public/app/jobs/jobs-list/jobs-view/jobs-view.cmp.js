(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('job', {
            templateUrl: './app/jobs/jobs-list/jobs-view/jobs-view.html',
            controller: jobController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
                authenticated: '<'
            },
        });

    jobController.$inject = ['$scope', 'jobs-serv', 'users-serv','skills-serv', '$q'];

    function jobController($scope, jobs, users, skills, $q) {
        var $ctrl = this;
        this.now = new Date();

        this.applyToJob = function (jobID) {
            if (!$ctrl.isApplied) {
                jobs.applyToJob(jobID)
                    .then((res) => {
                        if (res.success === false) {
                            alert("DB problem updating the application")
                        } else {
                            $ctrl.isApplied = true
                            $scope.$apply("$ctrl.isApplied")
                        }
                    })
                    .catch(err => {
                        alert("Problem applying to job, check console for server error message.")
                    })
            }
        }

        $ctrl.$onInit = function () {
       
            if ($ctrl.authenticated) {
                $ctrl.isApplied = users.checkAppliedByUser(this.item._id)
            }
            $ctrl.showMore = false
        }

        // $ctrl.$onChanges = function(changesObj){};
        // $ctrl.$onDestroy = function(){};
    }
})();