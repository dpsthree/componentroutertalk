angular.module('app.wizard.wizardList', [])
    .controller('WizListCtrl', WizListCtrl);

var lctrl = {};
function WizListCtrl ($location) {
    lctrl = this;

    //populated by hooks
    lctrl.wizardList = [];
    //end async data population
    
    lctrl.goToWizard = goToWizard;

    function goToWizard (wizardName) {
        $location.url('wizdetail/' + wizardName);
    }
}

//Is the data available
WizListCtrl.prototype.canActivate = function (wizardAPI) {
    lctrl.wizListPromise = wizardAPI.getWizards();
    return lctrl.wizListPromise
};

//What should I do with the data once I have it
WizListCtrl.prototype.activate = function () {
    lctrl.wizListPromise.then(function (wizardList) {
        lctrl.wizardList = wizardList;
    });
};
