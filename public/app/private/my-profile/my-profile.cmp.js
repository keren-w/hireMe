(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('myProfile', {
            templateUrl: './app/private/my-profile/my-profile.html',
            controller: myProfileController,
            controllerAs: '$ctrl',
            bindings: {
                userProfile: '<',
            },
        });

    myProfileController.$inject = [];

    function myProfileController() {
        var $ctrl = this;



        $ctrl.$onInit = function () {};
        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();