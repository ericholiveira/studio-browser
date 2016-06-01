var Studio = require('studio');

require('../src/socket_io_server')({
	defaultNamespace:'__server',
	port:3002,
	serviceCallEventName:'call'
},Studio);
Studio.module('__server')(function multiply(a,b){
	return a*b;
});
