var lib= require('./lib/lib');
// var startTime= new Date().getTime();
// var body = new lib()
// .filter('term', 'user', 'kimchy')
// .filter('range','date',{gte:0})
// .notFilter('exists','date')
// .query('match', 'message', 'this is a test',{type:'phrase'})
// .query('multimatch',['name^5','username','email'], 'this is a test',{type:'phrase'})
// .filter('term', 'user', 'herald')
// .orFilter('term', 'user', 'johnny')
// // .notFilter('term', 'user', 'cassie')
// .aggregation('user-aggs','term', 'user',{size:10})
// .page(1,20)
// .sort('name','asc')
// .sort('content','asc')
// .returnBody();

// var stopTime= new Date().getTime();
// console.log(JSON.stringify(body),stopTime-startTime);                      

module.exports= lib;