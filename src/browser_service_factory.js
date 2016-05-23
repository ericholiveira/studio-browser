module.exports = function(namespace,Studio){
	"use strict";
	return function(serv){
		var namespaceStudio = Studio.namespace(namespace);
    	var ref = Studio(serv.id);
    	return namespaceStudio.service({
    		id:serv.id,
    		fn:function(){
    			return ref.apply(ref,arguments);
    		}
    	});
	};
};


