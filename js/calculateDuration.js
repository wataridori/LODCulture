var calculateDuration = function (locations) {					
	var service = new google.maps.DistanceMatrixService();
	var results = [];
	var origins = [];
	var destinations = [];	
	
	for (var i =0; i<locations.length-1; i++) {		
		origins[i] = new google.maps.LatLng(locations[i].lat.value,locations[i].lng.value);		
		destinations[i] = new google.maps.LatLng(locations[i+1].lat.value,locations[i+1].lng.value);
		getDistanceAndTime(origins[i],destinations[i],google.maps.TravelMode.DRIVING, i);
		/*getDistanceAndTime(origins[i],destinations[i],google.maps.TravelMode.WALKING, i);*/
	}							
	
	function getDistanceAndTime(ori,des, travelMode, index) {
		service.getDistanceMatrix({
			origins: [ori],
			destinations: [des],
			travelMode: travelMode,
			avoidHighways: false,
			avoidTolls: false
		  }, callback);
		
		function callback(response, status) {
			if (status == google.maps.DistanceMatrixStatus.OK) {				
				var result = response.rows[0].elements;				

				for (var j = 0; j < result.length; j++) {
					var element = result[j];					
					if (element.status == "OK"){
                            distance = element.distance.text;
                            duration = element.duration.text;
                        } else {
                            distance = "(unknow)";
                            duration = "(unknow)";
                        }
					results.push({distance:distance,duration:duration,mode:travelMode});					
					console.log(distance,duration,travelMode);
					$('#result' + index).after('<div>' + distance + ', ' + duration + ', ' + travelMode + '</div>');
				}									
			}  	  
		}	
	}	
};