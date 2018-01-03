(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('loginDialog', {
            templateUrl: './app/login/login-dialog.html',
            controller: loginController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    loginController.$inject = ['$scope', 'users-serv'];

    function loginController($scope, users) {
        var $ctrl = this;
        this.showLoginDialog = false;
        this.loginPanels = {
            loginForm: true,
            signUpForm: false
        }

        this.closeDialog = function () {
            this.loginPanels.loginForm = true;
            this.loginPanels.signUpForm = false;
            $scope.$emit('dialogClose');
        }

        this.showSignUp = function () {
            this.loginPanels.loginForm = false;
            this.loginPanels.signUpForm = true;
        }

        this.checkSendAuth = function ($scope) {
            if (this.username && this.password) {
                users.sendLogin(this.username, this.password)
                    .then(() => {
                    })
                    .catch(() => {
                        alert("Login failed. Try again.")
                    })
            } else {
                alert("Please fill both fields before submitting.")
            }
        }

        $ctrl.$onInit = function () {};
        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();