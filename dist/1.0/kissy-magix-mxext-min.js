KISSY.add("magix/body",function(k,g,h,i){var a=h.has,k=h.mix,b=h.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),e=document.body,n={},o={},q=65536,m=function(a,c,d){d?a.setAttribute(c,d):d=a.getAttribute(c);return d},i=k({processEvent:function(f){for(var c=f.target||f.srcElement;c&&1!=c.nodeType;)c=c.parentNode;var d=c,b=f.type,j=o[b]||(o[b]=RegExp("(?:^|,)"+b+"(?:,|$)"));if(!j.test(m(c,"mx-ie"))){for(var n="mx-"+b,i,h,p=[];d&&d!=e&&!(i=m(d,n),h=m(d,"mx-ie"),i||j.test(h));)p.push(d),
d=d.parentNode;if(i){b=m(d,"mx-owner");if(!b){j=d;for(h=this.VOM.all();j&&j!=e;)if(a(h,j.id)){m(d,"mx-owner",b=j.id);break}else j=j.parentNode}if(b)this.fire("event",{info:i,se:f,tId:c.id||(c.id="mx-e-"+q--),cId:d.id||(d.id="mx-e-"+q--),hld:b});else throw Error("miss mx-owner:"+i);}else for(;p.length;)f=p.shift(),h=m(f,"mx-ie"),j.test(h)||(h=h?h+","+b:b,m(f,"mx-ie",h))}},attachEvent:function(a){var c=this;if(n[a])n[a]++;else if(n[a]=1,b[a])c.onUnbubble(e,a);else e["on"+a]=function(a){(a=a||window.event)&&
c.processEvent(a)}},detachEvent:function(a){var c=n[a];0<c&&(c--,c||(b[a]?this.offUnbubble(e,a):e["on"+a]=null),n[a]=c)}},i);return h.mix(i,g)},{requires:["magix/impl/body","magix/magix","magix/event"]});
KISSY.add("magix/event",function(k,g){var h=g.safeExec;return{fire:function(i,a,b,e){var n="~"+i,o=this[n];if(o){a||(a={});if(!a.type)a.type=i;for(var i=o.length,g=i-1,m,f;i--;)m=e?i:g-i,f=o[m],f.d&&(o.splice(m,1),g--),h(f,a,this)}b&&delete this[n]},on:function(i,a,b){i="~"+i;this[i]||(this[i]=[]);g.isNumeric(b)?this[i].splice(b,0,a):(a.d=b,this[i].push(a))},un:function(i,a){g.isArray(i)||(i=[i]);for(var b=0,e=i.length;b<e;b++){var n="~"+i[b],o=this[n];if(o)if(a)for(var n=0,h=o.length;n<h;n++){if(o[n]==
a){o.splice(n,1);break}}else delete this[n]}}}},{requires:["magix/magix"]});KISSY.add("magix/impl/body",function(k,g){var h={};return{onUnbubble:function(i,a){var b=this;g.delegate(i,a,"*[mx-"+a+"]",h[a]=function(a){b.processEvent(a)})},offUnbubble:function(i,a){g.undelegate(i,a,"*[mx-"+a+"]",h[a]);delete h[a]}}},{requires:["event"]});
KISSY.add("magix/impl/magix",function(k,g){g=[].slice;return{libRequire:function(h,i){if(h){var a=this.isFunction(i),b=this.isArray(h);k.use(b?h.join(","):h,a?function(a){i.apply(a,g.call(arguments,1))}:this.noop)}else i()},libEnv:function(h){var i=h.appHome,a=location,b=a.protocol,e=h.appName;~i.indexOf(b)||(i=this.path(a.href,i));k.endsWith(i,"/")||(i+="/");h.appHome=i;var n=h.debug;n&&(n=0==i.indexOf(b+"//"+a.host));"~"==e.charAt(0)&&k.config({map:[[RegExp("/"+e+"/"),"/"]]});a="";(a=n?k.now():
h.appTag)&&(a+=".js");b=h.appCombine;k.isUndefined(b)&&(b=k.config("combine"));k.config({packages:[{name:e,path:i,debug:h.debug=n,combine:b,tag:a}]})},isArray:k.isArray,isFunction:k.isFunction,isObject:k.isObject,isRegExp:k.isRegExp,isString:k.isString,isNumber:k.isNumber}});
KISSY.add("magix/impl/router",function(k,g){var h=window;return{useState:function(){var i=this,a=location.href;g.on(h,"popstate",function(){var b=location.href==a;if(i.$firedPop||!b)i.$firedPop=!0,i.route()})},useHash:function(){var i=this;g.on(h,"hashchange",function(){i.route()})}}},{requires:["event"]});
KISSY.add("magix/impl/view",function(k,g,h){var i=function(){},a=k.Env.mods,b={wrapAsyn:1,extend:1},e=function(a,b,i){for(var g in b)k.isObject(b[g])?(h.has(a,g)||(a[g]={}),e(a[g],b[g],!0)):i&&(a[g]=b[g])};i.extend=function(a,b){var e=function(){e.superclass.constructor.apply(this,arguments);b&&h.safeExec(b,arguments,this)};e.extend=i.extend;return k.extend(e,this,a)};i.prepare=function(n,i){if(!n.wrapAsyn){for(var g in this)h.has(b,g)&&(n[g]=this[g]);g=n.prototype;for(var k=n;k.superclass;)k=k.superclass.constructor,
e(g,k.prototype);i.home=a[i.path].packageInfo.getBase();h.mix(g,i)}n.wrapAsyn()};h.mix(i.prototype,{fetchTmpl:function(a,b,e){g({url:a+(e?"?_="+k.now():""),success:b,error:function(a,f){b(f)}})}});return i},{requires:["ajax","magix/magix"]});
KISSY.add("magix/magix",function(k,g){var h=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,i=/[^\/]*$/,a=/[#?].*$/,b=/([^=&?\/#]+)=([^&=#?]*)/g,e=/^https?:\/\//i,n={},o=0,q={debug:false,iniFile:"~/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},m=n.hasOwnProperty,f=function(a){return function(c,d,b){switch(arguments.length){case 0:b=a;break;case 1:b=r.isObject(c)?j(a,c):l(a,c)?a[c]:null;break;case 2:null===d?(delete a[c],b=d):a[c]=b=d}return b}},c=function(a){this.c=[];this.x=
a||20;this.b=this.x+5},d=function(a){return new c(a)},l=function(a,c){return a?m.call(a,c):0},j=function(a,c,d){for(var b in c)if(!0===d)a[b]=c[b];else if(l(c,b)&&(!d||!l(d,b)))a[b]=c[b];return a};j(c.prototype,{get:function(a){var c=this.c,d,a="pathname"+a;if(l(c,a)&&(d=c[a],1<=d.f))d.f++,d.t=o++,d=d.v;return d},set:function(a,c){var d=this.c,a="pathname"+a,b=d[a];if(!l(d,a)){if(d.length>=this.b){d.sort(function(a,c){return c.f==a.f?c.t-a.t:c.f-a.f});for(var f=this.b-this.x;f--;)b=d.pop(),delete d[b.k]}b=
{};d.push(b);d[a]=b}b.k=a;b.v=c;b.f=1;b.t=o++;return b},del:function(a){var a="pathname"+a,c=this.c,d=c[a];if(d)d.f=-1E5,delete c[a]}});var u=d(60),v=d(),w=function(a,c,d,b,f,j){r.isArray(a)||(a=[a]);if(!c||!r.isArray(c)&&!c.callee)c=[c];for(b=0;b<a.length;b++)try{j=a[b],f=r.isFunction(j)&&j.apply(d,c)}catch(e){}return f},p=function(){},r={isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},mix:j,has:l,safeExec:w,noop:p,config:f(q),start:function(a){var c=this,a=j(q,a);c.libEnv(a);var d=
a.iniFile.replace("~",a.appName);c.libRequire(d,function(d){q=j(a,d,a);var b=a.progress;c.libRequire(["magix/router","magix/vom"],function(d,f){d.on("changed",function(a){a.loc?f.locationUpdated(a.loc):a.changed.isView()?f.remountRoot(a):f.locationChanged(a)});f.on("progress",b||p);c.libRequire(a.extensions,function(){d.start()})})});a.ready&&(w(a.ready),delete a.ready)},keys:Object.keys||function(a){var c=[],d;for(d in a)l(a,d)&&c.push(d);return c},local:f({}),path:function(c,d){var b=c+"\n"+d,f=
v.get(b);if(!f){c=c.replace(a,"").replace(i,"");"/"==d.charAt(0)?(f=c.indexOf("://"),-1==f?f=d:(f=c.indexOf("/",f+3),f=-1==f?c+d:c.substring(0,f)+d)):f=c+d;for(;h.test(f);)f=f.replace(h,"$1/");v.set(b,f)}return f},pathToObject:function(c,d){var f=u.get(c);if(!f){var f={},j={},p="";a.test(c)?p=c.replace(a,""):~c.indexOf("=")||(p=c);if(p&&e.test(p))var l=p.indexOf("/",8),p=-1==l?"/":p.substring(l);c.replace(b,function(a,c,b){if(d)try{b=decodeURIComponent(b)}catch(f){}j[c]=b});f.pathname=p;f.params=
j;u.set(c,f)}return f},objectToPath:function(a,c){var d=a.pathname,b=[],f=a.params,j,p;for(p in f)j=f[p],c&&encodeURIComponent(j),b.push(p+"="+j);return d+(d&&b.length?"?":"")+b.join("&")},tmpl:function(a,c){return 1==arguments.length?n[a]:n[a]=c},listToMap:function(a,c){var d,b,f={},j;this.isString(a)&&(a=a.split(","));if(a&&(j=a.length))for(d=0;d<j;d++)b=a[d],f[c?b[c]:b]=c?b:1;return f},createCache:d};return r.mix(r,g)},{requires:["magix/impl/magix"]});
KISSY.add("magix/router",function(k,g,h,i){var a=window,b=h.has,e=h.mix,n=document,o=/^UTF-8$/i.test(n.charset||n.characterSet||"UTF-8"),q=h.config(),m=h.createCache(),f=h.createCache(),c,d,l,j=65536,u=/#.*$/,v=/^[^#]*#?!?/,w=q.nativeHistory,p,r,s=function(a,c,d){if(a){d=this.params;h.isArray(a)||(a=a.split(","));for(var f=0;f<a.length&&!(c=b(d,a[f]));f++);}return c},x=function(){return b(this,"pathname")},D=function(){return b(this,"view")},y=function(){return this.hash.pathname!=this.query.pathname},
A=function(a){return this.hash.params[a]!=this.query.params[a]},z=function(a){return b(this.hash.params,a)},E=function(a){return b(this.query.params,a)},C=function(a){return this.params[a]},k=e({getView:function(a){if(!l){l={routes:q.routes||{},e404:q.notFoundView};var c=q.defaultView;if(!c)throw Error("unset defaultView");l.home=c;var d=q.defaultPathname||"";l.routes[d]=c;l.pathname=d}a||(a=l.pathname);c=l.routes;c=h.isFunction(c)?c.call(q,a):c[a];return{view:c?c:l.e404||l.home,pathname:c?a:l.e404?
a:l.pathname}},start:function(){var c=a.history;p=w&&c.pushState;r=w&&!p;p?this.useState():this.useHash();this.route()},parsePath:function(c){var c=h.pathToObject(c,o),d=c.pathname;d&&"/"!=d.charAt(0)&&r&&(c.pathname=h.path(a.location.pathname,d));return c},parseQH:function(c){var c=c||a.location.href,d=m.get(c);if(!d){var d=c.replace(u,""),b=c.replace(v,""),f=this.parsePath(d),j=this.parsePath(b),p={};e(p,f.params);e(p,j.params);d={pathnameDiff:y,paramDiff:A,hashOwn:z,queryOwn:E,get:C,href:c,srcQuery:d,
srcHash:b,query:f,hash:j,params:p};m.set(c,d)}return d},parseLoc:function(a){a=this.parseQH(a);if(!a.view){var c=this.getView(w?a.hash.pathname||a.query.pathname:a.hash.pathname);e(a,c)}return a},getChged:function(a,c){var d=c.href,b=a.href+"\n"+d,j=f.get(b);j||(b=d+"\n"+b,j=f.get(b));if(!j){var p,j={params:{}};if(a.pathname!=c.pathname)p=j.pathname=1;if(a.view!=c.view)p=j.view=1;var d=a.params,e=c.params,l;for(l in d)d[l]!=e[l]&&(p=1,j.params[l]=1);for(l in e)d[l]!=e[l]&&(p=1,j.params[l]=1);j.occur=
p;j.isParam=s;j.isPathname=x;j.isView=D;f.set(b,j)}return j},route:function(){var a=this.parseLoc(),b=d||{params:{},href:"~"},f=!d;d=a;b=this.getChged(b,a);b.occur&&(c=a,this.fire("changed",{location:a,changed:b,firstFire:f}))},navigate2:function(a){if(a&&h.isString(a)){var d=this.parsePath(a),a={};a.params=e({},d.params);a.pathname=d.pathname;if(a.pathname){if(r&&(d=c.query)&&(d=d.params))for(var f in d)b(d,f)&&!b(a.params,f)&&(a.params[f]="")}else f=e({},c.params),a.params=e(f,a.params),a.pathname=
c.pathname;f=h.objectToPath(a);if(p?f!=c.srcQuery:f!=c.srcHash)p?(this.$firedPop=1,history.pushState(j--,n.title,f),this.route()):(e(a,c,a),a.srcHash=f,a.hash={params:a.params,pathname:a.pathname},this.fire("changed",{loc:c=a}),location.hash="#!"+f)}},navigate:function(a,c){!c&&h.isObject(a)&&(c=a,a="");c&&(a=h.objectToPath({params:c,pathname:a},o));this.navigate2(a)}},i);return h.mix(k,g)},{requires:["magix/impl/router","magix/magix","magix/event"]});
KISSY.add("magix/vframe",function(k,g,h,i){var a=document,b=65536,e=window.CollectGarbage||g.noop,n=g.mix,k=g.config(),o=k.tagName,q=k.rootId,m=g.has,f,c=function(c){return"object"==typeof c?c:a.getElementById(c)};a.createElement(o);var d=/<script[^>]*>[\s\S]*?<\/script>/ig,l=function(a){this.id=a;this.vId=a+"_v";this.cS={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};n(l,{root:function(d){if(!f){var b=c(q);if(!b)b=a.createElement(o),b.id=q,a.body.insertBefore(b,a.body.firstChild);f=new l(q);
d.add(f)}return f}});n(n(l.prototype,h),{useAnimUpdate:g.noop,oldViewDestroy:g.noop,prepareNextView:g.noop,newViewCreated:g.noop,mountView:function(a,b){var f=this,l=c(f.id);l._bak?l._chgd=1:(l._bak=1,l._tmpl=l.innerHTML.replace(d,""));var p=f.vN&&f.useAnimUpdate();f.unmountView(p,1);if(a){var e=g.pathToObject(a),h=e.pathname,o=--f.sign;g.libRequire(h,function(a){if(o==f.sign){var d=f.owner;i.prepare(a,{$:c,path:h,vom:d});var j;p?(j=f.vId,f.prepareNextView()):j=f.id;var g=new a({owner:f,id:j,vId:f.vId,
vfId:f.id,location:d.getLocation()});f.view=g;g.on("interact",function(a){f.fire("viewInteract",{view:g});f.viewUsable=1;p&&f.newViewCreated(1);if(!a.tmpl){if(!p&&l._chgd)l.innerHTML=l._tmpl;f.mountZoneVframes(0,0,1)}g.on("rendered",function(){f.mountZoneVframes(0,0,1)});g.on("prerender",function(a){f.unmountZoneVframes(0,a.anim)})},0);g.load(n(e.params,b,!0))}})}},unmountView:function(a,d){if(this.view){this.childrenAlter();this.unmountZoneVframes(0,a);this.fire("viewUnmount");this.view.destroy();
var f=c(this.id);if(!a&&f._bak)f.innerHTML=f._tmpl;a&&d&&this.oldViewDestroy();delete this.view;delete this.viewUsable;e()}this.un("viewInteract");this.sign--},mountVframe:function(a,c,d,f){var b=this.owner,e=b.get(a);if(!e)e=new l(a),e.pId=this.id,m(this.cS,a)||this.cC++,this.cS[a]=f,b.add(e);e.mountView(c,d);return e},mountZoneVframes:function(a,d,f){this.unmountZoneVframes(a);var a=a?a:c(this.vId)||c(this.id),a=c(a).getElementsByTagName(o),l=a.length,p={};if(l)for(var e=0,g,i;e<l;e++){g=a[e];i=
g.id||(g.id="magix_vf_"+b--);m(p,i)||this.mountVframe(i,g.getAttribute("mx-view"),d,f);g=c(g).getElementsByTagName(o);i=0;for(var h=g.length;i<h;i++)p[g[i].id||(g[i].id="magix_vf_"+b--)]=1}else this.childrenCreated()},unmountVframe:function(a,c){var d=this.owner,f=d.get(a);f&&(f.unmountView(c),d.remove(a),delete this.cS[a],this.cC--)},unmountZoneVframes:function(a){var d;if(a){d=c(a).getElementsByTagName(o);for(var f={},b=this.cS,l=d.length-1,e;0<=l;l--)e=d[l].id,m(b,e)&&(f[e]=1);d=f}else d=this.cS;
for(var g in d)this.unmountVframe(g);if(!a)this.cS={},this.cC=0},childrenCreated:function(){var a=this.view;if(a&&!this.fcc)this.fcc=1,delete this.fca,a.fire("created"),this.fire("created");a=this.owner;a.childCreated();if(a=a.get(this.pId)){var c=this.id,d=a.rM;m(d,c)||(d[c]=a.cS[c],a.rC++,a.rC==a.cC&&a.childrenCreated())}},childrenAlter:function(){delete this.fcc;var a=this.view,c=this.id;if(a&&!this.fca)this.fca=1,a.fire("alter"),this.fire("alter");if(a=this.owner.get(this.pId)){var c=this.id,
d=a.rM,f=d[c];m(d,c)&&(a.rC--,delete d[c],f&&a.childrenAlter())}},locationChanged:function(a,c){var d=this.view;if(d&&d.sign&&(d.location=a,d.rendered)){var f=d.olChanged(c),b={location:a,changed:c,prevent:function(){this.cs=[]},toChildren:function(a){a=a||[];g.isString(a)&&(a=a.split(","));this.cs=a}};f&&g.safeExec(d.locationChange,b,d);for(var d=b.cs||g.keys(this.cS),f=0,b=d.length,l=this.owner,e;f<b;f++)(e=l.get(d[f]))&&e.locationChanged(a,c)}},locationUpdated:function(a){var c=this.view;if(c&&
c.sign){c.location=a;var c=this.cS,d,f=this.owner,b;for(b in c)(d=f.get(b))&&d.locationUpdated(a)}}});return l},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(k,g,h,i,a){var b=h.safeExec,e=h.has,n=[],o=h.config(),q=/^~[^\/]*/,m=h.mix,f=h.listToMap("render,renderUI"),c=function(a){return function(){var c;this.sign&&(this.sign++,this.fire("rendercall"),c=a.apply(this,arguments));return c}},k=function(a){m(this,a);this.sign=1};m(k,{wrapAsyn:function(){if(!this["~~"]){this["~~"]=1;var a=this.prototype,d,b;for(b in a){d=a[b];var l=null;h.isFunction(d)&&d!=h.noop&&!d["~~"]&&e(f,b)&&(l=c(d),l["~~"]=d,a[b]=l)}}}});var d=k.prototype,
l=window.CollectGarbage||h.noop,j=/\smx-[^ohv][a-z]+\s*=/g,u={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},v=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g;m(d,i);m(d,{render:h.noop,locationChange:h.noop,init:h.noop,hasTmpl:!0,enableEvent:!0,enableAnim:!1,load:function(){var a=this,c=a.hasTmpl,d=arguments,
f=a.sign,l=function(){if(f==a.sign&&(a.delegateEvents(),a.fire("interact",{tmpl:c},1),b(a.init,d,a),b(a.render,n,a),!c&&!a.rendered))a.rendered=!0,a.fire("primed",null,1)};c&&!a.template?a.planTmpl(l):l()},updateViewId:function(){this.id=this.$(this.vId)?this.vId:this.vfId},beginUpdateHTML:function(){if(this.sign&&this.rendered){var a=this.enableAnim;this.fire("refresh",0,1);this.fire("prerender",{anim:a});var c=this.owner;a&&(b(c.oldViewDestroy,n,c),b(c.prepareNextView,n,c),this.updateViewId())}},
endUpdateHTML:function(){if(this.sign){if(this.rendered&&this.enableAnim){var a=this.owner;b(a.newViewCreated,n,a)}this.rendered||this.fire("primed",null,1);this.rendered=!0;this.fire("rendered");l()}},wrapMxEvent:function(a){return a?(""+a).replace(j,' mx-owner="'+this.vfId+'"$&'):a},setViewHTML:function(a){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=this.wrapMxEvent(a);this.endUpdateHTML()},observeLocation:function(a){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;var d=c.keys;
if(h.isObject(a))c.pn=a.pathname,a=a.keys;if(a)c.keys=d.concat(h.isString(a)?a.split(","):a)},olChanged:function(a){var c=this.$ol;if(c){var d=0;c.pn&&(d=a.isPathname());d||(d=a.isParam(c.keys));return d}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),c=null;if(a&&a.viewUsable)c=a.view;return c},planTmpl:function(a){var c=this,d=h.tmpl(c.path);if(void 0===d){var d=o.debug,
f=c.home+c.path.replace(q,"")+".html";c.fetchTmpl(f,function(d){c.template=h.tmpl(c.path,d);a()},d)}else c.template=d,a()},processEvent:function(a){if(this.enableEvent&&this.sign){var c=a.se,d=a.info.match(v),f=d[1],l=d[2],d=d[3],e=this.events;if(e){var g=e[c.type];if(u[l])u[l](c);if(g&&g[f]){var i={};d&&d.replace(w,function(a,c,d){i[c]=d});b(g[f],m({view:this,currentId:a.cId,targetId:a.tId,domEvent:c,events:e,params:i},u),g)}}}},delegateEvents:function(c){var d=this.events,c=c?a.detachEvent:a.attachEvent,
f;for(f in d)c.call(a,f)}});h.mix(k,g,{prototype:!0});h.mix(k.prototype,g.prototype);return k},{requires:["magix/impl/view","magix/magix","magix/event","magix/body"]});
KISSY.add("magix/vom",function(k,g,h,i,a){var b=h.has,e=0,n=0,o=0,q=0,m={},f,c=h.mix({all:function(){return m},add:function(a){if(!b(m,a.id))e++,m[a.id]=a,a.owner=c,c.fire("add",{vframe:a})},get:function(a){return m[a]},remove:function(a){var f=m[a];f&&(e--,f.fcc&&n--,delete m[a],c.fire("remove",{vframe:f}))},childCreated:function(){if(!q){n++;var a=n/e;o<a&&(c.fire("progress",{percent:o=a}),1==a&&(q=1,c.un("progress")))}},root:function(){return g.root(c)},remountRoot:function(a){var b=c.root();f=
a.location;b.mountView(f.view)},locationChanged:function(a){f=a.location;c.root().locationChanged(f,a.changed)},locationUpdated:function(a){f=a;c.root().locationUpdated(a)},getLocation:function(){return f}},i);a.VOM=c;a.on("event",function(a){var f=c.get(a.hld);(f=f&&f.view)&&f.processEvent(a)});return c},{requires:["magix/vframe","magix/magix","magix/event","magix/body"]});
KISSY.add("mxext/mmanager",function(k,g){var h=g.has,i=g.safeExec,a=function(a){g.isArray(a)||(a=[a]);for(var c=0,d;c<a.length;c++)d=a[c],delete d.cacheKey;return a},b=function(a){this.$modelClass=a;this.$modelsCache=g.createCache();this.$modelsCacheKeys={}},e=[].slice,n={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},o=function(a){var c={},d;for(d in a)n[d]||(c[d]=a[d]);return c},q=function(a,c){var d=e.call(arguments,2);return function(){return a.apply(c,d.concat(e.call(arguments)))}};
g.mix(b,{create:function(a){if(!a)throw Error("MManager.create modelClass ungiven");return new b(a)}});var m=function(a){this.$host=a;this.$task=!1};g.mix(m.prototype,{fetchModels:function(a,c,d){var b=this;if(b.$task)return b.next(function(b){b.fetchModels(a,c,error,d)}),b;b.$task=!0;var e=b.$host;if(!b.$reqModels)b.$reqModels={};var n=e.$modelsCache,o=e.$modelsCacheKeys,m=b.$reqModels;g.isArray(a)||(a=[a]);var p=a.length,r=0,s,x,D=Array(p),y=[],A={},z=[],E=k.isArray(c);E&&(y=Array(c.length));for(var C=
function(a,f,e,g){if(!b.$destroy){r++;delete m[e.id];var j=e._cacheKey;D[a]=e;if(f)x=!0,s=g||s,A[a]=g;else{j&&!n.get(j)&&n.set(j,e);var q=e.metaParams;e._doneAt=k.now();var t=e._context;t&&i(t.after,[e].concat(q),t)}if(2==d)(q=E?c[a]:c)&&(y[a]=i(q,[e,f?{msg:g}:null,x?A:null],b));else if(4==d){z[a]={m:e,e:f,s:g};for(a=z.i||0;q=z[a];a++)if(t=E?c[a]:c,y[a]=i(t,[q.m,q.e?{msg:q.s}:null,z.e?A:null,y],b),q.e)A[a]=q.s,z.e=1;z.i=a}j&&h(o,j)&&(a=o[j],delete o[j],i(a,[f,e,g],e));if(r>=p)A.msg=s,f=x?A:null,1==
d?(D.push(f),y[0]=i(c,D,b),y[1]=f):y.push(f),b.$ntId=setTimeout(function(){b.$task=!1;b.doNext(y)},30)}},B=0,t;B<a.length;B++)if(t=a[B]){var G;G=e.getModel(t);var F=G.cacheKey;F&&h(o,F)?o[F].push(q(C,b,B)):(t=G.entity,G.needUpdate?(m[t.id]=t,F&&(o[F]=[]),t.request({success:q(C,t,B,!1,t),error:q(C,t,B,!0,t)})):C(B,!1,t))}else throw Error("miss attrs:"+a);return b},fetchAll:function(a,c){return this.fetchModels(a,c,1)},saveAll:function(b,c){b=a(b);return this.fetchModels(b,c,1)},fetchOrder:function(a,
c){var d=e.call(arguments,1);return this.fetchModels(a,1<d.length?d:c,4)},saveOrder:function(b,c){var b=a(b),d=e.call(arguments,1);return this.fetchModels(b,1<d.length?d:c,4)},saveOne:function(b,c){var b=a(b),d=e.call(arguments,1);return this.reqModels(b,1<d.length?d:c,2)},fetchOne:function(a,c){var d=e.call(arguments,1);return this.fetchModels(a,1<d.length?d:c,2)},abort:function(){clearTimeout(this.$ntId);var a=this.$reqModels,c=this.$host.$modelsCacheKeys;if(a)for(var d in a){var b=a[d],e=b._cacheKey;
if(e&&h(c,e)){var g=c[e];delete c[e];i(g,[!0,b,"aborted"],b)}b.abort()}this.$reqModels={};this.$queue=[];this.$task=!1},next:function(a){if(!this.$queue)this.$queue=[];this.$queue.push(a);this.$task||this.doNext.apply(this,[this].concat(this.$latest||[]));return this},doNext:function(a){var c=this.$queue;c&&(c=c.shift())&&i(c,[this].concat(a),this);this.$latest=a},destroy:function(){this.$destroy=!0;this.abort()}});g.mix(b.prototype,{registerModels:function(a){g.isArray(a)||(a=[a]);for(var c=0,d;c<
a.length;c++){d=a[c];if(!d.name)throw Error("model must own a name attribute");this[d.name]=d}},registerMethods:function(a){var c=this,d;for(d in a)h(a,d)&&(c[d]=function(a){return function(){for(var d,b=arguments,f=[],e=0,h;e<b.length;e++)h=b[e],g.isFunction(h)?f.push(function(a){return function(){d||a.apply(a,arguments)}}(h)):f.push(h);var n=a.apply(c,f);return{abort:function(){n&&n.abort&&i(n.abort,["aborted"],n);d=!0}}}}(a[d]))},createModel:function(a){var c=this.getModelMeta(a),d=new this.$modelClass(o(c)),
b=a;b.before||(b=c);var e=a.metaParams||[];k.isFunction(b.before)&&i(b.before,[d].concat(e),b);b=a;b.after||(b=c);if(b.after)d._context=b;d._cacheKey=a.cacheKey||c.cacheKey;d._meta=c;d.set(o(a));d.setUrlParams(c.urlParams);d.setPostParams(c.postParams);d.setUrlParams(a.urlParams);d.setPostParams(a.postParams);d.metaParams=e;return d},getModelMeta:function(a){var c=this[a.name];if(!c)throw Error("Not found:"+a.name);return c},getModel:function(a){var c=this.getModelFromCache(a),d;c||(d=!0,c=this.createModel(a));
return{entity:c,cacheKey:c._cacheKey,needUpdate:d}},saveAll:function(a,c){return(new m(this)).saveAll(a,c)},fetchAll:function(a,c){return(new m(this)).fetchAll(a,c)},saveOrder:function(a,c){var d=new m(this);return d.saveOrder.apply(d,arguments)},fetchOrder:function(a,c){var d=new m(this);return d.fetchOrder.apply(d,arguments)},saveOne:function(a,c){var d=new m(this);return d.saveOne.apply(d,arguments)},fetchOne:function(a,c){var d=new m(this);return d.fetchOne.apply(d,arguments)},clearCacheByKey:function(a){var c=
this.$modelsCache;k.isString(a)&&c.del(a)},clearCacheByName:function(a){for(var c=this.$modelsCache.c,d=0;d<c.length;d++){var b=c[d];b.v&&b.v._meta.name==a&&delete c[b.k]}},getModelUrl:function(a){return this.$modelClass.prototype.url((k.isString(a)?this[a]:a).uri)},getModelFromCache:function(a){var c=this.$modelsCache,d=null,b;if(k.isString(a))b=a;else{var e=this.getModelMeta(a);b=a.cacheKey||e.cacheKey}if(b&&(d=c.get(b))){if(!e)e=d._meta;a=a.cacheTime||e.cacheTime||0;0<a&&k.now()-d._doneAt>a&&(this.clearCacheByKey(b),
d=null)}return d}});return b},{requires:["magix/magix"]});
KISSY.add("mxext/model",function(k,g){var h=function(a,b,e){for(var i in b)k.isObject(b[i])?(g.has(a,i)||(a[i]={}),h(a[i],b[i],!0)):e&&(a[i]=b[i])},i=function(a){a&&this.set(a);this.id=k.guid("m")};g.mix(i,{GET:"GET",POST:"POST",extend:function(a,b){var e=function(){e.superclass.constructor.apply(this,arguments);b&&g.safeExec(b,[],this)};g.mix(e,this,{prototype:!0});h(a,this.prototype);return k.extend(e,this,a)}});g.mix(i.prototype,{urlMap:{},sync:g.noop,parse:function(a){return a},getParamsObject:function(a){if(!a)a=
i.GET;return this["$"+a]||null},getUrlParamsObject:function(){return this.getParamsObject(i.GET)},getPostParamsObject:function(){return this.getParamsObject(i.POST)},getPostParams:function(){return this.getParams(i.POST)},getUrlParams:function(){return this.getParams(i.GET)},getParams:function(a){var a=a?a.toUpperCase():i.GET,a=this["$"+a],b=[],e;if(a)for(var g in a)if(e=a[g],k.isArray(e))for(var h=0;h<e.length;h++)b.push(g+"="+encodeURIComponent(e[h]));else b.push(g+"="+encodeURIComponent(e));return b.join("&")},
setUrlParamsIf:function(a,b){this.setParams(a,b,i.GET,!0)},setPostParamsIf:function(a,b){this.setParams(a,b,i.POST,!0)},setParams:function(a,b,e,g){e=e?e.toUpperCase():i.GET;if(!this.$keysCache)this.$keysCache={};this.$keysCache[e]=!0;e="$"+e;this[e]||(this[e]={});if(k.isObject(a))for(var h in a){if(!g||!this[e][h])this[e][h]=a[h]}else if(a&&(!g||!this[e][a]))this[e][a]=b},setPostParams:function(a,b){this.setParams(a,b,i.POST)},setUrlParams:function(a,b){this.setParams(a,b,i.GET)},removeParamsObject:function(a){if(!a)a=
i.GET;delete this["$"+a]},removePostParamsObject:function(){this.removeParamsObject(i.POST)},removeUrlParamsObject:function(){this.removeParamsObject(i.GET)},reset:function(){var a=this.$keysCache;if(a){for(var b in a)g.has(a,b)&&delete this["$"+b];delete this.$keysCache}a=this.$keys;b=this.$attrs;if(a){for(var e=0;e<a.length;e++)delete b[a[e]];delete this.$keys}},url:function(a){var a=a||this.get("uri"),b;if(a){b=a.split(":");var e=this.urlMap;if(e)for(var g=0,i=b.length;g<i&&!(e=e[b[g]],void 0===
e);g++)g==i-1&&(a=e)}else throw Error("model not set uri");return a},get:function(a){var b=this.$attrs;return b?b[a]:null},set:function(a,b,e){if(!this.$attrs)this.$attrs={};if(e&&!this.$keys)this.$keys=[];if(k.isObject(a))for(var g in a)e&&this.$keys.push(g),this.$attrs[g]=a[g];else a&&(e&&this.$keys.push(a),this.$attrs[a]=b)},load:function(a){this.request(a)},save:function(a){this.request(a)},request:function(a){a||(a={});var b=a.success,e=a.error,g=this;g.$abort=!1;a.success=function(a){if(!g.$abort){if(a){var e=
g.parse(a);e&&(k.isArray(e)&&(e={list:e}),g.set(e,null,!0))}b&&b.apply(this,arguments)}};a.error=function(){g.$abort||e&&e.apply(this,arguments)};g.$trans=g.sync(a)},abort:function(){this.$trans&&this.$trans.abort&&this.$trans.abort();delete this.$trans;this.$abort=!0},isAborted:function(){return this.$abort},beginTransaction:function(){this.$bakAttrs=k.clone(this.$attrs)},rollbackTransaction:function(){var a=this.$bakAttrs;if(a)this.$attrs=a,delete this.$bakAttrs},endTransaction:function(){delete this.$bakAttrs}});
return i},{requires:["magix/magix"]});
KISSY.add("mxext/modelfactory",function(k,g){var h=function(a){this.$modelClass=a},i=function(a){if(a._wraped_)return a;var b=function(b){var i=b.success,h=this;h.get("~~ui")?(b.success=function(){h.set("~~ui",!1);h._after&&g.safeExec(h._after,h);i&&i.apply(b)},a.call(h,b)):i&&i.apply(b)};b._wraped_=!0;return b};g.mix(h,{mClsCache:{},create:function(a,b){if(!b)throw Error("Factory.create modelClass ungiven");var e=this.mClsCache;a||(a=k.guid());e[a]||(e[a]=new h(b));return e[a]}});g.mix(h.prototype,
{registerModels:function(a){g.isArray(a)||(a=[a]);for(var b=0,e;b<a.length;b++){e=a[b];if(!e.type)throw Error("model must own a type attribute");this[e.type]=e}},registerMethods:function(a){for(var b in a)g.hasProp(a,b)&&(this[b]=a[b])},callMethods:function(a,b,e){for(var g=[],i="",h=a.length,m=0,f,c=function(a,c,d){f||(m++,d?i=a:g[c]=a,h<=m&&(i?k.isFunction(e)&&e(i):k.isFunction(b)&&b.apply(b,g)))},d=function(a,d){return function(b){c(b,a,!d)}},l=0,j;l<a.length;l++){j=a[l];var u;if(u=k.isFunction(j.name)?
j.name:this[j.name]){if(!j.params)j.params=[];j.params.push(d(l,!0),d(l));u.apply(this,j.params)}else c("unfound:"+j.name,l,!0)}return{abort:function(){f=!0}}},fetchModels:function(a,b,e,i){var h=this;if(!h.$modelsCache)h.$modelsCache={};if(!h.$modelsCacheKeys)h.$modelsCacheKeys={};var q=h.$modelsCache,m=h.$modelsCacheKeys;g.isArray(a)||(a=[a]);for(var f=a.length,c=0,d,l=[],j=[],u,v=function(a,j,p,r){c++;if(j)d=r||"fetch data error";else{u=!0;p.set("~~ui",!1);l[a]=p;if((a=p._cacheKey)&&!g.hasProp(q,
a))q[p._cacheKey]=p,a=p._params,p._doneAt=k.now(),p._after&&g.safeExec(p._after,[p].concat(a));4==i&&b(p)}if((a=p._cacheKey)&&g.hasProp(m,a)){var v=m[a];delete m[a];g.safeExec(v,[j,p,r],p)}4!=i&&c>=f&&(2==i?u?b&&b.apply(h,l):e&&e(d):d?e&&e(d):b&&b.apply(h,l))},w=Array.prototype.slice,p=function(a,c){var d=w.call(arguments,2);return function(){return a.apply(c,d.concat(w.call(arguments)))}},r=0,s;r<a.length;r++){s=a[r];var x=s.cacheKey;x&&g.hasProp(m,x)?m[x].push(p(v,h,r)):(s=h.create(s,!0),s.get("~~ui")?
(j.push(s),x&&(m[x]=[]),s.request({success:p(v,s,r,!1,s),error:p(v,s,r,!0,s)})):v(r,!1,s))}return{abort:function(){for(var a=0,c;a<j.length;a++){c=j[a];var d=c._cacheKey;if(d&&g.hasProp(m,d)){var b=m[d];delete m[d];g.safeExec(b,[!0,c,"abort"],c)}c.abort()}}}},fetchAll:function(a,b,e){return this.fetchModels(a,b,e,1)},fetchAny:function(a,b,e){return this.fetchModels(a,b,e,2)},fetchOne:function(a,b){return this.fetchModels(a,b,g.noop,4)},getIf:function(a){var b=this.$modelsCache;return b&&g.hasProp(b,
a)?b[a]:null},setUpdateIdent:function(a){(a=this.getIf(a))&&a.set("~~ui",!0)},create:function(a,b){if(!a.type)throw Error('model must own a "type" attribute');var e=a.type,h=a.cacheKey||e.cacheKey,o,q=a.expires||e.expires||0;if(!this.$modelsCache)this.$modelsCache={};var m=this.$modelsCache,f=a.params||[];if(h&&g.hasProp(m,h)){o=m[h];var c=o.get("~~ui");!c&&0<q&&k.now()-o._doneAt>q&&(c=!0);c&&(delete m[h],o.set("~~ui",!0))}else o=new this.$modelClass(e.ops),o._after=e.after,o._cacheKey=h,o.set("~~ui",
!0);o._params=f;if(c=o.get("~~ui"))o.reset(),o.set(a.ops),o.setParams(e.gets),o.setPostParams(e.posts),o.setParams(a.gets),o.setPostParams(a.posts),g.isFunction(e.before)&&g.safeExec(e.before,[o].concat(f),e);if(!b)o.request=i(o.request);return o}});return h},{requires:["magix/magix"]});
KISSY.add("mxext/view",function(k,g,h,i){var a=window,b="destroy,abort,stop,cancel,remove".split(","),e=0,n=g.safeExec,o=g.has,q={},m=function(a){if(!m.d)m.d=1,a.on("add",function(a){var a=a.vframe,c=q[a.id];if(c){for(var b=0;b<c.length;b++)f(a,c[b]);delete q[a.id]}}),a.on("remove",function(a){delete q[a.vframe.id]}),a.root().on("childrenCreated",function(){q={}})},f=function(a,b){var e=a.view;if(e&&a.viewUsable)n(e.receiveMessage,b,e);else{var f=function(e){a.un("viewInteract",f);n(e.view.receiveMessage,
b,e.view)};a.on("viewInteract",f)}};return h.extend({mxViewCtor:g.noop,navigate:function(a){i.navigate.apply(i,arguments)},manage:function(a,b){var f=!0;1==arguments.length&&(b=a,a="res_"+e++,f=!1);if(!this.$resCache)this.$resCache={};this.$resCache[a]={hasKey:f,res:b};return b},getManaged:function(a){var b=this.$resCache;return b&&o(b,a)?b[a].res:null},removeManaged:function(a){var b=null,e=this.$resCache;if(e)if(o(e,a))b=e[a].res,delete e[a];else for(var f in e)if(e[f].res===a){b=e[f].res;delete e[f];
break}return b},destroyManaged:function(c){var d=this.$resCache;if(d){for(var e in d){var f=d[e],h=f.res;if(g.isNumber(h))a.clearTimeout(h),a.clearInterval(h);else if(h)if(h.nodeType&&h.parentNode)k.one(h).remove();else for(var i=0;i<b.length;i++)g.isFunction(h[b[i]])&&n(h[b[i]],[],h);c&&!f.hasKey&&delete d[e]}c||delete this.$resCache}},receiveMessage:g.noop,postMessageTo:function(a,b){var e=this.vom;m(e);g.isArray(a)||(a=[a]);b||(b={});for(var h=0,i;h<a.length;h++){i=a[h];var k=e.get(i);k?f(k,b):
(q[i]||(q[i]=[]),q[i].push(b))}},destroyMRequest:function(){var a=this.$resCache;if(a)for(var b in a){var e=a[b].res;e&&e.fetchOne&&e.fetchAll&&(e.destroy(),delete a[b])}}},function(){var a=this;a.on("interact",function(){a.on("rendercall",function(){a.destroyMRequest()});a.on("prerender",function(){a.destroyManaged(!0)});a.on("destroy",function(){a.destroyManaged()})});a.mxViewCtor()})},{requires:["magix/magix","magix/view","magix/router"]});
(function(k){var g=function(){};if(!k.console)k.console={log:g,info:g,error:g};var h,i={};if(!k.Magix)k.Magix={config:function(a){for(var b in a)i[b]=a[b]},start:function(a){h=a}},KISSY.use("magix/magix",function(a,b){k.Magix=b;b.config(i);h&&b.start(h)})})(this);