var coordinatesToMap = function (places) {
	console.log('[places]');
	console.log(places);
	var i=0;
	var data = null;
	for (i=0; i<places.length; i++){
		//alert(parseFloat(places[i].lat.value)+ parseFloat(places[i].long.value)+ places[i].name.value);
		 data = google.visualization.arrayToDataTable([
          ['Lat', 'Lon', 'Name'],
          [parseFloat(places[i].lat.value), parseFloat(places[i].long.value), places[i].name.value],
        ]);
    var j=i+1;    

   	$("#result"+i).append("<div class = 'map' id = 'map"+i+"'></div>");
   
   	var map = new google.visualization.Map(document.getElementById("map"+i));
    map.draw(data, {showTip: true, useMapTypeControl: true, mapType: 'normal', zoomLevel: 13});
	}
};