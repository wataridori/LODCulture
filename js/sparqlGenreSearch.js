var sparqlGenreSearch = function (genreNames, callback) {
	// filter文の中身を作成
	var conditions = [];
	genreNames.forEach(function (name) {
		conditions.push('?genre=\"' + name + '\"');
	});

	// sparqlクエリを作成
	var querytext = [
		'SELECT ?name ?long ?lat ?lunch ?dinner {',
		'  ?s <http://data.tom.sfc.keio.ac.jp/property/gourmet_genre> ?genre .',
		'  filter(' + conditions.join('||') + ')',
		'  ?s <http://www.w3.org/2000/01/rdf-schema#label> ?name .',
		'  ?s <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long .',
		'  ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat .',
		'  ?s <http://data.tom.sfc.keio.ac.jp/property/gourmet_lunch_budget> ?lunch .',
		'  ?s <http://data.tom.sfc.keio.ac.jp/property/gourmet_dinner_budget> ?dinner .',
		'} limit 20'
	].join('');

	// endpointにリクエストを投げる
	$.ajax({
		url: "http://data.tom.sfc.keio.ac.jp/sparql",
		data: {
			query: querytext
		},
		crossDomain: true,
		dataType: 'jsonp',
		jsonp: 'callback',
		success: callback,
		error: function() {
			alert('Failed!');
		}
	});
};
