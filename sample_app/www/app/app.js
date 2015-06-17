(function(){
    angular.module('mainAppModule', ['ngRoute', 'ngNewRouter', 'app.home', 'app.wizard.wizardList', 'app.wizard.wizardDetail',
                                     'app.dataServices', 'app.home'])
        .config(function($routeProvider, $componentLoaderProvider){
            $componentLoaderProvider.setCtrlNameMapping(function (name) {
                return _.find(routeList, {component: name}).controller;
            });
            $componentLoaderProvider.setTemplateMapping(function (name) {
                return _.find(routeList, {component: name}).template;
            });
        })
        .controller('AppCtrl', function AppCtrl ($router) {
            $router.config(angular.copy(routeList));
        });

    var routeList = [
        {path: '/', redirectTo: '/home'},
        {component: 'home', path: '/home', controller: 'HomeCtrl', template: 'app/Home/Home.html'},
        {component: 'wizList', path: '/wizlist', controller: 'WizListCtrl', template: 'app/Wizard/WizList/WizList.html'},
        {component: 'wizDetail', path: '/wizdetail/:wizName', controller: 'WizDetailCtrl', template: 'app/Wizard/WizardDetail/wizardDetail.html'}
    ];
}());

