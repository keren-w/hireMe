    (function () {
        'use strict';

        angular
            .module('hireMe')
            .component('mainPage', {
                templateUrl: './app/main-page/main-page.html',
                controller: indexController,
                controllerAs: '$ctrl',
                bindings: {
                    Binding: '=',
                },
            });

        indexController.$inject = ['$scope', 'users-serv']

        function indexController($scope, users) {
            var $ctrl = this;
            this.showLoginDialog = false
            this.loggedIn = "stranger"

            this.showLogin = function () {
                this.showLoginDialog = true
            }

            this.logout = function () {
                this.loggedIn = "stranger"
                this.authenticated = false;
                users.logout();
            }

            $scope.$on('dialogClose', () => this.showLoginDialog = false)

            $scope.$on('authenticated', (eventObj, user) => {
                this.showLoginDialog = false //close login dialog
                this.authenticated = true
                this.loggedIn = user.username
            })

            $ctrl.$onInit = function () {
                users.checkLogin().
                then(loginStatus => {
                    if (loginStatus) {
                        this.authenticated = true
                        this.loggedIn = users.getUserProfile().username;
                    } else {
                        this.authenticated = false
                    }
                })
            }
            $ctrl.$onChanges = function (changesObj) {}
            $ctrl.$onDestroy = function () {}
        }
    })();