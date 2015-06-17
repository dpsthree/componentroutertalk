angular.module('app.home', [])
    .controller('HomeCtrl', function($location){
        var hctrl = this;

        hctrl.begin = begin;

        function begin(){
            console.log('clicked');
            $location.url('/wizlist')
        }
    });
