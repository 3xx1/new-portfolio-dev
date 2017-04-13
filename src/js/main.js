// dependencies
var $ = require('jquery');
var angular = require('angular');
var animate = require('angular-animate');
var uiRouter = require('angular-ui-router');
var gsap = require('gsap');

// components
require('./components/footer/footer.js');
require('./components/navbar/navbar.js');

// pages
require('./pages/about/about.js');
require('./pages/contact/contact.js');
require('./pages/works/works.js');

// utils
// require utils here

var portfolio = angular.module('portfolio', [
  
  'ui.router',
  'ngAnimate',
  'templates',
  
  // components
  'portfolio.footer',
  'portfolio.navbar',
  
  // pages
  'portfolio.about',
  'portfolio.contact',
  'portfolio.works'
]);

portfolio.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/works');
    $stateProvider
    .state('about', {
      url: '/about',
      template: '<portfolio-about></portfolio-about>'
    })
    .state('contact', {
      url: '/contact',
      template: '<portfolio-contact></portfolio-contact>'
    })
    .state('works', {
      url: '/works',
      template: '<portfolio-works></portfolio-works>'
    });
  }
]);
