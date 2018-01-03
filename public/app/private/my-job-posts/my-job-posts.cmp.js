(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('myJobPosts', {
            templateUrl: './app/private/my-job-posts/my-job-posts.html',
            controller: postsController,
            controllerAs: '$ctrl',
            bindings: {},
        });

    postsController.$inject = ['$filter', 'jobs-serv', 'users-serv', '$q'];

    function postsController($filter, jobs, users, $q) {
        var $ctrl = this;

        $ctrl.$onInit = function () {

            this.showMore = false
            $ctrl.authenticated = true;
            $ctrl.userProfile = users.getUserProfile();

            $q.resolve(
                jobs.getFilteredJobs("users", $ctrl.userProfile._id)
                .then(jobs => {
                    $ctrl.myJobs = jobs
                    // console.log($ctrl.myJobs)
                })).catch(e => console.log(e));
        };

        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();