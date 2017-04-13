var angular = require('angular');
require('./about.template.html');

angular.module('portfolio.about.directive', [])
.directive('portfolioAbout', function() {
  return {
    restrict: 'E',
    templateUrl: 'about.template.html',
    controller: function($scope) {
      
    }
  };
});