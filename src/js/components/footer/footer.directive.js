var angular = require('angular');
require('./footer.template.html');

angular.module('portfolio.footer.directive', [])
.directive('portfolioFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'footer.template.html',
    controller: function($scope) {
      
    }
  };
});