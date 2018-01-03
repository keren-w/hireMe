(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('userSelect', {
            templateUrl: './app/users/user-select//user-select.html',
            controller: userSearch,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    userSearch.$inject = ['$filter', 'users-serv']

    function userSearch($filter, users) {
        var $ctrl = this;

        this.selectUsers = function () {
            if (this.selectedUsers.length > 3) {
                alert("You can choose up to 3 users")
                return;
            } else {
                users.requestUserFiltering(this.selectedUsers)
            }
        }

        $ctrl.$onInit = function () {
        users.getUsersList()
                .then((usersList) => {
                    this.myUsers = usersList
                })
                .catch((err) => {
                    this.myUsers = "Error fetching users list."
                })
        }
        $ctrl.$onChanges = function (changesObj) {}
        $ctrl.$onDestroy = function () {}
    }
})()