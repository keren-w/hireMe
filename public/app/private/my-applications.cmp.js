(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('myApplications', {
            templateUrl: './app/jobs/jobs-list/jobs-list.html',
            controller: myApplicationsController,
            controllerAs: '$ctrl',
            bindings: {
                userProfile: '<',
            },
        });

    myApplicationsController.$inject = ['jobs-serv', 'users-serv', '$q'];

    function myApplicationsController(jobs, users, $q) {
        var $ctrl = this;
        $ctrl.userProfile = null;
        $ctrl.myJobs = null;
        $ctrl.allowFiltering = false;
        $ctrl.filterLauncher = true;

        $ctrl.$onInit = function () {
            $ctrl.allowFiltering = false;
            $ctrl.authenticated = true;
            $ctrl.userProfile = users.getUserProfile();
            return $q.resolve(
                jobs.getJobsAppliedByUser($ctrl.userProfile.applications)
                .then(applications => {
                    $ctrl.myJobs = applications
                })).catch(e => console.log(e));
        };

    }
})();