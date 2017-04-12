// dependencies
var $ = require('jquery');
var angular = require('angular');
var animate = require('angular-animate');
var uiRouter = require('angular-ui-router');
var gsap = require('gsap');

// components
// require components here
require('./components/footer/footer.js');
require('./components/navbar/navbar.js');

// pages
// require pages here

// utils
// require utils here

var portfolio = angular.module('portfolio', [
  
  'ui.router',
  'ngAnimate',
  'templates',
  
  // components
  'portfolio.footer',
  'portfolio.navbar'
]);

portfolio.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/home',
      template: '<p>home</p>'
    });
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
