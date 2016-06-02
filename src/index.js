var DEFAULT_NAMESPACE = '__browser';

var browserServiceFactory = require('./browser_service_factory');
var serverFactory = require('./socket_io_server');
/**
 * Plugin for socketio browser access
 * @constructor
 * @author Erich Oliveira
 * @public
 * @param {Object} options
 * @param {String} options.defaultNamespace the module name which will prepend the service automatically instiated for browser access. Defaults to __browser
 * @param {String} options.serviceCallEventName The name of the channel used to communicate the services. Defaults to __studio_service_call
 * @param {String} options.socketIO The socketIO object used as the server, if none is provided it creates a new server binding to options.port
 * @param {String} options.port If no options.socketIO is provided, the new server will bind to this port. Defaults to 3000
 * @default {
		defaultNamespace:'__browser',
		serviceCallEventName:'__studio_service_call',
		port:3000
 	}
 * @example 
   var browserPlugin = require('studio-browser');
   Studio.use(browserPlugin());
 */
function Plugin(options){
	"use strict";
	options = options || {};
	options.defaultNamespace = options.defaultNamespace || DEFAULT_NAMESPACE;
	return function(services,Studio){
		var serviceFactory,server;
		serviceFactory = browserServiceFactory(options.defaultNamespace,Studio);
		server = serverFactory(options,Studio);
		services.onStart(function(serv,ref){
		    ref.browserPublic = function(){
		    	serviceFactory(serv);
		    	return serv;
		    };
		});
	};
}
module.exports = Plugin;
	