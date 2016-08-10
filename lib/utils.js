module.exports={
	filterApplied: function (body) {
		if(body.hasOwnProperty('query') && body.query.hasOwnProperty('filtered'))
			return 1;
		else
			return 0;
	},
	aggregationApplied: function (body) {
		if(body.hasOwnProperty('aggs'))
			return 1;
		else
			return 0;
	},
	sortApplied: function (body) {
		if(body.hasOwnProperty('sort'))
			return 1;
		else
			return 0;
	}

	// filterboolApplied: function (body) {
	// 	if(body.hasOwnProperty('query') && body.query.hasOwnProperty('filtered') && body.query.filtered.hasOwnProperty('filter') && body.query.filtered.filter.hasOwnProperty('bool'))
	// 		return 1;
	// 	else
	// 		return 0;
	// }
}