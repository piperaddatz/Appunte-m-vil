angular.module('starter.services', ['ngResource'])

.factory('note', function ($resource, $rootScope) {
	var user = JSON.parse( window.localStorage.getItem( 'user' ));
	return $resource('https://appunte.herokuapp.com/api/'+user.data.token+'/notes/:noteId');
})

.factory('myNotes', function ($resource, $rootScope) {
	var user = JSON.parse( window.localStorage.getItem( 'user' ));
	return $resource('https://appunte.herokuapp.com/api/'+user.data.token+'/appuntes/:noteId');
})

.factory('questions', function ($resource, $rootScope) {
	var user = JSON.parse( window.localStorage.getItem( 'user' ));
	return $resource('https://appunte.herokuapp.com/api/'+user.data.token+'/questions/:noteId/:topicId/:subtopicId');
});


