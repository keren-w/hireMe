(function () {
    angular.module("hireMe", ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                // .state('') need to create nice looking index page
                .state('jobsList', {
                    url: '/jobs',
                    component: 'jobsList'
                })
                .state('myApplications', {
                    url: '/my-applications',
                    component: 'myApplications',

                })
                .state('myProfile', {
                    url: '/my-profile',
                    component: 'myProfile'
                })
                .state('myJobPosts', {
                    url: '/my-job-posts',
                    component: 'myJobPosts'
                })
                .state('updatePost', {
                    url: '/update-post/{job: json}',
                    component: 'updatePost',
                    params: {
                        job: null,
                     }
                })
            // $urlRouterProvider.otherwise('/jobs') need to create 404
        })
        
        .run(['$state', function($state){
            $state.go('jobsList')
        }])

})()
