var fillSearchResult = function (results) {
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