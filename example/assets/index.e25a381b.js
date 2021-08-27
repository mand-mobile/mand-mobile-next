var e=Object.defineProperty,t=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,i,s)=>i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s;import{B as r}from"./core.esm.e5e53058.js";import{m as o,k as n,u as l,j as h,y as p,J as g,M as c,N as d,B as u,K as f,d as y,o as v,c as P,f as x,n as m,F as X,h as Y,l as T}from"./vendor.cf144a98.js";
/*!
 * better-scroll / slide
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */function M(e){console.error("[BScroll warn]: "+e)}var w="undefined"!=typeof window,C=w&&navigator.userAgent.toLowerCase();C&&/wechatdevtools/.test(C),C&&C.indexOf("android"),function(){if("string"==typeof C){var e=/os (\d\d?_\d(_\d)?)/.exec(C);if(!e)return!1;var t=e[1].split("_").map((function(e){return parseInt(e,10)}));return!!(13===t[0]&&t[1]>=4)}}();if(w){try{var L={};Object.defineProperty(L,"passive",{get:function(){!0}}),window.addEventListener("test-passive",(function(){}),L)}catch(_){}}var S=function(e,t){for(var i in t)e[i]=t[i];return e};function I(e,t,i){return e<t?t:e>i?i:e}var k=w&&document.createElement("div").style,b=function(){if(!w)return!1;for(var e=0,t=[{key:"standard",value:"transform"},{key:"webkit",value:"webkitTransform"},{key:"Moz",value:"MozTransform"},{key:"O",value:"OTransform"},{key:"ms",value:"msTransform"}];e<t.length;e++){var i=t[e];if(void 0!==k[i.value])return i.key}return!1}();function O(e){return!1===b?e:"standard"===b?"transitionEnd"===e?"transitionend":e:b+e.charAt(0).toUpperCase()+e.substr(1)}b&&"standard"!==b&&b.toLowerCase();O("transform"),O("transition");w&&O("perspective"),O("transitionTimingFunction"),O("transitionDuration"),O("transitionDelay"),O("transformOrigin"),O("transitionEnd"),O("transitionProperty");var H={swipe:{style:"cubic-bezier(0.23, 1, 0.32, 1)",fn:function(e){return 1+--e*e*e*e*e}},swipeBounce:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(e){return e*(2-e)}},bounce:{style:"cubic-bezier(0.165, 0.84, 0.44, 1)",fn:function(e){return 1- --e*e*e*e}}},B=function(){function e(e){this.scroll=e,this.init()}return e.prototype.init=function(){var e=this.scroll.scroller,t=e.scrollBehaviorX,i=e.scrollBehaviorY;this.wrapperWidth=t.wrapperSize,this.wrapperHeight=i.wrapperSize,this.scrollerHeight=i.contentSize,this.scrollerWidth=t.contentSize,this.pages=this.buildPagesMatrix(this.wrapperWidth,this.wrapperHeight),this.pageLengthOfX=this.pages?this.pages.length:0,this.pageLengthOfY=this.pages&&this.pages[0]?this.pages[0].length:0},e.prototype.getPageStats=function(e,t){return this.pages[e][t]},e.prototype.getNearestPageIndex=function(e,t){for(var i=0,s=0,a=this.pages.length;i<a-1&&!(e>=this.pages[i][0].cx);i++);for(a=this.pages[i].length;s<a-1&&!(t>=this.pages[0][s].cy);s++);return{pageX:i,pageY:s}},e.prototype.buildPagesMatrix=function(e,t){var i,s,a,r,o=[],n=0,l=0,h=this.scroll.scroller.scrollBehaviorX.maxScrollPos,p=this.scroll.scroller.scrollBehaviorY.maxScrollPos;for(s=Math.round(e/2),a=Math.round(t/2);n>-this.scrollerWidth;){for(o[l]=[],r=0,i=0;i>-this.scrollerHeight;)o[l][r]={x:Math.max(n,h),y:Math.max(i,p),width:e,height:t,cx:n-s,cy:i-a},i-=t,r++;n-=e,l++}return o},e}(),E={pageX:0,pageY:0,x:0,y:0},D=function(){function e(e,t){this.scroll=e,this.slideOptions=t,this.slideX=!1,this.slideY=!1,this.currentPage=S({},E)}return e.prototype.refresh=function(){this.pagesMatrix=new B(this.scroll),this.checkSlideLoop(),this.currentPage=this.getAdjustedCurrentPage()},e.prototype.getAdjustedCurrentPage=function(){var e=this.currentPage,t=e.pageX,i=e.pageY;t=Math.min(t,this.pagesMatrix.pageLengthOfX-1),i=Math.min(i,this.pagesMatrix.pageLengthOfY-1),this.loopX&&(t=Math.min(t,this.pagesMatrix.pageLengthOfX-2)),this.loopY&&(i=Math.min(i,this.pagesMatrix.pageLengthOfY-2));var s=this.pagesMatrix.getPageStats(t,i);return{pageX:t,pageY:i,x:s.x,y:s.y}},e.prototype.setCurrentPage=function(e){this.currentPage=e},e.prototype.getInternalPage=function(e,t){e>=this.pagesMatrix.pageLengthOfX?e=this.pagesMatrix.pageLengthOfX-1:e<0&&(e=0),t>=this.pagesMatrix.pageLengthOfY?t=this.pagesMatrix.pageLengthOfY-1:t<0&&(t=0);var i=this.pagesMatrix.getPageStats(e,t);return{pageX:e,pageY:t,x:i.x,y:i.y}},e.prototype.getInitialPage=function(e,t){void 0===e&&(e=!1),void 0===t&&(t=!1);var i=this.slideOptions,s=i.startPageXIndex,a=i.startPageYIndex,r=this.loopX?1:0,o=this.loopY?1:0,n=e?r:this.currentPage.pageX,l=e?o:this.currentPage.pageY;t?(n=this.loopX?s+1:s,l=this.loopY?a+1:a):(n=e?r:this.currentPage.pageX,l=e?o:this.currentPage.pageY);var h=this.pagesMatrix.getPageStats(n,l);return{pageX:n,pageY:l,x:h.x,y:h.y}},e.prototype.getExposedPage=function(e){var t=S({},e);return this.loopX&&(t.pageX=this.fixedPage(t.pageX,this.pagesMatrix.pageLengthOfX-2)),this.loopY&&(t.pageY=this.fixedPage(t.pageY,this.pagesMatrix.pageLengthOfY-2)),t},e.prototype.getExposedPageByPageIndex=function(e,t){var i={pageX:e,pageY:t};this.loopX&&(i.pageX=e+1),this.loopY&&(i.pageY=t+1);var s=this.pagesMatrix.getPageStats(i.pageX,i.pageY);return{x:s.x,y:s.y,pageX:e,pageY:t}},e.prototype.getWillChangedPage=function(e){return e=S({},e),this.loopX&&(e.pageX=this.fixedPage(e.pageX,this.pagesMatrix.pageLengthOfX-2),e.x=this.pagesMatrix.getPageStats(e.pageX+1,0).x),this.loopY&&(e.pageY=this.fixedPage(e.pageY,this.pagesMatrix.pageLengthOfY-2),e.y=this.pagesMatrix.getPageStats(0,e.pageY+1).y),e},e.prototype.fixedPage=function(e,t){for(var i=[],s=0;s<t;s++)i.push(s);return i.unshift(t-1),i.push(0),i[e]},e.prototype.getPageStats=function(){return this.pagesMatrix.getPageStats(this.currentPage.pageX,this.currentPage.pageY)},e.prototype.getValidPageIndex=function(e,t){var i=this.pagesMatrix.pageLengthOfX-1,s=this.pagesMatrix.pageLengthOfY-1,a=0,r=0;return this.loopX&&(e+=1,a+=1,i-=1),this.loopY&&(t+=1,r+=1,s-=1),{pageX:e=I(e,a,i),pageY:t=I(t,r,s)}},e.prototype.nextPageIndex=function(){return this.getPageIndexByDirection("positive")},e.prototype.prevPageIndex=function(){return this.getPageIndexByDirection("negative")},e.prototype.getNearestPage=function(e,t){var i=this.pagesMatrix.getNearestPageIndex(e,t),s=i.pageX,a=i.pageY;return{x:this.pagesMatrix.getPageStats(s,0).x,y:this.pagesMatrix.getPageStats(0,a).y,pageX:s,pageY:a}},e.prototype.getPageByDirection=function(e,t,i){var s=e.pageX,a=e.pageY;return s===this.currentPage.pageX&&(s=I(s+t,0,this.pagesMatrix.pageLengthOfX-1)),a===this.currentPage.pageY&&(a=I(a+i,0,this.pagesMatrix.pageLengthOfY-1)),{x:this.pagesMatrix.getPageStats(s,0).x,y:this.pagesMatrix.getPageStats(0,a).y,pageX:s,pageY:a}},e.prototype.resetLoopPage=function(){if(this.loopX){if(0===this.currentPage.pageX)return{pageX:this.pagesMatrix.pageLengthOfX-2,pageY:this.currentPage.pageY};if(this.currentPage.pageX===this.pagesMatrix.pageLengthOfX-1)return{pageX:1,pageY:this.currentPage.pageY}}if(this.loopY){if(0===this.currentPage.pageY)return{pageX:this.currentPage.pageX,pageY:this.pagesMatrix.pageLengthOfY-2};if(this.currentPage.pageY===this.pagesMatrix.pageLengthOfY-1)return{pageX:this.currentPage.pageX,pageY:1}}},e.prototype.getPageIndexByDirection=function(e){var t=this.currentPage.pageX,i=this.currentPage.pageY;return this.slideX&&(t="negative"===e?t-1:t+1),this.slideY&&(i="negative"===e?i-1:i+1),{pageX:t,pageY:i}},e.prototype.checkSlideLoop=function(){this.wannaLoop=this.slideOptions.loop,this.pagesMatrix.pageLengthOfX>1?this.slideX=!0:this.slideX=!1,this.pagesMatrix.pages[0]&&this.pagesMatrix.pageLengthOfY>1?this.slideY=!0:this.slideY=!1,this.loopX=this.wannaLoop&&this.slideX,this.loopY=this.wannaLoop&&this.slideY,this.slideX&&this.slideY&&M("slide does not support two direction at the same time.")},e}(),z=[{key:"next",name:"next"},{key:"prev",name:"prev"},{key:"goToPage",name:"goToPage"},{key:"getCurrentPage",name:"getCurrentPage"},{key:"startPlay",name:"startPlay"},{key:"pausePlay",name:"pausePlay"}].map((function(e){return{key:e.key,sourceKey:"plugins.slide."+e.name}})),W=function(){function e(e){this.scroll=e,this.cachedClonedPageDOM=[],this.resetLooping=!1,this.autoplayTimer=0,this.satisfyInitialization()&&this.init()}return e.prototype.satisfyInitialization=function(){return!(this.scroll.scroller.content.children.length<=0)||(M("slide need at least one slide page to be initialised.please check your DOM layout."),!1)},e.prototype.init=function(){this.willChangeToPage=S({},E),this.handleBScroll(),this.handleOptions(),this.handleHooks(),this.createPages()},e.prototype.createPages=function(){this.pages=new D(this.scroll,this.options)},e.prototype.handleBScroll=function(){this.scroll.registerType(["slideWillChange","slidePageChanged"]),this.scroll.proxy(z)},e.prototype.handleOptions=function(){var e=!0===this.scroll.options.slide?{}:this.scroll.options.slide,t={loop:!0,threshold:.1,speed:400,easing:H.bounce,listenFlick:!0,autoplay:!0,interval:3e3,startPageXIndex:0,startPageYIndex:0};this.options=S(t,e)},e.prototype.handleLoop=function(e){var t=this.options.loop,i=this.scroll.scroller.content,s=i.children.length;t&&(i!==e?(this.resetLoopChangedStatus(),this.removeClonedSlidePage(e),s>1&&this.cloneFirstAndLastSlidePage(i)):3===s&&this.initialised?(this.removeClonedSlidePage(i),this.moreToOnePageInLoop=!0,this.oneToMorePagesInLoop=!1):s>1?(this.initialised&&0===this.cachedClonedPageDOM.length?(this.oneToMorePagesInLoop=!0,this.moreToOnePageInLoop=!1):(this.removeClonedSlidePage(i),this.resetLoopChangedStatus()),this.cloneFirstAndLastSlidePage(i)):this.resetLoopChangedStatus())},e.prototype.resetLoopChangedStatus=function(){this.moreToOnePageInLoop=!1,this.oneToMorePagesInLoop=!1},e.prototype.handleHooks=function(){var e=this,t=this.scroll.hooks,i=this.scroll.scroller.hooks,s=this.options.listenFlick;this.prevContent=this.scroll.scroller.content,this.hooksFn=[],this.registerHooks(this.scroll,this.scroll.eventTypes.beforeScrollStart,this.pausePlay),this.registerHooks(this.scroll,this.scroll.eventTypes.scrollEnd,this.modifyCurrentPage),this.registerHooks(this.scroll,this.scroll.eventTypes.scrollEnd,this.startPlay),this.scroll.eventTypes.mousewheelMove&&(this.registerHooks(this.scroll,this.scroll.eventTypes.mousewheelMove,(function(){return!0})),this.registerHooks(this.scroll,this.scroll.eventTypes.mousewheelEnd,(function(t){1!==t.directionX&&1!==t.directionY||e.next(),-1!==t.directionX&&-1!==t.directionY||e.prev()}))),this.registerHooks(t,t.eventTypes.refresh,this.refreshHandler),this.registerHooks(t,t.eventTypes.destroy,this.destroy),this.registerHooks(i,i.eventTypes.beforeRefresh,(function(){e.handleLoop(e.prevContent),e.setSlideInlineStyle()})),this.registerHooks(i,i.eventTypes.momentum,this.modifyScrollMetaHandler),this.registerHooks(i,i.eventTypes.scroll,this.scrollHandler),this.registerHooks(i,i.eventTypes.checkClick,this.startPlay),s&&this.registerHooks(i,i.eventTypes.flick,this.flickHandler)},e.prototype.startPlay=function(){var e=this,t=this.options,i=t.interval;t.autoplay&&(clearTimeout(this.autoplayTimer),this.autoplayTimer=window.setTimeout((function(){e.next()}),i))},e.prototype.pausePlay=function(){this.options.autoplay&&clearTimeout(this.autoplayTimer)},e.prototype.setSlideInlineStyle=function(){var e=this.scroll.scroller,t=e.content,i=e.wrapper,s=this.scroll.options;[{direction:"scrollX",sizeType:"offsetWidth",styleType:"width"},{direction:"scrollY",sizeType:"offsetHeight",styleType:"height"}].forEach((function(e){var a=e.direction,r=e.sizeType,o=e.styleType;if(s[a]){for(var n=i[r],l=t.children,h=l.length,p=0;p<h;p++){l[p].style[o]=n+"px"}t.style[o]=n*h+"px"}}))},e.prototype.next=function(e,t){var i=this.pages.nextPageIndex(),s=i.pageX,a=i.pageY;this.goTo(s,a,e,t)},e.prototype.prev=function(e,t){var i=this.pages.prevPageIndex(),s=i.pageX,a=i.pageY;this.goTo(s,a,e,t)},e.prototype.goToPage=function(e,t,i,s){var a=this.pages.getValidPageIndex(e,t);this.goTo(a.pageX,a.pageY,i,s)},e.prototype.getCurrentPage=function(){return this.exposedPage||this.pages.getInitialPage(!1,!0)},e.prototype.setCurrentPage=function(e){this.pages.setCurrentPage(e),this.exposedPage=this.pages.getExposedPage(e)},e.prototype.nearestPage=function(e,t){var i=this.scroll.scroller,s=i.scrollBehaviorX,a=i.scrollBehaviorY,r=s.maxScrollPos,o=s.minScrollPos,n=a.maxScrollPos,l=a.minScrollPos;return this.pages.getNearestPage(I(e,r,o),I(t,n,l))},e.prototype.satisfyThreshold=function(e,t){var i=this.scroll.scroller,s=i.scrollBehaviorX,a=i.scrollBehaviorY,r=!0;return Math.abs(e-s.absStartPos)<=this.thresholdX&&Math.abs(t-a.absStartPos)<=this.thresholdY&&(r=!1),r},e.prototype.refreshHandler=function(e){var t=this;if(this.satisfyInitialization()){this.pages.refresh(),this.computeThreshold();var i=this.contentChanged=this.prevContent!==e;i&&(this.prevContent=e);var s=this.pages.getInitialPage(this.oneToMorePagesInLoop||this.moreToOnePageInLoop,i||!this.initialised);this.initialised?this.goTo(s.pageX,s.pageY,0):this.registerHooks(this.scroll.hooks,this.scroll.hooks.eventTypes.beforeInitialScrollTo,(function(e){t.initialised=!0,e.x=s.x,e.y=s.y})),this.startPlay()}},e.prototype.computeThreshold=function(){var e=this.options.threshold;if(e%1==0)this.thresholdX=e,this.thresholdY=e;else{var t=this.pages.getPageStats(),i=t.width,s=t.height;this.thresholdX=Math.round(i*e),this.thresholdY=Math.round(s*e)}},e.prototype.cloneFirstAndLastSlidePage=function(e){var t,i,s,a=e.children,r=a[a.length-1].cloneNode(!0),o=a[0].cloneNode(!0);t=r,(s=(i=e).firstChild)?function(e,t){t.parentNode.insertBefore(e,t)}(t,s):i.appendChild(t),e.appendChild(o),this.cachedClonedPageDOM=[r,o]},e.prototype.removeClonedSlidePage=function(e){(e&&e.children||[]).length&&this.cachedClonedPageDOM.forEach((function(t){!function(e,t){e.removeChild(t)}(e,t)})),this.cachedClonedPageDOM=[]},e.prototype.modifyCurrentPage=function(e){var t=this.getCurrentPage(),i=t.pageX,s=t.pageY,a=this.nearestPage(e.x,e.y);if(this.setCurrentPage(a),this.contentChanged)return this.contentChanged=!1,!0;var r=this.getCurrentPage(),o=r.pageX,n=r.pageY;if(this.pageWillChangeTo(a),this.oneToMorePagesInLoop)return this.oneToMorePagesInLoop=!1,!0;if(this.moreToOnePageInLoop&&0===i&&0===s)return this.moreToOnePageInLoop=!1,!0;if(i!==o||s!==n){var l=this.pages.getExposedPageByPageIndex(o,n);this.scroll.trigger(this.scroll.eventTypes.slidePageChanged,l)}if(!this.resetLooping){var h=this.pages.resetLoopPage();return h?(this.resetLooping=!0,this.goTo(h.pageX,h.pageY,0),!0):void 0}this.resetLooping=!1},e.prototype.goTo=function(e,t,i,s){var a=this.pages.getInternalPage(e,t),r=s||this.options.easing||H.bounce,o=a.x,n=a.y,l=o-this.scroll.scroller.scrollBehaviorX.currentPos,h=n-this.scroll.scroller.scrollBehaviorY.currentPos;l||h?(i=void 0===i?this.getEaseTime(l,h):i,this.scroll.scroller.scrollTo(o,n,i,r)):this.scroll.scroller.togglePointerEvents(!0)},e.prototype.flickHandler=function(){var e=this.scroll.scroller,t=e.scrollBehaviorX,i=e.scrollBehaviorY,s=t.currentPos,a=t.startPos,r=t.direction,o=i.currentPos,n=i.startPos,l=i.direction,h=this.pages.currentPage,p=h.pageX,g=h.pageY,c=this.getEaseTime(s-a,o-n);this.goTo(p+r,g+l,c)},e.prototype.getEaseTime=function(e,t){return this.options.speed||Math.max(Math.max(Math.min(Math.abs(e),1e3),Math.min(Math.abs(t),1e3)),300)},e.prototype.modifyScrollMetaHandler=function(e){var t=this.scroll.scroller,i=t.scrollBehaviorX,s=t.scrollBehaviorY,a=t.animater,r=e.newX,o=e.newY,n=this.satisfyThreshold(r,o)||a.forceStopped?this.pages.getPageByDirection(this.nearestPage(r,o),i.direction,s.direction):this.pages.currentPage;e.time=this.getEaseTime(e.newX-n.x,e.newY-n.y),e.newX=n.x,e.newY=n.y,e.easing=this.options.easing||H.bounce},e.prototype.scrollHandler=function(e){var t=e.x,i=e.y;if(this.satisfyThreshold(t,i)){var s=this.nearestPage(t,i);this.pageWillChangeTo(s)}},e.prototype.pageWillChangeTo=function(e){var t,i,s=this.pages.getWillChangedPage(e);t=this.willChangeToPage,i=s,(t.pageX!==i.pageX||t.pageY!==i.pageY)&&(this.willChangeToPage=s,this.scroll.trigger(this.scroll.eventTypes.slideWillChange,this.willChangeToPage))},e.prototype.registerHooks=function(e,t,i){e.on(t,i,this),this.hooksFn.push([e,t,i])},e.prototype.destroy=function(){var e=this.scroll.scroller.content,t=this.options,i=t.loop,s=t.autoplay;i&&this.removeClonedSlidePage(e),s&&clearTimeout(this.autoplayTimer),this.hooksFn.forEach((function(e){var t=e[0],i=e[1],s=e[2];t.eventTypes[i]&&t.off(i,s)})),this.hooksFn.length=0},e.pluginName="slide",e}();class F{constructor(e,t){this.isPrevent=!0,this.draging=!1,this.$el=e,this.startX=0,this.startY=0,this.position=t,this.dragHandler=e=>this.onDrag(e),this.startHandler=e=>this.onDragStart(e),this.endHandler=e=>this.onDragEnd(e),this.initEvent()}initEvent(){this.$el.addEventListener("touchstart",this.startHandler),this.$el.addEventListener("touchmove",this.dragHandler),this.$el.addEventListener("touchend",this.endHandler)}onDragStart(e){this.draging=!0,this.position&&(this.position.draging=!0),this.preventHandler(e),this.startX=e.touches[0].pageX,this.startY=e.touches[0].pageY}onDrag(e){this.draging=!0,this.position&&(this.position.draging=!0),this.preventHandler(e),e.touches[0]&&this.position&&(this.position.x=e.touches[0].pageX,this.position.y=e.touches[0].pageY)}onDragEnd(e){this.draging=!1,this.position&&(this.position.draging=!1),this.preventHandler(e),this.position&&(this.position.deltaX=this.position.x-this.startX)}preventHandler(e){this.isPrevent&&(e.preventDefault(),e.stopPropagation())}destory(){this.$el.removeEventListener("touchstart",this.startHandler),this.$el.removeEventListener("touchmove",this.dragHandler),this.$el.removeEventListener("touchend",this.endHandler)}}const N={autoplay:{type:Number,default:3e3,validator:e=>0===e||e>=500},transition:{type:String,default:"slide",validator:e=>["slide","slideY","fade"].includes(e)},defaultIndex:{type:Number,default:0,validator:e=>e>-1},hasDots:{type:Boolean,default:!0},isPrevent:{type:Boolean,default:!0},isLoop:{type:Boolean,default:!0},dragable:{type:Boolean,default:!0}};function j(e,o){return r.use(W),new r(e,((e,r)=>{for(var o in r||(r={}))i.call(r,o)&&a(e,o,r[o]);if(t)for(var o of t(r))s.call(r,o)&&a(e,o,r[o]);return e})({bounce:!1,deceleration:.1,probeType:3,momentum:!1},o))}const $=(e,{emit:t,slots:i})=>{let s=null;const a=o(null),r=n((()=>"slideY"===e.transition)),y=n((()=>{var e,t;return(null==(t=null==(e=i.default)?void 0:e.call(i)[0].children)?void 0:t.length)||0})),v=o(e.defaultIndex),P=e=>{v.value=e},x=()=>{a.value&&!s&&(s=j(a.value,{scrollX:!r.value,scrollY:r.value,slide:{threshold:100,autoplay:0!==e.autoplay,interval:e.autoplay,startPageXIndex:r.value?0:e.defaultIndex,startPageYIndex:r.value?e.defaultIndex:0,loop:e.isLoop},click:!e.isPrevent,disableTouch:!e.dragable,disableMouse:!e.dragable})),null==s||s.on("slidePageChanged",(e=>{const i=l(r)?e.pageY:e.pageX;t("afterChange",v.value,i),P(i)})),null==s||s.on("slideWillChange",(e=>{const i=l(r)?e.pageY:e.pageX;t("beforeChange",v.value,i),P(i)}))};let m=null;h((()=>{var i;const s=null==(i=a.value)?void 0:i.getBoundingClientRect();"fade"!==e.transition&&(null==s?void 0:s.width)&&s.height&&x(),"fade"===e.transition&&a.value&&(m=function(e,t,i,s){var a,r,o;const n=d(),l=400,h=c({x:0,y:0,deltaX:0,draging:!1}),g=f(),y=null==(r=(null==(a=null==g?void 0:g.proxy)?void 0:a.$el).querySelector(".md-swiper-container"))?void 0:r.children,v=null==(o=null==y?void 0:y[0])?void 0:o.getBoundingClientRect(),P=Array.from(y||[]);e.style.height=(null==v?void 0:v.height)?(null==v?void 0:v.height)+"px":"0px",P[0].style.opacity="1";const x=new F(e,h);let m;p((()=>x.destory())),n.run((()=>{u((()=>h.deltaX),(e=>{const i=e<0;Math.abs(e)>((null==v?void 0:v.width)||0)/5&&(t.value=i?t.value+1:t.value-1,-1===t.value&&(t.value=P.length-1),t.value===P.length&&(t.value=0))})),u(t,((e,t)=>{P.forEach((e=>{e.style.transition=`opacity ${l}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,e.style.opacity="0",e.style.zIndex="0",e.ontransitionend=null,e.ontransitionstart=null}));const i=P[e];i.style.opacity="1",i.style.zIndex="1",i.ontransitionstart=function(){s("beforeChange",t,e)},i.ontransitionend=function(){s("afterChange",t,e)}})),u((()=>h.draging),(e=>{e?stop():Y()}))}));const X=()=>{m&&clearTimeout(m),m=null},Y=()=>{i.autoplay>500&&P.length>1&&(X(),m=globalThis.setInterval((()=>{t.value=t.value+1,i.isLoop||t.value!==P.length-1?(-1===t.value&&(t.value=P.length-1),t.value===P.length&&(t.value=0)):T()}),i.autoplay+l))},T=()=>{X()};return Y(),p((()=>{T(),n.stop()})),h}(a.value,v,e,t))})),p((()=>{null==s||s.destroy()})),g("swiper",c({currentIndex:v}));const X=()=>s;return{wrapRef:a,renderSwiper:x,resetSwiper:()=>{s&&(s.destroy(),s=null,x())},indicatorCount:y,currentIndex:v,isVertical:r,getSwiperInstance:X,goto:(e,t)=>{var i;return null==(i=X())?void 0:i.goToPage(e,t)},prev:()=>{var e;return null==(e=X())?void 0:e.prev()},next:()=>{var e;return null==(e=X())?void 0:e.next()},startPlay:()=>{var t;"fade"===e.transition?m&&(m.draging=!1):null==(t=X())||t.startPlay()},stop:()=>{var t;"fade"===e.transition?m&&(m.draging=!0):null==(t=X())||t.pausePlay()},getIndex:()=>v.value}};var A=y({name:"MdSwiper",props:N,emits:["beforeChange","afterChange"],setup(e,t){const{indicatorCount:i,wrapRef:s,renderSwiper:a,resetSwiper:r,currentIndex:o,getSwiperInstance:n,isVertical:l,goto:h,next:p,prev:g,getIndex:c,startPlay:d,stop:u}=$(e,t);return{indicatorCount:i,currentIndex:o,wrapper:s,renderSwiper:a,resetSwiper:r,getSwiperInstance:n,isVertical:l,goto:h,next:p,prev:g,getIndex:c,startPlay:d,stop:u}}});const V={ref:"wrapper",class:"md-swiper-box"},R={class:"md-swiper-container"};A.render=function(e,t,i,s,a,r){return v(),P("div",{class:["md-swiper",{"md-swiper-vertical":e.isVertical,"md-swiper-fade":"fade"===e.transition}]},[x("div",V,[x("div",R,[m(e.$slots,"default")])],512),e.indicatorCount>1&&e.hasDots?(v(),P("div",{key:0,class:["md-swiper-indicators",{disabled:!e.hasDots}]},[(v(!0),P(X,null,Y(e.indicatorCount,(t=>(v(),P("div",{key:t,class:["md-swiper-indicator",{"md-swiper-indicator-active":t-1===e.currentIndex}]},null,2)))),128))],2)):T("",!0)],2)},A.install=e=>{e.component(A.name,A)};export{F as D,A as _};