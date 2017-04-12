var angular = require('angular');
require('./navbar.template.html');

angular.module('portfolio.navbar.directive', [])
.directive('portfolioNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'navbar.template.html',
    controller: function($scope) {
      
    }
  };
});