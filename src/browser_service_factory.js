/**
 * Browser service factory
 * @constructor
 * @desc This factory creates a service creates a new service on `namespace` module,
 * this service can be acessed from the browser and act as proxy for the service itself,
 * its called when the user calls .browserPublic() on their service. Only the services
 * created by this factory are accessible from the browser. (This is private)
 * @author Erich Oliveira
 * @param {String} namespace
 * @param {Object} Studio
 * @return {Function} The service factory. This factory creates browser public services.
 */
function browserServiceFactory(namespace,Studio){
	"use strict";
	return function(serv){
		var namespaceStudio = Studio.module(namespace);
    	var ref = Studio(serv.id);
    	return namespaceStudio({
    		id:serv.id,
    		fn:function(){
    			return ref.apply(ref,arguments);
    		}
    	});
	};
}
module.exports = browserServiceFactory;