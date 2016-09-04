// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB', 'checklist-model', 'ionicLazyLoad'])


.run(function($ionicPlatform, ngFB, $timeout, $state) {
  ngFB.init({appId: '1011131718993889'});
  
  $timeout(function() {
      $state.go('login');
  }, 5000);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: './templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: './templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.notes', {
      url: '/notes',
      views: {
        'menuContent': {
          templateUrl: './templates/notes.html',
          controller: 'NotesCtrl'
        }
      }
    })

  .state('app.note', {
    url: '/notes/:noteId',
    views: {
      'menuContent': {
        templateUrl: './templates/note.html',
        controller: 'NoteCtrl'
      }
    }
  })

  .state('app.mynotes', {
    url: '/myNotes',
    views: {
      'menuContent': {
        templateUrl: './templates/mynotes.html',
        controller: 'MyNotesCtrl'
      }
    }
  })

  .state('app.mynote', {
    url: '/myNotes/:noteId',
    views: {
      'menuContent': {
        templateUrl: './templates/mynote.html',
        controller: 'MyNoteCtrl'
      }
    }
  })

  .state('app.questions', {
    url: '/questions/:noteId/:topicId/:subtopicId',
    views: {
      'menuContent': {
        templateUrl: './templates/questions.html',
        controller: 'QuestionsCtrl'
      }
    }
  })

  .state('app.buyNote',{
    url: '/buyNote/:noteId',
    views: {
      'menuContent': {
        templateUrl: './templates/buyNote.html',
        controller: 'BuyAllCtrl'
      }
    }
  })

  .state('app.buyNotePerTopic',{
    url: '/buyPerTopic/:noteId',
    views: {
      'menuContent': {
        templateUrl: './templates/buyPerTopic.html',
        controller: 'BuyPerTopicCtrl'
      }
    }
  })

  .state('app.buyTopics', {
    url: '/buy/:noteId/:topics',
    views: {
      'menuContent': {
        templateUrl: './templates/buyTopics.html',
        controller: 'BuyTopicCtrl'
      }
    }
  })

 .state('login', {
    url: '/login',
    templateUrl: './templates/login.html',
    controller: 'LoginCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
