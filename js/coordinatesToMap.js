/*

var coordinatesToMap = function (places) {
    console.log('[places]');
    console.log(places);
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
*/