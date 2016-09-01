var app = angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
})

.controller('LoginCtrl', function($scope,$http,$rootScope, $state) {
    $scope.data = {};
    
    // window.cordovaOauth = $cordovaOauth;
    // window.http = $http;

    // $scope.loginFacebook = function ()
    // { facebookLogin(window.cordovaOauth, window.http); };

    // function facebookLogin($cordovaOauth, $http)
    // {
    //     $cordovaOauth.facebook("1633195863589792", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
    //         displayData($http, result.access_token);
    //         console.log(result.access_token);
    //     },  function(error){
    //             alert("Error: " + error);
    //     });
    // }

    $scope.login = function() {
      console.log('Doing login', $scope.loginData);
      console.log('login?'+$scope.data.email_cellphone+' '+$scope.data.password);

      $http({
        method: 'GET',
        url: 'https://appunte.herokuapp.com/ionic_login',
        params: { cellphone_email: $scope.data.email_cellphone, password: $scope.data.password }
      }).then(function successCallback(response) {
          // Login user
           window.localStorage.setItem('user',JSON.stringify(response));
           $state.go('app.notes');
        }, function errorCallback(response) {
          console.log(response);
          alert(response.data);
      });
    };
})

.controller('NotesCtrl',function($scope,$http,$rootScope, $state,$resource, note) {

  $scope.notes = note.query();

  $scope.range = function(count){

    var ratings = []; 

    for (var i = 0; i < count; i++) { 
      ratings.push(i) 
    } 

    return ratings;
  }
})

.controller('NoteCtrl', function($scope, $stateParams, note) {
    $scope.note = note.get({noteId: $stateParams.noteId});

    console.log(note.get({noteId: $stateParams.noteId}));

    $scope.range = function(count){

      var ratings = []; 

      for (var i = 0; i < count; i++) { 
        ratings.push(i) 
      } 

      return ratings;
    }

    $scope.toggleGroup = function(group) {
      group.show = !group.show;
    };
    $scope.isGroupShown = function(group) {
      return group.show;
    };
})

.controller('BuyAllCtrl', function($scope,$http,$rootScope, $state, $stateParams, $sce) {
  var user = JSON.parse( window.localStorage.getItem( 'user' ));

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $http({
    method: 'GET',
    url: 'https://appunte.herokuapp.com/api/'+user.data.token+'/transaction_create/',
    params: { note_id: $stateParams.noteId, which_buy: 'full_course'}
  }).then(function successCallback(response) {
      $scope.khipu_url = response.data.transaction_url;
    }, function errorCallback(response) {
      console.log(response);
      alert(response.data);
  });
})

.controller('BuyTopicCtrl', function($scope,$http,$rootScope, $state, $stateParams, $sce) {
  var user = JSON.parse( window.localStorage.getItem( 'user' ));

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  var array = $stateParams.topics;
  console.log(array);
  $http({
    method: 'GET',
    url: 'https://appunte.herokuapp.com/api/'+user.data.token+'/transaction_create/',
    params: { note_id: $stateParams.noteId, which_buy: 'topic_course', "topics": array}
  }).then(function successCallback(response) {
      $scope.khipu_url = response.data.transaction_url;
    }, function errorCallback(response) {
      console.log(response);
      alert(response.data);
  });
})

.controller('BuyPerTopicCtrl', function($scope,$http, $stateParams, note, $state) {
    $scope.note = note.get({noteId: $stateParams.noteId});
    $scope.topics = [];
    $scope.price = [];
    $scope.total = 0;

    $scope.check = function(value,price, checked) {
      var idx = $scope.topics.indexOf(value);

      if (idx >= 0 && !checked) {
        $scope.price.splice(idx, 1);
        $scope.total -= price;
      }
      if (idx < 0 && checked) {
        $scope.price.push(value);
        $scope.total += price;
      }
    };

    $scope.buy = function () {
      if($scope.topics.length > 0) {
        $state.go("app.buyTopics", { "noteId": $scope.note.id, "topics": $scope.topics});
      };
    };
    
})

.controller('MyNotesCtrl',function($scope,$http,$rootScope, $state,$resource, myNotes) {

  $scope.myNotes = myNotes.query();

  $scope.range = function(count){

    var ratings = []; 

    for (var i = 0; i < count; i++) { 
      ratings.push(i) 
    } 

    return ratings;
  }
})

.controller('MyNoteCtrl',function($scope,$stateParams, myNotes) {

  $scope.myNote = myNotes.get({noteId: $stateParams.noteId});

  $scope.toggleGroup = function(group) {
      group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
})

.controller('SearchCtrl', function($scope, $stateParams, note) {
    $scope.notes = note.query();

    $scope.range = function(count){

      var ratings = []; 

      for (var i = 0; i < count; i++) { 
        ratings.push(i) 
      } 

      return ratings;
    }
})

.controller('QuestionsCtrl', function($scope, $stateParams, questions) {
   user = JSON.parse( window.localStorage.getItem( 'user' ));
   $scope.token = user.data.token;
   $scope.questions = questions.query({noteId: $stateParams.noteId,topicId: $stateParams.topicId, subtopicId: $stateParams.subtopicId});

   $scope.sliderOptions = {
          effect: 'slide',
          paginationHide: true,
          initialSlide: 0,
          pagination: false,
          onInit: function(swiper){
              $scope.swiper = swiper;
          },
          onSlideChangeEnd: function(swiper){
            console.log('hola');
          }
      };
});