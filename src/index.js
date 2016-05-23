var DEFAULT_NAMESPACE = '__browser';
var factory = require('./browser_service_factory');
var serverFactory = require('./socket_io_server');
module.exports = function(options,Studio){
	"use strict";
	options = options || {};
	options.defaultNamespace = options.defaultNamespace || DEFAULT_NAMESPACE;
	var serviceFactory = factory(options.defaultNamespace,Studio);
	var serverFactory = serverFactory(options,Studio);
	options.onStart(function(serv,ref){
	    ref.browserPublic = function(){
	    	serviceFactory(serv);
	    	return serv;
	    };
	});
};