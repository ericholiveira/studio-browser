## Classes

<dl>
<dt><a href="#browserServiceFactory">browserServiceFactory</a></dt>
<dd></dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd></dd>
<dt><a href="#serverFactory">serverFactory</a></dt>
<dd></dd>
</dl>

<a name="browserServiceFactory"></a>

## browserServiceFactory
**Kind**: global class  
**Author:** Erich Oliveira  
<a name="new_browserServiceFactory_new"></a>

### new browserServiceFactory(namespace, Studio)
This factory creates a service creates a new service on `namespace` module,
this service can be acessed from the browser and act as proxy for the service itself,
its called when the user calls .browserPublic() on their service. Only the services
created by this factory are accessible from the browser. (This is private)

**Returns**: <code>function</code> - The service factory. This factory creates browser public services.  

| Param | Type |
| --- | --- |
| namespace | <code>String</code> | 
| Studio | <code>Object</code> | 

<a name="Plugin"></a>

## Plugin
**Kind**: global class  
**Default**: <code>{
		defaultNamespace:&#x27;__browser&#x27;,
		serviceCallEventName:&#x27;__studio_service_call&#x27;,
		port:3000
 	}</code>  
**Access:** public  
**Author:** Erich Oliveira  
<a name="new_Plugin_new"></a>

### new Plugin(options)
Plugin for socketio browser access


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.defaultNamespace | <code>String</code> | the module name which will prepend the service automatically instantiated for browser access. Defaults to __browser |
| options.serviceCallEventName | <code>String</code> | The name of the channel used to communicate the services. Defaults to __studio_service_call |
| options.socketIO | <code>String</code> | The socketIO object used as the server, if none is provided it creates a new server binding to options.port |
| options.port | <code>Number</code> | If no options.socketIO is provided, the new server will bind to this port. Defaults to 3000 |

**Example**  
```js
var browserPlugin = require('studio-browser');
   Studio.use(browserPlugin());
```
<a name="serverFactory"></a>

## serverFactory
**Kind**: global class  
**Author:** Erich Oliveira  
<a name="new_serverFactory_new"></a>

### new serverFactory(options)
Initialize a socketio server for browser/server service rpc communication. (This is private)


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.defaultNamespace | <code>String</code> | the module name which will prepend the service automatically instantiated for browser access. |
| options.serviceCallEventName | <code>String</code> | The name of the channel used to communicate the services. |
| options.socketIO | <code>String</code> | The socketIO object used as the server, if none is provided it creates a new server binding to options.port |
| options.port | <code>String</code> | If no options.socketIO is provided, the new server will bind to this port. Defaults to 3000 |

