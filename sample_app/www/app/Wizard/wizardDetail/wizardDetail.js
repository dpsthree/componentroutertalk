angular.module('app.wizard.wizardDetail', [])
    .controller('WizDetailCtrl', WizDetailCtrl);

var wdc = {};
function WizDetailCtrl () {
    wdc = this;
    
    //populated by hooks 
    wdc.wizardDetails = {}
    //end async data population
}

WizDetailCtrl.prototype.canActivate = function ($routeParams, wizardAPI) {
    wdc.wizardDetailsPromise = wizardAPI.getWizardDetails($routeParams.wizName);
    return wdc.wizardDetailsPromise;
};

WizDetailCtrl.prototype.activate = function () {
    wdc.wizardDetailsPromise.then(function (wizardDetails) {
        wdc.wizardDetails = wizardDetails;
    });
};
