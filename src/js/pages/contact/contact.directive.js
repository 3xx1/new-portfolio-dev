var angular = require('angular');
require('./contact.template.html');

angular.module('portfolio.contact.directive', [])
.directive('portfolioContact', function() {
  return {
    restrict: 'E',
    templateUrl: 'contact.template.html',
    controller: function($scope) {
      
    }
  };
});