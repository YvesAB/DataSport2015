(function(){
  'use strict';



  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$q', 'Data',function($q, Data){
  	var vm = this;


  	Data.getAll()
  		.then(function(response){
  			vm.data = response.data;
  			console.log(response);
  		});

  	var pFemale = Data.getFemales()
  		.then(function(response){
  			vm.femaleCount = response.data.length;
  			console.log(vm.femaleCount);
  		});

  	var pMale = Data.getMales()
  		.then(function(response){
  			vm.maleCount = response.data.length;
  			console.log(response);
  		});

      $q.all([pFemale,pMale])
        .then(function(){
          var total = vm.maleCount + vm.femaleCount;
          var ratio = (vm.maleCount/total)*10;
          vm.ratioMale = Math.round(ratio);
          vm.ratioFemale = 10 - vm.ratioMale;
        });

  }])
  .directive('crepsRegion', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/region/region.template.html',
      controller: 'RegionCtrl',
      controllerAs: 'region'
    };
  }]);
})();