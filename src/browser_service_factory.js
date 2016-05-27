module.exports = function(namespace,Studio){
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
};


