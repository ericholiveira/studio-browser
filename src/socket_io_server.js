var http = require('http');
var DEFAULT_SERVICE_CALL_EVENT_NAME = '__studio_service_call';
module.exports = function(options,Studio){
	"use strict";
	var httpServer,io, namespace = Studio.module(options.defaultNamespace);
	options = options || {};
	io = options.socketIO;
	if(!options.socketIO){
		httpServer = require('http').createServer();
		io = require('socket.io')();
		httpServer.listen(options.port || 3000);
	}
	io.on('connection', function(socket){
		socket.on(options.serviceCallEventName || DEFAULT_SERVICE_CALL_EVENT_NAME, function(data,fn){
			data = JSON.parse(data);
			namespace(data.service).apply(null,data.params).then(function(result){
				var response = {response:result};
				fn(response);
			}).catch(function(result){
				var response = {error:result};
				fn(response);
			});
		});
	});
};
