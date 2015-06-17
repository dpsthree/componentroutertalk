angular.module('app.dataServices', [])
    .service('wizardAPI', function ($http, $q) {
        var that = this,
            baseDetailUrl = "http://harrypotter.wikia.com/api/v1/Articles/Details?titles=%%%title%%%&abstract=100&width=200&height=200";

        that.getWizards = getWizards;
        that.getWizardDetails = getWizardDetails;

        function getWizards () {
            if (that.wizards){
                return $q.when(that.wizards)
            } else {
                var dataRequests = [];
                return $http.get('data/wizards.json').then(function (response) {
                    return response.data;
                }).then(function(wizardList){
                    //we have the list but it is poorly constructed, lets grab some more data from the api
                    that.wizards = wizardList;
                    _.forEach(that.wizards, function (wizard) {
                        var urlWizName = wizard.text.replace(/ /g, "_");
                        var wizardUrl = baseDetailUrl.replace(/%%%title%%%/g, urlWizName);
                        dataRequests.push($http.get(wizardUrl).then(function (response) {
                            //deal with funky shape of api response
                            wizard.details = _.find(response.data.items, function(){
                                return true;
                            });
                        }));
                    });
                    return $q.all(dataRequests).then(function (){
                        return that.wizards;
                    });
                });
            }
        }

        function getWizardDetails (wizardName) {
            function extractWizard () {
                return $q.when(_.find(that.wizards, {text: wizardName}));
            }

            if (that.wizards) {
                //return just the details for the one we want
                return extractWizard();
            } else {
                return getWizards().then(function () {
                    //now we can return just the one we want
                    return extractWizard();
                });
            }
        }
    });
