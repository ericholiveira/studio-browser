var http = require('http');
var DEFAULT_SERVICE_CALL_EVENT_NAME = '__studio_service_call';
var DEFAULT_SERVICE_RESPONSE_EVENT_NAME = '__studio_service_response';
module.exports = function(options,Studio){
	"use strict";
	var httpServer,io, namespace = Studio.namespace(options.defaultNamespace);
	options = options || {};
	io = options.socketIO;
	if(!options.socketIO){
		httpServer = require('http').createServer();
		io = require('socket.io')();
		httpServer.listen(options.port || 3000);
	}
	io.of('/'+options.defaultNamespace).on('connection', function(socket){
		socket.on(options.serviceCallEventName || DEFAULT_SERVICE_CALL_EVENT_NAME, function(data){
			var id = data.id;
			namespace(data.service).apply(null,data.params).then(function(result){
				var response = {
					id:id,
					response:result
				};
				socket.emit(options.serviceResponseEventName || DEFAULT_SERVICE_RESPONSE_EVENT_NAME, response);
			}).catch(function(result){
				var response = {
					id:id,
					error:result
				};
				socket.emit(options.serviceResponseEventName || DEFAULT_SERVICE_RESPONSE_EVENT_NAME, response);
			});
		});
	});
};