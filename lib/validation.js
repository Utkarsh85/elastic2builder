var allowedQueries=['match','multimatch','term','range','exists'];

module.exports={
	query: function (queryType,fields,query) {
		if(allowedQueries.indexOf(queryType) < 0)
		{
			var err= 'Querytype '+queryType+' is not supported';
			throw err;
		}

		if(queryType==="multimatch" && !Array.isArray(fields))
		{
			var err= 'Fields should be an array for Querytype= multimatch';
			throw err;
		}

		if(queryType!=="multimatch" && typeof(fields)!=="string")
		{
			var err= 'Field should be a string for Querytype= '+queryType;
			throw err;
		}

		if(queryType==="range" && typeof(query)!=="object")
		{
			var err= 'Query should be an object for range query';
			throw err;
		}

		return true;
	},

	aggregation: function (name,type,body) {

		if(typeof(type)!=="string")
		{
			var err= 'type should be a string';
			throw err;
		}

		if(typeof(body)!=="string" && typeof(body)!=="object")
		{
			var err= 'body should either be a string or an object';
			throw err;
		}

		return true;
	},

	size: function (size) {
		if(typeof(size) === "number")
			return 1;
		else
			return 0;
	},

	from: function (from) {
		if(typeof(from) === "number")
			return 1;
		else
			return 0;
	},

	page: function (page,size_per_page) {
		if(typeof(page) === "number" && typeof(size_per_page) === "number")
			return 1;
		else
			return 0;
	},

	sort: function (name,type) {
		if(type==="desc" || type==="asc")
			return 1;
		else
			return 0;
	},

	match: function (argument) {
		// body...
	},

	multimatch: function (query,fields,type) {
		
	}
}