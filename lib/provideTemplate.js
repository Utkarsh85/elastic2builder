var provideTemplate ={

	term:function (query,field,attr) {
		var template={term:{}};
		template.term[field]={};
		template.term[field]['value']=query;
		for(var key in attr)
		{
			template.term[field][key]=attr[key];
		}
		return template;
	},

	exists:function (query,field) {
		var template={exists:{}};
		template.exists['field']={};
		template.exists['field']=field;
		return template;
	},

	range:function (query,field) {
		var template={range:{}};
		template.range[field]={};
		template.range[field]=query;
		return template;
	},


	match:function (query,field,attr) {
		var template={match:{}};
		template.match[field]={};
		template.match[field]['query']=query;
		for(var key in attr)
		{
			template.match[field][key]=attr[key];
		}
		return template;
	},

	multimatch: function (query,fields,attr) {
		var template={multi_match:{}};
		template.multi_match['query']=query;
		template.multi_match['fields']=fields;
		for(var key in attr)
		{
			template.multi_match[key]=attr[key];
		}
		return template;
	},

	bool: function () {
		return {
			bool:{
				must:[],
				should:[],
				must_not:[],
			}
		};
	},

	filtered: function () {
		return{
			query:
			{
				filtered:
				{
					query:{},
					filter:provideTemplate.bool(),
				}
			}
		}
	},

	aggregation: function (type,body,attr) {
		var template={};
		if(typeof(body)==="string")
		{
			template[type] = {field:body};
		}
		else if(typeof(body)==="object")
		{
			template[type] = body;
		}

		for(var key in attr)
		{
			template[type][key]=attr[key];
		}
		return template;
	},

	sort: function (name,type) {
		var template={};
		template[name]={
			order:type
		};
		return template;
	}
};

module.exports= provideTemplate;