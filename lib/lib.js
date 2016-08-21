var validation= require('./validation');
var utils= require('./utils');
var provideTemplate= require('./provideTemplate');

var elastic= function (validation) {
	this.validation=validation;
	this.body={};
}

elastic.prototype.query = function(queryType,fields,query,attr) {
	
	if(this.validation)
	{
		validation.query(queryType,fields,query,attr);
	}

	if(utils.filterApplied(this.body))
	{
		this.body.query.filtered['query']= provideTemplate[queryType](query,fields,attr);
	}
	else
	{
		this.body['query']= provideTemplate[queryType](query,fields,attr);
	}

	return this;
};

elastic.prototype.filter = function(queryType,fields,query,attr) {
	
	if(this.validation)
	{
		validation.query(queryType,fields,query,attr);
	}

	if(utils.filterApplied(this.body))
	{

		this.body.query.filtered.filter.bool.must.push( provideTemplate[queryType](query,fields,attr) );

	}
	else
	{
		var query= this.body.query;
		this.body.query=(provideTemplate.filtered())['query'];
		this.body.query.filtered.query=query;

		this.body.query.filtered.filter.bool.must.push( provideTemplate[queryType](query,fields,attr) );
	}

	return this;
};

elastic.prototype.orFilter = function(queryType,fields,query,attr) {
	
	if(this.validation)
	{
		validation.query(queryType,fields,query,attr);
	}

	if(utils.filterApplied(this.body))
	{

		this.body.query.filtered.filter.bool.should.push( provideTemplate[queryType](query,fields,attr) );

	}
	else
	{
		var query= this.body.query;
		this.body.query=(provideTemplate.filtered())['query'];
		this.body.query.filtered.query=query;

		this.body.query.filtered.filter.bool.should.push( provideTemplate[queryType](query,fields,attr) );
	}

	return this;
};

elastic.prototype.notFilter = function(queryType,fields,query,attr) {
	
	if(this.validation)
	{
		validation.query(queryType,fields,query,attr);
	}

	if(utils.filterApplied(this.body))
	{

		this.body.query.filtered.filter.bool.must_not.push( provideTemplate[queryType](query,fields,attr) );

	}
	else
	{
		var query= this.body.query;
		this.body.query=(provideTemplate.filtered())['query'];
		this.body.query.filtered.query=query;

		this.body.query.filtered.filter.bool.must_not.push( provideTemplate[queryType](query,fields,attr) );
	}

	return this;
};

elastic.prototype.aggregation = function(name,type,body,attr) {
	
	if(this.validation)
	{
		validation.aggregation(name,type,body,attr);
	}

	if(utils.aggregationApplied(this.body))
	{

		this.body.aggs[name]=( provideTemplate['aggregation'](type,body,attr) );

	}
	else
	{
		this.body.aggs={};
		this.body.aggs[name]=( provideTemplate['aggregation'](type,body,attr) );
	}

	return this;
};

elastic.prototype.size = function(size) {
	
	if(this.validation)
	{
		validation.size(size);
	}

	this.body.size=size;

	return this;
};

elastic.prototype.from = function(from) {
	
	if(this.validation)
	{
		validation.from(from);
	}

	this.body.from=from;

	return this;
};

elastic.prototype.page = function(page,size_per_page) {
	if(page<0)
		page=0;

	if(this.validation)
	{
		validation.page(page,size_per_page);
	}
	if(!size_per_page)
		size_per_page=10;

	this.body.size=size_per_page;
	this.body.from=page*size_per_page;

	return this;
};

elastic.prototype.sort = function(name,type) {
	if(this.validation)
	{
		validation.sort(name,type);
	}

	if(utils.sortApplied(this.body))
	{

		this.body.sort[name]=( provideTemplate['sort'](name,type) )[name];

	}
	else
	{
		this.body.sort={};
		this.body.sort[name]=( provideTemplate['sort'](name,type) )[name];
	}

	return this;
};

elastic.prototype.returnBody = function() {
	return this.body;
};

module.exports= elastic;