define("~fastboot/app-factory",["dummy/app","dummy/config/environment"],(function(e,t){return e=e.default,t=t.default,{default:function(){return e.create(t.APP)}}})),define("dummy/initializers/ajax",["exports","ember"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
const{get:r}=t.default
var o=function(e){let t=r(this,"fastboot.request.protocol")
if(/^\/\//.test(e.url))e.url=t+e.url
else if(!/^https?:\/\//.test(e.url))try{e.url=t+"//"+r(this,"fastboot.request.host")+e.url}catch(o){throw new Error("You are using Ember Data with no host defined in your adapter. This will attempt to use the host of the FastBoot request, which is not configured for the current host of this request. Please set the hostWhitelist property for in your environment.js. FastBoot Error: "+o.message)}if(!najax)throw new Error("najax does not seem to be defined in your app. Did you override it via `addOrOverrideSandboxGlobals` in the fastboot server?")
najax(e)},i={name:"ajax-service",initialize:function(e){e.register("ajax:node",o,{instantiate:!1}),e.inject("adapter","_ajaxRequest","ajax:node"),e.inject("adapter","fastboot","service:fastboot")}}
e.default=i})),define("dummy/initializers/error-handler",["exports","ember"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"error-handler",initialize:function(){t.default.onerror||(t.default.onerror=function(e){const t=`There was an error running your app in fastboot. More info about the error: \n ${e.stack||e}`
console.error(t)})}}
e.default=r})),define("dummy/instance-initializers/setup-fetch",["exports","fetch"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"fetch",initialize:function(e){const r=e.lookup("service:fastboot");(0,t.setupFastboot)(r.get("request"))}}
e.default=r}))

//# sourceMappingURL=dummy-fastboot-044d694af6c78f473143ed3ec2acddc5.map