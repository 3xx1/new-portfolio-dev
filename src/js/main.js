// dependencies
var $ = require('jquery');
var angular = require('angular');
var gsap = require('gsap');
var uiRouter = require('angular-ui-router');

// components
// require components here

// pages
// require pages here

// utils
// require utils here

var portfolio = angular.module('portfolio', [
  
]);

portfolio.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // $stateProvider.state('dashboard', {
    //   url: '/',
    //   template: '<tivr-dashboard></tivr-dashboard>'
    // })
    // .state('pages', {
    //   url: '/home',
    //   template: function($scope) {
    //     switch ($scope.id) {
    //       // case "":
    //       //   break;
    //       default:
    //         return '<tivr-screenshot></tivr-screenshot>';
    //     }
    //   }
    // })
  }
]);
