angular.module('coopapp.controllers', ['ionic', 'ngCordova','LocalStorageModule'])
.controller('LoginCtrl',function($scope, $location, $http, localStorageService){

	//Defino el modelo a utilizar, en este caso un sensillo login
	//con los datos de usuario y clave
	$scope.login = {
		usuario: '',
		password: ''
	};
	$scope.ingresar = function(){
		$location.url("/home");
	};
})


.controller('HomeCtrl',function($scope,$location,$ionicHistory){

	$scope.verMapa = function(){
		$location.url("/mapa");
	};
	$scope.verlistAlumno = function(){
		$location.url("/perfil");
	};
	$scope.verNotification = function(){
		$location.url('/notification');
	};
	$scope.verEstadoRuta = function(){
		$location.url('/estadoRuta');
	};
	$scope.myGoBack = function() {
		$ionicHistory.goBack();
	};
})



//Controlador para octener la pocision actual del usuario
.controller('MapaCtrl',[ '$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation){

	$scope.map = {center: {latitude: 4.99663, longitude: -73.6680 }, zoom: 8 };
	$scope.options = {scrollwheel: true};
	$scope.markers = []
	// get position of user and then set the center of the map to that position
	$cordovaGeolocation.getCurrentPosition().then(function (position) {
		console.log('getCurrentPosition');
		var lat  = position.coords.latitude
		var long = position.coords.longitude
		console.log(lat);
		console.log(long);

		$scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
		//just want to create this loop to make more markers
			$scope.markers.push({
				id: $scope.markers.length,
				latitude: lat,
				longitude: long ,
				title: 'm' + i
			})

	}, function(err) {
		console.log('Error: ' + err);
	});
}])


//Controlador para octener la pocision actual del usuario
.controller('perfilAlumCtrl',  function($scope, $http, $ionicHistory, $timeout, $ionicLoading, localStorageService){
	$scope.chat = function(){
		$location.url("/chat");
	};

	// Setup the loader
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});

	$scope.alumnos=[];

	$timeout(function () {

		$scope.$apply(function(){
			$scope.alumnos = [
				{
					name: 'Pepito Perez',
					address: 'Calle 1 # 11 - 21',
					state: 'Activo'
				},

				{
					name: 'Juan Castelanos',
					address: 'Calle 1 # 11 - 21',
					state: 'Activo'
				},

				{
					name: 'Pedro Martinez',
					address: 'Calle 1 # 11 - 21',
					state: 'Activo'
				},

				{
					name: 'Alexander Acosta',
					address: 'Calle 1 # 11 - 21',
					state: 'Activo'
				},

				{
					name: 'Manuel Perez',
					address: 'Calle 1 # 11 - 21',
					state: 'Activo'
				}
			];
		});
		$ionicLoading.hide();
	}, 2000);
});
