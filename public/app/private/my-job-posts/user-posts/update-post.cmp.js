(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('updatePost', {
            templateUrl: './app/private/my-job-posts/user-posts/update-post.html',
            controller: updatePostsController,
            controllerAs: '$ctrl',
            bindings: {
                alist: '<',
            },
        });

    updatePostsController.$inject = ['$stateParams', 'users-serv', '$q', '$scope'];

    function updatePostsController($stateParams, users, $q, $scope) {
        var $ctrl = this;

        $ctrl.updateJob = function () {
            var postUpdates = {}
            if ($ctrl.update.job_title) {
                postUpdates.job_title = $ctrl.job.job_title;
            }
            if ($ctrl.update.description) {
                postUpdates.description = $ctrl.job.description;
            }

            if ($ctrl.update.skills) {
                postUpdates.skills = $ctrl.update.skills
            }

            if ($ctrl.update.applicants) {
                postUpdates.applicants = $ctrl.update.applicants
            }
            console.log(postUpdates)
        }

        $ctrl.removeSkill = function (index) {
            $ctrl.update.skills = $ctrl.update.skills || $ctrl.job.skills;
            $ctrl.update.skills.splice(index, 1);
        }

        $ctrl.removeApplicant = function (index) {
            $ctrl.update.applicants = $ctrl.update.applicants || $ctrl.job.applicants;
            if ($ctrl.update.applicants.length > 1) {
                ($ctrl.update.applicants.splice(index, 1))
            } else {
                $ctrl.update.applicants.splice(-1, 1)
            }
        }

        $scope.$on('filterbySkills', function (eventObj, skills) {
            $ctrl.update.skills = $ctrl.update.skills || $ctrl.job.skills;
            for (var skill of skills) {
                $ctrl.update.skills.push(JSON.parse(skill))
            }
        })

        $ctrl.$onInit = function () {
            $ctrl.job = $stateParams.job;
            $ctrl.editTitle = true;
            $ctrl.editDesc = true;
            $ctrl.update = {};

            $q.resolve(
                $ctrl.job.applicants = users.getApplicantsUsernames($ctrl.job.applicants)
            )

        };
        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();