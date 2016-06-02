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
| options.defaultNamespace | <code>String</code> | the module name which will prepend the service automatically instiated for browser access. Defaults to __browser |
| options.serviceCallEventName | <code>String</code> | The name of the channel used to communicate the services. Defaults to __studio_service_call |
| options.socketIO | <code>String</code> | The socketIO object used as the server, if none is provided it creates a new server binding to options.port |
| options.port | <code>String</code> | If no options.socketIO is provided, the new server will bind to this port. Defaults to 3000 |

**Example**  
```js
var browserPlugin = require('studio-browser');
   Studio.use(browserPlugin());
```
