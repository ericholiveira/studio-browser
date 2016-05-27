var DEFAULT_NAMESPACE = '__browser';

var browserServiceFactory = require('./browser_service_factory');
var serverFactory = require('./socket_io_server');

module.exports = function(options){
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
	