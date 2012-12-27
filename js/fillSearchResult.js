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
};

var randomChoose = function (array, count) {
	var choiced = [];
	var i, choiceIndex;
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