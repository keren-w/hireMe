(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('userPosts', {
            templateUrl: './app/private/my-job-posts/user-posts/user-posts-view.html',
            controller: myPostsController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
            },
        });

    myPostsController.$inject = ['$scope', 'jobs-serv', 'users-serv', '$state'];

    function myPostsController($scope, jobs, users, $state) {
        var $ctrl = this;
        this.now = new Date();

        $ctrl.$onInit = function () {
            if ($ctrl.authenticated) {
                $ctrl.isApplied = users.checkAppliedByUser(this.item._id)
            }
            $ctrl.showMore = false
        }

        $ctrl.showUpdatePost = function() {
            $state.go('updatePost', {job: $ctrl.item})
        }

        // $ctrl.$onChanges = function(changesObj){};
        // $ctrl.$onDestroy = function(){};
    }
})();