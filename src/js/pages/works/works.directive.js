var angular = require('angular');
require('./works.template.html');

angular.module('portfolio.works.directive', [])
.directive('portfolioWorks', function() {
  return {
    restrict: 'E',
    templateUrl: 'works.template.html',
    controller: function($scope) {
      
    }
  };
});