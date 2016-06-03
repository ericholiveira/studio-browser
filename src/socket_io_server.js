/*
 * DEFAULT_SERVICE_CALL_EVENT_NAME
 * @const the name of the channel used for browser/server rpc
*/
var DEFAULT_SERVICE_CALL_EVENT_NAME = '__studio_service_call';
var serializeError = require('serialize-error');
/**
 * Socket io server Initializer
 * @constructor
 * @desc Initialize a socketio server for browser/server service rpc communication. (This is private)
 * @author Erich Oliveira
 * @param {Object} options
 * @param {String} options.defaultNamespace the module name which will prepend the service automatically instantiated for browser access.
 * @param {String} options.serviceCallEventName The name of the channel used to communicate the services.
 * @param {String} options.socketIO The socketIO object used as the server, if none is provided it creates a new server binding to options.port
 * @param {String} options.port If no options.socketIO is provided, the new server will bind to this port. Defaults to 3000
 * @return {undefined}
 */
var serverFactory = function(options,Studio){
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
module.exports = serverFactory;
