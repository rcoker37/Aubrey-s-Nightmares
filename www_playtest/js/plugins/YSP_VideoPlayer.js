/*:
 * @plugindesc v1.0.0 Plugin used for playing video.
 * @author Dr.Yami
 *
 * @help
 * Use script call:
 *   ysp.VideoPlayer.loadVideo(videoName) - Preload Video
 *   ysp.VideoPlayer.releaseVideo(videoName) - Release memory for a Video
 *   ysp.VideoPlayer.newVideo(videoName, id) - Create new Video object with id
 *   ysp.VideoPlayer.playVideoById(id) - Play a Video object by id
 *   ysp.VideoPlayer.stopVideoById(id) - Stop a Video object by id
 *   ysp.VideoPlayer.setLoopById(id) - Make a Video object playing loop by id
 *   ysp.VideoPlayer.getVideoById(id) - Get Video object by id
 *   ysp.VideoPlayer.isReady() - Check if all videos have been loaded
 *
 * Video Object is a PIXI.Sprite object, can be re-position by modifying x and y props
 * To preload a (or many) video(s), use loadVideo(videoName) followed by a loop in
 * an event, break the loop when isReady() returns true
 */

!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=35)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(11)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(10),o=n(15);t.exports=n(1)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(28),o=n(12);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},,function(t,e,n){var r=n(6),o=n(24),u=n(25),i=Object.defineProperty;e.f=n(1)?Object.defineProperty:function(t,e,n){if(r(t),e=u(e,!0),r(n),o)try{return i(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(17)("keys"),o=n(18);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(3),o=n(0).document,u=r(o)&&r(o.createElement);t.exports=function(t){return u?o.createElement(t):{}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},,function(t,e,n){var r=n(0),o=n(5),u=n(22),i=n(2),c=function(t,e,n){var f,a,s,p=t&c.F,l=t&c.G,d=t&c.S,v=t&c.P,y=t&c.B,x=t&c.W,h=l?o:o[e]||(o[e]={}),_=h.prototype,b=l?r:d?r[e]:(r[e]||{}).prototype;l&&(n=e);for(f in n)(a=!p&&b&&void 0!==b[f])&&f in h||(s=a?b[f]:n[f],h[f]=l&&"function"!=typeof b[f]?n[f]:y&&a?u(s,r):x&&b[f]==s?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(s):v&&"function"==typeof s?u(Function.call,s):s,v&&((h.virtual||(h.virtual={}))[f]=s,t&c.R&&_&&!_[f]&&i(_,f,s)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e,n){var r=n(23);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports=!n(1)&&!n(11)(function(){return 7!=Object.defineProperty(n(14)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(27),o=n(19);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(7),o=n(4),u=n(29)(!1),i=n(13)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),f=0,a=[];for(n in c)n!=i&&r(c,n)&&a.push(n);for(;e.length>f;)r(c,n=e[f++])&&(~u(a,n)||a.push(n));return a}},function(t,e,n){var r=n(16);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(4),o=n(30),u=n(31);t.exports=function(t){return function(e,n,i){var c,f=r(e),a=o(f.length),s=u(i,a);if(t&&n!=n){for(;a>s;)if((c=f[s++])!=c)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===n)return t||s||0;return!t&&-1}}},function(t,e,n){var r=n(8),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(8),o=Math.max,u=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):u(t,e)}},,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(36),u=r(o);(0,r(n(42)).default)(Spriteset_Base),window.ysp=window.ysp||{},window.ysp.VideoPlayer=u.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(37),o=function(t){return t&&t.__esModule?t:{default:t}}(r),u={},i={},c=function(t){if(u[t])return u[t];var e=PIXI.Texture.fromVideo("movies/"+t);return e.baseTexture.autoPlay=!1,u[t]=e,e},f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"video",n=new PIXI.Sprite(c(t));return n.update=function(){n.texture.update()},i[e]=n,n},a=function(t){SceneManager._scene._spriteset.addVideo(t),t.texture.baseTexture.source.play()},s=function(t){var e=x(t);a(e)},p=function(t){SceneManager._scene._spriteset.removeVideo(t),t.texture.baseTexture.source.pause()},l=function(t){var e=x(t);p(e),delete i[t]},d=function(t){t.texture.baseTexture.source.loop=!0},v=function(t){var e=x(t);d(e)},y=function(t){delete u[t]},x=function(t){return i[t]},h=function(){return!(0,o.default)(u).some(function(t){return!t.baseTexture.hasLoaded})},z=function(){return i};e.default={newVideo:f,loadVideo:c,playVideo:a,playVideoById:s,stopVideoById:l,setLoopById:v,releaseVideo:y,getVideoById:x,isReady:h,getVideoMap:z}},function(t,e,n){t.exports={default:n(38),__esModule:!0}},function(t,e,n){n(39),t.exports=n(5).Object.values},function(t,e,n){var r=n(21),o=n(40)(!1);r(r.S,"Object",{values:function(t){return o(t)}})},function(t,e,n){var r=n(26),o=n(4),u=n(41).f;t.exports=function(t){return function(e){for(var n,i=o(e),c=r(i),f=c.length,a=0,s=[];f>a;)u.call(i,n=c[a++])&&s.push(t?[n,i[n]]:i[n]);return s}}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.prototype.createUpperLayer;t.prototype.createUpperLayer=function(){this.createVideos(),e.call(this)},t.prototype.createVideos=function(){this._videosContainer=new Sprite,this.addChild(this._videosContainer)},t.prototype.addVideo=function(t){this._videosContainer.addChild(t)},t.prototype.removeVideo=function(t){this._videosContainer.removeChild(t)}}}]);
//# sourceMappingURL=YSP_VideoPlayer.js.map