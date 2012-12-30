var calculateDuration = function (locations) {					
	var service = new google.maps.DistanceMatrixService();
	var results = [];
	var origins = [];
	var destinations = [];
	var isDriving = true;
	
	for (var i =0; i<locations.length-1; i++) {		
		origins[i] = new google.maps.LatLng(locations[i].lat.value,locations[i].lng.value);		
		destinations[i] = new google.maps.LatLng(locations[i+1].lat.value,locations[i].lng.value);
		getDistanceAndTime(origins[i],destinations[i],google.maps.TravelMode.DRIVING);
		getDistanceAndTime(origins[i],destinations[i],google.maps.TravelMode.WALKING);
	}							
	
	function getDistanceAndTime(ori,des, travelMode) {
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
					distance = element.distance.text;
					duration = element.duration.text;
					results.push({distance:distance,duration:duration});
					if (isDriving) {						
						console.log(distance,duration, "Driving");
						isDriving = false;
					}
					else {
						console.log(distance,duration, "Walking");
						isDriving = true;
					}
				}									
			}  	  
		}	
	}	
};