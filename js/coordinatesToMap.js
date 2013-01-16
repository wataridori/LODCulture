var coordinatesToMap = function (places) {
	console.log('[places]');
	console.log(places);
	var i;
	for (i=0; i<places.length; i++){
		var data = google.visualization.arrayToDataTable([
          ['Lat', 'Lon', 'Name'],
          [parseFloat(places[i].lat.value), parseFloat(places[i].long.value), places[i].name.value],
        ]);
    var j=i+1;    
   	$('#resultPanel ul').append("<div class = 'result' id = 'result"+i+"'></div>");
   	$("#result"+i).append("<p>"+j+". "+places[i].name.value+"</p>");
   	$("#result"+i).append("<div class = 'map' id = 'map"+i+"'></div>");
   	var map = new google.visualization.Map(document.getElementById("map"+i));
    map.draw(data, {showTip: true, zoomLevel: 0, useMapTypeControl: true});
	}
};