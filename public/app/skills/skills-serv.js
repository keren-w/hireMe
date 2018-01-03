(function () {
    'use strict';

    angular
        .module('hireMe')
        .factory('skills-serv', skillsServe);

    skillsServe.$inject = ['$rootScope', '$http', '$filter'];

    function skillsServe($rootScope, $http, $filter) {

        var localSkillsList = ""

        var getSkillsList = function () {
            return new Promise((resolve, reject) => {
                if (localSkillsList) {
                    resolve(localSkillsList)
                } else {
                    $http({
                            method: 'GET',
                            url: './api/skills'
                        })
                        .then(skillsList => {
                            localSkillsList = skillsList.data
                            resolve(localSkillsList)
                        })
                        .catch(err => {
                            reject(err)
                        })
                }
            })
        }

        function requestSkillFiltering(skills) {
            $rootScope.$broadcast('filterbySkills', skills);
        }

        return {
            getSkillsList,
            requestSkillFiltering
        }
    }
})();