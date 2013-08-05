define("magix/magix",function(){[].slice;var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,r=/[#?].*$/,n="",i=/([^=&?\/#]+)=([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,s={},c=0,u="/",f="vframe",v={iniFile:"app/ini",appName:"app",appHome:"./",tagName:f,rootId:"magix_vf_root"},l=s.hasOwnProperty,h=function(e){return function(t,r,n){switch(arguments.length){case 0:n=e;break;case 1:n=M.isObject(t)?g(e,t):p(e,t)?e[t]:null;break;case 2:null===r?(delete e[t],n=r):e[t]=n=r}return n}},m=function(e){var t=this;t.c=[],t.x=e||5,t.b=t.x+3},d=function(e){return new m(e)},p=function(e,t){return e?l.call(e,t):0},g=function(e,t,r){for(var n in t)r&&p(r,n)||(e[n]=t[n]);return e};g(m.prototype,{get:function(e){var t,r=this,n=r.c;return e=a+e,p(n,e)&&(t=n[e],t.f>=1&&(t.f++,t.t=c++,t=t.v)),t},set:function(e,t){var r=this,n=r.c;e=a+e;var i=n[e];if(!p(n,e)){if(n.length>=r.b){n.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=r.b-r.x;o--;)i=n.pop(),delete n[i.k]}i={},n.push(i),n[e]=i}return i.k=e,i.v=t,i.f=1,i.t=c++,i},del:function(e){e=a+e;var t=this.c,r=t[e];r&&(r.f=-1e5,r.v=n,delete t[e])},has:function(e){return e=a+e,p(this.c,e)}});var x=d(20),y=d(),w=function(e,t,r,n,i,a){for(M.isArray(e)||(e=[e]),t&&(M.isArray(t)||t.callee)||(t=[t]),n=0;e.length>n;n++)try{a=e[n],i=M.isFunction(a)&&a.apply(r,t)}catch(o){}return i},b=function(){},M={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:p,safeExec:w,noop:b,config:h(v),start:function(e){var t=this;e=g(v,e),t.libEnv(e),e.ready&&(w(e.ready),delete e.ready),t.libRequire(e.iniFile,function(r){v=g(e,r,e),v.tagNameChanged=v.tagName!=f;var n=e.progress;t.libRequire(["magix/router","magix/vom"],function(r,i){r.on("!ul",i.locChged),r.on("changed",i.locChged),n&&i.on("progress",n),t.libRequire(e.extensions,r.start)})})},keys:Object.keys||function(e){var t=[];for(var r in e)p(e,r)&&t.push(r);return t},local:h({}),path:function(i,a){var s=i+"\n"+a,c=y.get(s);if(!c){if(o.test(a))c=a;else if(i=i.replace(r,n).replace(t,n)+u,a.charAt(0)==u){var f=o.test(i)?8:0,v=i.indexOf(u,f);c=i.substring(0,v)+a}else c=i+a;for(;e.test(c);)c=c.replace(e,"$1/");y.set(s,c)}return c},pathToObject:function(e,t){var s=x.get(e);if(!s){var s={},c={},f=n;if(r.test(e)?f=e.replace(r,n):~e.indexOf("=")||(f=e),f&&o.test(f)){var v=f.indexOf(u,8);f=-1==v?u:f.substring(v)}e.replace(i,function(e,r,n){if(t)try{n=decodeURIComponent(n)}catch(i){}c[r]=n}),s[a]=f,s.params=c,x.set(e,s)}return s},objectToPath:function(e,t){var r,i=e[a],o=[],s=e.params;for(var c in s)r=s[c],t&&encodeURIComponent(r),o.push(c+"="+r);return i+(i&&o.length?"?":n)+o.join("&")},tmpl:function(e,t){return 1==arguments.length?{v:s[e],h:p(s,e)}:s[e]=t},listToMap:function(e,t){var r,n,i,a={};if(M.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(r=0;i>r;r++)n=e[r],a[t?n[t]:n]=t?n:1;return a},cache:d},C=Object.prototype.toString;return g(M,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},libEnv:function(e){var t=this,r=e.appHome,i=location;i.protocol;var a=e.appName;r=t.path(i.href,r+u),e.appHome=r;var o=e.debug;o&&(o=0==r.indexOf(i.protocol+u+u+i.host+u));var s=n;s=o?Date.now():e.appTag,s&&(s+=".js");var c={};c[a]=r+a+"/",seajs.config({paths:c})},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==C.call(e)},isString:function(e){return"[object String]"==C.call(e)},isNumber:function(e){return"[object Number]"==C.call(e)},isRegExp:function(e){return"[object RegExp]"==C.call(e)},extend:function(e,t,r,n){e.superclass=t.prototype;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,M.mix(e.prototype,r),M.mix(e,n),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,r,n,i,a,o=e("magix/magix"),s=e("magix/event"),c=window,u="",f="pathname",v=o.has,l=o.mix,h=document,m=/^UTF-8$/i.test(h.charset||h.characterSet||"UTF-8"),d=o.config(),p=o.cache(),g=o.cache(),x=/#.*$/,y=/^[^#]*#?!?/,w="params",b=d.nativeHistory,$=function(e,t,r){if(e){r=this[w],o.isArray(e)||(e=e.split(","));for(var n=0;e.length>n&&!(t=v(r,e[n]));n++);}return t},M=function(){return v(this,f)},C=function(){return v(this,"view")},E=function(){var e=this,t=e.hash,r=e.query;return t[f]!=r[f]},T=function(e){var t=this,r=t.hash,n=t.query;return r[w][e]!=n[w][e]},O=function(e){var t=this,r=t.hash;return v(r[w],e)},A=function(e){var t=this,r=t.query;return v(r[w],e)},V=function(e){var t=this,r=t[w];return r[e]},P=function(e){var t=o.pathToObject(e,m),r=t[f];return r&&a&&(t[f]=o.path(c.location[f],r)),t},j=l({getView:function(e){if(!n){n={rs:d.routes||{},nf:d.notFoundView};var t=d.defaultView;if(!t)throw Error("unset defaultView");n.home=t;var r=d.defaultPathname||u;n.rs[r]=t,n[f]=r}var i;e||(e=n[f]);var a=n.rs;return i=o.isFunction(a)?a.call(d,e):a[e],{view:i?i:n.nf||n.home,pathname:i?e:n.nf?e:n[f]}},start:function(){var e=j,t=c.history;i=b&&t.pushState,a=b&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e){e=e||c.location.href;var t=j,r=p.get(e);if(!r){var n=e.replace(x,u),i=e.replace(y,u),a=P(n),o=P(i),s={};l(s,a[w]),l(s,o[w]),r={pathnameDiff:E,paramDiff:T,hashOwn:O,queryOwn:A,get:V,href:e,srcQuery:n,srcHash:i,query:a,hash:o,params:s},p.set(e,r)}if(!r.view){var v;v=b?r.hash[f]||r.query[f]:r.hash[f];var h=t.getView(v);l(r,h)}return r},getChged:function(e,t){var r=e.href,n=t.href,i=r+"\n"+n,a=g.get(i);if(a||(i=n+"\n"+i,a=g.get(i)),!a){var o;a={params:{}},e[f]!=t[f]&&(a[f]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var s,c=e[w],u=t[w];for(s in c)c[s]!=u[s]&&(o=1,a[w][s]=1);for(s in u)c[s]!=u[s]&&(o=1,a[w][s]=1);a.occur=o,a.isParam=$,a.isPathname=M,a.isView=C,g.set(i,a)}return a},route:function(){var e=j,n=e.parseQH(),i=r||{params:{},href:"~"},a=!r;r=n;var o=e.getChged(i,n);o.occur&&(t=n,e.fire("changed",{location:n,changed:o,force:a}))},navigate:function(e,r,n){var s=j;if(!r&&o.isObject(e)&&(r=e,e=u),r&&(e=o.objectToPath({params:r,pathname:e},m)),e){var c=P(e),h={};if(h[w]=l({},c[w]),h[f]=c[f],h[f]){if(a){var d=t.query;if(d&&(d=d[w]))for(var p in d)v(d,p)&&!v(h[w],p)&&(h[w][p]=u)}}else{var g=l({},t[w]);h[w]=l(g,h[w]),h[f]=t[f]}var x,y=o.objectToPath(h);x=i?y!=t.srcQuery:y!=t.srcHash,x&&(i?(s.poped=1,history[n?"replaceState":"pushState"](null,null,y),s.route()):(l(h,t,h),h.srcHash=y,h.hash={params:h[w],pathname:h[f]},s.fire("!ul",{loc:t=h}),y="#!"+y,n?location.replace(y):location.hash=y))}}},s);return j.useState=function(){var e=j,t=location.href;c.addEventListener("popstate",function(){var r=location.href==t;(e.poped||!r)&&(e.poped=1,e.route())},!1)},j.useHash=function(){c.addEventListener("hashchange",j.route,!1)},j}),define("magix/body",["magix/magix"],function(e){var t=e("magix/magix"),r=t.has;t.mix;var n,i=t.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),a=document.body,o={},s="mx-owner",c="mx-ie",u={},f=65536,v=function(e){return e.id||(e.id="mx-e-"+f--)},l=function(e,t,r){return r?e.setAttribute(t,r):r=e.getAttribute(t),r},h={process:function(e){for(var t=e.target||e.srcElement;t&&1!=t.nodeType;)t=t.parentNode;var i=t,o=e.type,f=u[o]||(u[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!f.test(l(t,c))){for(var h,m,d="mx-"+o,p=[];i&&i!=a&&(h=l(i,d),m=l(i,c),!h&&!f.test(m));)p.push(i),i=i.parentNode;if(h){var g=l(i,s);if(!g)for(var x=i,y=n.all();x&&x!=a;){if(r(y,x.id)){l(i,s,g=x.id);break}x=x.parentNode}if(!g)throw Error("miss "+s+":"+h);var w=n.get(g),b=w&&w.view;b&&b.processEvent({info:h,se:e,tId:v(t),cId:v(i)})}else for(var $,m;p.length;)$=p.shift(),m=l($,c),f.test(m)||(m=m?m+","+o:o,l($,c,m))}},on:function(e,t){var r=this;if(o[e])o[e]++;else{n=t,o[e]=1;var s=i[e];s?r.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&r.process(e)}}},un:function(e){var t=this,r=o[e];if(r>0){if(r--,!r){var n=i[e];n?t.unbubble(1,a,e):a["on"+e]=null}o[e]=r}}};return h.unbubble=function(e,t,r){var n=e?"undelegate":"delegate";$(t)[n]("[mx-"+r+"]",r,h.process)},h}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),r=function(e){return"~"+e},n=t.safeExec,i={fire:function(e,t,i,a){var o=r(e),s=this,c=s[o];if(c){t||(t={}),t.type||(t.type=e);for(var u,f,v=c.length,l=v-1;v--;)u=a?v:l-v,f=c[u],(f.d||f.r)&&(c.splice(u,1),l--),f.d||n(f.f,t,s)}i&&delete s[o]},on:function(e,n,i){var a=r(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:n}):o.push({f:n,r:i})},un:function(e,t){var n=r(e),i=this[n];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[n]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,r,n,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),s=document,c=65536,u=i.mix,f=i.config("tagName"),v=i.config("rootId"),l=!i.config("tagNameChanged"),h=i.has,m="mx-view",d=l?"mx-defer":"mx-vframe",p="alter",g="created",x=function(e){return"object"==typeof e?e:s.getElementById(e)},y=function(e,t){return x(e).getElementsByTagName(t)},w=function(e){return s.createElement(e)},b=function(e){return e.id||(e.id="magix_vf_"+c--)},$=/<script[^>]*>[\s\S]*?<\/script>/gi,M=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<31,t.rM={}};return u(M,{root:function(e,r){if(!t){n=r;var i=x(v);i||(i=w(f),i.id=v,s.body.insertBefore(i,s.body.firstChild)),t=new M(v),e.add(t)}return t}}),u(u(M.prototype,a),{mountView:function(e,t){var r=this,a=x(r.id);if(a._bak?a._chgd=1:(a._bak=1,a._tmpl=a.innerHTML.replace($,"")),r.unmountView(),e){var s=i.pathToObject(e),c=s.pathname,f=--r.sign;i.libRequire(c,function(e){if(f==r.sign){var i=r.owner;o.prepare(e);var v=new e({owner:r,id:r.id,$:x,path:c,vom:i,location:n});r.view=v,v.on("interact",function(e){e.tmpl||(a._chgd&&(a.innerHTML=a._tmpl),r.mountZoneVframes(0,0,1)),v.on("rendered",function(){r.mountZoneVframes(0,0,1)}),v.on("prerender",function(){r.unmountZoneVframes()||r.cAlter({caused:r.id})}),v.on("inited",function(){r.viewInited=1,r.fire("viewInited",{view:v})})},0),t=t||{},v.load(u(t,s.params,t))}})}},unmountView:function(){var e=this;if(e.view){r||(r={caused:e.id}),e.unmountZoneVframes(),e.cAlter(r),e.view.destroy();var t=x(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,r=0,e.fire("viewUnmounted")}e.un("viewInited"),e.sign--},mountVframe:function(e,t,r,n){var i=this,a=i.owner,o=a.get(e);return o||(o=new M(e),o.pId=i.id,h(i.cM,e)||i.cC++,i.cM[e]=n,a.add(o)),o.mountView(t,r),o},mountZoneVframes:function(e,t,r){var n=this;n.unmountZoneVframes(e);var i=e||n.id,a=y(i,f),o=a.length,s={};if(o)for(var c,u,v,p,g=0;o>g;g++)if(c=a[g],u=b(c),!h(s,u)&&(v=c.getAttribute(m),p=!c.getAttribute(d)==l,p||v)){n.mountVframe(u,v,t,r);for(var x,w=y(c,f),$=0,M=w.length;M>$;$++)x=w[$],v=x.getAttribute(m),p=!c.getAttribute(d)==l,p||v||(s[b(x)]=1)}n.cC==n.rC&&n.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var r=t.owner,n=r.get(e);if(n){var i=n.fcc;n.unmountView(),r.remove(e,i),t.fire("destroy");var a=r.get(n.pId);a&&h(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,r,n=this;if(e){t=y(e,f);for(var i,a={},o=n.cM,s=t.length-1;s>=0;s--)i=t[s].id,h(o,i)&&(a[i]=1);t=a}else t=n.cM;for(var c in t)r=1,n.unmountVframe(c);return r},cCreated:function(e){var t=this,r=t.view;r&&!t.fcc&&(t.fcc=1,delete t.fca,r.fire(g,e),t.fire(g,e));var n=t.owner;n.vfCreated();var i=t.id,a=n.get(t.pId);a&&!h(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(delete t.fcc,!t.fca){var r=t.view,n=t.id;r&&(t.fca=1,r.fire(p,e),t.fire(p,e));var i=t.owner,a=i.get(t.pId);if(a&&h(a.rM,n)){var o=a.rM[n];a.rC--,delete a.rM[n],o&&a.cAlter(e)}}},locChged:function(e,t){var r=this,n=r.view;if(n&&n.sign&&n.rendered){var a=n.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&i.safeExec(n.locationChange,o,n);for(var s,c=o.cs||i.keys(r.cM),u=0,f=c.length,v=r.owner;f>u;u++)s=v.get(c[u]),s&&s.locChged(e,t)}}}),M}),define("magix/view",function(e){var t=e("magix/magix"),r=e("magix/event"),n=e("magix/body"),i=t.safeExec,a=t.has,o=",",s=[],c=t.mix,u=["render","renderUI"],f="~",v=function(e){return function(){var t,r=this,n=r.notifyUpdate();return n&&(t=e.apply(r,arguments)),t}},l=t.cache(40),h=function(e){var t=this;c(t,e),t.sign=1};c(h,{wrapUpdate:function(){var e=this;if(!e[f]){e[f]=1;for(var r,n,i=e.prototype,a=u.length-1;a>-1;a--)n=u[a],r=i[n],t.isFunction(r)&&r!=t.noop&&(i[n]=v(r))}}});var m=h.prototype,d=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,p=/\smx-owner\s*=/,g=/\smx-[^v][a-z]+\s*=/,x=function(e){return!p.test(e)&&g.test(e)?e+' mx-owner="'+x.t+'"':e},y={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},w=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,b=/(\w+):([^,]+)/g;c(m,r),c(m,{render:t.noop,locationChange:t.noop,init:t.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,r=arguments,n=e.sign,o=a(e,"template"),c=function(a){if(n==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,r,e),e.fire("inited",0,1),i(e.render,s,e);var c=!t&&!e.rendered;c&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(c):c()},beginUpdate:function(){var e=this;if(e.sign){var t=e.rendered;t&&(e.fire("refresh",0,1),e.fire("prerender"))}},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return x.t=this.id,(e+"").replace(d,x)},setViewHTML:function(e){var t,r=this;r.beginUpdate(),r.sign&&(t=r.$(r.id),t&&(t.innerHTML=e)),r.endUpdate()},observeLocation:function(e){var r,n=this;n.$ol||(n.$ol={keys:[]}),r=n.$ol;var i=r.keys;t.isObject(e)&&(r.pn=e.pathname,e=e.keys),e&&(r.keys=i.concat((e+"").split(o)))},olChanged:function(e){var t=this,r=t.$ol;if(r){var n=0;if(r.pn&&(n=e.isPathname()),!n){var i=r.keys;n=e.isParam(i)}return n}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},parentView:function(){var e=this,t=e.vom,r=e.owner,n=t.get(r.pId),i=null;return n&&n.viewInited&&(i=n.view),i},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var r=e.info,n=e.se,a=l.get(r);a||(a=r.match(w),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(b,function(e,t,r){a.p[t]=r}),l.set(r,a));var o=t.events;if(o){var s=o[n.type],u=y[a.f];u&&u.call(y,n),u=s&&s[a.n],u&&i(u,c({view:t,currentId:e.cId,targetId:e.tId,domEvent:n,events:o,params:a.p},y),s)}}},delegateEvents:function(e){var t=this,r=t.events,i=e?n.un:n.on,a=t.vom;for(var o in r)i.call(n,o,a)}});var M=t.config("appHome"),C=t.config("debug")?"?t="+Date.now():"",E=function(e,r,n){for(var i in r)t.isObject(r[i])?(a(e,i)||(e[i]={}),E(e[i],r[i],1)):n&&(e[i]=r[i])};return h.prototype.fetchTmpl=function(e){var r=this,n="template"in r;if(n)e(tmpl);else{var a=t.tmpl(r.path);if(a.h)e(a.v);else{var o=M+r.path+".html",s=E[o],c=function(n){e(t.tmpl(r.path,n))};s?s.push(c):(s=E[o]=[c],$.ajax({url:o+C,success:function(e){i(s,e),delete E[o]},error:function(e,t){i(s,t),delete E[o]}}))}}},h.extend=function(e,r,n){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),r&&i(r,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,n)},h.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var r,n=e.prototype,i=e.superclass;i;)r=i.constructor,E(n,r.prototype),i=r.superclass}e.wrapUpdate()},h}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),r=e("magix/magix"),n=e("magix/event"),i=r.has,a=r.mix,o=0,s=0,c=0,u=0,f={},v={},l=r.mix({all:function(){return f},add:function(e){i(f,e.id)||(o++,f[e.id]=e,e.owner=l,l.fire("add",{vframe:e}))},get:function(e){return f[e]},remove:function(e,t){var r=f[e];r&&(o--,t&&s--,delete f[e],l.fire("remove",{vframe:r}))},vfCreated:function(){if(!u){s++;var e=s/o;e>c&&l.fire("progress",{percent:c=e},u=1==e)}},root:function(){return t.root(l,v)},locChged:function(e){var t,r=e.loc;if(r?t=1:r=e.location,a(v,r),!t){var n=l.root(),i=e.changed;i.isView()?n.mountView(r.view):n.locChged(r,i)}}},n);return l}),define("mxext/mmanager",["magix/magix","magix/event"],function(e){var t=e("magix/magix"),r=e("magix/event"),n=t.has,i=t.safeExec,a=t.mix,o=function(e){t.isArray(e)||(e=[e]);for(var r,n=0;e.length>n;n++)r=e[n],delete r.cacheKey;return e},s=function(e){var r=this;r.$mClass=e,r.$mCache=t.cache(),r.$mCacheKeys={},r.$mMetas={}},c=[].slice,u={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},f=function(e){var t={};for(var r in e)u[r]||(t[r]=e[r]);return t},v=function(e,t,r){return function(){return e.apply(t,[t,r].concat(c.call(arguments)))}},l=function(e,t){if(t)for(var r=e.length-1;r>-1;r--)l(e[r]);else{var n=e.$mm;!e.fromCache&&n.used>0&&(e.fromCache=!0),n.used++}};a(s,{create:function(e){if(!e)throw Error("MManager.create:modelClass ungiven");return new s(e)}});var h={ALL:1,ONE:2,ORDER:4},m=Date.now||function(){return+new Date},d=function(e){this.$host=e,this.$doTask=!1,this.$reqModels={}},p="_before",g="_after";return a(d.prototype,{fetchModels:function(e,r,a){var o=this;if(o.$doTask)return o.next(function(t){t.fetchModels(e,r,a)}),o;o.$doTask=!0;var s=o.$host,c=s.$mCache,u=s.$mCacheKeys,f=o.$reqModels;t.isArray(e)||(e=[e]);var d,p,g=e.length,x=0,y=Array(g),w=[],b={},$=[],M=t.isArray(r);M&&(w=Array(r.length));for(var C,E=function(e,t,v,C){if(!o.$destroy){x++,delete f[e.id];var E=e.$mm,T=E.cacheKey;if(y[t]=e,C)p=!0,d=C,b[t]=v;else if(!T||T&&!c.has(T)){T&&c.set(T,e),E.doneAt=m();var O=E.after,A=E.meta;O&&i(O,[e,A]),s.fireAfter(A.name,[e])}if(a==h.ONE){var V=M?r[t]:r;V&&(l(e),w[t]=i(V,[e,p?{msg:d}:null,p?b:null],o))}else if(a==h.ORDER){$[t]={m:e,e:p,s:d};for(var P,j,k=$.i||0;P=$[k];k++)j=M?r[k]:r,l(P.m),w[k]=i(j,[P.m,P.e?{msg:P.s}:null,$.e?b:null,w],o),P.e&&(b[k]=P.s,$.e=1);$.i=k}if(x>=g){b.msg=d;var I=p?b:null;a==h.ALL?(l(y,1),y.push(I),w[0]=i(r,y,o),w[1]=I):w.push(I),o.$ntId=setTimeout(function(){o.doNext(w)},30)}if(T&&n(u,T)){var U=u[T].q;delete u[T],i(U,[v,C],e)}}},T=0;e.length>T;T++){if(C=e[T],!C)throw Error("miss attrs:"+e);var O,A,A=s.getModel(C),V=A.cacheKey;O=A.entity;var P=v(E,O,T);V&&n(u,V)?u[V].q.push(P):A.needUpdate?(f[O.id]=O,V&&(u[V]={q:[],e:O}),O.request(P)):P()}return o},fetchAll:function(e,t){return this.fetchModels(e,t,h.ALL)},saveAll:function(e,t){return e=o(e),this.fetchModels(e,t,h.ALL)},fetchOrder:function(e,t){var r=c.call(arguments,1);return this.fetchModels(e,r.length>1?r:t,h.ORDER)},saveOrder:function(e,t){e=o(e);var r=c.call(arguments,1);return this.fetchModels(e,r.length>1?r:t,h.ORDER)},saveOne:function(e,t){e=o(e);var r=c.call(arguments,1);return this.fetchModels(e,r.length>1?r:t,h.ONE)},fetchOne:function(e,t){var r=c.call(arguments,1);return this.fetchModels(e,r.length>1?r:t,h.ONE)},abort:function(){var e=this;clearTimeout(e.$ntId);var t=e.$host,r=e.$reqModels,a=t.$mCacheKeys;if(r)for(var o in r){var s=r[o],c=s.$mm.cacheKey;if(c&&n(a,c)){var u=a[c];delete a[c],i(u,[!0,s,"aborted"],s)}s.abort()}e.$reqModels={},e.$queue=[],e.$doTask=!1},next:function(e){var t=this;if(t.$queue||(t.$queue=[]),t.$queue.push(e),!t.$doTask){var r=t.$latest||[];t.doNext.apply(t,[t].concat(r))}return t},doNext:function(e){var t=this;t.$doTask=!1;var r=t.$queue;if(r){var n=r.shift();n&&i(n,[t].concat(e),t)}t.$latest=e},destroy:function(){var e=this;e.$destroy=!0,e.abort()}}),a(s.prototype,{registerModels:function(e){var r=this,n=r.$mMetas;t.isArray(e)||(e=[e]);for(var i,a,o=0;e.length>o;o++){if(i=e[o],a=i.name,i&&!a)throw Error("miss name attribute");if(n[a])throw Error("already exist:"+a);n[a]=i}},registerMethods:function(e){var t=this;a(t,e)},createModel:function(e){var r=this,n=r.getModelMeta(e),a=new r.$mClass(f(n));a.$mm={used:0};var o=e.before||n.before;r.fireBefore(n.name,[a]),t.isFunction(o)&&i(o,[a,n,e]);var s=e.after||n.after;a.$mm.after=s;var c=e.cacheKey||n.cacheKey;return t.isFunction(c)&&(c=i(c,[n,e])),a.$mm.cacheKey=c,a.$mm.meta=n,a.set(f(e)),a.setUrlParams(n.urlParams),a.setPostParams(n.postParams),a.setUrlParams(e.urlParams),a.setPostParams(e.postParams),a},getModelMeta:function(e){var r,n=this,i=n.$mMetas;r=t.isString(e)?e:e.name;var a=i[r];if(!a)throw Error("Not found:"+e.name);return a},getModel:function(e){var t,r=this,n=r.getCachedModel(e);return n||(t=!0,n=r.createModel(e)),{entity:n,cacheKey:n.$mm.cacheKey,needUpdate:t}},saveAll:function(e,t){return new d(this).saveAll(e,t)},fetchAll:function(e,t){return new d(this).fetchAll(e,t)},saveOrder:function(){var e=new d(this);return e.saveOrder.apply(e,arguments)},fetchOrder:function(){var e=new d(this);return e.fetchOrder.apply(e,arguments)},saveOne:function(){var e=new d(this);return e.saveOne.apply(e,arguments)},fetchOne:function(){var e=new d(this);return e.fetchOne.apply(e,arguments)},clearCacheByKey:function(e){var r=this,n=r.$mCache;t.isString(e)&&n.del(e)},clearCacheByName:function(e){for(var t=this,r=t.$mCache,n=r.c,i=0;n.length>i;i++){var a=n[i],o=a.v,s=o&&o.$mm;if(s){var c=s.meta.name;c==e&&r.del(s.cacheKey)}}},getModelUrl:function(e){var t=this,r=t.getModelMeta(e);return r.url?r.url:t.$mClass.prototype.url(r.uri)},listenBefore:function(e,t){r.on.call(this,e+p,t)},listenAfter:function(e,t){r.on.call(this,e+g,t)},unlistenBefore:function(e,t){r.un.call(this,e+p,t)},unlistenAfter:function(e,t){r.un.call(this,e+g,t)},fireBefore:function(e,t){r.fire.call(this,e+p,t)},fireAfter:function(e,t){r.fire.call(this,e+g,t)},getCachedModel:function(e){var r,n,a=this,o=a.$mCache,s=null;if(t.isString(e)?r=e:(n=a.getModelMeta(e),r=e.cacheKey||n.cacheKey,t.isFunction(r)&&(r=i(r,[n,e]))),r){var c=a.$mCacheKeys,u=c[r];if(u)s=u.e;else if(s=o.get(r)){n||(n=s.$mm.meta);var f=e.cacheTime||n.cacheTime||0;t.isFunction(f)&&(f=i(f,[n,e])),f>0&&m()-s.$mm.doneAt>f&&(a.clearCacheByKey(r),s=null)}}return s}}),s}),define("mxext/model",["magix/magix"],function(){var e=function(e,t){var r=this,n=function(){n.superclass.constructor.apply(this,arguments),t&&SafeExec(t,arguments,this)};return Magix.mix(n,r,{prototype:!0}),Magix.extend(n,r,e)},t=+new Date,r=function(e){e&&this.set(e),this.id="m"+t--},n=encodeURIComponent;return Magix.mix(r,{GET:"GET",POST:"POST",extend:e}),Magix.mix(r.prototype,{urlMap:{},sync:Magix.noop,parse:function(e){return e},getPostParams:function(){return this.getParams(r.POST)},getUrlParams:function(){return this.getParams(r.GET)},getParams:function(e){var t=this;e=e?e.toUpperCase():r.GET;var i,a="$"+e,o=t[a],s=[];if(o)for(var c in o)if(i=o[c],Magix.isArray(i))for(var u=0;i.length>u;u++)s.push(c+"="+n(i[u]));else s.push(c+"="+n(i));return s.join("&")},setUrlParamsIf:function(e,t){this.setParams(e,t,r.GET,!0)},setPostParamsIf:function(e,t){var n=this;n.setParams(e,t,r.POST,!0)},setParams:function(e,t,n,i){n=n?n.toUpperCase():r.GET;var a=this;a.$types||(a.$types={}),a.$types[n]=!0;var o="$"+n;if(a[o]||(a[o]={}),Magix.isObject(e))for(var s in e)i&&a[o][s]||(a[o][s]=e[s]);else e&&(i&&a[o][e]||(a[o][e]=t))},setPostParams:function(e,t){var n=this;n.setParams(e,t,r.POST)},setUrlParams:function(e,t){this.setParams(e,t,r.GET)},reset:function(){var e=this,t=e.$types;if(t){for(var r in t)Magix.has(t,r)&&delete e["$"+r];delete e.$types}var n=e.$keys,i=e.$attrs;if(n){for(var a=0;n.length>a;a++)delete i[n[a]];delete e.$keys}},url:function(e){var t,r=this,n=r.get("url");if(e=e||r.get("uri")){t=e.split(":");var i=r.urlMap;if(i){for(var a=0,o=i,s=t.length;s>a&&(o=o[t[a]],o);a++);e=o||e}n=e}else if(!n)throw Error("model not set uri and url");return n},get:function(e){var t=this,r=!arguments.length,n=t.$attrs;return n?r?n:n[e]:null},set:function(e,t,r){var n=this;if(n.$attrs||(n.$attrs={}),r&&!n.$keys&&(n.$keys=[]),Magix.isObject(e))for(var i in e)r&&n.$keys.push(i),n.$attrs[i]=e[i];else e&&(r&&n.$keys.push(e),n.$attrs[e]=t)},request:function(e,t){e||(e=function(){});var r=Magix.isFunction(e),n=e.success,i=e.error,a=this;a.$abort=!1;var o=function(o,s){if(!a.$abort)if(s)r&&e(o,s,t),i&&i.call(a,s);else{if(o){var c=a.parse(o);Magix.isObject(c)||(c={data:c}),a.set(c,null,!0)}r&&e(o,s,t),n&&n.call(a,o)}};o.success=function(e){o(e)},o.error=function(e){o(null,e||"request error")},a.$trans=a.sync(o,t)},abort:function(){var e=this;e.$trans&&e.$trans.abort&&e.$trans.abort(),delete e.$trans,e.$abort=!0},isAborted:function(){return this.$abort},rollbackTransaction:function(){var e=this,t=e.$bakAttrs;t&&(e.$attrs=t,delete e.$bakAttrs)},endTransaction:function(){delete this.$bakAttrs}}),r.prototype.beginTransaction=function(){throw Error("unsupport")},r}),define("mxext/view",["magix/magix","magix/view","magix/router"],function(e){var t=e("magix/magix"),r=e("magix/view"),n=e("magix/router"),i=window,a=function(e){i.clearTimeout(e),i.clearInterval(e)},o=function(e){c(e.destroy,[],e)},s=0,c=t.safeExec,u=t.has,f=r.extend({mxViewCtor:t.noop,navigate:function(){n.navigate.apply(n,arguments)},manage:function(e,r){var n=this,i=arguments,c=!0;1==i.length&&(r=e,e="res_"+s++,c=!1),n.$res||(n.$res={});var u;t.isNumber(r)?u=a:r&&r.destroy&&(u=o);var f={hasKey:c,res:r,destroy:u};return n.$res[e]=f,r},getManaged:function(e){var t=this,r=t.$res;if(t.sign,r&&u(r,e)){var n=r[e],i=n.res;return i}return null},removeManaged:function(e){var t=this,r=null,n=t.$res;if(n)if(u(n,e))r=n[e].res,delete n[e];else for(var i in n)if(n[i].res===e){r=n[i].res,delete n[i];break}return r},destroyManaged:function(e){var t=this,r=t.$res;if(r){for(var n in r){var i=r[n],a=i.res,o=i.destroy,s=!1;o&&(o(a),s=!0),i.hasKey||delete r[n],t.fire("destroyManaged",{resource:a,processed:s})}"destroy"==e.type&&delete t.$res}},destroyMRequest:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r],i=n.res;i&&i.fetchOne&&i.fetchAll&&(i.destroy(),delete t[r])}}},function(){var e=this;e.on("interact",function(){e.on("rendercall",e.destroyMRequest),e.on("prerender",e.destroyManaged),e.on("destroy",e.destroyManaged)}),e.mxViewCtor()});return f}),function(e){var t=function(){};e.console||(e.console={log:t,info:t,error:t});var r,n={};e.Magix||(e.Magix={config:function(e){for(var t in e)n[t]=e[t]},start:function(e){r=e}},seajs.use("magix/magix",function(t){e.Magix=t,t.config(n),r&&t.start(r)}))}(this);