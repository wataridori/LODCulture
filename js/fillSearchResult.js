var fillSearchResult = function (results) {
	var $resultPanel = $('#resultPanel');
	$resultPanel.empty();
    
	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var org = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var des_array = new Array();
            for (i=0;i<results.length; i++){
                var des = new google.maps.LatLng(results[i].lat.value,results[i].long.value);
                des_array.push(des);
            }
            var travelMode = google.maps.TravelMode.DRIVING;
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [org],
                destinations: des_array,
                travelMode: travelMode,
                avoidHighways: false,
                avoidTolls: false
            }, callback);
            
            function callback(response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK) {				
                    console.log(response);
                    $("#resultPanel").prepend("<b><i>Current Location: </i></b>"+response.originAddresses[0]);
                    var result = response.rows[0].elements;	
                    for (i=0; i<result.length; i++) {
                        result[i].index = i;
                    }
                    result.sort(function(a,b){
                        if (a.status=="OK" && b.status=="OK"){
                            return (a.distance.value - b.distance.value);
                        } else {return 1;}
                    });
                    //console.log(result);                    
                    var choiced_distance = result.slice(0,3);
                    //console.log(choiced_distance);
                    var choiced_results = new Array();
                    for (i=0; i<choiced_distance.length;i++){
                        choiced_results.push(results[choiced_distance[i].index]);
                    }
                    $("#resultPanel").append("<br>3 Nearest Restaurant From Current Location: <br>");
                    var $result;
                    for (var i = 0; i < choiced_results.length; i++) {
                        $result = $([
                            '<div class="result" id="result' + i + '">',
                            '  <p>',
                            '    <b>' + (i + 1) + '. ' + choiced_results[i].name.value+ '</b>',
                            '  </p>',
                            '  <dl>',
                            '   <dt> Address: </dt>',
                            '    <dd>' + response.destinationAddresses[choiced_distance[i].index] + '</dd>',
                            '  </dl>',
                            '  <dl>',
                            '    <dt>lunch: </dt>',
                            '    <dd>' + choiced_results[i].lunch.value + '円</dd>',
                            '    <dt>dinner: </dt>',
                            '    <dd>' + choiced_results[i].dinner.value + '円</dd>',
                            '  </dl>',
                            '  <dl>',
                            '   <dt> Distance: </dt>',
                            '    <dd>' + choiced_distance[i].distance.text + ' DRIVING</dd>',
                            '  </dl>',
                            '</div>'
                        ].join('\n'));
                        $resultPanel.append($result);
                    }
                    coordinatesToMap(choiced_results);
                    
                }  	  
            }
        }, function(postion){
            $("#status").html("Geolocation is Disabled !");
        } );
    } else {
        error('not supported');
    }
    
	
	
};

function coordinatesToMap(places) {
    var i=0;
    var data = new google.visualization.DataTable();
    data.addColumn('number', "Lat");
    data.addColumn('number', "Lon");
    data.addColumn('string', "name");
    
    for (i=0; i<places.length; i++){
        data.addRow([parseFloat(places[i].lat.value), parseFloat(places[i].long.value), places[i].name.value]);
    }
    
    $("#resultPanel").append("<div id = 'map'></div>");   
    var map = new google.visualization.Map(document.getElementById("map"));
    map.draw(data, {showTip: true, useMapTypeControl: true, mapType: 'normal', zoomLevel: 13});
	
};

var rad = function(x) {return x*Math.PI/180;}

var distHaversine = function(p1, p2) {
    var R = 6371; // earth's mean radius in km
    var dLat  = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
    return d.toFixed(3);
}

var randomChoose = function (array, count) {
	var choiced = [];
	var i, choiceIndex;
    
	if (array.length <= count) {
		return array;
	}
    
	while (choiced.length < count) {
		choiceIndex = Math.floor(Math.random() * array.length);
		choiced.push(array[choiceIndex]);
        
		for (i = 0; i < array.length; i++) {
			if (choiceIndex < i) {
				array[i - 1] = array[i];
			}
		}
		array.pop();
	}
	return choiced;
};


var fillSearchResult2 = function (results) {
	var choicedResults = randomChoose(results, 3);
    
	var $resultPanel = $('#resultPanel');
	$resultPanel.empty();
    
	/*var $ul = $('<ul />');
	$resultPanel.append($ul);*/
	
	var $result;
    
	for (var i = 0; i < choicedResults.length; i++) {
		$result = $([
			'<div class="result" id="result' + i + '">',
			'  <p>',
			'    <b>' + (i + 1) + '. ' + choicedResults[i].name.value+ '</b>',
			'  </p>',
			'  <dl>',
			'    <dt>lunch</dt>',
			'    <dd>' + choicedResults[i].lunch.value + '円</dd>',
			'    <dt>dinner</dt>',
			'    <dd>' + choicedResults[i].dinner.value + '円</dd>',
			'  </dl>',
			'</div>'
		].join('\n'));
   		$resultPanel.append($result);
	}
    
	coordinatesToMap(choicedResults);
	calculateDuration(pickLocationParams(choicedResults));
};

function coordinatesToMap(places) {
    var i=0;
    var data = new google.visualization.DataTable();
    data.addColumn('number', "Lat");
    data.addColumn('number', "Lon");
    data.addColumn('string', "name");
    
    for (i=0; i<places.length; i++){
        data.addRow([parseFloat(places[i].lat.value), parseFloat(places[i].long.value), places[i].name.value]);
    }
    
    $("#resultPanel").append("<div id = 'map'></div>");   
    var map = new google.visualization.Map(document.getElementById("map"));
    map.draw(data, {showTip: true, useMapTypeControl: true, mapType: 'normal', zoomLevel: 13});
	
};


var randomChoose = function (array, count) {
	var choiced = [];
	var i, choiceIndex;
    
	if (array.length <= count) {
		return array;
	}
    
	while (choiced.length < count) {
		choiceIndex = Math.floor(Math.random() * array.length);
		choiced.push(array[choiceIndex]);
        
		for (i = 0; i < array.length; i++) {
			if (choiceIndex < i) {
				array[i - 1] = array[i];
			}
		}
		array.pop();
	}
	return choiced;
};

var pickLocationParams = function (params) {
	var locationParams = [];
    
	params.forEach(function (param) {
		locationParams.push({
			lat: param['lat'],
			lng: param['long']
		});
	});
    
	return locationParams;
};
