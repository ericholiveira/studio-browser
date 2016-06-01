var Studio = require('studio');

Studio.use(require('../src/index')());

Studio(function noargs(){
	return 'noargs';
}).browserPublic();

Studio(function echo(param){
	return param;
}).browserPublic();

Studio(function concat(param1,param2){
	return param1+''+param2;
}).browserPublic();

Studio(function withError(){
	throw new Error('unexpected');
}).browserPublic();

Studio(function concatPrivate(param1,param2){
	return param1+''+param2;
});
