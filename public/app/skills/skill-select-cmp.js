(function () {
    'use strict';

    angular
        .module('hireMe')
        .component('skillSelect', {
            templateUrl: './app/skills/skill-select.html',
            controller: skillSearch,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    skillSearch.$inject = ['$filter', 'skills-serv'];

    function skillSearch($filter, skills) {
        var $ctrl = this;

        this.selectSkills = function () {
            if (this.selectedSkills.length > 3) {
                alert("You can choose up to 3 skills");
                return;
            } else {
                var selectedSkillsIdArr = [];
                skills.requestSkillFiltering(this.selectedSkills);
            }
        }

        $ctrl.$onInit = function () {
            skills.getSkillsList()
                .then((skillsList) => {
                    this.mySkills = skillsList
                })
                .catch((err) => {
                    this.mySkills = "Error fetching skills list.";
                })
        };
        $ctrl.$onChanges = function (changesObj) {};
        $ctrl.$onDestroy = function () {};
    }
})();