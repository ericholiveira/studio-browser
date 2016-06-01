var DEFAULT_SERVICE_CALL_EVENT_NAME = '__studio_service_call';
var serializeError = require('serialize-error');
module.exports = function(options,Studio){
	"use strict";
	var httpServer,io, namespace = Studio.module(options.defaultNamespace);
	options = options || {};
	io = options.socketIO;
	if(!options.socketIO){
		io = require('socket.io')(options.port || 3000);
	}
	io.on('connection', function(socket){
		socket.on(options.serviceCallEventName || DEFAULT_SERVICE_CALL_EVENT_NAME, function(data,fn){
			data = JSON.parse(data);
			namespace(data.service).apply(null,data.params).then(function(result){
				var response = {response:result};
				fn(response);
			}).catch(function(result){
				var response = {error:serializeError(result)};
				fn(response);
			});
		});
	});
};
