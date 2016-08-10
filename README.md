# elastic2builder
Elasticsearch v2 nodejs query builder.

## Install

    npm install elastic2builder --save

## Usage

```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.query('match', 'message', 'this is a test')
var body= builder.returnBody();
// body == {
//   query: {
//     match: {
//      message: {
//			query:'this is a test'
//		}
//     }
//   }
// }
```

### Examples

* MultiMatch queries
```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.query('multimatch',['name','age'], 'this is a test',{type:'best_fields',tie_breaker:0.3})
var body= builder.returnBody();
// {
// 	"query": {
// 		"multi_match": {
// 			"query": "this is a test",
// 			"fields": [
// 				"name",
// 				"age"
// 			],
// 			"type": "best_fields",
// 			"tie_breaker": 0.3
// 		}
// 	}
// }
```

* Support for attributes
```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.query('match', 'message', 'this is a test',{operator:'and'})
var body= builder.returnBody();
// {
// 	"query": {
// 		"match": {
// 			"message": {
// 				"query": "this is a test",
// 				"operator": "and"
// 			}
// 		}
// 	}
// }
```

* Filter
```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.filter('match', 'message', 'this is a test',{operator:'and'})
var body= builder.returnBody();

// {
// 	"query": {
// 		"filtered": {
// 			"filter": {
// 				"bool": {
// 					"must": [
// 						{
// 							"match": {
// 								"message": {
// 									"query": "this is a test",
// 									"operator": "and"
// 								}
// 							}
// 						}
// 					],
// 					"should": [],
// 					"must_not": []
// 				}
// 			}
// 		}
// 	}
// }
```

* OrFilter and NotFilter
```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.filter('match', 'message', 'this is a test')
.orFilter('match', 'name', 'Oliver')
.notFilter('match', 'language', 'french')
var body= builder.returnBody();

// {
// 	"query": {
// 		"filtered": {
// 			"filter": {
// 				"bool": {
// 					"must": [
// 						{
// 							"match": {
// 								"message": {
// 									"query": "this is a test"
// 								}
// 							}
// 						}
// 					],
// 					"should": [
// 						{
// 							"match": {
// 								"name": {
// 									"query": "Oliver"
// 								}
// 							}
// 						}
// 					],
// 					"must_not": [
// 						{
// 							"match": {
// 								"language": {
// 									"query": "french"
// 								}
// 							}
// 						}
// 					]
// 				}
// 			}
// 		}
// 	}
// }
```

* Range query

```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder.filter('range', 'age', {gt:18})
var body= builder.returnBody();
// {
// 	"query": {
// 		"filtered": {
// 			"filter": {
// 				"bool": {
// 					"must": [
// 						{
// 							"range": {
// 								"age": {
// 									"gt": 18
// 								}
// 							}
// 						}
// 					],
// 					"should": [],
// 					"must_not": []
// 				}
// 			}
// 		}
// 	}
// }
```

* Aggregation support

```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder
.query('match', 'message', 'this is a test')
.aggregation('user-aggs','term', 'user',{size:10})
var body= builder.returnBody();
// {
// 	"query": {
// 		"match": {
// 			"message": {
// 				"query": "this is a test"
// 			}
// 		}
// 	},
// 	"aggs": {
// 		"user-aggs": {
// 			"term": {
// 				"field": "user",
// 				"size": 10
// 			}
// 		}
// 	}
// }
```

* Sort support

```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder
.query('match', 'message', 'this is a test')
.sort('name','desc')
var body= builder.returnBody();
// {
// 	"query": {
// 		"match": {
// 			"message": {
// 				"query": "this is a test"
// 			}
// 		}
// 	},
// 	"sort": {
// 		"name": {
// 			"order": "desc"
// 		}
// 	}
// }
```

* Pagination support

```js
var elastic2builder = require('elastic2builder')
var builder = new elastic2builder() // A builder instance.
builder
.query('match', 'message', 'this is a test')
.page(0,10) // OR .page(0),since ,10 is default; means page number 0 and page size of 10; equivalent to .from(0).size(10)
var body= builder.returnBody();
// {
// 	"query": {
// 		"match": {
// 			"message": {
// 				"query": "this is a test"
// 			}
// 		}
// 	},
// 	"size": 10,
// 	"from": 0
// }
```