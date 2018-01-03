(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('searchJobs', {
            templateUrl: './app/jobs/jobs-list/search-jobs/search-jobs.html',
            controller: searchController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    searchController.$inject = ['jobs-serv', '$state'];

    function searchController(jobs) {
        var $ctrl = this;
        this.panels = {
            bySkills: false,
            byPublisher: false,
            byLocation: false,
            showAll: true
        }

        this.toggleFilter = function (filterTab) {
            for (var panel in this.panels) {
                this.panels[panel] = false;
            }
            this.panels[filterTab] = true;
        }

        this.showAllJobs = function() {
            for (var panel in this.panels) {
                this.panels[panel] = false;
            }
            jobs.requestShowAll();
        }

        $ctrl.$onInit = function () {};
        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();