//Wallcontrollers

//'use strict';

var wallControllers = angular.module('wallControllers', []);

wallControllers.controller('mapController', function ($scope,$http,$log) {
 
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.388135, 2.168878),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();


	 var config={
	 method:"GET",
	 url:"wall/DummyData/races.json"	 
	 }
	 var response=$http(config);
	 response.success(function (data, status, headers, config) {
	 var races=data;//?? al quitarlo no coloca los markers
	 $scope.races=data;
	 for (i = 0; i < races.length; i++){
        createMarker(races[i]);}
	 	});

//funcion para crear lo markers   
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        marker.distance= info.distance + ' km';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content+'distancia: '+'<h1>'+marker.distance+'</h1>');
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        }  

//Accion al seleccionar un marker
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});

wallControllers.controller('groupController', function ($scope,$http,$log) {
 
	 var config={
	 method:"GET",
	 url:"wall/DummyData/groups.json"	 
	 }
	 var response=$http(config);
	 response.success(function (data, status, headers, config) {
	 var groups=data;//?? al quitarlo no coloca los markers
	 $scope.groups=data;
//	 for (i = 0; i < races.length; i++){
  //      createMarker(races[i]);}
	 	});
});

wallControllers.controller('messageController', function ($scope,$http,$log) {
 
	 var config={
	 method:"GET",
	 url:"wall/DummyData/messages.json"	 
	 }
	 var response=$http(config);
	 response.success(function (data, status, headers, config) {
	 var messages=data;//?? al quitarlo no coloca los markers
	 $scope.messages=data;
	 	});
});