var app = angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
  
})

.controller('LoginCtrl', function($scope,$http,$rootScope, $state, $ionicLoading, $cordovaFacebook ) {
    $scope.data = {};
  

    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      }).then(function(){
         console.log("The loading indicator is now displayed");
      });
    };

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
      });
    };  

    $scope.login_facebook = function() {
          $cordovaFacebook.login(["public_profile", "email", "user_friends"])
          .then(function(success) {
          
            $scope.show();

            $http({
              method: 'GET',
              url: 'https://appunte.herokuapp.com/ionic_login_facebook',
              params: { facebook_id: success.authResponse.userID }
            }).then(function successCallback(response) {
                // Login user
                 window.localStorage.setItem('user',JSON.stringify(response));
                 $state.go('app.notes');
                 $scope.hide();
              }, function errorCallback(response) {
                $scope.hide();
                console.log(response);
                alert(response.data);
            });
          }, function (error) {
          });
    };

    $scope.login = function() {
      console.log('Doing login', $scope.loginData);
      console.log('login?'+$scope.data.email_cellphone+' '+$scope.data.password);
      $scope.show();

      $http({
        method: 'GET',
        url: 'https://appunte.herokuapp.com/ionic_login',
        params: { cellphone_email: $scope.data.email_cellphone, password: $scope.data.password }
      }).then(function successCallback(response) {
          // Login user
           window.localStorage.setItem('user',JSON.stringify(response));
           $state.go('app.notes');
           $scope.hide();
        }, function errorCallback(response) {
          $scope.hide();
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

.controller('BuyAllCtrl', function($scope,$http,$rootScope, $state, $stateParams, $sce, $ionicLoading) {
  var user = JSON.parse( window.localStorage.getItem( 'user' ));

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.show();

  $http({
    method: 'GET',
    url: 'https://appunte.herokuapp.com/api/'+user.data.token+'/transaction_create/',
    params: { note_id: $stateParams.noteId, which_buy: 'full_course'}
  }).then(function successCallback(response) {
      $scope.khipu_url = response.data.transaction_url;
      $scope.hide();
    }, function errorCallback(response) {
      alert(response.data);
      $scope.hide();
  });
})

.controller('BuyTopicCtrl', function($scope,$http,$rootScope, $state, $stateParams, $sce, $ionicLoading) {
  var user = JSON.parse( window.localStorage.getItem( 'user' ));

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

  $scope.show();

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  var array = $stateParams.topics;

  $http({
    method: 'GET',
    url: 'https://appunte.herokuapp.com/api/'+user.data.token+'/transaction_create/',
    params: { note_id: $stateParams.noteId, which_buy: 'topic_course', "topics": array}
  }).then(function successCallback(response) {
      $scope.khipu_url = response.data.transaction_url;
      $scope.hide();
    }, function errorCallback(response) {
      console.log(response);
      alert(response.data);
      $scope.hide();
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