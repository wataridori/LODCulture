var fillSearchResult = function (results) {
	var choicedResults = randomChoose(results, 3);

	var $element = $('#resultPanel');
	$element.empty();

	var $ul = $('<ul />');
	choicedResults.forEach(function (result) {
		var label = result.name.value;
		$ul.append($('<li />').html(label));
	});
	$element.append($ul);

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
			lat: param.lat,
			lng: param.lng
		});
	});

	return locationParams;
};