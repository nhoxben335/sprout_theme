/*!
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.3
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(t,e){"use strict";var n;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!FastClick.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],r=this,i=0,a=o.length;i<a;i++)r[o[i]]=function(t,e){return function(){return t.apply(e,arguments)}}(r[o[i]],r);deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,o):r.call(t,e,n,o)},t.addEventListener=function(e,n,o){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):r.call(t,e,n,o)}),"function"==typeof t.onclick&&(n=t.onclick,t.addEventListener("click",function(t){n(t)},!1),t.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;/*!
 * Currency tools
 *
 * Copyright (c) 2014 Caroline Schnapp (mllegeorgesand@gmail.com)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(FastClick.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},FastClick.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},FastClick.prototype.sendClick=function(t,e){"use strict";var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},FastClick.prototype.determineEventType=function(t){"use strict";return deviceIsAndroid&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(t){"use strict";var e;deviceIsIOS&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},FastClick.prototype.updateScrollParent=function(t){"use strict";var e,n;if(!(e=t.fastClickScrollParent)||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},FastClick.prototype.onTouchStart=function(t){"use strict";var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],deviceIsIOS){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!deviceIsIOS4){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},FastClick.prototype.onTouchMove=function(t){"use strict";return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},FastClick.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(t){"use strict";var e,n,o,r,i,a=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(i=t.changedTouches[0],a=document.elementFromPoint(i.pageX-window.pageXOffset,i.pageY-window.pageYOffset)||a,a.fastClickScrollParent=this.targetElement.fastClickScrollParent),"label"===(o=a.tagName.toLowerCase())){if(e=this.findControl(a)){if(this.focus(a),deviceIsAndroid)return!1;a=e}}else if(this.needsFocus(a))return t.timeStamp-n>100||deviceIsIOS&&window.top!==window&&"input"===o?(this.targetElement=null,!1):(this.focus(a),this.sendClick(a,t),deviceIsIOS&&"select"===o||(this.targetElement=null,t.preventDefault()),!1);return!(!deviceIsIOS||deviceIsIOS4||!(r=a.fastClickScrollParent)||r.fastClickLastScrollTop===r.scrollTop)||(this.needsClick(a)||(t.preventDefault(),this.sendClick(a,t)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(t){"use strict";return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},FastClick.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},FastClick.prototype.destroy=function(){"use strict";var t=this.layer;deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(t){"use strict";var e,n,o;if(void 0===window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(o=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),o[1]>=10&&o[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction},FastClick.attach=function(t,e){"use strict";return new FastClick(t,e)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick,/*!
 *  jQuery OwlCarousel v1.3.2
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */
"function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),function(t,e,n){var o={init:function(e,n){var o=this;o.$elem=t(n),o.options=t.extend({},t.fn.owlCarousel.options,o.$elem.data(),e),o.userOptions=e,o.loadContent()},loadContent:function(){function e(t){var e,n="";if("function"==typeof o.options.jsonSuccess)o.options.jsonSuccess.apply(this,[t]);else{for(e in t.owl)t.owl.hasOwnProperty(e)&&(n+=t.owl[e].item);o.$elem.html(n)}o.logIn()}var n,o=this;"function"==typeof o.options.beforeInit&&o.options.beforeInit.apply(this,[o.$elem]),"string"==typeof o.options.jsonPath?(n=o.options.jsonPath,t.getJSON(n,e)):o.logIn()},logIn:function(){var t=this;t.$elem.data("owl-originalStyles",t.$elem.attr("style")).data("owl-originalClasses",t.$elem.attr("class")),t.$elem.css({opacity:0}),t.orignalItems=t.options.items,t.checkBrowser(),t.wrapperWidth=0,t.checkVisible=null,t.setVars()},setVars:function(){var t=this;if(0===t.$elem.children().length)return!1;t.baseClass(),t.eventTypes(),t.$userItems=t.$elem.children(),t.itemsAmount=t.$userItems.length,t.wrapItems(),t.$owlItems=t.$elem.find(".owl-item"),t.$owlWrapper=t.$elem.find(".owl-wrapper"),t.playDirection="next",t.prevItem=0,t.prevArr=[0],t.currentItem=0,t.customEvents(),t.onStartup()},onStartup:function(){var t=this;t.updateItems(),t.calculateAll(),t.buildControls(),t.updateControls(),t.response(),t.moveEvents(),t.stopOnHover(),t.owlStatus(),!1!==t.options.transitionStyle&&t.transitionTypes(t.options.transitionStyle),!0===t.options.autoPlay&&(t.options.autoPlay=5e3),t.play(),t.$elem.find(".owl-wrapper").css("display","block"),t.$elem.is(":visible")?t.$elem.css("opacity",1):t.watchVisibility(),t.onstartup=!1,t.eachMoveUpdate(),"function"==typeof t.options.afterInit&&t.options.afterInit.apply(this,[t.$elem])},eachMoveUpdate:function(){var t=this;!0===t.options.lazyLoad&&t.lazyLoad(),!0===t.options.autoHeight&&t.autoHeight(),t.onVisibleItems(),"function"==typeof t.options.afterAction&&t.options.afterAction.apply(this,[t.$elem])},updateVars:function(){var t=this;"function"==typeof t.options.beforeUpdate&&t.options.beforeUpdate.apply(this,[t.$elem]),t.watchVisibility(),t.updateItems(),t.calculateAll(),t.updatePosition(),t.updateControls(),t.eachMoveUpdate(),"function"==typeof t.options.afterUpdate&&t.options.afterUpdate.apply(this,[t.$elem])},reload:function(){var t=this;e.setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var t=this;if(!1!==t.$elem.is(":visible"))return!1;t.$elem.css({opacity:0}),e.clearInterval(t.autoPlayInterval),e.clearInterval(t.checkVisible),t.checkVisible=e.setInterval(function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),e.clearInterval(t.checkVisible))},500)},wrapItems:function(){var t=this;t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),t.wrapperOuter=t.$elem.find(".owl-wrapper-outer"),t.$elem.css("display","block")},baseClass:function(){var t=this,e=t.$elem.hasClass(t.options.baseClass),n=t.$elem.hasClass(t.options.theme);e||t.$elem.addClass(t.options.baseClass),n||t.$elem.addClass(t.options.theme)},updateItems:function(){var e,n,o=this;if(!1===o.options.responsive)return!1;if(!0===o.options.singleItem)return o.options.items=o.orignalItems=1,o.options.itemsCustom=!1,o.options.itemsDesktop=!1,o.options.itemsDesktopSmall=!1,o.options.itemsTablet=!1,o.options.itemsTabletSmall=!1,o.options.itemsMobile=!1,!1;if(e=t(o.options.responsiveBaseWidth).width(),e>(o.options.itemsDesktop[0]||o.orignalItems)&&(o.options.items=o.orignalItems),!1!==o.options.itemsCustom)for(o.options.itemsCustom.sort(function(t,e){return t[0]-e[0]}),n=0;n<o.options.itemsCustom.length;n+=1)o.options.itemsCustom[n][0]<=e&&(o.options.items=o.options.itemsCustom[n][1]);else e<=o.options.itemsDesktop[0]&&!1!==o.options.itemsDesktop&&(o.options.items=o.options.itemsDesktop[1]),e<=o.options.itemsDesktopSmall[0]&&!1!==o.options.itemsDesktopSmall&&(o.options.items=o.options.itemsDesktopSmall[1]),e<=o.options.itemsTablet[0]&&!1!==o.options.itemsTablet&&(o.options.items=o.options.itemsTablet[1]),e<=o.options.itemsTabletSmall[0]&&!1!==o.options.itemsTabletSmall&&(o.options.items=o.options.itemsTabletSmall[1]),e<=o.options.itemsMobile[0]&&!1!==o.options.itemsMobile&&(o.options.items=o.options.itemsMobile[1]);o.options.items>o.itemsAmount&&!0===o.options.itemsScaleUp&&(o.options.items=o.itemsAmount)},response:function(){var n,o,r=this;if(!0!==r.options.responsive)return!1;o=t(e).width(),r.resizer=function(){t(e).width()!==o&&(!1!==r.options.autoPlay&&e.clearInterval(r.autoPlayInterval),e.clearTimeout(n),n=e.setTimeout(function(){o=t(e).width(),r.updateVars()},r.options.responsiveRefreshRate))},t(e).resize(r.resizer)},updatePosition:function(){var t=this;t.jumpTo(t.currentItem),!1!==t.options.autoPlay&&t.checkAp()},appendItemsSizes:function(){var e=this,n=0,o=e.itemsAmount-e.options.items;e.$owlItems.each(function(r){var i=t(this);i.css({width:e.itemWidth}).data("owl-item",Number(r)),r%e.options.items!=0&&r!==o||r>o||(n+=1),i.data("owl-roundPages",n)})},appendWrapperSizes:function(){var t=this,e=t.$owlItems.length*t.itemWidth;t.$owlWrapper.css({width:2*e,left:0}),t.appendItemsSizes()},calculateAll:function(){var t=this;t.calculateWidth(),t.appendWrapperSizes(),t.loops(),t.max()},calculateWidth:function(){var t=this;t.itemWidth=Math.round(t.$elem.width()/t.options.items)},max:function(){var t=this,e=-1*(t.itemsAmount*t.itemWidth-t.options.items*t.itemWidth);return t.options.items>t.itemsAmount?(t.maximumItem=0,e=0,t.maximumPixels=0):(t.maximumItem=t.itemsAmount-t.options.items,t.maximumPixels=e),e},min:function(){return 0},loops:function(){var e,n,o,r=this,i=0,a=0;for(r.positionsInArray=[0],r.pagesInArray=[],e=0;e<r.itemsAmount;e+=1)a+=r.itemWidth,r.positionsInArray.push(-a),!0===r.options.scrollPerPage&&(n=t(r.$owlItems[e]),(o=n.data("owl-roundPages"))!==i&&(r.pagesInArray[i]=r.positionsInArray[e],i=o))},buildControls:function(){var e=this;!0!==e.options.navigation&&!0!==e.options.pagination||(e.owlControls=t('<div class="owl-controls"/>').toggleClass("clickable",!e.browser.isTouch).appendTo(e.$elem)),!0===e.options.pagination&&e.buildPagination(),!0===e.options.navigation&&e.buildButtons()},buildButtons:function(){var e=this,n=t('<div class="owl-buttons"/>');e.owlControls.append(n),e.buttonPrev=t("<div/>",{class:"owl-prev",html:e.options.navigationText[0]||""}),e.buttonNext=t("<div/>",{class:"owl-next",html:e.options.navigationText[1]||""}),n.append(e.buttonPrev).append(e.buttonNext),n.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(t){t.preventDefault()}),n.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(n){n.preventDefault(),t(this).hasClass("owl-next")?e.next():e.prev()})},buildPagination:function(){var e=this;e.paginationWrapper=t('<div class="owl-pagination"/>'),e.owlControls.append(e.paginationWrapper),e.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(n){n.preventDefault(),Number(t(this).data("owl-page"))!==e.currentItem&&e.goTo(Number(t(this).data("owl-page")),!0)})},updatePagination:function(){var e,n,o,r,i,a,s=this;if(!1===s.options.pagination)return!1;for(s.paginationWrapper.html(""),e=0,n=s.itemsAmount-s.itemsAmount%s.options.items,r=0;r<s.itemsAmount;r+=1)r%s.options.items==0&&(e+=1,n===r&&(o=s.itemsAmount-s.options.items),i=t("<div/>",{class:"owl-page"}),a=t("<span></span>",{text:!0===s.options.paginationNumbers?e:"",class:!0===s.options.paginationNumbers?"owl-numbers":""}),i.append(a),i.data("owl-page",n===r?o:r),i.data("owl-roundPages",e),s.paginationWrapper.append(i));s.checkPagination()},checkPagination:function(){var e=this;if(!1===e.options.pagination)return!1;e.paginationWrapper.find(".owl-page").each(function(){t(this).data("owl-roundPages")===t(e.$owlItems[e.currentItem]).data("owl-roundPages")&&(e.paginationWrapper.find(".owl-page").removeClass("active"),t(this).addClass("active"))})},checkNavigation:function(){var t=this;if(!1===t.options.navigation)return!1;!1===t.options.rewindNav&&(0===t.currentItem&&0===t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.addClass("disabled")):0===t.currentItem&&0!==t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.removeClass("disabled")):t.currentItem===t.maximumItem?(t.buttonPrev.removeClass("disabled"),t.buttonNext.addClass("disabled")):0!==t.currentItem&&t.currentItem!==t.maximumItem&&(t.buttonPrev.removeClass("disabled"),t.buttonNext.removeClass("disabled")))},updateControls:function(){var t=this;t.updatePagination(),t.checkNavigation(),t.owlControls&&(t.options.items>=t.itemsAmount?t.owlControls.hide():t.owlControls.show())},destroyControls:function(){var t=this;t.owlControls&&t.owlControls.remove()},next:function(t){var e=this;if(e.isTransition)return!1;if(e.currentItem+=!0===e.options.scrollPerPage?e.options.items:1,e.currentItem>e.maximumItem+(!0===e.options.scrollPerPage?e.options.items-1:0)){if(!0!==e.options.rewindNav)return e.currentItem=e.maximumItem,!1;e.currentItem=0,t="rewind"}e.goTo(e.currentItem,t)},prev:function(t){var e=this;if(e.isTransition)return!1;if(!0===e.options.scrollPerPage&&e.currentItem>0&&e.currentItem<e.options.items?e.currentItem=0:e.currentItem-=!0===e.options.scrollPerPage?e.options.items:1,e.currentItem<0){if(!0!==e.options.rewindNav)return e.currentItem=0,!1;e.currentItem=e.maximumItem,t="rewind"}e.goTo(e.currentItem,t)},goTo:function(t,n,o){var r,i=this;return!i.isTransition&&("function"==typeof i.options.beforeMove&&i.options.beforeMove.apply(this,[i.$elem]),t>=i.maximumItem?t=i.maximumItem:t<=0&&(t=0),i.currentItem=i.owl.currentItem=t,!1!==i.options.transitionStyle&&"drag"!==o&&1===i.options.items&&!0===i.browser.support3d?(i.swapSpeed(0),!0===i.browser.support3d?i.transition3d(i.positionsInArray[t]):i.css2slide(i.positionsInArray[t],1),i.afterGo(),i.singleItemTransition(),!1):(r=i.positionsInArray[t],!0===i.browser.support3d?(i.isCss3Finish=!1,!0===n?(i.swapSpeed("paginationSpeed"),e.setTimeout(function(){i.isCss3Finish=!0},i.options.paginationSpeed)):"rewind"===n?(i.swapSpeed(i.options.rewindSpeed),e.setTimeout(function(){i.isCss3Finish=!0},i.options.rewindSpeed)):(i.swapSpeed("slideSpeed"),e.setTimeout(function(){i.isCss3Finish=!0},i.options.slideSpeed)),i.transition3d(r)):!0===n?i.css2slide(r,i.options.paginationSpeed):"rewind"===n?i.css2slide(r,i.options.rewindSpeed):i.css2slide(r,i.options.slideSpeed),void i.afterGo()))},jumpTo:function(t){var e=this;"function"==typeof e.options.beforeMove&&e.options.beforeMove.apply(this,[e.$elem]),t>=e.maximumItem||-1===t?t=e.maximumItem:t<=0&&(t=0),e.swapSpeed(0),!0===e.browser.support3d?e.transition3d(e.positionsInArray[t]):e.css2slide(e.positionsInArray[t],1),e.currentItem=e.owl.currentItem=t,e.afterGo()},afterGo:function(){var t=this;t.prevArr.push(t.currentItem),t.prevItem=t.owl.prevItem=t.prevArr[t.prevArr.length-2],t.prevArr.shift(0),t.prevItem!==t.currentItem&&(t.checkPagination(),t.checkNavigation(),t.eachMoveUpdate(),!1!==t.options.autoPlay&&t.checkAp()),"function"==typeof t.options.afterMove&&t.prevItem!==t.currentItem&&t.options.afterMove.apply(this,[t.$elem])},stop:function(){var t=this;t.apStatus="stop",e.clearInterval(t.autoPlayInterval)},checkAp:function(){var t=this;"stop"!==t.apStatus&&t.play()},play:function(){var t=this;if(t.apStatus="play",!1===t.options.autoPlay)return!1;e.clearInterval(t.autoPlayInterval),t.autoPlayInterval=e.setInterval(function(){t.next(!0)},t.options.autoPlay)},swapSpeed:function(t){var e=this;"slideSpeed"===t?e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)):"paginationSpeed"===t?e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)):"string"!=typeof t&&e.$owlWrapper.css(e.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){var e=this;e.$owlWrapper.css(e.doTranslate(t))},css2move:function(t){this.$owlWrapper.css({left:t})},css2slide:function(t,e){var n=this;n.isCssFinish=!1,n.$owlWrapper.stop(!0,!0).animate({left:t},{duration:e||n.options.slideSpeed,complete:function(){n.isCssFinish=!0}})},checkBrowser:function(){var t,o,r,i,a=this,s="translate3d(0px, 0px, 0px)",u=n.createElement("div");u.style.cssText="  -moz-transform:"+s+"; -ms-transform:"+s+"; -o-transform:"+s+"; -webkit-transform:"+s+"; transform:"+s,t=/translate3d\(0px, 0px, 0px\)/g,o=u.style.cssText.match(t),r=null!==o&&1===o.length,i="ontouchstart"in e||e.navigator.msMaxTouchPoints,a.browser={support3d:r,isTouch:i}},moveEvents:function(){var t=this;!1===t.options.mouseDrag&&!1===t.options.touchDrag||(t.gestures(),t.disabledEvents())},eventTypes:function(){var t=this,e=["s","e","x"];t.ev_types={},!0===t.options.mouseDrag&&!0===t.options.touchDrag?e=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===t.options.mouseDrag&&!0===t.options.touchDrag?e=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===t.options.mouseDrag&&!1===t.options.touchDrag&&(e=["mousedown.owl","mousemove.owl","mouseup.owl"]),t.ev_types.start=e[0],t.ev_types.move=e[1],t.ev_types.end=e[2]},disabledEvents:function(){var e=this;e.$elem.on("dragstart.owl",function(t){t.preventDefault()}),e.$elem.on("mousedown.disableTextSelect",function(e){return t(e.target).is("input, textarea, select, option")})},gestures:function(){function o(t){if(void 0!==t.touches)return{x:t.touches[0].pageX,y:t.touches[0].pageY};if(void 0===t.touches){if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY};if(void 0===t.pageX)return{x:t.clientX,y:t.clientY}}}function r(e){"on"===e?(t(n).on(u.ev_types.move,a),t(n).on(u.ev_types.end,s)):"off"===e&&(t(n).off(u.ev_types.move),t(n).off(u.ev_types.end))}function i(n){var i,a=n.originalEvent||n||e.event;if(3===a.which)return!1;if(!(u.itemsAmount<=u.options.items)){if(!1===u.isCssFinish&&!u.options.dragBeforeAnimFinish)return!1;if(!1===u.isCss3Finish&&!u.options.dragBeforeAnimFinish)return!1;!1!==u.options.autoPlay&&e.clearInterval(u.autoPlayInterval),!0===u.browser.isTouch||u.$owlWrapper.hasClass("grabbing")||u.$owlWrapper.addClass("grabbing"),u.newPosX=0,u.newRelativeX=0,t(this).css(u.removeTransition()),i=t(this).position(),l.relativePos=i.left,l.offsetX=o(a).x-i.left,l.offsetY=o(a).y-i.top,r("on"),l.sliding=!1,l.targetElement=a.target||a.srcElement}}function a(r){var i,a,s=r.originalEvent||r||e.event;u.newPosX=o(s).x-l.offsetX,u.newPosY=o(s).y-l.offsetY,u.newRelativeX=u.newPosX-l.relativePos,"function"==typeof u.options.startDragging&&!0!==l.dragging&&0!==u.newRelativeX&&(l.dragging=!0,u.options.startDragging.apply(u,[u.$elem])),(u.newRelativeX>8||u.newRelativeX<-8)&&!0===u.browser.isTouch&&(void 0!==s.preventDefault?s.preventDefault():s.returnValue=!1,l.sliding=!0),(u.newPosY>10||u.newPosY<-10)&&!1===l.sliding&&t(n).off("touchmove.owl"),i=function(){return u.newRelativeX/5},a=function(){return u.maximumPixels+u.newRelativeX/5},u.newPosX=Math.max(Math.min(u.newPosX,i()),a()),!0===u.browser.support3d?u.transition3d(u.newPosX):u.css2move(u.newPosX)}function s(n){var o,i,a,s=n.originalEvent||n||e.event;s.target=s.target||s.srcElement,l.dragging=!1,!0!==u.browser.isTouch&&u.$owlWrapper.removeClass("grabbing"),u.newRelativeX<0?u.dragDirection=u.owl.dragDirection="left":u.dragDirection=u.owl.dragDirection="right",0!==u.newRelativeX&&(o=u.getNewPosition(),u.goTo(o,!1,"drag"),l.targetElement===s.target&&!0!==u.browser.isTouch&&(t(s.target).on("click.disable",function(e){e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),t(e.target).off("click.disable")}),i=t._data(s.target,"events").click,a=i.pop(),i.splice(0,0,a))),r("off")}var u=this,l={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};u.isCssFinish=!0,u.$elem.on(u.ev_types.start,".owl-wrapper",i)},getNewPosition:function(){var t=this,e=t.closestItem();return e>t.maximumItem?(t.currentItem=t.maximumItem,e=t.maximumItem):t.newPosX>=0&&(e=0,t.currentItem=0),e},closestItem:function(){var e=this,n=!0===e.options.scrollPerPage?e.pagesInArray:e.positionsInArray,o=e.newPosX,r=null;return t.each(n,function(i,a){o-e.itemWidth/20>n[i+1]&&o-e.itemWidth/20<a&&"left"===e.moveDirection()?(r=a,!0===e.options.scrollPerPage?e.currentItem=t.inArray(r,e.positionsInArray):e.currentItem=i):o+e.itemWidth/20<a&&o+e.itemWidth/20>(n[i+1]||n[i]-e.itemWidth)&&"right"===e.moveDirection()&&(!0===e.options.scrollPerPage?(r=n[i+1]||n[n.length-1],e.currentItem=t.inArray(r,e.positionsInArray)):(r=n[i+1],e.currentItem=i+1))}),e.currentItem},moveDirection:function(){var t,e=this;return e.newRelativeX<0?(t="right",e.playDirection="next"):(t="left",e.playDirection="prev"),t},customEvents:function(){var t=this;t.$elem.on("owl.next",function(){t.next()}),t.$elem.on("owl.prev",function(){t.prev()}),t.$elem.on("owl.play",function(e,n){t.options.autoPlay=n,t.play(),t.hoverStatus="play"}),t.$elem.on("owl.stop",function(){t.stop(),t.hoverStatus="stop"}),t.$elem.on("owl.goTo",function(e,n){t.goTo(n)}),t.$elem.on("owl.jumpTo",function(e,n){t.jumpTo(n)})},stopOnHover:function(){var t=this;!0===t.options.stopOnHover&&!0!==t.browser.isTouch&&!1!==t.options.autoPlay&&(t.$elem.on("mouseover",function(){t.stop()}),t.$elem.on("mouseout",function(){"stop"!==t.hoverStatus&&t.play()}))},lazyLoad:function(){var e,n,o,r,i=this;if(!1===i.options.lazyLoad)return!1;for(e=0;e<i.itemsAmount;e+=1)n=t(i.$owlItems[e]),"loaded"!==n.data("owl-loaded")&&(o=n.data("owl-item"),r=n.find(".lazyOwl"),"string"==typeof r.data("src")?(void 0===n.data("owl-loaded")&&(r.hide(),n.addClass("loading").data("owl-loaded","checked")),(!0!==i.options.lazyFollow||o>=i.currentItem)&&o<i.currentItem+i.options.items&&r.length&&i.lazyPreload(n,r)):n.data("owl-loaded","loaded"))},lazyPreload:function(t,n){function o(){t.data("owl-loaded","loaded").removeClass("loading"),n.removeAttr("data-src"),"fade"===a.options.lazyEffect?n.fadeIn(400):n.show(),"function"==typeof a.options.afterLazyLoad&&a.options.afterLazyLoad.apply(this,[a.$elem])}function r(){s+=1,a.completeImg(n.get(0))||!0===i?o():s<=100?e.setTimeout(r,100):o()}var i,a=this,s=0;"DIV"===n.prop("tagName")?(n.css("background-image","url("+n.data("src")+")"),i=!0):n[0].src=n.data("src"),r()},autoHeight:function(){function n(){var n=t(i.$owlItems[i.currentItem]).height();i.wrapperOuter.css("height",n+"px"),i.wrapperOuter.hasClass("autoHeight")||e.setTimeout(function(){i.wrapperOuter.addClass("autoHeight")},0)}function o(){r+=1,i.completeImg(a.get(0))?n():r<=100?e.setTimeout(o,100):i.wrapperOuter.css("height","")}var r,i=this,a=t(i.$owlItems[i.currentItem]).find("img");void 0!==a.get(0)?(r=0,o()):n()},completeImg:function(t){return!!t.complete&&("undefined"===typeof t.naturalWidth||0!==t.naturalWidth)},onVisibleItems:function(){var e,n=this;for(!0===n.options.addClassActive&&n.$owlItems.removeClass("active"),n.visibleItems=[],e=n.currentItem;e<n.currentItem+n.options.items;e+=1)n.visibleItems.push(e),!0===n.options.addClassActive&&t(n.$owlItems[e]).addClass("active");n.owl.visibleItems=n.visibleItems},transitionTypes:function(t){var e=this;e.outClass="owl-"+t+"-out",e.inClass="owl-"+t+"-in"},singleItemTransition:function(){var t=this,e=t.outClass,n=t.inClass,o=t.$owlItems.eq(t.currentItem),r=t.$owlItems.eq(t.prevItem),i=Math.abs(t.positionsInArray[t.currentItem])+t.positionsInArray[t.prevItem],a=Math.abs(t.positionsInArray[t.currentItem])+t.itemWidth/2,s="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";t.isTransition=!0,t.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":a+"px","-moz-perspective-origin":a+"px","perspective-origin":a+"px"}),r.css(function(t){return{position:"relative",left:t+"px"}}(i)).addClass(e).on(s,function(){t.endPrev=!0,r.off(s),t.clearTransStyle(r,e)}),o.addClass(n).on(s,function(){t.endCurrent=!0,o.off(s),t.clearTransStyle(o,n)})},clearTransStyle:function(t,e){var n=this;t.css({position:"",left:""}).removeClass(e),n.endPrev&&n.endCurrent&&(n.$owlWrapper.removeClass("owl-origin"),n.endPrev=!1,n.endCurrent=!1,n.isTransition=!1)},owlStatus:function(){var t=this;t.owl={userOptions:t.userOptions,baseElement:t.$elem,userItems:t.$userItems,owlItems:t.$owlItems,currentItem:t.currentItem,prevItem:t.prevItem,visibleItems:t.visibleItems,isTouch:t.browser.isTouch,browser:t.browser,dragDirection:t.dragDirection}},clearEvents:function(){var o=this;o.$elem.off(".owl owl mousedown.disableTextSelect"),t(n).off(".owl owl"),t(e).off("resize",o.resizer)},unWrap:function(){var t=this;0!==t.$elem.children().length&&(t.$owlWrapper.unwrap(),t.$userItems.unwrap().unwrap(),t.owlControls&&t.owlControls.remove()),t.clearEvents(),t.$elem.attr("style",t.$elem.data("owl-originalStyles")||"").attr("class",t.$elem.data("owl-originalClasses"))},destroy:function(){var t=this;t.stop(),e.clearInterval(t.checkVisible),t.unWrap(),t.$elem.removeData()},reinit:function(e){var n=this,o=t.extend({},n.userOptions,e);n.unWrap(),n.init(o,n.$elem)},addItem:function(t,e){var n,o=this;return!!t&&(0===o.$elem.children().length?(o.$elem.append(t),o.setVars(),!1):(o.unWrap(),n=void 0===e||-1===e?-1:e,n>=o.$userItems.length||-1===n?o.$userItems.eq(-1).after(t):o.$userItems.eq(n).before(t),void o.setVars()))},removeItem:function(t){var e,n=this;if(0===n.$elem.children().length)return!1;e=void 0===t||-1===t?-1:t,n.unWrap(),n.$userItems.eq(e).remove(),n.setVars()}};t.fn.owlCarousel=function(e){return this.each(function(){if(!0===t(this).data("owl-init"))return!1;t(this).data("owl-init",!0);var n=Object.create(o);n.init(e,this),t.data(this,"owlCarousel",n)})},t.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:e,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document),/*!
 * Spin.js
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
function(t,e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Spinner=e()}(this,function(){"use strict";function t(t,e){var n,o=document.createElement(t||"div");for(n in e)o[n]=e[n];return o}function e(t){for(var e=1,n=arguments.length;e<n;e++)t.appendChild(arguments[e]);return t}function n(t,e,n,o){var r=["opacity",e,~~(100*t),n,o].join("-"),i=.01+n/o*100,a=Math.max(1-(1-t)/e*(100-i),t),s=u.substring(0,u.indexOf("Animation")).toLowerCase(),l=s&&"-"+s+"-"||"";return c[r]||(m.insertRule("@"+l+"keyframes "+r+"{0%{opacity:"+a+"}"+i+"%{opacity:"+t+"}"+(i+.01)+"%{opacity:1}"+(i+e)%100+"%{opacity:"+t+"}100%{opacity:"+a+"}}",m.cssRules.length),c[r]=1),r}function o(t,e){var n,o,r=t.style;for(e=e.charAt(0).toUpperCase()+e.slice(1),o=0;o<l.length;o++)if(n=l[o]+e,void 0!==r[n])return n;if(void 0!==r[e])return e}function r(t,e){for(var n in e)t.style[o(t,n)||n]=e[n];return t}function i(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)void 0===t[o]&&(t[o]=n[o])}return t}function a(t,e){return"string"==typeof t?t:t[e%t.length]}function s(t){this.opts=i(t||{},s.defaults,p)}var u,l=["webkit","Moz","ms","O"],c={},m=function(){var n=t("style",{type:"text/css"});return e(document.getElementsByTagName("head")[0],n),n.sheet||n.styleSheet}(),p={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};s.defaults={},i(s.prototype,{spin:function(e){this.stop();var n=this,o=n.opts,i=n.el=r(t(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex});o.radius,o.length,o.width;if(r(i,{left:o.left,top:o.top}),e&&e.insertBefore(i,e.firstChild||null),i.setAttribute("role","progressbar"),n.lines(i,n.opts),!u){var a,s=0,l=(o.lines-1)*(1-o.direction)/2,c=o.fps,m=c/o.speed,p=(1-o.opacity)/(m*o.trail/100),f=m/o.lines;!function t(){s++;for(var e=0;e<o.lines;e++)a=Math.max(1-(s+(o.lines-e)*f)%m*p,o.opacity),n.opacity(i,e*o.direction+l,a,o);n.timeout=n.el&&setTimeout(t,~~(1e3/c))}()}return n},stop:function(){var t=this.el;return t&&(clearTimeout(this.timeout),t.parentNode&&t.parentNode.removeChild(t),this.el=void 0),this},lines:function(o,i){function s(e,n){return r(t(),{position:"absolute",width:i.length+i.width+"px",height:i.width+"px",background:e,boxShadow:n,transformOrigin:"left",transform:"rotate("+~~(360/i.lines*c+i.rotate)+"deg) translate("+i.radius+"px,0)",borderRadius:(i.corners*i.width>>1)+"px"})}for(var l,c=0,m=(i.lines-1)*(1-i.direction)/2;c<i.lines;c++)l=r(t(),{position:"absolute",top:1+~(i.width/2)+"px",transform:i.hwaccel?"translate3d(0,0,0)":"",opacity:i.opacity,animation:u&&n(i.opacity,i.trail,m+c*i.direction,i.lines)+" "+1/i.speed+"s linear infinite"}),i.shadow&&e(l,r(s("#000","0 0 4px #000"),{top:"2px"})),e(o,e(l,s(a(i.color,c),"0 0 1px rgba(0,0,0,.1)")));return o},opacity:function(t,e,n){e<t.childNodes.length&&(t.childNodes[e].style.opacity=n)}});var f=r(t("group"),{behavior:"url(#default#VML)"});return!o(f,"transform")&&f.adj?function(){function n(e,n){return t("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',n)}m.addRule(".spin-vml","behavior:url(#default#VML)"),s.prototype.lines=function(t,o){function i(){return r(n("group",{coordsize:c+" "+c,coordorigin:-l+" "+-l}),{width:c,height:c})}function s(t,s,u){e(p,e(r(i(),{rotation:360/o.lines*t+"deg",left:~~s}),e(r(n("roundrect",{arcsize:o.corners}),{width:l,height:o.width,left:o.radius,top:-o.width>>1,filter:u}),n("fill",{color:a(o.color,t),opacity:o.opacity}),n("stroke",{opacity:0}))))}var u,l=o.length+o.width,c=2*l,m=2*-(o.width+o.length)+"px",p=r(i(),{position:"absolute",top:m,left:m});if(o.shadow)for(u=1;u<=o.lines;u++)s(u,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(u=1;u<=o.lines;u++)s(u);return e(t,p)},s.prototype.opacity=function(t,e,n,o){var r=t.firstChild;o=o.shadow&&o.lines||0,r&&e+o<r.childNodes.length&&(r=r.childNodes[e+o],r=r&&r.firstChild,(r=r&&r.firstChild)&&(r.opacity=n))}}():u=o(f,"animation"),s}),/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
function(t){if("object"==typeof exports)t(require("jquery"),require("spin"));else if("function"==typeof define&&define.amd)define(["jquery","spin"],t);else{if(!window.Spinner)throw new Error("Spin.js not present");t(window.jQuery,window.Spinner)}}(function(t,e){t.fn.spin=function(n,o){return this.each(function(){var r=t(this),i=r.data();i.spinner&&(i.spinner.stop(),delete i.spinner),!1!==n&&(n=t.extend({color:o||r.css("color")},t.fn.spin.presets[n]||n),i.spinner=new e(n).spin(this))})},t.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}}),function(t){function e(t){var e=t.length,o=n.type(t);return"function"!==o&&!n.isWindow(t)&&(!(1!==t.nodeType||!e)||("array"===o||0===e||"number"==typeof e&&e>0&&e-1 in t))}if(!t.jQuery){var n=function(t,e){return new n.fn.init(t,e)};n.isWindow=function(t){return null!=t&&t==t.window},n.type=function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?r[a.call(t)]||"object":typeof t},n.isArray=Array.isArray||function(t){return"array"===n.type(t)},n.isPlainObject=function(t){var e;if(!t||"object"!==n.type(t)||t.nodeType||n.isWindow(t))return!1;try{if(t.constructor&&!i.call(t,"constructor")&&!i.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}for(e in t);return void 0===e||i.call(t,e)},n.each=function(t,n,o){var r=0,i=t.length,a=e(t);if(o){if(a)for(;r<i&&!1!==n.apply(t[r],o);r++);else for(r in t)if(!1===n.apply(t[r],o))break}else if(a)for(;r<i&&!1!==n.call(t[r],r,t[r]);r++);else for(r in t)if(!1===n.call(t[r],r,t[r]))break;return t},n.data=function(t,e,r){if(void 0===r){var i=t[n.expando],a=i&&o[i];if(void 0===e)return a;if(a&&e in a)return a[e]}else if(void 0!==e){var i=t[n.expando]||(t[n.expando]=++n.uuid);return o[i]=o[i]||{},o[i][e]=r,r}},n.removeData=function(t,e){var r=t[n.expando],i=r&&o[r];i&&n.each(e,function(t,e){delete i[e]})},n.extend=function(){var t,e,o,r,i,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[u]||{},u++),"object"!=typeof s&&"function"!==n.type(s)&&(s={}),u===l&&(s=this,u--);u<l;u++)if(null!=(i=arguments[u]))for(r in i)t=s[r],o=i[r],s!==o&&(c&&o&&(n.isPlainObject(o)||(e=n.isArray(o)))?(e?(e=!1,a=t&&n.isArray(t)?t:[]):a=t&&n.isPlainObject(t)?t:{},s[r]=n.extend(c,a,o)):void 0!==o&&(s[r]=o));return s},n.queue=function(t,o,r){if(t){o=(o||"fx")+"queue";var i=n.data(t,o);return r?(!i||n.isArray(r)?i=n.data(t,o,function(t,n){var o=n||[];return null!=t&&(e(Object(t))?function(t,e){for(var n=+e.length,o=0,r=t.length;o<n;)t[r++]=e[o++];if(n!==n)for(;void 0!==e[o];)t[r++]=e[o++];t.length=r}(o,"string"==typeof t?[t]:t):[].push.call(o,t)),o}(r)):i.push(r),i):i||[]}},n.dequeue=function(t,e){n.each(t.nodeType?[t]:t,function(t,o){e=e||"fx";var r=n.queue(o,e),i=r.shift();"inprogress"===i&&(i=r.shift()),i&&("fx"===e&&r.unshift("inprogress"),i.call(o,function(){n.dequeue(o,e)}))})},n.fn=n.prototype={init:function(t){if(t.nodeType)return this[0]=t,this;throw new Error("Not a DOM node.")},offset:function(){var e=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:e.top+(t.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:e.left+(t.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function t(){for(var t=this.offsetParent||document;t&&"html"===!t.nodeType.toLowerCase&&"static"===t.style.position;)t=t.offsetParent;return t||document}var e=this[0],t=t.apply(e),o=this.offset(),r=/^(?:body|html)$/i.test(t.nodeName)?{top:0,left:0}:n(t).offset();return o.top-=parseFloat(e.style.marginTop)||0,o.left-=parseFloat(e.style.marginLeft)||0,t.style&&(r.top+=parseFloat(t.style.borderTopWidth)||0,r.left+=parseFloat(t.style.borderLeftWidth)||0),{top:o.top-r.top,left:o.left-r.left}}};var o={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var r={},i=r.hasOwnProperty,a=r.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),u=0;u<s.length;u++)r["[object "+s[u]+"]"]=s[u].toLowerCase();n.fn.init.prototype=n.fn,t.Velocity={Utilities:n}}}(window),function(t){"object"==typeof module&&"object"==typeof module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):t()}(function(){return function(t,e,n,o){/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
function r(t){for(var e=-1,n=t?t.length:0,o=[];++e<n;){var r=t[e];r&&o.push(r)}return o}function i(t){return h.isWrapped(t)?t=[].slice.call(t):h.isNode(t)&&(t=[t]),t}function a(t){var e=p.data(t,"velocity");return null===e?o:e}function s(t){return function(e){return Math.round(e*t)*(1/t)}}/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
function u(t,n,o,r){function i(t,e){return 1-3*e+3*t}function a(t,e){return 3*e-6*t}function s(t){return 3*t}function u(t,e,n){return((i(e,n)*t+a(e,n))*t+s(e))*t}function l(t,e,n){return 3*i(e,n)*t*t+2*a(e,n)*t+s(e)}function c(e,n){for(var r=0;r<h;++r){var i=l(n,t,o);if(0===i)return n;n-=(u(n,t,o)-e)/i}return n}function m(){for(var e=0;e<_;++e)S[e]=u(e*w,t,o)}function p(e,n,r){var i,a,s=0;do{a=n+(r-n)/2,i=u(a,t,o)-e,i>0?r=a:n=a}while(Math.abs(i)>g&&++s<v);return a}function f(e){for(var n=0,r=1,i=_-1;r!=i&&S[r]<=e;++r)n+=w;--r;var a=(e-S[r])/(S[r+1]-S[r]),s=n+a*w,u=l(s,t,o);return u>=y?c(e,s):0==u?s:p(e,n,n+w)}function d(){C=!0,t==n&&o==r||m()}var h=4,y=.001,g=1e-7,v=10,_=11,w=1/(_-1),b="Float32Array"in e;if(4!==arguments.length)return!1;for(var x=0;x<4;++x)if("number"!=typeof arguments[x]||isNaN(arguments[x])||!isFinite(arguments[x]))return!1;t=Math.min(t,1),o=Math.min(o,1),t=Math.max(t,0),o=Math.max(o,0);var S=b?new Float32Array(_):new Array(_),C=!1,T=function(e){return C||d(),t===n&&o===r?e:0===e?0:1===e?1:u(f(e),n,r)};T.getControlPoints=function(){return[{x:t,y:n},{x:o,y:r}]};var E="generateBezier("+[t,n,o,r]+")";return T.toString=function(){return E},T}function l(t,e){var n=t;return h.isString(t)?_.Easings[t]||(n=!1):n=h.isArray(t)&&1===t.length?s.apply(null,t):h.isArray(t)&&2===t.length?w.apply(null,t.concat([e])):!(!h.isArray(t)||4!==t.length)&&u.apply(null,t),!1===n&&(n=_.Easings[_.defaults.easing]?_.defaults.easing:v),n}function c(t){if(t)for(var e=(new Date).getTime(),n=0,r=_.State.calls.length;n<r;n++)if(_.State.calls[n]){var i=_.State.calls[n],s=i[0],u=i[2],l=i[3],f=!!l;l||(l=_.State.calls[n][3]=e-16);for(var d=Math.min((e-l)/u.duration,1),y=0,g=s.length;y<g;y++){var v=s[y],w=v.element;if(a(w)){var x=!1;if(u.display!==o&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var C=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];p.each(C,function(t,e){b.setPropertyValue(w,"display",e)})}b.setPropertyValue(w,"display",u.display)}u.visibility!==o&&"hidden"!==u.visibility&&b.setPropertyValue(w,"visibility",u.visibility);for(var T in v)if("element"!==T){var E,I=v[T],P=h.isString(I.easing)?_.Easings[I.easing]:I.easing;if(1===d)E=I.endValue;else if(E=I.startValue+(I.endValue-I.startValue)*P(d),!f&&E===I.currentValue)continue;if(I.currentValue=E,b.Hooks.registered[T]){var k=b.Hooks.getRoot(T),A=a(w).rootPropertyValueCache[k];A&&(I.rootPropertyValue=A)}var O=b.setPropertyValue(w,T,I.currentValue+(0===parseFloat(E)?"":I.unitType),I.rootPropertyValue,I.scrollData);b.Hooks.registered[T]&&(b.Normalizations.registered[k]?a(w).rootPropertyValueCache[k]=b.Normalizations.registered[k]("extract",null,O[1]):a(w).rootPropertyValueCache[k]=O[1]),"transform"===O[0]&&(x=!0)}u.mobileHA&&a(w).transformCache.translate3d===o&&(a(w).transformCache.translate3d="(0px, 0px, 0px)",x=!0),x&&b.flushTransformCache(w)}}u.display!==o&&"none"!==u.display&&(_.State.calls[n][2].display=!1),u.visibility!==o&&"hidden"!==u.visibility&&(_.State.calls[n][2].visibility=!1),u.progress&&u.progress.call(i[1],i[1],d,Math.max(0,l+u.duration-e),l),1===d&&m(n)}_.State.isTicking&&S(c)}function m(t,e){if(!_.State.calls[t])return!1;for(var n=_.State.calls[t][0],r=_.State.calls[t][1],i=_.State.calls[t][2],s=_.State.calls[t][4],u=!1,l=0,c=n.length;l<c;l++){var m=n[l].element;if(e||i.loop||("none"===i.display&&b.setPropertyValue(m,"display",i.display),"hidden"===i.visibility&&b.setPropertyValue(m,"visibility",i.visibility)),!0!==i.loop&&(p.queue(m)[1]===o||!/\.velocityQueueEntryFlag/i.test(p.queue(m)[1]))&&a(m)){a(m).isAnimating=!1,a(m).rootPropertyValueCache={};var f=!1;p.each(b.Lists.transforms3D,function(t,e){var n=/^scale/.test(e)?1:0,r=a(m).transformCache[e];a(m).transformCache[e]!==o&&new RegExp("^\\("+n+"[^.]").test(r)&&(f=!0,delete a(m).transformCache[e])}),i.mobileHA&&(f=!0,delete a(m).transformCache.translate3d),f&&b.flushTransformCache(m),b.Values.removeClass(m,"velocity-animating")}if(!e&&i.complete&&!i.loop&&l===c-1)try{i.complete.call(r,r)}catch(t){setTimeout(function(){throw t},1)}s&&!0!==i.loop&&s(r),!0!==i.loop||e||(p.each(a(m).tweensContainer,function(t,e){/^rotate/.test(t)&&360===parseFloat(e.endValue)&&(e.endValue=0,e.startValue=360)}),_(m,"reverse",{loop:!0,delay:i.delay})),!1!==i.queue&&p.dequeue(m,i.queue)}_.State.calls[t]=!1;for(var d=0,h=_.State.calls.length;d<h;d++)if(!1!==_.State.calls[d]){u=!0;break}!1===u&&(_.State.isTicking=!1,delete _.State.calls,_.State.calls=[])}var p,f=function(){if(n.documentMode)return n.documentMode;for(var t=7;t>4;t--){var e=n.createElement("div");if(e.innerHTML="\x3c!--[if IE "+t+"]><span></span><![endif]--\x3e",e.getElementsByTagName("span").length)return e=null,t}return o}(),d=function(){var t=0;return e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||function(e){var n,o=(new Date).getTime();/* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
return n=Math.max(0,16-(o-t)),t=o+n,setTimeout(function(){e(o+n)},n)}}(),h={isString:function(t){return"string"==typeof t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},isFunction:function(t){return"[object Function]"===Object.prototype.toString.call(t)},isNode:function(t){return t&&t.nodeType},/* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
isNodeList:function(t){return"object"==typeof t&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t))&&t.length!==o&&(0===t.length||"object"==typeof t[0]&&t[0].nodeType>0)},isWrapped:function(t){return t&&(t.jquery||e.Zepto&&e.Zepto.zepto.isZ(t))},isSVG:function(t){return e.SVGElement&&t instanceof e.SVGElement},isEmptyObject:function(t){for(var e in t)return!1;return!0}},y=!1;if(t.fn&&t.fn.jquery?(p=t,y=!0):p=e.Velocity.Utilities,f<=8&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(f<=7)return void(jQuery.fn.velocity=jQuery.fn.animate);var g=400,v="swing",_={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:e.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:p,Redirects:{},Easings:{},Promise:e.Promise,defaults:{queue:"",duration:g,easing:v,begin:o,complete:o,progress:o,display:o,visibility:o,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(t){p.data(t,"velocity",{isSVG:h.isSVG(t),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:1,patch:0},debug:!1};e.pageYOffset!==o?(_.State.scrollAnchor=e,_.State.scrollPropertyLeft="pageXOffset",_.State.scrollPropertyTop="pageYOffset"):(_.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,_.State.scrollPropertyLeft="scrollLeft",_.State.scrollPropertyTop="scrollTop");/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
var w=function(){function t(t){return-t.tension*t.x-t.friction*t.v}function e(e,n,o){var r={x:e.x+o.dx*n,v:e.v+o.dv*n,tension:e.tension,friction:e.friction};return{dx:r.v,dv:t(r)}}function n(n,o){var r={dx:n.v,dv:t(n)},i=e(n,.5*o,r),a=e(n,.5*o,i),s=e(n,o,a),u=1/6*(r.dx+2*(i.dx+a.dx)+s.dx),l=1/6*(r.dv+2*(i.dv+a.dv)+s.dv);return n.x=n.x+u*o,n.v=n.v+l*o,n}return function t(e,o,r){var i,a,s,u={x:-1,v:0,tension:null,friction:null},l=[0],c=0;for(e=parseFloat(e)||500,o=parseFloat(o)||20,r=r||null,u.tension=e,u.friction=o,i=null!==r,i?(c=t(e,o),a=c/r*.016):a=.016;;)if(s=n(s||u,a),l.push(1+s.x),c+=16,!(Math.abs(s.x)>1e-4&&Math.abs(s.v)>1e-4))break;return i?function(t){return l[t*(l.length-1)|0]}:c}}();_.Easings={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},spring:function(t){return 1-Math.cos(4.5*t*Math.PI)*Math.exp(6*-t)}},p.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(t,e){_.Easings[e[0]]=u.apply(null,e[1])});var b=_.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var t=0;t<b.Lists.colors.length;t++){var e="color"===b.Lists.colors[t]?"0 0 0 1":"255 255 255 1";b.Hooks.templates[b.Lists.colors[t]]=["Red Green Blue Alpha",e]}var n,o,r;if(f)for(n in b.Hooks.templates){o=b.Hooks.templates[n],r=o[0].split(" ");var i=o[1].match(b.RegEx.valueSplit);"Color"===r[0]&&(r.push(r.shift()),i.push(i.shift()),b.Hooks.templates[n]=[r.join(" "),i.join(" ")])}for(n in b.Hooks.templates){o=b.Hooks.templates[n],r=o[0].split(" ");for(var t in r){var a=n+r[t],s=t;b.Hooks.registered[a]=[n,s]}}},getRoot:function(t){var e=b.Hooks.registered[t];return e?e[0]:t},cleanRootPropertyValue:function(t,e){return b.RegEx.valueUnwrap.test(e)&&(e=e.match(b.RegEx.valueUnwrap)[1]),b.Values.isCSSNullValue(e)&&(e=b.Hooks.templates[t][1]),e},extractValue:function(t,e){var n=b.Hooks.registered[t];if(n){var o=n[0],r=n[1];return e=b.Hooks.cleanRootPropertyValue(o,e),e.toString().match(b.RegEx.valueSplit)[r]}return e},injectValue:function(t,e,n){var o=b.Hooks.registered[t];if(o){var r,i=o[0],a=o[1];return n=b.Hooks.cleanRootPropertyValue(i,n),r=n.toString().match(b.RegEx.valueSplit),r[a]=e,r.join(" ")}return n}},Normalizations:{registered:{clip:function(t,e,n){switch(t){case"name":return"clip";case"extract":var o;return b.RegEx.wrappedValueAlreadyExtracted.test(n)?o=n:(o=n.toString().match(b.RegEx.valueUnwrap),o=o?o[1].replace(/,(\s+)?/g," "):n),o;case"inject":return"rect("+n+")"}},blur:function(t,e,n){switch(t){case"name":return"-webkit-filter";case"extract":var o=parseFloat(n);if(!o&&0!==o){var r=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);o=r?r[1]:0}return o;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(t,e,n){if(f<=8)switch(t){case"name":return"filter";case"extract":var o=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=o?o[1]/100:1;case"inject":return e.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(t){case"name":return"opacity";case"extract":case"inject":return n}}},register:function(){f<=9||_.State.isGingerbread||(b.Lists.transformsBase=b.Lists.transformsBase.concat(b.Lists.transforms3D));for(var t=0;t<b.Lists.transformsBase.length;t++)!function(){var e=b.Lists.transformsBase[t];b.Normalizations.registered[e]=function(t,n,r){switch(t){case"name":return"transform";case"extract":return a(n)===o||a(n).transformCache[e]===o?/^scale/i.test(e)?1:0:a(n).transformCache[e].replace(/[()]/g,"");case"inject":var i=!1;switch(e.substr(0,e.length-1)){case"translate":i=!/(%|px|em|rem|vw|vh|\d)$/i.test(r);break;case"scal":case"scale":_.State.isAndroid&&a(n).transformCache[e]===o&&r<1&&(r=1),i=!/(\d)$/i.test(r);break;case"skew":case"rotate":i=!/(deg|\d)$/i.test(r)}return i||(a(n).transformCache[e]="("+r+")"),a(n).transformCache[e]}}}();for(var t=0;t<b.Lists.colors.length;t++)!function(){var e=b.Lists.colors[t];b.Normalizations.registered[e]=function(t,n,r){switch(t){case"name":return e;case"extract":var i;if(b.RegEx.wrappedValueAlreadyExtracted.test(r))i=r;else{var a,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(r)?a=s[r]!==o?s[r]:s.black:b.RegEx.isHex.test(r)?a="rgb("+b.Values.hexToRgb(r).join(" ")+")":/^rgba?\(/i.test(r)||(a=s.black),i=(a||r).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return f<=8||3!==i.split(" ").length||(i+=" 1"),i;case"inject":return f<=8?4===r.split(" ").length&&(r=r.split(/\s+/).slice(0,3).join(" ")):3===r.split(" ").length&&(r+=" 1"),(f<=8?"rgb":"rgba")+"("+r.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})},SVGAttribute:function(t){var e="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||_.State.isAndroid&&!_.State.isChrome)&&(e+="|transform"),new RegExp("^("+e+")$","i").test(t)},prefixCheck:function(t){if(_.State.prefixMatches[t])return[_.State.prefixMatches[t],!0];for(var e=["","Webkit","Moz","ms","O"],n=0,o=e.length;n<o;n++){var r;if(r=0===n?t:e[n]+t.replace(/^\w/,function(t){return t.toUpperCase()}),h.isString(_.State.prefixElement.style[r]))return _.State.prefixMatches[t]=r,[r,!0]}return[t,!1]}},Values:{/* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
hexToRgb:function(t){var e,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return t=t.replace(n,function(t,e,n,o){return e+e+n+n+o+o}),e=o.exec(t),e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]},isCSSNullValue:function(t){return 0==t||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)},getUnitType:function(t){return/^(rotate|skew)/i.test(t)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t)?"":"px"},getDisplayType:function(t){var e=t&&t.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e)?"inline":/^(li)$/i.test(e)?"list-item":/^(tr)$/i.test(e)?"table-row":"block"},addClass:function(t,e){t.classList?t.classList.add(e):t.className+=(t.className.length?" ":"")+e},removeClass:function(t,e){t.classList?t.classList.remove(e):t.className=t.className.toString().replace(new RegExp("(^|\\s)"+e.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(t,n,r,i){function s(t,n){function r(){l&&b.setPropertyValue(t,"display","none")}var u=0;if(f<=8)u=p.css(t,n);else{var l=!1;if(/^(width|height)$/.test(n)&&0===b.getPropertyValue(t,"display")&&(l=!0,b.setPropertyValue(t,"display",b.Values.getDisplayType(t))),!i){if("height"===n&&"border-box"!==b.getPropertyValue(t,"boxSizing").toString().toLowerCase()){var c=t.offsetHeight-(parseFloat(b.getPropertyValue(t,"borderTopWidth"))||0)-(parseFloat(b.getPropertyValue(t,"borderBottomWidth"))||0)-(parseFloat(b.getPropertyValue(t,"paddingTop"))||0)-(parseFloat(b.getPropertyValue(t,"paddingBottom"))||0);return r(),c}if("width"===n&&"border-box"!==b.getPropertyValue(t,"boxSizing").toString().toLowerCase()){var m=t.offsetWidth-(parseFloat(b.getPropertyValue(t,"borderLeftWidth"))||0)-(parseFloat(b.getPropertyValue(t,"borderRightWidth"))||0)-(parseFloat(b.getPropertyValue(t,"paddingLeft"))||0)-(parseFloat(b.getPropertyValue(t,"paddingRight"))||0);return r(),m}}var d;d=a(t)===o?e.getComputedStyle(t,null):a(t).computedStyle?a(t).computedStyle:a(t).computedStyle=e.getComputedStyle(t,null),(f||_.State.isFirefox)&&"borderColor"===n&&(n="borderTopColor"),u=9===f&&"filter"===n?d.getPropertyValue(n):d[n],""!==u&&null!==u||(u=t.style[n]),r()}if("auto"===u&&/^(top|right|bottom|left)$/i.test(n)){var h=s(t,"position");("fixed"===h||"absolute"===h&&/top|left/i.test(n))&&(u=p(t).position()[n]+"px")}return u}var u;if(b.Hooks.registered[n]){var l=n,c=b.Hooks.getRoot(l);r===o&&(r=b.getPropertyValue(t,b.Names.prefixCheck(c)[0])),b.Normalizations.registered[c]&&(r=b.Normalizations.registered[c]("extract",t,r)),u=b.Hooks.extractValue(l,r)}else if(b.Normalizations.registered[n]){var m,d;m=b.Normalizations.registered[n]("name",t),"transform"!==m&&(d=s(t,b.Names.prefixCheck(m)[0]),b.Values.isCSSNullValue(d)&&b.Hooks.templates[n]&&(d=b.Hooks.templates[n][1])),u=b.Normalizations.registered[n]("extract",t,d)}return/^[\d-]/.test(u)||(u=a(t)&&a(t).isSVG&&b.Names.SVGAttribute(n)?/^(height|width)$/i.test(n)?t.getBBox()[n]:t.getAttribute(n):s(t,b.Names.prefixCheck(n)[0])),b.Values.isCSSNullValue(u)&&(u=0),_.debug>=2&&console.log("Get "+n+": "+u),u},setPropertyValue:function(t,n,o,r,i){var s=n;if("scroll"===n)i.container?i.container["scroll"+i.direction]=o:"Left"===i.direction?e.scrollTo(o,i.alternateValue):e.scrollTo(i.alternateValue,o);else if(b.Normalizations.registered[n]&&"transform"===b.Normalizations.registered[n]("name",t))b.Normalizations.registered[n]("inject",t,o),s="transform",o=a(t).transformCache[n];else{if(b.Hooks.registered[n]){var u=n,l=b.Hooks.getRoot(n);r=r||b.getPropertyValue(t,l),o=b.Hooks.injectValue(u,o,r),n=l}if(b.Normalizations.registered[n]&&(o=b.Normalizations.registered[n]("inject",t,o),n=b.Normalizations.registered[n]("name",t)),s=b.Names.prefixCheck(n)[0],f<=8)try{t.style[s]=o}catch(t){_.debug&&console.log("Browser does not support ["+o+"] for ["+s+"]")}else a(t)&&a(t).isSVG&&b.Names.SVGAttribute(n)?t.setAttribute(n,o):t.style[s]=o;_.debug>=2&&console.log("Set "+n+" ("+s+"): "+o)}return[s,o]},flushTransformCache:function(t){function e(e){return parseFloat(b.getPropertyValue(t,e))}var n="";if((f||_.State.isAndroid&&!_.State.isChrome)&&a(t).isSVG){var o={translate:[e("translateX"),e("translateY")],skewX:[e("skewX")],skewY:[e("skewY")],scale:1!==e("scale")?[e("scale"),e("scale")]:[e("scaleX"),e("scaleY")],rotate:[e("rotateZ"),0,0]};p.each(a(t).transformCache,function(t){/^translate/i.test(t)?t="translate":/^scale/i.test(t)?t="scale":/^rotate/i.test(t)&&(t="rotate"),o[t]&&(n+=t+"("+o[t].join(" ")+") ",delete o[t])})}else{var r,i;p.each(a(t).transformCache,function(e){if(r=a(t).transformCache[e],"transformPerspective"===e)return i=r,!0;9===f&&"rotateZ"===e&&(e="rotate"),n+=e+r+" "}),i&&(n="perspective"+i+" "+n)}b.setPropertyValue(t,"transform",n)}};b.Hooks.register(),b.Normalizations.register(),_.hook=function(t,e,n){var r=o;return t=i(t),p.each(t,function(t,i){if(a(i)===o&&_.init(i),n===o)r===o&&(r=_.CSS.getPropertyValue(i,e));else{var s=_.CSS.setPropertyValue(i,e,n);"transform"===s[0]&&_.CSS.flushTransformCache(i),r=s}}),r};var x=function(){function t(){return u?P.promise||null:f}function s(){function t(t){function f(t,e){var n=o,r=o,i=o;return h.isArray(t)?(n=t[0],!h.isArray(t[1])&&/^[\d-]/.test(t[1])||h.isFunction(t[1])||b.RegEx.isHex.test(t[1])?i=t[1]:(h.isString(t[1])&&!b.RegEx.isHex.test(t[1])||h.isArray(t[1]))&&(r=e?t[1]:l(t[1],u.duration),t[2]!==o&&(i=t[2]))):n=t,e||(r=r||u.easing),h.isFunction(n)&&(n=n.call(s,T,C)),h.isFunction(i)&&(i=i.call(s,T,C)),[n||0,r,i]}function d(t,e){var n,o;return o=(e||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(t){return n=t,""}),n||(n=b.Values.getUnitType(t)),[o,n]}if(u.begin&&0===T)try{u.begin.call(y,y)}catch(t){setTimeout(function(){throw t},1)}if("scroll"===k){var g,x,S,E=/^x$/i.test(u.axis)?"Left":"Top",I=parseFloat(u.offset)||0;u.container?h.isWrapped(u.container)||h.isNode(u.container)?(u.container=u.container[0]||u.container,g=u.container["scroll"+E],S=g+p(s).position()[E.toLowerCase()]+I):u.container=null:(g=_.State.scrollAnchor[_.State["scrollProperty"+E]],x=_.State.scrollAnchor[_.State["scrollProperty"+("Left"===E?"Top":"Left")]],S=p(s).offset()[E.toLowerCase()]+I),m={scroll:{rootPropertyValue:!1,startValue:g,currentValue:g,endValue:S,unitType:"",easing:u.easing,scrollData:{container:u.container,direction:E,alternateValue:x}},element:s},_.debug&&console.log("tweensContainer (scroll): ",m.scroll,s)}else if("reverse"===k){if(!a(s).tweensContainer)return void p.dequeue(s,u.queue);"none"===a(s).opts.display&&(a(s).opts.display="auto"),"hidden"===a(s).opts.visibility&&(a(s).opts.visibility="visible"),a(s).opts.loop=!1,a(s).opts.begin=null,a(s).opts.complete=null,w.easing||delete u.easing,w.duration||delete u.duration,u=p.extend({},a(s).opts,u);var A=p.extend(!0,{},a(s).tweensContainer);for(var O in A)if("element"!==O){var R=A[O].startValue;A[O].startValue=A[O].currentValue=A[O].endValue,A[O].endValue=R,h.isEmptyObject(w)||(A[O].easing=u.easing),_.debug&&console.log("reverse tweensContainer ("+O+"): "+JSON.stringify(A[O]),s)}m=A}else if("start"===k){var A;a(s).tweensContainer&&!0===a(s).isAnimating&&(A=a(s).tweensContainer),p.each(v,function(t,e){if(RegExp("^"+b.Lists.colors.join("$|^")+"$").test(t)){var n=f(e,!0),r=n[0],i=n[1],a=n[2];if(b.RegEx.isHex.test(r)){for(var s=["Red","Green","Blue"],u=b.Values.hexToRgb(r),l=a?b.Values.hexToRgb(a):o,c=0;c<s.length;c++){var m=[u[c]];i&&m.push(i),l!==o&&m.push(l[c]),v[t+s[c]]=m}delete v[t]}}});for(var L in v){var M=f(v[L]),V=M[0],F=M[1],D=M[2];L=b.Names.camelCase(L);var $=b.Hooks.getRoot(L),W=!1;if(a(s).isSVG||!1!==b.Names.prefixCheck($)[1]||b.Normalizations.registered[$]!==o){(u.display!==o&&null!==u.display&&"none"!==u.display||u.visibility!==o&&"hidden"!==u.visibility)&&/opacity|filter/.test(L)&&!D&&0!==V&&(D=0),u._cacheValues&&A&&A[L]?(D===o&&(D=A[L].endValue+A[L].unitType),W=a(s).rootPropertyValueCache[$]):b.Hooks.registered[L]?D===o?(W=b.getPropertyValue(s,$),D=b.getPropertyValue(s,L,W)):W=b.Hooks.templates[$][1]:D===o&&(D=b.getPropertyValue(s,L));var B,j,H,q=!1;if(B=d(L,D),D=B[0],H=B[1],B=d(L,V),V=B[0].replace(/^([+-\/*])=/,function(t,e){return q=e,""}),j=B[1],D=parseFloat(D)||0,V=parseFloat(V)||0,"%"===j&&(/^(fontSize|lineHeight)$/.test(L)?(V/=100,j="em"):/^scale/.test(L)?(V/=100,j=""):/(Red|Green|Blue)$/i.test(L)&&(V=V/100*255,j="")),/[\/*]/.test(q))j=H;else if(H!==j&&0!==D)if(0===V)j=H;else{i=i||function(){var t={myParent:s.parentNode||n.body,position:b.getPropertyValue(s,"position"),fontSize:b.getPropertyValue(s,"fontSize")},o=t.position===N.lastPosition&&t.myParent===N.lastParent,r=t.fontSize===N.lastFontSize;N.lastParent=t.myParent,N.lastPosition=t.position,N.lastFontSize=t.fontSize;var i={};if(r&&o)i.emToPx=N.lastEmToPx,i.percentToPxWidth=N.lastPercentToPxWidth,i.percentToPxHeight=N.lastPercentToPxHeight;else{var u=a(s).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");_.init(u),t.myParent.appendChild(u),p.each(["overflow","overflowX","overflowY"],function(t,e){_.CSS.setPropertyValue(u,e,"hidden")}),_.CSS.setPropertyValue(u,"position",t.position),_.CSS.setPropertyValue(u,"fontSize",t.fontSize),_.CSS.setPropertyValue(u,"boxSizing","content-box"),p.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(t,e){_.CSS.setPropertyValue(u,e,"100%")}),_.CSS.setPropertyValue(u,"paddingLeft","100em"),i.percentToPxWidth=N.lastPercentToPxWidth=(parseFloat(b.getPropertyValue(u,"width",null,!0))||1)/100,i.percentToPxHeight=N.lastPercentToPxHeight=(parseFloat(b.getPropertyValue(u,"height",null,!0))||1)/100,i.emToPx=N.lastEmToPx=(parseFloat(b.getPropertyValue(u,"paddingLeft"))||1)/100,t.myParent.removeChild(u)}return null===N.remToPx&&(N.remToPx=parseFloat(b.getPropertyValue(n.body,"fontSize"))||16),null===N.vwToPx&&(N.vwToPx=parseFloat(e.innerWidth)/100,N.vhToPx=parseFloat(e.innerHeight)/100),i.remToPx=N.remToPx,i.vwToPx=N.vwToPx,i.vhToPx=N.vhToPx,_.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),s),i}();var Y=/margin|padding|left|right|width|text|word|letter/i.test(L)||/X$/.test(L)||"x"===L?"x":"y";switch(H){case"%":D*="x"===Y?i.percentToPxWidth:i.percentToPxHeight;break;case"px":break;default:D*=i[H+"ToPx"]}switch(j){case"%":D*=1/("x"===Y?i.percentToPxWidth:i.percentToPxHeight);break;case"px":break;default:D*=1/i[j+"ToPx"]}}switch(q){case"+":V=D+V;break;case"-":V=D-V;break;case"*":V*=D;break;case"/":V=D/V}m[L]={rootPropertyValue:W,startValue:D,currentValue:D,endValue:V,unitType:j,easing:F},_.debug&&console.log("tweensContainer ("+L+"): "+JSON.stringify(m[L]),s)}else _.debug&&console.log("Skipping ["+$+"] due to a lack of browser support.")}m.element=s}m.element&&(b.Values.addClass(s,"velocity-animating"),z.push(m),""===u.queue&&(a(s).tweensContainer=m,a(s).opts=u),a(s).isAnimating=!0,T===C-1?(_.State.calls.length>1e4&&(_.State.calls=r(_.State.calls)),_.State.calls.push([z,y,u,null,P.resolver]),!1===_.State.isTicking&&(_.State.isTicking=!0,c())):T++)}var i,s=this,u=p.extend({},_.defaults,w),m={};switch(a(s)===o&&_.init(s),parseFloat(u.delay)&&!1!==u.queue&&p.queue(s,u.queue,function(t){_.velocityQueueEntryFlag=!0,a(s).delayTimer={setTimeout:setTimeout(t,parseFloat(u.delay)),next:t}}),u.duration.toString().toLowerCase()){case"fast":u.duration=200;break;case"normal":u.duration=g;break;case"slow":u.duration=600;break;default:u.duration=parseFloat(u.duration)||1}!1!==_.mock&&(!0===_.mock?u.duration=u.delay=1:(u.duration*=parseFloat(_.mock)||1,u.delay*=parseFloat(_.mock)||1)),u.easing=l(u.easing,u.duration),u.begin&&!h.isFunction(u.begin)&&(u.begin=null),u.progress&&!h.isFunction(u.progress)&&(u.progress=null),u.complete&&!h.isFunction(u.complete)&&(u.complete=null),u.display!==o&&null!==u.display&&(u.display=u.display.toString().toLowerCase(),"auto"===u.display&&(u.display=_.CSS.Values.getDisplayType(s))),u.visibility!==o&&null!==u.visibility&&(u.visibility=u.visibility.toString().toLowerCase()),u.mobileHA=u.mobileHA&&_.State.isMobile&&!_.State.isGingerbread,!1===u.queue?u.delay?setTimeout(t,u.delay):t():p.queue(s,u.queue,function(e,n){if(!0===n)return P.promise&&P.resolver(y),!0;_.velocityQueueEntryFlag=!0,t(e)}),""!==u.queue&&"fx"!==u.queue||"inprogress"===p.queue(s)[0]||p.dequeue(s)}var u,f,d,y,v,w,S=arguments[0]&&(p.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||h.isString(arguments[0].properties));if(h.isWrapped(this)?(u=!1,d=0,y=this,f=this):(u=!0,d=1,y=S?arguments[0].elements:arguments[0]),y=i(y)){S?(v=arguments[0].properties,w=arguments[0].options):(v=arguments[d],w=arguments[d+1]);var C=y.length,T=0;if("stop"!==v&&!p.isPlainObject(w)){var E=d+1;w={};for(var I=E;I<arguments.length;I++)h.isArray(arguments[I])||!/^(fast|normal|slow)$/i.test(arguments[I])&&!/^\d/.test(arguments[I])?h.isString(arguments[I])||h.isArray(arguments[I])?w.easing=arguments[I]:h.isFunction(arguments[I])&&(w.complete=arguments[I]):w.duration=arguments[I]}var P={promise:null,resolver:null,rejecter:null};u&&_.Promise&&(P.promise=new _.Promise(function(t,e){P.resolver=t,P.rejecter=e}));var k;switch(v){case"scroll":k="scroll";break;case"reverse":k="reverse";break;case"stop":p.each(y,function(t,e){a(e)&&a(e).delayTimer&&(clearTimeout(a(e).delayTimer.setTimeout),a(e).delayTimer.next&&a(e).delayTimer.next(),delete a(e).delayTimer)});var A=[];return p.each(_.State.calls,function(t,e){e&&p.each(e[1],function(n,r){var i=h.isString(w)?w:"";if(w!==o&&e[2].queue!==i)return!0;p.each(y,function(e,n){n===r&&(w!==o&&(p.each(p.queue(n,i),function(t,e){h.isFunction(e)&&e(null,!0)}),p.queue(n,i,[])),a(n)&&""===i&&p.each(a(n).tweensContainer,function(t,e){e.endValue=e.currentValue}),A.push(t))})})}),p.each(A,function(t,e){m(e,!0)}),P.promise&&P.resolver(y),t();default:if(!p.isPlainObject(v)||h.isEmptyObject(v)){if(h.isString(v)&&_.Redirects[v]){var O=p.extend({},w),R=O.duration,L=O.delay||0;return!0===O.backwards&&(y=p.extend(!0,[],y).reverse()),p.each(y,function(t,e){parseFloat(O.stagger)?O.delay=L+parseFloat(O.stagger)*t:h.isFunction(O.stagger)&&(O.delay=L+O.stagger.call(e,t,C)),O.drag&&(O.duration=parseFloat(R)||(/^(callout|transition)/.test(v)?1e3:g),O.duration=Math.max(O.duration*(O.backwards?1-t/C:(t+1)/C),.75*O.duration,200)),_.Redirects[v].call(e,e,O||{},t,C,y,P.promise?P:o)}),t()}var M="Velocity: First argument ("+v+") was not a property map, a known action, or a registered redirect. Aborting.";return P.promise?P.rejecter(new Error(M)):console.log(M),t()}k="start"}var N={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},z=[];p.each(y,function(t,e){h.isNode(e)&&s.call(e)});var V,O=p.extend({},_.defaults,w);if(O.loop=parseInt(O.loop),V=2*O.loop-1,O.loop)for(var F=0;F<V;F++){var D={delay:O.delay,progress:O.progress};F===V-1&&(D.display=O.display,D.visibility=O.visibility,D.complete=O.complete),x(y,"reverse",D)}return t()}};_=p.extend(x,_),_.animate=x;var S=e.requestAnimationFrame||d;return _.State.isMobile||n.hidden===o||n.addEventListener("visibilitychange",function(){n.hidden?(S=function(t){return setTimeout(function(){t(!0)},16)},c()):S=e.requestAnimationFrame||d}),t.Velocity=_,t!==e&&(t.fn.velocity=x,t.fn.velocity.defaults=_.defaults),p.each(["Down","Up"],function(t,e){_.Redirects["slide"+e]=function(t,n,r,i,a,s){var u=p.extend({},n),l=u.begin,c=u.complete,m={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};u.display===o&&(u.display="Down"===e?"inline"===_.CSS.Values.getDisplayType(t)?"inline-block":"block":"none"),u.begin=function(){l&&l.call(a,a);for(var n in m){f[n]=t.style[n];var o=_.CSS.getPropertyValue(t,n);m[n]="Down"===e?[o,0]:[0,o]}f.overflow=t.style.overflow,t.style.overflow="hidden"},u.complete=function(){for(var e in f)t.style[e]=f[e];c&&c.call(a,a),s&&s.resolver(a)},_(t,m,u)}}),p.each(["In","Out"],function(t,e){_.Redirects["fade"+e]=function(t,n,r,i,a,s){var u=p.extend({},n),l={opacity:"In"===e?1:0},c=u.complete;u.complete=r!==i-1?u.begin=null:function(){c&&c.call(a,a),s&&s.resolver(a)},u.display===o&&(u.display="In"===e?"auto":"none"),_(this,l,u)}}),_}(window.jQuery||window.Zepto||window,window,document)}),function(t){"use strict";t.fn.fitVids=function(e){var n={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("div");r.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',o.appendChild(r.childNodes[1])}return e&&t.extend(n,e),this.each(function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];n.customSelector&&e.push(n.customSelector);var o=".fitvidsignore";n.ignore&&(o=o+", "+n.ignore);var r=t(this).find(e.join(","));r=r.not("object object"),r=r.not(o),r.each(function(){var e=t(this);if(!(e.parents(o).length>0||"embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){e.css("height")||e.css("width")||!isNaN(e.attr("height"))&&!isNaN(e.attr("width"))||(e.attr("height",9),e.attr("width",16));var n="object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height(),r=isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10),i=n/r;if(!e.attr("name")){var a="fitvid"+t.fn.fitVids._count;e.attr("name",a),t.fn.fitVids._count++}e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),e.removeAttr("height").removeAttr("width")}})})},t.fn.fitVids._count=0}(window.jQuery||window.Zepto),function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).cssVars=e()}(this,function(){"use strict";function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function n(t){function e(){return!("<"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().charAt(0))}function n(t,e){i.onError(t,a[e],e)}function o(t,e){var n=i.onSuccess(t,a[e],e);t=!1===n?"":n||t,s[e]=t,-1===s.indexOf(null)&&i.onComplete(s)}var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i={mimeType:r.mimeType||null,onBeforeSend:r.onBeforeSend||Function.prototype,onSuccess:r.onSuccess||Function.prototype,onError:r.onError||Function.prototype,onComplete:r.onComplete||Function.prototype},a=Array.isArray(t)?t:[t],s=Array.apply(null,Array(a.length)).map(function(t){return null}),u=document.createElement("a");a.forEach(function(t,r){if(u.setAttribute("href",t),u.href=String(u.href),Boolean(document.all&&!window.atob)&&u.host.split(":")[0]!==location.host.split(":")[0])if(u.protocol===location.protocol){var a=new XDomainRequest;a.open("GET",t),a.timeout=0,a.onprogress=Function.prototype,a.ontimeout=Function.prototype,a.onload=function(){e(a.responseText)?o(a.responseText,r):n(a,r)},a.onerror=function(t){n(a,r)},setTimeout(function(){a.send()},0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(t,")")),n(null,r);else{var s=new XMLHttpRequest;s.open("GET",t),i.mimeType&&s.overrideMimeType&&s.overrideMimeType(i.mimeType),i.onBeforeSend(s,t,r),s.onreadystatechange=function(){4===s.readyState&&(200===s.status&&e(s.responseText)?o(s.responseText,r):n(s,r))},s.send()}})}function o(t){function e(){if(-1===l.indexOf(null)){var t=l.join("");s.onComplete(t,l,u)}}function o(t,o,r,a){var u=s.onSuccess(t,r,a);!function t(e,o,r,a){var u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[],c=i(e,r,l);c.rules.length?n(c.absoluteUrls,{onBeforeSend:function(t,e,n){s.onBeforeSend(t,o,e)},onSuccess:function(t,e,n){var r=s.onSuccess(t,o,e),a=i(t=!1===r?"":r||t,e,l);return a.rules.forEach(function(e,n){t=t.replace(e,a.absoluteRules[n])}),t},onError:function(n,i,s){u.push({xhr:n,url:i}),l.push(c.rules[s]),t(e,o,r,a,u,l)},onComplete:function(n){n.forEach(function(t,n){e=e.replace(c.rules[n],t)}),t(e,o,r,a,u,l)}}):a(e,u)}(t=void 0!==u&&!1===Boolean(u)?"":u||t,r,a,function(t,n){null===l[o]&&(n.forEach(function(t){return s.onError(t.xhr,r,t.url)}),!s.filter||s.filter.test(t)?l[o]=t:l[o]="",e())})}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o={};return o.rules=(t.replace(a.cssComments,"").match(a.cssImports)||[]).filter(function(t){return-1===n.indexOf(t)}),o.urls=o.rules.map(function(t){return t.replace(a.cssImports,"$1")}),o.absoluteUrls=o.urls.map(function(t){return r(t,e)}),o.absoluteRules=o.rules.map(function(t,n){var i=o.urls[n],a=r(o.absoluteUrls[n],e);return t.replace(i,a)}),o}var a={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g},s={rootElement:t.rootElement||document,include:t.include||'style,link[rel="stylesheet"]',exclude:t.exclude||null,filter:t.filter||null,useCSSOM:t.useCSSOM||!1,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype},u=Array.apply(null,s.rootElement.querySelectorAll(s.include)).filter(function(t){return e=t,n=s.exclude,!(e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector).call(e,n);var e,n}),l=Array.apply(null,Array(u.length)).map(function(t){return null});u.length?u.forEach(function(t,i){var a=t.getAttribute("href"),u=t.getAttribute("rel"),c="LINK"===t.nodeName&&a&&u&&"stylesheet"===u.toLowerCase(),m="STYLE"===t.nodeName;if(c)n(a,{mimeType:"text/css",onBeforeSend:function(e,n,o){s.onBeforeSend(e,t,n)},onSuccess:function(e,n,s){var u=r(a,location.href);o(e,i,t,u)},onError:function(n,o,r){l[i]="",s.onError(n,t,o),e()}});else if(m){var p=t.textContent;s.useCSSOM&&(p=Array.apply(null,t.sheet.cssRules).map(function(t){return t.cssText}).join("")),o(p,i,t,location.href)}else l[i]="",e()}):s.onComplete("",[])}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,n=document.implementation.createHTMLDocument(""),o=n.createElement("base"),r=n.createElement("a");return n.head.appendChild(o),n.body.appendChild(r),o.href=e,r.href=t,r.href}function i(t,e,n){t instanceof RegExp&&(t=a(t,n)),e instanceof RegExp&&(e=a(e,n));var o=s(t,e,n);return o&&{start:o[0],end:o[1],pre:n.slice(0,o[0]),body:n.slice(o[0]+t.length,o[1]),post:n.slice(o[1]+e.length)}}function a(t,e){var n=e.match(t);return n?n[0]:null}function s(t,e,n){var o,r,i,a,s,u=n.indexOf(t),l=n.indexOf(e,u+1),c=u;if(u>=0&&l>0){for(o=[],i=n.length;c>=0&&!s;)c==u?(o.push(c),u=n.indexOf(t,c+1)):1==o.length?s=[o.pop(),l]:((r=o.pop())<i&&(i=r,a=l),l=n.indexOf(e,c+1)),c=u<l&&u>=0?u:l;o.length&&(s=[i,a])}return s}function u(e){function n(t){throw new Error("CSS parse error: ".concat(t))}function o(t){var n=t.exec(e);if(n)return e=e.slice(n[0].length),n}function r(){return o(/^{\s*/)}function i(){return o(/^}/)}function a(){o(/^\s*/)}function s(){if(a(),"/"===e[0]&&"*"===e[1]){for(var t=2;e[t]&&("*"!==e[t]||"/"!==e[t+1]);)t++;if(!e[t])return n("end of comment is missing");var o=e.slice(2,t);return e=e.slice(t+2),{type:"comment",comment:o}}}function u(){for(var t,e=[];t=s();)e.push(t);return g.removeComments?[]:e}function l(){for(a();"}"===e[0];)n("extra closing bracket");var t=o(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(t)return t[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,function(t){return t.replace(/,/g,"‌")}).split(/\s*(?![^(]*\)),\s*/).map(function(t){return t.replace(/\u200C/g,",")})}function c(){o(/^([;\s]*)+/);var t=/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,e=o(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(e){if(e=e[0].trim(),!o(/^:\s*/))return n("property missing ':'");var r=o(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),i={type:"declaration",property:e.replace(t,""),value:r?r[0].replace(t,"").trim():""};return o(/^[;\s]*/),i}}function m(){if(!r())return n("missing '{'");for(var t,e=u();t=c();)e.push(t),e=e.concat(u());return i()?e:n("missing '}'")}function p(){a();for(var t,e=[];t=o(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)e.push(t[1]),o(/^,\s*/);if(e.length)return{type:"keyframe",values:e,declarations:m()}}function d(){if(a(),"@"===e[0]){var t=function(){var t=o(/^@([-\w]+)?keyframes\s*/);if(t){var e=t[1];if(!(t=o(/^([-\w]+)\s*/)))return n("@keyframes missing name");var a,s=t[1];if(!r())return n("@keyframes missing '{'");for(var l=u();a=p();)l.push(a),l=l.concat(u());return i()?{type:"keyframes",name:s,vendor:e,keyframes:l}:n("@keyframes missing '}'")}}()||function(){var t=o(/^@supports *([^{]+)/);if(t)return{type:"supports",supports:t[1].trim(),rules:y()}}()||function(){if(o(/^@host\s*/))return{type:"host",rules:y()}}()||function(){var t=o(/^@media *([^{]+)/);if(t)return{type:"media",media:t[1].trim(),rules:y()}}()||function(){var t=o(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(t)return{type:"custom-media",name:t[1].trim(),media:t[2].trim()}}()||function(){if(o(/^@page */))return{type:"page",selectors:l()||[],declarations:m()}}()||function(){var t=o(/^@([-\w]+)?document *([^{]+)/);if(t)return{type:"document",document:t[2].trim(),vendor:t[1]?t[1].trim():null,rules:y()}}()||function(){if(o(/^@font-face\s*/))return{type:"font-face",declarations:m()}}()||function(){var t=o(/^@(import|charset|namespace)\s*([^;]+);/);if(t)return{type:t[1],name:t[2].trim()}}();if(t&&g.onlyVars){var s=!1;return s=t.declarations?t.declarations.some(function(t){return/var\(/.test(t.value)}):(t.keyframes||t.rules||[]).some(function(t){return(t.declarations||[]).some(function(t){return/var\(/.test(t.value)})}),s?t:{}}return t}}function h(){if(g.onlyVars){var t=f("{","}",e);if(t){var o=-1!==t.pre.indexOf(":root")&&/--\S*\s*:/.test(t.body),r=/var\(/.test(t.body);if(!o&&!r)return e=e.slice(t.end+1),{}}}var i=l()||[],a=g.onlyVars?m().filter(function(t){var e=i.some(function(t){return-1!==t.indexOf(":root")})&&/^--\S/.test(t.property),n=/var\(/.test(t.value);return e||n}):m();return i.length||n("selector missing"),{type:"rule",selectors:i,declarations:a}}function y(t){if(!t&&!r())return n("missing '{'");for(var o,a=u();e.length&&(t||"}"!==e[0])&&(o=d()||h());)o.type&&a.push(o),a=a.concat(u());return t||i()?a:n("missing '}'")}var g=t({},{onlyVars:!1,removeComments:!1},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});return{type:"stylesheet",stylesheet:{rules:y(!0),errors:[]}}}function l(e){var n,o,r=t({},{fixNestedCalc:!0,onlyVars:!1,persist:!1,preserve:!1,variables:{},onWarning:function(){}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}),i=r.persist?y.dom:y.temp=JSON.parse(JSON.stringify(y.dom)),a=u(e,{onlyVars:r.onlyVars});if(a.stylesheet.rules.forEach(function(t){var e=[];if("rule"===t.type&&1===t.selectors.length&&":root"===t.selectors[0]&&(t.declarations.forEach(function(t,n){var o=t.property,r=t.value;o&&0===o.indexOf(d)&&(i[o]=r,e.push(n))}),!r.preserve))for(var n=e.length-1;n>=0;n--)t.declarations.splice(e[n],1)}),Object.keys(y.user).forEach(function(t){i[t]=y.user[t]}),Object.keys(r.variables).length){var s={declarations:[],selectors:[":root"],type:"rule"};Object.keys(r.variables).forEach(function(t){var e="--".concat(t.replace(/^-+/,"")),n=r.variables[t];r.persist&&(y.user[e]=n),i[e]!==n&&(i[e]=n,s.declarations.push({type:"declaration",property:e,value:n}))}),r.preserve&&s.declarations.length&&a.stylesheet.rules.push(s)}return function t(e,n){e.rules.forEach(function(o){o.rules?t(o,n):o.keyframes?o.keyframes.forEach(function(t){"keyframe"===t.type&&n(t.declarations,o)}):o.declarations&&n(o.declarations,e)})}(a.stylesheet,function(t,e){for(var n,o,a,s=0;s<t.length;s++)a=(n=t[s]).value,"declaration"===n.type&&a&&-1!==a.indexOf(h+"(")&&(o=c(a,i,r))!==n.value&&(r.preserve?(t.splice(s,0,{type:n.type,property:n.property,value:o}),s++):n.value=o)}),r.fixNestedCalc&&(n=a.stylesheet.rules,o=/(-[a-z]+-)?calc\(/,n.forEach(function(t){t.declarations&&t.declarations.forEach(function(t){for(var e=t.value,n="";o.test(e);){var r=f("calc(",")",e||"");for(e=e.slice(r.end);o.test(r.body);){var i=f(o,")",r.body);r.body="".concat(i.pre,"(").concat(i.body,")").concat(i.post)}n+="".concat(r.pre,"calc(").concat(r.body),n+=o.test(e)?"":")".concat(r.post)}t.value=n||t.value})})),function(t){function e(t){for(var e="",i=0;i<t.length;i++){var a=t[i];o&&o(a);var s=r[a.type](a);s&&(e+=s,s.length&&a.selectors&&(e+=n))}return e}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2?arguments[2]:void 0,r={charset:function(t){return"@charset "+t.name+";"},comment:function(t){return 0===t.comment.indexOf("__CSSVARSPONYFILL")?"/*"+t.comment+"*/":""},"custom-media":function(t){return"@custom-media "+t.name+" "+t.media+";"},declaration:function(t){return t.property+":"+t.value+";"},document:function(t){return"@"+(t.vendor||"")+"document "+t.document+"{"+e(t.rules)+"}"},"font-face":function(t){return"@font-face{"+e(t.declarations)+"}"},host:function(t){return"@host{"+e(t.rules)+"}"},import:function(t){return"@import "+t.name+";"},keyframe:function(t){return t.values.join(",")+"{"+e(t.declarations)+"}"},keyframes:function(t){return"@"+(t.vendor||"")+"keyframes "+t.name+"{"+e(t.keyframes)+"}"},media:function(t){return"@media "+t.media+"{"+e(t.rules)+"}"},namespace:function(t){return"@namespace "+t.name+";"},page:function(t){return"@page "+(t.selectors.length?t.selectors.join(", "):"")+"{"+e(t.declarations)+"}"},rule:function(t){var n=t.declarations;if(n.length)return t.selectors.join(",")+"{"+e(n)+"}"},supports:function(t){return"@supports "+t.supports+"{"+e(t.rules)+"}"}};return e(t.stylesheet.rules)}(a)}function c(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3?arguments[3]:void 0;if(-1===t.indexOf("var("))return t;var r=f("(",")",t),i="CSS transform warning:";return r?"var"===r.pre.slice(-3)?0===r.body.trim().length?(n.onWarning("".concat(i," var() must contain a non-whitespace string")),t):r.pre.slice(0,-3)+function(t){var r=t.split(",")[0].replace(/[\s\n\t]/g,""),a=(t.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],s=e.hasOwnProperty(r)?String(e[r]):void 0,u=s||(a?String(a):void 0),l=o||t;return s||n.onWarning("".concat(i,' variable "').concat(r,'" is undefined')),u&&"undefined"!==u&&u.length>0?c(u,e,n,l):"var(".concat(l,")")}(r.body)+c(r.post,e,n):r.pre+"(".concat(c(r.body,e,n),")")+c(r.post,e,n):(-1!==t.indexOf("var(")&&n.onWarning("".concat(i,' missing closing ")" in the value "').concat(t,'"')),t)}function m(){function n(t,e,n,o){a.silent||console.error("".concat(t,"\n"),e),a.onError(t,e,n,o)}function r(t){a.silent||console.warn(t),a.onWarning(t)}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t({},w,i),s=g;if(a.exclude="#".concat(s)+(a.exclude?",".concat(a.exclude):""),v)if("loading"!==document.readyState){var u=a.shadowDOM||a.rootElement.shadowRoot||a.rootElement.host;if(_&&a.onlyLegacy){if(a.updateDOM){
var c=a.rootElement.host||(a.rootElement===document?document.documentElement:a.rootElement);Object.keys(a.variables).forEach(function(t){var e="--".concat(t.replace(/^-+/,"")),n=a.variables[t];c.style.setProperty(e,n)})}}else u&&!S?o({rootElement:w.rootElement,include:w.include,exclude:a.exclude,onSuccess:function(t,e,n){return(t.match(b.cssRootRules)||[]).join("")||!1},onComplete:function(t,e,n){l(t,{persist:!0}),S=!0,m(a)}}):(a.watch?function(t,e){if(window.MutationObserver){var n=function(t){return"LINK"===t.tagName&&-1!==(t.getAttribute("rel")||"").indexOf("stylesheet")},o=function(t){return"STYLE"===t.tagName&&(!e||t.id!==e)},r=null;x&&x.disconnect(),t.watch=w.watch,(x=new MutationObserver(function(e){var i=!1;e.forEach(function(e){if("attributes"===e.type)i=n(e.target)||o(e.target);else if("childList"===e.type){var a=Array.apply(null,e.addedNodes),s=Array.apply(null,e.removedNodes);i=[].concat(a,s).some(function(t){var e=n(t)&&!t.disabled,r=o(t)&&!t.disabled&&b.cssVars.test(t.textContent);return e||r})}i&&(clearTimeout(r),r=setTimeout(function(){m(t)},1))})})).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0})}}(a,s):!1===a.watch&&x&&x.disconnect(),o({rootElement:a.rootElement,include:a.include,exclude:a.exclude,filter:a.onlyVars?b.cssVars:null,onBeforeSend:a.onBeforeSend,onSuccess:function(t,e,n){var o=a.onSuccess(t,e,n);return t=void 0!==o&&!1===Boolean(o)?"":o||t,a.updateURLs&&(t.replace(b.cssComments,"").match(b.cssUrls)||[]).forEach(function(e){var o=e.replace(b.cssUrls,"$1"),r=p(o,n);t=t.replace(e,e.replace(o,r))}),t},onError:function(t,e,o){var r=t.responseURL||p(o,location.href),i=t.statusText?"(".concat(t.statusText,")"):"Unspecified Error"+(0===t.status?" (possibly CORS related)":"");n("CSS XHR Error: ".concat(r," ").concat(t.status," ").concat(i),e,t,r)},onComplete:function(o,i,u){var c=null;o=i.map(function(t,e){return b.cssVars.test(t)?t:"/*__CSSVARSPONYFILL-".concat(e,"__*/")}).join("");try{o=l(o,{fixNestedCalc:a.fixNestedCalc,onlyVars:a.onlyVars,persist:a.updateDOM,preserve:a.preserve,variables:a.variables,onWarning:r});var p=b.cssKeyframes.test(o);if(o=o.replace(/\/\*__CSSVARSPONYFILL-(\d+)__\*\//g,function(t,e){return i[e]}),a.updateDOM&&u&&u.length){var f=u[u.length-1];(c=a.rootElement.querySelector("#".concat(s))||document.createElement("style")).setAttribute("id",s),c.textContent!==o&&(c.textContent=o),f.nextSibling!==c&&f.parentNode&&f.parentNode.insertBefore(c,f.nextSibling),p&&function(t){var e=["animation-name","-moz-animation-name","-webkit-animation-name"].filter(function(t){return getComputedStyle(document.body)[t]})[0];if(e){for(var n=t.getElementsByTagName("*"),o=[],r=0,i=n.length;r<i;r++){var a=n[r];"none"!==getComputedStyle(a)[e]&&(a.style[e]+="__CSSVARSPONYFILL-KEYFRAMES__",o.push(a))}document.body.offsetHeight;for(var s=0,u=o.length;s<u;s++){var l=o[s].style;l[e]=l[e].replace("__CSSVARSPONYFILL-KEYFRAMES__","")}}}(a.rootElement)}}catch(t){var d=!1;i.forEach(function(t,e){try{t=l(t,a)}catch(t){var o=u[e-0];d=!0,n(t.message,o)}}),d||n(t.message||t)}if(a.shadowDOM)for(var h,g=[a.rootElement].concat(e(a.rootElement.querySelectorAll("*"))),v=0;h=g[v];++v)h.shadowRoot&&h.shadowRoot.querySelector("style")&&m(t({},a,{rootElement:h.shadowRoot,variables:y.dom}));a.onComplete(o,c,JSON.parse(JSON.stringify(a.updateDOM?y.dom:y.temp)))}}))}else document.addEventListener("DOMContentLoaded",function t(e){m(i),document.removeEventListener("DOMContentLoaded",t)})}function p(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,n=document.implementation.createHTMLDocument(""),o=n.createElement("base"),r=n.createElement("a");return n.head.appendChild(o),n.body.appendChild(r),o.href=e,r.href=t,r.href}var f=i;i.range=s;var d="--",h="var",y={dom:{},temp:{},user:{}},g="css-vars-ponyfill",v="undefined"!=typeof window,_=v&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),w={rootElement:v?document:null,include:"style,link[rel=stylesheet]",exclude:"",fixNestedCalc:!0,onlyLegacy:!0,onlyVars:!1,preserve:!1,shadowDOM:!1,silent:!1,updateDOM:!0,updateURLs:!0,variables:{},watch:null,onBeforeSend:function(){},onSuccess:function(){},onWarning:function(){},onError:function(){},onComplete:function(){}},b={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssRootRules:/(?::root\s*{\s*[^}]*})/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVars:/(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},x=null,S=!1;return m}),/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
function(t,e){"use strict";function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||c(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,r=o.width*o.height;this.intersectionRatio=n?Number((r/n).toFixed(4)):this.isIntersecting?1:0}function o(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=i(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(){return t.performance&&performance.now&&performance.now()}function i(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function a(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function u(t,e){var n=Math.max(t.top,e.top),o=Math.min(t.bottom,e.bottom),r=Math.max(t.left,e.left),i=Math.min(t.right,e.right),a=i-r,s=o-n;return a>=0&&s>=0&&{top:n,bottom:o,left:r,right:i,width:a,height:s}}function l(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):c()}function c(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function m(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var f=[];o.prototype.THROTTLE_TIMEOUT=100,o.prototype.POLL_INTERVAL=null,o.prototype.USE_MUTATION_OBSERVER=!0,o.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},o.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},o.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},o.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},o.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},o.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},o.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(a(t,"resize",this._checkForIntersections,!0),a(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},o.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},o.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():c();this._observationTargets.forEach(function(o){var i=o.element,a=l(i),s=this._rootContainsTarget(i),u=o.entry,c=t&&s&&this._computeTargetAndRootIntersection(i,e),m=o.entry=new n({time:r(),target:i,boundingClientRect:a,rootBounds:e,intersectionRect:c});u?t&&s?this._hasCrossedThreshold(u,m)&&this._queuedEntries.push(m):u&&u.isIntersecting&&this._queuedEntries.push(m):this._queuedEntries.push(m)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},o.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){for(var r=l(n),i=r,a=p(n),s=!1;!s;){var c=null,m=1==a.nodeType?t.getComputedStyle(a):{};if("none"==m.display)return;if(a==this.root||a==e?(s=!0,c=o):a!=e.body&&a!=e.documentElement&&"visible"!=m.overflow&&(c=l(a)),c&&!(i=u(c,i)))break;a=p(a)}return i}},o.prototype._getRootRect=function(){var t;if(this.root)t=l(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},o.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},o.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var r=0;r<this.thresholds.length;r++){var i=this.thresholds[r];if(i==n||i==o||i<n!=i<o)return!0}},o.prototype._rootIsInDom=function(){return!this.root||m(e,this.root)},o.prototype._rootContainsTarget=function(t){return m(this.root||e,t)},o.prototype._registerInstance=function(){f.indexOf(this)<0&&f.push(this)},o.prototype._unregisterInstance=function(){var t=f.indexOf(this);-1!=t&&f.splice(t,1)},t.IntersectionObserver=o,t.IntersectionObserverEntry=n}(window,document),void 0===Currency)var Currency={};Currency.cookie={configuration:{expires:365,path:"/",domain:window.location.hostname},name:"currency",write:function(t){jQuery.cookie(this.name,t,this.configuration)},read:function(){return jQuery.cookie(this.name)},destroy:function(){jQuery.cookie(this.name,null,this.configuration)}},Currency.moneyFormats={USD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} USD"},EUR:{money_format:"&euro;{{amount}}",money_with_currency_format:"&euro;{{amount}} EUR"},GBP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} GBP"},CAD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} CAD"},ALL:{money_format:"Lek {{amount}}",money_with_currency_format:"Lek {{amount}} ALL"},DZD:{money_format:"DA {{amount}}",money_with_currency_format:"DA {{amount}} DZD"},AOA:{money_format:"Kz{{amount}}",money_with_currency_format:"Kz{{amount}} AOA"},ARS:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} ARS"},AMD:{money_format:"{{amount}} AMD",money_with_currency_format:"{{amount}} AMD"},AWG:{money_format:"Afl{{amount}}",money_with_currency_format:"Afl{{amount}} AWG"},AUD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} AUD"},BBD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} Bds"},AZN:{money_format:"m.{{amount}}",money_with_currency_format:"m.{{amount}} AZN"},BDT:{money_format:"Tk {{amount}}",money_with_currency_format:"Tk {{amount}} BDT"},BSD:{money_format:"BS${{amount}}",money_with_currency_format:"BS${{amount}} BSD"},BHD:{money_format:"{{amount}}0 BD",money_with_currency_format:"{{amount}}0 BHD"},BYR:{money_format:"Br {{amount}}",money_with_currency_format:"Br {{amount}} BYR"},BZD:{money_format:"BZ${{amount}}",money_with_currency_format:"BZ${{amount}} BZD"},BTN:{money_format:"Nu {{amount}}",money_with_currency_format:"Nu {{amount}} BTN"},BAM:{money_format:"KM {{amount_with_comma_separator}}",money_with_currency_format:"KM {{amount_with_comma_separator}} BAM"},BRL:{money_format:"R$ {{amount_with_comma_separator}}",money_with_currency_format:"R$ {{amount_with_comma_separator}} BRL"},BOB:{money_format:"Bs{{amount_with_comma_separator}}",money_with_currency_format:"Bs{{amount_with_comma_separator}} BOB"},BWP:{money_format:"P{{amount}}",money_with_currency_format:"P{{amount}} BWP"},BND:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} BND"},BGN:{money_format:"{{amount}} лв",money_with_currency_format:"{{amount}} лв BGN"},MMK:{money_format:"K{{amount}}",money_with_currency_format:"K{{amount}} MMK"},KHR:{money_format:"KHR{{amount}}",money_with_currency_format:"KHR{{amount}}"},KYD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} KYD"},XAF:{money_format:"FCFA{{amount}}",money_with_currency_format:"FCFA{{amount}} XAF"},CLP:{money_format:"${{amount_no_decimals}}",money_with_currency_format:"${{amount_no_decimals}} CLP"},CNY:{money_format:"&#165;{{amount}}",money_with_currency_format:"&#165;{{amount}} CNY"},COP:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} COP"},CRC:{money_format:"&#8353; {{amount_with_comma_separator}}",money_with_currency_format:"&#8353; {{amount_with_comma_separator}} CRC"},HRK:{money_format:"{{amount_with_comma_separator}} kn",money_with_currency_format:"{{amount_with_comma_separator}} kn HRK"},CZK:{money_format:"{{amount_with_comma_separator}} K&#269;",money_with_currency_format:"{{amount_with_comma_separator}} K&#269;"},DKK:{money_format:"{{amount_with_comma_separator}} kr",money_with_currency_format:"kr.{{amount_with_comma_separator}}"},DOP:{money_format:"RD$ {{amount_with_comma_separator}}",money_with_currency_format:"RD$ {{amount_with_comma_separator}}"},XCD:{money_format:"${{amount}}",money_with_currency_format:"EC${{amount}}"},EGP:{money_format:"LE {{amount}}",money_with_currency_format:"LE {{amount}} EGP"},ETB:{money_format:"Br{{amount}}",money_with_currency_format:"Br{{amount}} ETB"},XPF:{money_format:"{{amount_no_decimals_with_comma_separator}} XPF",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} XPF"},FJD:{money_format:"${{amount}}",money_with_currency_format:"FJ${{amount}}"},GMD:{money_format:"D {{amount}}",money_with_currency_format:"D {{amount}} GMD"},GHS:{money_format:"GH&#8373;{{amount}}",money_with_currency_format:"GH&#8373;{{amount}}"},GTQ:{money_format:"Q{{amount}}",money_with_currency_format:"{{amount}} GTQ"},GYD:{money_format:"G${{amount}}",money_with_currency_format:"${{amount}} GYD"},GEL:{money_format:"{{amount}} GEL",money_with_currency_format:"{{amount}} GEL"},HNL:{money_format:"L {{amount}}",money_with_currency_format:"L {{amount}} HNL"},HKD:{money_format:"${{amount}}",money_with_currency_format:"HK${{amount}}"},HUF:{money_format:"{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} Ft"},ISK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr ISK"},INR:{money_format:"Rs. {{amount}}",money_with_currency_format:"Rs. {{amount}}"},IDR:{money_format:"{{amount_with_comma_separator}}",money_with_currency_format:"Rp {{amount_with_comma_separator}}"},ILS:{money_format:"{{amount}} NIS",money_with_currency_format:"{{amount}} NIS"},JMD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} JMD"},JPY:{money_format:"&#165;{{amount_no_decimals}}",money_with_currency_format:"&#165;{{amount_no_decimals}} JPY"},JEP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} JEP"},JOD:{money_format:"{{amount}}0 JD",money_with_currency_format:"{{amount}}0 JOD"},KZT:{money_format:"{{amount}} KZT",money_with_currency_format:"{{amount}} KZT"},KES:{money_format:"KSh{{amount}}",money_with_currency_format:"KSh{{amount}}"},KWD:{money_format:"{{amount}}0 KD",money_with_currency_format:"{{amount}}0 KWD"},KGS:{money_format:"лв{{amount}}",money_with_currency_format:"лв{{amount}}"},LVL:{money_format:"Ls {{amount}}",money_with_currency_format:"Ls {{amount}} LVL"},LBP:{money_format:"L&pound;{{amount}}",money_with_currency_format:"L&pound;{{amount}} LBP"},LTL:{money_format:"{{amount}} Lt",money_with_currency_format:"{{amount}} Lt"},MGA:{money_format:"Ar {{amount}}",money_with_currency_format:"Ar {{amount}} MGA"},MKD:{money_format:"ден {{amount}}",money_with_currency_format:"ден {{amount}} MKD"},MOP:{money_format:"MOP${{amount}}",money_with_currency_format:"MOP${{amount}}"},MVR:{money_format:"Rf{{amount}}",money_with_currency_format:"Rf{{amount}} MRf"},MXN:{money_format:"$ {{amount}}",money_with_currency_format:"$ {{amount}} MXN"},MYR:{money_format:"RM{{amount}} MYR",money_with_currency_format:"RM{{amount}} MYR"},MUR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} MUR"},MDL:{money_format:"{{amount}} MDL",money_with_currency_format:"{{amount}} MDL"},MAD:{money_format:"{{amount}} dh",money_with_currency_format:"Dh {{amount}} MAD"},MNT:{money_format:"{{amount_no_decimals}} &#8366",money_with_currency_format:"{{amount_no_decimals}} MNT"},MZN:{money_format:"{{amount}} Mt",money_with_currency_format:"Mt {{amount}} MZN"},NAD:{money_format:"N${{amount}}",money_with_currency_format:"N${{amount}} NAD"},NPR:{money_format:"Rs{{amount}}",money_with_currency_format:"Rs{{amount}} NPR"},ANG:{money_format:"&fnof;{{amount}}",money_with_currency_format:"{{amount}} NA&fnof;"},NZD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} NZD"},NIO:{money_format:"C${{amount}}",money_with_currency_format:"C${{amount}} NIO"},NGN:{money_format:"&#8358;{{amount}}",money_with_currency_format:"&#8358;{{amount}} NGN"},NOK:{money_format:"kr {{amount_with_comma_separator}}",money_with_currency_format:"kr {{amount_with_comma_separator}} NOK"},OMR:{money_format:"{{amount_with_comma_separator}} OMR",money_with_currency_format:"{{amount_with_comma_separator}} OMR"},PKR:{money_format:"Rs.{{amount}}",money_with_currency_format:"Rs.{{amount}} PKR"},PGK:{money_format:"K {{amount}}",money_with_currency_format:"K {{amount}} PGK"},PYG:{money_format:"Gs. {{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"Gs. {{amount_no_decimals_with_comma_separator}} PYG"},PEN:{money_format:"S/. {{amount}}",money_with_currency_format:"S/. {{amount}} PEN"},PHP:{money_format:"&#8369;{{amount}}",money_with_currency_format:"&#8369;{{amount}} PHP"},PLN:{money_format:"{{amount_with_comma_separator}} zl",money_with_currency_format:"{{amount_with_comma_separator}} zl PLN"},QAR:{money_format:"QAR {{amount_with_comma_separator}}",money_with_currency_format:"QAR {{amount_with_comma_separator}}"},RON:{money_format:"{{amount_with_comma_separator}} lei",money_with_currency_format:"{{amount_with_comma_separator}} lei RON"},RUB:{money_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",money_with_currency_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"},RWF:{money_format:"{{amount_no_decimals}} RF",money_with_currency_format:"{{amount_no_decimals}} RWF"},WST:{money_format:"WS$ {{amount}}",money_with_currency_format:"WS$ {{amount}} WST"},SAR:{money_format:"{{amount}} SR",money_with_currency_format:"{{amount}} SAR"},STD:{money_format:"Db {{amount}}",money_with_currency_format:"Db {{amount}} STD"},RSD:{money_format:"{{amount}} RSD",money_with_currency_format:"{{amount}} RSD"},SCR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} SCR"},SGD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} SGD"},SYP:{money_format:"S&pound;{{amount}}",money_with_currency_format:"S&pound;{{amount}} SYP"},ZAR:{money_format:"R {{amount}}",money_with_currency_format:"R {{amount}} ZAR"},KRW:{money_format:"&#8361;{{amount_no_decimals}}",money_with_currency_format:"&#8361;{{amount_no_decimals}} KRW"},LKR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} LKR"},SEK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr SEK"},CHF:{money_format:"SFr. {{amount}}",money_with_currency_format:"SFr. {{amount}} CHF"},TWD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TWD"},THB:{money_format:"{{amount}} &#xe3f;",money_with_currency_format:"{{amount}} &#xe3f; THB"},TZS:{money_format:"{{amount}} TZS",money_with_currency_format:"{{amount}} TZS"},TTD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TTD"},TND:{money_format:"{{amount}}",money_with_currency_format:"{{amount}} DT"},TRY:{money_format:"{{amount}}TL",money_with_currency_format:"{{amount}}TL"},UGX:{money_format:"Ush {{amount_no_decimals}}",money_with_currency_format:"Ush {{amount_no_decimals}} UGX"},UAH:{money_format:"₴{{amount}}",money_with_currency_format:"₴{{amount}} UAH"},AED:{money_format:"Dhs. {{amount}}",money_with_currency_format:"Dhs. {{amount}} AED"},UYU:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} UYU"},VUV:{money_format:"${{amount}}",money_with_currency_format:"${{amount}}VT"},VEF:{money_format:"Bs. {{amount_with_comma_separator}}",money_with_currency_format:"Bs. {{amount_with_comma_separator}} VEF"},VND:{money_format:"{{amount_no_decimals_with_comma_separator}}&#8363;",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} VND"},XBT:{money_format:"{{amount_no_decimals}} BTC",money_with_currency_format:"{{amount_no_decimals}} BTC"},XOF:{money_format:"CFA{{amount}}",money_with_currency_format:"CFA{{amount}} XOF"},ZMW:{money_format:"K{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"ZMW{{amount_no_decimals_with_comma_separator}}"}},Currency.formatMoney=function(t,e){function n(t,e){return void 0===t?e:t}function o(t,e,o,r){if(e=n(e,2),o=n(o,","),r=n(r,"."),isNaN(t)||null==t)return 0;t=(t/100).toFixed(e);var i=t.split(".");return i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+o)+(i[1]?r+i[1]:"")}if("function"==typeof Shopify.formatMoney)return Shopify.formatMoney(t,e);"string"==typeof t&&(t=t.replace(".",""));var r="",i=/\{\{\s*(\w+)\s*\}\}/,a=e||"${{amount}}";switch(a.match(i)[1]){case"amount":r=o(t,2);break;case"amount_no_decimals":r=o(t,0);break;case"amount_with_comma_separator":r=o(t,2,".",",");break;case"amount_no_decimals_with_comma_separator":r=o(t,0,".",",")}return a.replace(i,r)},Currency.currentCurrency="",Currency.format="money_with_currency_format",Currency.convertAll=function(t,e,n,o,r){jQuery(n||"span.money").each(function(){if(0!=jQuery(this).html().length&&(jQuery(this).attr("data-currency")!==e||0!=r)){if(jQuery(this).attr("data-currency-"+e)&&0==r)jQuery(this).html(jQuery(this).attr("data-currency-"+e));else{var n=0,i=Currency.moneyFormats[t][o||Currency.format]||"{{amount}}",a=Currency.moneyFormats[e][o||Currency.format]||"{{amount}}";n=-1!==i.indexOf("amount_no_decimals")?Currency.convert(100*parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10),t,e):"JOD"===t||"KWD"==t||"BHD"==t?Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10)/10,t,e):Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10),t,e);var s=Currency.formatMoney(n,a);jQuery(this).html(s),jQuery(this).attr("data-currency-"+e,s)}jQuery(this).attr("data-currency",e)}}),this.currentCurrency=e,this.cookie.write(e)},/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(n){return e(t,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function n(n,i,s){function u(t,e,o){var r,i="$()."+n+'("'+e+'")';return t.each(function(t,u){var l=s.data(u,n);if(!l)return void a(n+" not initialized. Cannot call methods, i.e. "+i);var c=l[e];if(!c||"_"==e.charAt(0))return void a(i+" is not a valid method");var m=c.apply(l,o);r=void 0===r?m:r}),void 0!==r?r:t}function l(t,e){t.each(function(t,o){var r=s.data(o,n);r?(r.option(e),r._init()):(r=new i(o,e),s.data(o,n,r))})}(s=s||e||t.jQuery)&&(i.prototype.option||(i.prototype.option=function(t){s.isPlainObject(t)&&(this.options=s.extend(!0,this.options,t))}),s.fn[n]=function(t){if("string"==typeof t){return u(this,t,r.call(arguments,1))}return l(this,t),this},o(s))}function o(t){!t||t&&t.bridget||(t.bridget=n)}var r=Array.prototype.slice,i=t.console,a=void 0===i?function(){}:function(t){i.error(t)};return o(e||t.jQuery),n}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},o=n[t]=n[t]||[];return-1==o.indexOf(e)&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var o=n.indexOf(e);return-1!=o&&n.splice(o,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],r=0;r<n.length;r++){var i=n[r];o&&o[i]&&(this.off(t,i),delete o[i]),i.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(e)&&e}function e(){}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;l>e;e++){t[u[e]]=0}return t}function o(t){var e=getComputedStyle(t);return e||s("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function r(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var n=document.body||document.documentElement;n.appendChild(e);var r=o(e);a=200==Math.round(t(r.width)),i.isBoxSizeOuter=a,n.removeChild(e)}}function i(e){if(r(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var i=o(e);if("none"==i.display)return n();var s={};s.width=e.offsetWidth,s.height=e.offsetHeight;for(var c=s.isBorderBox="border-box"==i.boxSizing,m=0;l>m;m++){var p=u[m],f=i[p],d=parseFloat(f);s[p]=isNaN(d)?0:d}var h=s.paddingLeft+s.paddingRight,y=s.paddingTop+s.paddingBottom,g=s.marginLeft+s.marginRight,v=s.marginTop+s.marginBottom,_=s.borderLeftWidth+s.borderRightWidth,w=s.borderTopWidth+s.borderBottomWidth,b=c&&a,x=t(i.width);!1!==x&&(s.width=x+(b?0:h+_));var S=t(i.height);return!1!==S&&(s.height=S+(b?0:y+w)),s.innerWidth=s.width-(h+_),s.innerHeight=s.height-(y+w),s.outerWidth=s.width+g,s.outerHeight=s.height+v,s}}var a,s="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],l=u.length,c=!1;return i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],n=0;n<e.length;n++){var o=e[n],r=o+"MatchesSelector";if(t[r])return r}}();return function(e,n){return e[t](n)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(n){return e(t,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var n={};n.extend=function(t,e){for(var n in e)t[n]=e[n];return t},n.modulo=function(t,e){return(t%e+e)%e};var o=Array.prototype.slice;n.makeArray=function(t){return Array.isArray(t)?t:null===t||void 0===t?[]:"object"==typeof t&&"number"==typeof t.length?o.call(t):[t]},n.removeFrom=function(t,e){var n=t.indexOf(e);-1!=n&&t.splice(n,1)},n.getParent=function(t,n){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,n))return t},n.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},n.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.filterFindElements=function(t,o){t=n.makeArray(t);var r=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void r.push(t);e(t,o)&&r.push(t);for(var n=t.querySelectorAll(o),i=0;i<n.length;i++)r.push(n[i])}}),r},n.debounceMethod=function(t,e,n){n=n||100;var o=t.prototype[e],r=e+"Timeout";t.prototype[e]=function(){var t=this[r];clearTimeout(t);var e=arguments,i=this;this[r]=setTimeout(function(){o.apply(i,e),delete i[r]},n)}},n.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},n.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,n){return e+"-"+n}).toLowerCase()};var r=t.console;return n.htmlInit=function(e,o){n.docReady(function(){var i=n.toDashed(o),a="data-"+i,s=document.querySelectorAll("["+a+"]"),u=document.querySelectorAll(".js-"+i),l=n.makeArray(s).concat(n.makeArray(u)),c=a+"-options",m=t.jQuery;l.forEach(function(t){var n,i=t.getAttribute(a)||t.getAttribute(c);try{n=i&&JSON.parse(i)}catch(e){return void(r&&r.error("Error parsing "+a+" on "+t.className+": "+e))}var s=new e(t,n);m&&m.data(t,o,s)})})},n}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function n(t){for(var e in t)return!1;return null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var r=document.documentElement.style,i="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",s={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[i],u={transform:a,transition:i,transitionDuration:i+"Duration",transitionProperty:i+"Property",transitionDelay:i+"Delay"},l=o.prototype=Object.create(t.prototype);l.constructor=o,l._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},l.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},l.getSize=function(){this.size=e(this.element)},l.css=function(t){var e=this.element.style;for(var n in t){e[u[n]||n]=t[n]}},l.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=t[e?"left":"right"],r=t[n?"top":"bottom"],i=parseFloat(o),a=parseFloat(r),s=this.layout.size;-1!=o.indexOf("%")&&(i=i/100*s.width),-1!=r.indexOf("%")&&(a=a/100*s.height),i=isNaN(i)?0:i,a=isNaN(a)?0:a,i-=e?s.paddingLeft:s.paddingRight,a-=n?s.paddingTop:s.paddingBottom,this.position.x=i,this.position.y=a},l.layoutPosition=function(){var t=this.layout.size,e={},n=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),r=n?"paddingLeft":"paddingRight",i=n?"left":"right",a=n?"right":"left",s=this.position.x+t[r];e[i]=this.getXValue(s),e[a]="";var u=o?"paddingTop":"paddingBottom",l=o?"top":"bottom",c=o?"bottom":"top",m=this.position.y+t[u];e[l]=this.getYValue(m),e[c]="",this.css(e),this.emitEvent("layout",[this])},l.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},l.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},l._transitionTo=function(t,e){this.getPosition();var n=this.position.x,o=this.position.y,r=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var i=t-n,a=e-o,s={};s.transform=this.getTranslate(i,a),this.transition({to:s,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},l.getTranslate=function(t,e){var n=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=n?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},l.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},l.moveTo=l._transitionTo,l.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},l._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},l.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var n in t.onTransitionEnd)e.onEnd[n]=t.onTransitionEnd[n];for(n in t.to)e.ingProperties[n]=!0,t.isCleaning&&(e.clean[n]=!0);if(t.from){this.css(t.from);this.element.offsetHeight;null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var c="opacity,"+function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(a);l.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:c,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(s,this,!1)}},l.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},l.onotransitionend=function(t){this.ontransitionend(t)};var m={"-webkit-transform":"transform"};l.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=m[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],n(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){e.onEnd[o].call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},l.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(s,this,!1),this.isTransitioning=!1},l._removeStyles=function(t){var e={};for(var n in t)e[n]="";this.css(e)};var p={transitionProperty:"",transitionDuration:"",transitionDelay:""};return l.removeTransitionStyles=function(){this.css(p)},l.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},l.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},l.remove=function(){return i&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},l.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},l.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},l.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var n in e)return n},l.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},l.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},l.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(n,o,r,i){return e(t,n,o,r,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,n,o,r){"use strict";function i(t,e){var n=o.getQueryElement(t);if(!n)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(n||t)));this.element=n,l&&(this.$element=l(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var r=++m;this.element.outlayerGUID=r,p[r]=this,this._create(),this._getOption("initLayout")&&this.layout()}function a(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function s(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),n=e&&e[1],o=e&&e[2];return n.length?(n=parseFloat(n))*(d[o]||1):0}var u=t.console,l=t.jQuery,c=function(){},m=0,p={};i.namespace="outlayer",i.Item=r,i.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=i.prototype;o.extend(f,e.prototype),f.option=function(t){o.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},i.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle),this._getOption("resize")&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),n=this.constructor.Item,o=[],r=0;r<e.length;r++){var i=e[r],a=new n(i,this);o.push(a)}return o},f._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=n(this.element)},f._getMeasurement=function(t,e){var o,r=this.options[t];r?("string"==typeof r?o=this.element.querySelector(r):r instanceof HTMLElement&&(o=r),this[t]=o?n(o)[e]:r):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var n=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,n.push(o)},this),this._processLayoutQueue(n)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=s(t),this.stagger)},f._positionItem=function(t,e,n,o,r){o?t.goTo(e,n):(t.stagger(r*this.stagger),t.moveTo(e,n))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){if(this._getOption("resizeContainer")){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},f._getContainerSize=c,f._setContainerMeasure=function(t,e){if(void 0!==t){var n=this.size;n.isBorderBox&&(t+=e?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function n(){r.dispatchEvent(t+"Complete",null,[e])}function o(){++a==i&&n()}var r=this,i=e.length;if(!e||!i)return void n();var a=0;e.forEach(function(e){e.once(t,o)})},f.dispatchEvent=function(t,e,n){var o=e?[e].concat(n):n;if(this.emitEvent(t,o),l)if(this.$element=this.$element||l(this.element),e){var r=l.Event(e);r.type=t,this.$element.trigger(r,n)}else this.$element.trigger(t,n)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){(t=this._find(t))&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){(t=this._find(t))&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=c,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,r=n(t);return{left:e.left-o.left-r.marginLeft,top:e.top-o.top-r.marginTop,right:o.right-e.right-r.marginRight,bottom:o.bottom-e.bottom-r.marginBottom}},f.handleEvent=o.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},o.debounceMethod(i,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=n(this.element);return this.size&&t&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var n=this.items.slice(0);this.items=e.concat(n),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(n)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,n){t.stagger(n*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,n){t.stagger(n*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var n=this.items[e];if(n.element==t)return n}},f.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var n=this.getItem(t);n&&e.push(n)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete p[e],delete this.element.outlayerGUID,l&&l.removeData(this.element,this.constructor.namespace)},i.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&p[e]},i.create=function(t,e){var n=a(i);return n.defaults=o.extend({},i.defaults),o.extend(n.defaults,e),n.compatOptions=o.extend({},i.compatOptions),n.namespace=t,n.data=i.data,n.Item=a(r),o.htmlInit(n,t),l&&l.bridget&&l.bridget(t,n),n};var d={ms:1,s:1e3};return i.Item=r,i}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var n=t.create("masonry");n.compatOptions.fitWidth="isFitWidth";var o=n.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],n=t&&t.element;this.columnWidth=n&&e(n).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,r=this.containerWidth+this.gutter,i=r/o,a=o-r%o,s=a&&1>a?"round":"floor";i=Math[s](i),this.cols=Math.max(i,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),n=t?this.element.parentNode:this.element,o=e(n);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,n=e&&1>e?"round":"ceil",o=Math[n](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var r=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",i=this[r](o,t),a={x:this.columnWidth*i.col,y:i.y},s=i.y+t.size.outerHeight,u=o+i.col,l=i.col;u>l;l++)this.colYs[l]=s;return a},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),n=Math.min.apply(Math,e);return{col:e.indexOf(n),y:n}},o._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],n=this.cols+1-t,o=0;n>o;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var n=this.colYs.slice(t,t+e);return Math.max.apply(Math,n)},o._getHorizontalColPosition=function(t,e){var n=this.horizontalColIndex%this.cols;n=t>1&&n+t>this.cols?0:n;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?n+t:this.horizontalColIndex,{col:n,y:this._getColGroupY(n,t)}},o._manageStamp=function(t){var n=e(t),o=this._getElementOffset(t),r=this._getOption("originLeft"),i=r?o.left:o.right,a=i+n.outerWidth,s=Math.floor(i/this.columnWidth);s=Math.max(0,s);var u=Math.floor(a/this.columnWidth);u-=a%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var l=this._getOption("originTop"),c=(l?o.top:o.bottom)+n.outerHeight,m=s;u>=m;m++)this.colYs[m]=Math.max(c,this.colYs[m])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},n}),/*!

 matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license

*/
window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],o=null;e.type="text/css",e.id="matchmediajs-test",n.parentNode.insertBefore(e,n),o="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===o.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),function(t,e,n){function o(t,e){return typeof t===e}function r(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):x?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function i(){var t=e.body;return t||(t=r(x?"svg":"body"),t.fake=!0),t}function a(t,n,o,a){var s,u,l,c,m="modernizr",p=r("div"),f=i();if(parseInt(o,10))for(;o--;)l=r("div"),l.id=a?a[o]:m+(o+1),p.appendChild(l);return s=r("style"),s.type="text/css",s.id="s"+m,(f.fake?f:p).appendChild(s),f.appendChild(p),s.styleSheet?s.styleSheet.cssText=t:s.appendChild(e.createTextNode(t)),p.id=m,f.fake&&(f.style.background="",f.style.overflow="hidden",c=b.style.overflow,b.style.overflow="hidden",b.appendChild(f)),u=n(p,t),f.fake?(f.parentNode.removeChild(f),b.style.overflow=c,b.offsetHeight):p.parentNode.removeChild(p),!!u}function s(t,e){return!!~(""+t).indexOf(e)}function u(t){return t.replace(/([a-z])-([a-z])/g,function(t,e,n){return e+n.toUpperCase()}).replace(/^-/,"")}function l(t,e){return function(){return t.apply(e,arguments)}}function c(t,e,n){var r;for(var i in t)if(t[i]in e)return!1===n?t[i]:(r=e[t[i]],o(r,"function")?l(r,n||e):r);return!1}function m(t){return t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(e,n,o){var r;if("getComputedStyle"in t){r=getComputedStyle.call(t,e,n);var i=t.console;if(null!==r)o&&(r=r.getPropertyValue(o));else if(i){var a=i.error?"error":"log";i[a].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else r=!n&&e.currentStyle&&e.currentStyle[o];return r}function f(e,o){var r=e.length;if("CSS"in t&&"supports"in t.CSS){for(;r--;)if(t.CSS.supports(m(e[r]),o))return!0;return!1}if("CSSSupportsRule"in t){for(var i=[];r--;)i.push("("+m(e[r])+":"+o+")");return i=i.join(" or "),a("@supports ("+i+") { #modernizr { position: absolute; } }",function(t){return"absolute"==p(t,null,"position")})}return n}function d(t,e,i,a){function l(){m&&(delete k.style,delete k.modElem)}if(a=!o(a,"undefined")&&a,!o(i,"undefined")){var c=f(t,i);if(!o(c,"undefined"))return c}for(var m,p,d,h,y,g=["modernizr","tspan","samp"];!k.style&&g.length;)m=!0,k.modElem=r(g.shift()),k.style=k.modElem.style;for(d=t.length,p=0;d>p;p++)if(h=t[p],y=k.style[h],s(h,"-")&&(h=u(h)),k.style[h]!==n){if(a||o(i,"undefined"))return l(),"pfx"!=e||h;try{k.style[h]=i}catch(t){}if(k.style[h]!=y)return l(),"pfx"!=e||h}return l(),!1}function h(t,e,n,r,i){var a=t.charAt(0).toUpperCase()+t.slice(1),s=(t+" "+E.join(a+" ")+a).split(" ");return o(e,"string")||o(e,"undefined")?d(s,e,r,i):(s=(t+" "+I.join(a+" ")+a).split(" "),c(s,e,n))}function y(t,e,o){return h(t,n,n,e,o)}var g=[],v=[],_={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(t,e){var n=this;setTimeout(function(){e(n[t])},0)},addTest:function(t,e,n){v.push({name:t,fn:e,options:n})},addAsyncTest:function(t){v.push({name:null,fn:t})}},w=function(){};w.prototype=_,w=new w,w.addTest("localstorage",function(){var t="modernizr";try{return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch(t){return!1}});var b=e.documentElement,x="svg"===b.nodeName.toLowerCase(),S=_._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];_._prefixes=S;var C=_.testStyles=a;w.addTest("touchevents",function(){var n;if("ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch)n=!0;else{var o=["@media (",S.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");C(o,function(t){n=9===t.offsetTop})}return n});var T="Moz O ms Webkit",E=_._config.usePrefixes?T.split(" "):[];_._cssomPrefixes=E;var I=_._config.usePrefixes?T.toLowerCase().split(" "):[];_._domPrefixes=I;var P={elem:r("modernizr")};w._q.push(function(){delete P.elem});var k={style:P.elem.style};w._q.unshift(function(){delete k.style}),_.testAllProps=h,_.testAllProps=y,w.addTest("cssgridlegacy",y("grid-columns","10px",!0)),w.addTest("cssgrid",y("grid-template-rows","none",!0)),function(){var t,e,n,r,i,a,s;for(var u in v)if(v.hasOwnProperty(u)){if(t=[],e=v[u],e.name&&(t.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(n=0;n<e.options.aliases.length;n++)t.push(e.options.aliases[n].toLowerCase());for(r=o(e.fn,"function")?e.fn():e.fn,i=0;i<t.length;i++)a=t[i],s=a.split("."),1===s.length?w[s[0]]=r:(!w[s[0]]||w[s[0]]instanceof Boolean||(w[s[0]]=new Boolean(w[s[0]])),w[s[0]][s[1]]=r),g.push((r?"":"no-")+s.join("-"))}}(),function(t){var e=b.className,n=w._config.classPrefix||"";if(x&&(e=e.baseVal),w._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");e=e.replace(o,"$1"+n+"js$2")}w._config.enableClasses&&(e+=" "+n+t.join(" "+n),x?b.className.baseVal=e:b.className=e)}(g),delete _.addTest,delete _.addAsyncTest;for(var A=0;A<w._q.length;A++)w._q[A]();t.Modernizr=w}(window,document),
// Copyright (c) 2016 Moe Amaya (@moeamaya)
// MIT license
//
// Thanks to Paraxify.js and Jaime Cabllero
// for parallax concepts
// ------------------------------------------
function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Rellax=e()}("undefined"!=typeof window?window:global,function(){var t=function(e,n){"use strict";var o=Object.create(t.prototype),r=0,i=0,a=0,s=0,u=[],l=!0,c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},m=null,p=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,f=window.transformProp||function(){var t=document.createElement("div");if(null===t.style.transform){var e=["Webkit","Moz","ms"];for(var n in e)if(void 0!==t.style[e[n]+"Transform"])return e[n]+"Transform"}return"transform"}();o.options={speed:-2,center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,callback:function(){}},n&&Object.keys(n).forEach(function(t){o.options[t]=n[t]}),e||(e=".rellax");var d="string"==typeof e?document.querySelectorAll(e):[e];if(!(d.length>0))return void console.warn("Rellax: The elements you're trying to select don't exist.");if(o.elems=d,o.options.wrapper&&!o.options.wrapper.nodeType){var h=document.querySelector(o.options.wrapper);if(!h)return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");o.options.wrapper=h}var y=function(){for(var t=0;t<o.elems.length;t++){var e=v(o.elems[t]);u.push(e)}},g=function(){for(var t=0;t<u.length;t++)o.elems[t].style.cssText=u[t].style;u=[],i=window.innerHeight,s=window.innerWidth,_(),y(),x(),l&&(window.addEventListener("resize",g),l=!1,b())},v=function(t){var e=t.getAttribute("data-rellax-percentage"),n=t.getAttribute("data-rellax-speed"),r=t.getAttribute("data-rellax-zindex")||0,a=t.getAttribute("data-rellax-min"),u=t.getAttribute("data-rellax-max"),l=o.options.wrapper?o.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;if(o.options.relativeToWrapper){l=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-o.options.wrapper.offsetTop}var c=o.options.vertical&&(e||o.options.center)?l:0,m=o.options.horizontal&&(e||o.options.center)?o.options.wrapper?o.options.wrapper.scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0,p=c+t.getBoundingClientRect().top,f=t.clientHeight||t.offsetHeight||t.scrollHeight,d=m+t.getBoundingClientRect().left,h=t.clientWidth||t.offsetWidth||t.scrollWidth,y=e||(c-p+i)/(f+i),g=e||(m-d+s)/(h+s);o.options.center&&(g=.5,y=.5);var v=n||o.options.speed,_=w(g,y,v),b=t.style.cssText,x="",S=/transform\s*:/i.exec(b);if(S){var C=S.index,T=b.slice(C),E=T.indexOf(";");x=E?" "+T.slice(11,E).replace(/\s/g,""):" "+T.slice(11).replace(/\s/g,"")}return{baseX:_.x,baseY:_.y,top:p,left:d,height:f,width:h,speed:v,style:b,transform:x,zindex:r,min:a,max:u}},_=function(){var t=r,e=a;if(r=o.options.wrapper?o.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset,a=o.options.wrapper?o.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset,o.options.relativeToWrapper){var n=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;r=n-o.options.wrapper.offsetTop}return!(t==r||!o.options.vertical)||!(e==a||!o.options.horizontal)},w=function(t,e,n){var r={},i=n*(100*(1-t)),a=n*(100*(1-e));return r.x=o.options.round?Math.round(i):Math.round(100*i)/100,r.y=o.options.round?Math.round(a):Math.round(100*a)/100,r},b=function(){_()&&!1===l&&x(),m=c(b)},x=function(){for(var t,e=0;e<o.elems.length;e++){var n=(r-u[e].top+i)/(u[e].height+i),l=(a-u[e].left+s)/(u[e].width+s);t=w(l,n,u[e].speed);var c=t.y-u[e].baseY,m=t.x-u[e].baseX;null!==u[e].min&&(o.options.vertical&&!o.options.horizontal&&(c=c<=u[e].min?u[e].min:c),o.options.horizontal&&!o.options.vertical&&(m=m<=u[e].min?u[e].min:m)),null!==u[e].max&&(o.options.vertical&&!o.options.horizontal&&(c=c>=u[e].max?u[e].max:c),o.options.horizontal&&!o.options.vertical&&(m=m>=u[e].max?u[e].max:m));var p=u[e].zindex,d="translate3d("+(o.options.horizontal?m:"0")+"px,"+(o.options.vertical?c:"0")+"px,"+p+"px) "+u[e].transform;o.elems[e].style[f]=d}o.options.callback(t)};return o.destroy=function(){for(var t=0;t<o.elems.length;t++)o.elems[t].style.cssText=u[t].style;l||(window.removeEventListener("resize",g),l=!0),p(m),m=null},g(),o.refresh=g,o};return t}),function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.scrollama=e()}(this,function(){"use strict";function t(t){for(var e=t.length,n=[],o=0;o<e;o+=1)n.push(t[o]);return n}function e(e,n){return void 0===n&&(n=document),"string"==typeof e?t(n.querySelectorAll(e)):e instanceof Element?t([e]):e instanceof NodeList?t(e):e instanceof Array?e:[]}function n(t){return"scrollama__debug-step--"+t.id+"-"+t.i}function o(t){return"scrollama__debug-offset--"+t.id}function r(t){var e=t.id,n=t.offsetVal,r=t.stepClass,i=document.createElement("div");i.setAttribute("id",o({id:e})),i.setAttribute("class","scrollama__debug-offset"),i.style.position="fixed",i.style.left="0",i.style.width="100%",i.style.height="0px",i.style.borderTop="2px dashed black",i.style.zIndex="9999";var a=document.createElement("p");a.innerText='".'+r+'" trigger: '+n,a.style.fontSize="12px",a.style.fontFamily="monospace",a.style.color="black",a.style.margin="0",a.style.padding="6px",i.appendChild(a),document.body.appendChild(i)}function i(t){r({id:t.id,offsetVal:t.offsetVal,stepClass:t.stepEl[0].getAttribute("class")})}function a(t){var e=t.id,n=t.offsetMargin,r=(t.offsetVal,o({id:e}));document.querySelector("#"+r).style.top=n+"px"}function s(t){var e=t.id,n=(t.stepOffsetHeight,t.offsetMargin);t.offsetVal;a({id:e,offsetMargin:n})}function u(t){var e=t.id,o=t.index,r=t.state,i=n({id:e,i:o}),a=document.querySelector("#"+i+"_above"),s=document.querySelector("#"+i+"_below"),u="enter"===r?"block":"none";a&&(a.style.display=u),s&&(s.style.display=u)}function l(){function t(){var t="abcdefghijklmnopqrstuv",e=t.length,n=Date.now();return""+[0,0,0].map(function(n){return t[Math.floor(Math.random()*e)]}).join("")+n}function n(t){var e=0;if(t.offsetParent)do{e+=t.offsetTop,t=t.offsetParent}while(t);return e<0?0:e}function o(){var t=document.body,e=document.documentElement;return Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight)}function r(t){return+t.getAttribute("data-scrollama-index")}function a(){window.pageYOffset>j?Q="down":window.pageYOffset<j&&(Q="up"),j=window.pageYOffset}function l(t){L[t]&&L[t].forEach(function(t){return t.disconnect()})}function c(){W=window.innerHeight,B=o(),$=D*W,q&&(z=N.map(function(t){return t.offsetHeight}),V=N.map(n),Y&&I()),X&&s({id:M,stepOffsetHeight:z,offsetMargin:$,offsetVal:D})}function m(t){if(t&&!Y)return q&&I(),Y=!0,!0;O.forEach(l),Y=!1}function p(t){for(var e=Math.ceil(t/H),n=[],o=1/e,r=0;r<e;r++)n.push(r*o);return n}function f(t,e){var n=r(t);void 0!==e&&(F[n].progress=e);var o={element:t,index:n,progress:F[n].progress};"enter"===F[n].state&&R.stepProgress(o)}function d(t,e){if("above"===e)for(var n=0;n<t;n++){var o=F[n];"enter"!==o.state&&"down"!==o.direction?(h(N[n],"down",!1),y(N[n],"down")):"enter"===o.state&&y(N[n],"down")}else if("below"===e)for(var r=F.length-1;r>t;r--){var i=F[r];"enter"===i.state&&y(N[r],"up"),"down"===i.direction&&(h(N[r],"up",!1),y(N[r],"up"))}}function h(t,e,n){void 0===n&&(n=!0);var o=r(t),i={element:t,index:o,direction:e};F[o].direction=e,F[o].state="enter",G&&n&&"down"===e&&d(o,"above"),G&&n&&"up"===e&&d(o,"below"),R.stepEnter&&!Z[o]&&(R.stepEnter(i,F),X&&u({id:M,index:o,state:"enter"}),K&&(Z[o]=!0)),U&&f(t)}function y(t,e){var n=r(t),o={element:t,index:n,direction:e};U&&("down"===e&&F[n].progress<1?f(t,1):"up"===e&&F[n].progress>0&&f(t,0)),F[n].direction=e,F[n].state="exit",R.stepExit(o,F),X&&u({id:M,index:n,state:"exit"})}function g(t){var e=t[0];a();var n=e.isIntersecting,o=e.boundingClientRect,i=e.target,s=o.top,u=o.bottom,l=s-$,c=u-$,m=r(i),p=F[m];n&&l<=0&&c>=0&&"down"===Q&&"enter"!==p.state&&h(i,Q),!n&&l>0&&"up"===Q&&"enter"===p.state&&y(i,Q)}function v(t){var e=t[0];a();var n=e.isIntersecting,o=e.boundingClientRect,i=e.target,s=o.top,u=o.bottom,l=s-$,c=u-$,m=r(i),p=F[m];n&&l<=0&&c>=0&&"up"===Q&&"enter"!==p.state&&h(i,Q),!n&&c<0&&"down"===Q&&"enter"===p.state&&y(i,Q)}function _(t){var e=t[0];a();var n=e.isIntersecting,o=e.target,i=r(o),s=F[i];n&&"down"===Q&&"down"!==s.direction&&"enter"!==s.state&&(h(o,"down"),y(o,"down"))}function w(t){var e=t[0];a();var n=e.isIntersecting,o=e.target,i=r(o),s=F[i];n&&"up"===Q&&"down"===s.direction&&"enter"!==s.state&&(h(o,"up"),y(o,"up"))}function b(t){var e=t[0];a();var n=e.isIntersecting,o=e.intersectionRatio,r=e.boundingClientRect,i=e.target,s=r.bottom,u=s-$;n&&u>=0&&f(i,+o.toFixed(3))}function x(){L.viewportAbove=N.map(function(t,e){var n=B-V[e],o=$-W-z[e],r=n+"px 0px "+o+"px 0px",i={rootMargin:r},a=new IntersectionObserver(_,i);return a.observe(t),a})}function S(){L.viewportBelow=N.map(function(t,e){var n=-$-z[e],o=$-W+z[e]+B,r=n+"px 0px "+o+"px 0px",i={rootMargin:r},a=new IntersectionObserver(w,i);return a.observe(t),a})}function C(){L.stepAbove=N.map(function(t,e){var n=-$+z[e],o=$-W,r=n+"px 0px "+o+"px 0px",i={rootMargin:r},a=new IntersectionObserver(g,i);return a.observe(t),a})}function T(){L.stepAbove=N.map(function(t,e){var n=-$,o=$-W+z[e],r=n+"px 0px "+o+"px 0px",i={rootMargin:r},a=new IntersectionObserver(v,i);return a.observe(t),a})}function E(){L.stepProgress=N.map(function(t,e){var n=z[e]-$,o=-W+$,r=n+"px 0px "+o+"px 0px",i=p(z[e]),a={rootMargin:r,threshold:i},s=new IntersectionObserver(b,a);return s.observe(t),s})}function I(){O.forEach(l),x(),S(),C(),T(),U&&E()}function P(){N.forEach(function(t,e){return t.setAttribute("data-scrollama-index",e)})}function k(){F=N.map(function(){return{direction:null,state:null,progress:0}})}function A(){X&&i({id:M,stepEl:N,offsetVal:D})}var O=["stepAbove","stepBelow","stepProgress","viewportAbove","viewportBelow"],R={stepEnter:function(){},stepExit:function(){},stepProgress:function(){}},L={},M=null,N=[],z=[],V=[],F=[],D=0,$=0,W=0,B=0,j=0,H=0,q=!1,Y=!1,X=!1,U=!1,G=!1,K=!1,Q="down",Z=[],J={};return J.setup=function(n){var o=n.step,r=n.offset;void 0===r&&(r=.5);var i=n.progress;void 0===i&&(i=!1);var a=n.threshold;void 0===a&&(a=4);var s=n.debug;void 0===s&&(s=!1);var u=n.order;void 0===u&&(u=!0);var l=n.once;return void 0===l&&(l=!1),M=t(),N=e(o),N.length?(X=s,U=i,G=u,K=l,J.offsetTrigger(r),H=Math.max(1,+a),q=!0,A(),P(),k(),c(),J.enable(),J):(console.error("scrollama error: no step elements"),J)},J.resize=function(){return c(),J},J.enable=function(){return m(!0),J},J.disable=function(){return m(!1),J},J.destroy=function(){m(!1),Object.keys(R).forEach(function(t){return R[t]=null}),Object.keys(L).forEach(function(t){return L[t]=null})},J.offsetTrigger=function(t){return t&&!isNaN(t)?(D=Math.min(Math.max(0,t),1),J):D},J.onStepEnter=function(t){return"function"==typeof t?R.stepEnter=t:console.error("scrollama error: onStepEnter requires a function"),J},J.onStepExit=function(t){return"function"==typeof t?R.stepExit=t:console.error("scrollama error: onStepExit requires a function"),J},J.onStepProgress=function(t){return"function"==typeof t?R.stepProgress=t:console.error("scrollama error: onStepProgress requires a function"),J},J}return l});
(function() {
  var FrameworkAlign,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  FrameworkAlign = (function() {
    function FrameworkAlign(element1, type1) {
      this.element = element1;
      this.type = type1;
      this.resizeListeners = bind(this.resizeListeners, this);
      this.fillYSpace = bind(this.fillYSpace, this);
      this.checkOverlap = bind(this.checkOverlap, this);
      this.createOverlapDetectors = bind(this.createOverlapDetectors, this);
      this.position = bind(this.position, this);
      this.parent = this.element.parent();
      this.left_side_border;
      this.right_element_width = null;
      this.position();
      this.fillYSpace();
      this.createOverlapDetectors();
      this.resizeListeners();
    }

    FrameworkAlign.prototype.position = function() {
      if (this.type === 'center-x') {
        this.element.css({
          'margin-left': -(this.element.outerWidth() / 2)
        });
      }
      if (this.type === 'center-y') {
        return this.element.css({
          'margin-top': -(this.element.outerHeight() / 2)
        });
      }
    };

    FrameworkAlign.prototype.createOverlapDetectors = function() {
      var _this;
      _this = this;
      if (_this.type === 'right') {
        return this.right_element_width = _this.element.outerWidth();
      }
    };

    FrameworkAlign.prototype.checkOverlap = function() {
      var _this, left_element, left_side_border, right_side_border;
      _this = this;
      if (_this.type === 'right') {
        _this.parent.removeClass('overlap');
        left_element = _this.parent.children().eq(_this.element.index() - 1);
        left_side_border = left_element.position().left + left_element.outerWidth();
        right_side_border = _this.parent.outerWidth() - _this.right_element_width;
        if (left_side_border >= right_side_border) {
          return _this.parent.addClass('overlap');
        }
      }
    };

    FrameworkAlign.prototype.fillYSpace = function() {
      var _this, container_height, text_panel_height;
      _this = this;
      if (_this.type === 'fill-y--dynamic') {
        container_height = _this.parent.outerHeight();
        text_panel_height = _this.parent.find('.fw--align--fill-y--fixed').outerHeight();
        return _this.element.outerHeight(container_height - text_panel_height);
      }
    };

    FrameworkAlign.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      $(window).on('resize.FrameworkAlign', function() {
        _this.checkOverlap();
        return _this.fillYSpace();
      });
      return setTimeout(function() {
        return _this.checkOverlap();
      }, 1);
    };

    return FrameworkAlign;

  })();

  theme.classes.FrameworkAnimation = (function() {
    function FrameworkAnimation() {}

    return FrameworkAnimation;

  })();

  theme.classes.FrameworkArticle = (function() {
    function FrameworkArticle(root) {
      var _this;
      this.root = root;
      this.startDisqus = bind(this.startDisqus, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.load();
    }

    FrameworkArticle.prototype.load = function() {
      var _this, comments_enabled, enable_disqus;
      _this = this;
      enable_disqus = $('.article--root').attr('data-enable-disqus');
      comments_enabled = $('.article--root').attr('data-comments-enabled');
      if (enable_disqus && comments_enabled) {
        return _this.startDisqus();
      }
    };

    FrameworkArticle.prototype.startDisqus = function() {
      var _this, disqusConfig, disqus_shortname;
      _this = this;
      disqusConfig = function() {
        _this.page.url = $('.article--root').attr('data-canonical-url');
        return _this.page.identifier = $('.article--root').attr('data-article-id');
      };
      disqus_shortname = $('.article--root').attr('data-disqus-shortname');
      return (function() {
        var s;
        s = document.createElement('script');
        s.src = "https://" + disqus_shortname + ".disqus.com/embed.js";
        s.setAttribute('data-timestamp', +new Date());
        return (document.head || document.body).appendChild(s);
      })();
    };

    return FrameworkArticle;

  })();

  theme.classes.FrameworkBlog = (function() {
    function FrameworkBlog(root) {
      var _this;
      this.root = root;
      this.initMasonry = bind(this.initMasonry, this);
      this.eventListeners = bind(this.eventListeners, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.load();
    }

    FrameworkBlog.prototype.load = function() {
      var _this, is_mobile;
      _this = this;
      _this.eventListeners();
      _this.has_multi_columns = _this.root.attr('data-columns') !== '1';
      is_mobile = theme.utils.mqs.current_window === 'small';
      if (!is_mobile && _this.has_multi_columns) {
        _this.initMasonry();
        return $(window).load(function() {
          return _this.initMasonry();
        });
      }
    };

    FrameworkBlog.prototype.eventListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.Blog', theme.utils.debounce(100, function() {
        if (_this.has_multi_columns && theme.utils.mqs.current_window !== 'small') {
          return _this.initMasonry();
        } else {
          return $('.blog--list').masonry('destroy');
        }
      }));
    };

    FrameworkBlog.prototype.initMasonry = function() {
      return $('.blog--list').masonry({
        itemSelector: '.blog--list--item',
        percentPosition: true,
        horizontalOrder: true,
        columnWidth: '.blog--list--item'
      });
    };

    return FrameworkBlog;

  })();

  theme.classes.FrameworkCart = (function() {
    function FrameworkCart(root) {
      var _this;
      this.root = root;
      this.convertCurrency = bind(this.convertCurrency, this);
      this.openModalListener = bind(this.openModalListener, this);
      this.openOffCanvasListener = bind(this.openOffCanvasListener, this);
      this.removeItem = bind(this.removeItem, this);
      this.removeItemListeners = bind(this.removeItemListeners, this);
      this.updateTotalsComplete = bind(this.updateTotalsComplete, this);
      this.updateTotals = bind(this.updateTotals, this);
      this.plusQuantity = bind(this.plusQuantity, this);
      this.minusQuantity = bind(this.minusQuantity, this);
      this.updateQuantityListeners = bind(this.updateQuantityListeners, this);
      this.addItem = bind(this.addItem, this);
      this.renderOther = bind(this.renderOther, this);
      this.renderListener = bind(this.renderListener, this);
      this.renderCart = bind(this.renderCart, this);
      _this = this;
      _this.adjusting_qty_timer = null;
      _this.table_content = _this.root.find('form > .content');
      _this.render_trigger = $('.fw--cart-modal--trigger-render');
      _this.totals = {};
      _this.add_locked = false;
      _this.render_locked = false;
      if (_this.root.hasClass('off-canvas')) {
        _this.view = 'off canvas';
      }
      if (_this.root.hasClass('modal--content')) {
        _this.view = 'modal';
      }
      _this.temp_quantity = 0;
      _this.renderCart();
      if (_this.view === 'off canvas') {
        _this.openOffCanvasListener();
      }
      _this.openModalListener();
      _this.renderListener();
    }

    FrameworkCart.prototype.renderCart = function(callback) {
      var _this;
      _this = this;
      if (!_this.render_locked) {
        _this.render_locked = true;
        _this.table_content.empty();
        return $.ajax({
          type: "GET",
          url: "/cart.js",
          dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
          var cart, index, item, j, len, ref, row;
          if (textStatus === 'success') {
            cart = data;
            if (cart.items.length) {
              _this.root.removeClass('no-items');
            } else {
              _this.root.addClass('no-items');
            }
            ref = cart.items;
            for (index = j = 0, len = ref.length; j < len; index = ++j) {
              item = ref[index];
              item.image_url = Shopify.resizeImage(item.image, "400x");
              item.price = Currency.formatMoney(item.price, theme.money_format);
              if ((index + 1) === cart.items.length) {
                row = '<div class="variant-id last-variant width--12" data-variant-id=' + item.variant_id + '>';
              } else {
                row = '<div class="variant-id width--12" data-variant-id=' + item.variant_id + '>';
              }
              row += '<div class="width--12 width--medium-4 width--large-6 block">';
              if (item.image_url === null) {
                row += '<span class="image block width--4 width--medium-12 width--large-4 spacing--3"></span>';
              } else {
                row += '<span class="image block width--4 width--medium-12 width--large-4 spacing--3"><a href="' + item.url + '"><img src="' + item.image_url + '" alt="' + item.title + '"></a></span>';
              }
              row += '<span class="title show--small show--large block width--8 spacing--3 font--size-4"><a href="' + item.url + '">' + item.title + '</a></span>';
              row += '</div>';
              row += '<div class="right-column width--12 width--medium-8 width--large-6 block spacing--3y text-align--left text-align--large-right">';
              row += '<span class="title show--medium block width--12 spacing--3 font--size-4"><a href="' + item.url + '">' + item.title + '</a></span>';
              row += '<span class="price font--accent spacing--3 font--size-3 money">' + item.price + '</span>';
              row += '<span class="quantity spacing--3"><div class="input--number">';
              row += '<a tabindex="0" aria-label="' + theme.translations.remove_one_item + '" class="minus">' + theme.utils.addSymbol('minus') + '</a>';
              row += '<input type="text" value="' + item.quantity + '" min="1" pattern="[1-9]*">';
              row += '<a tabindex="0" aria-label="' + theme.translations.add_one_item + '" class="plus">' + theme.utils.addSymbol('plus') + '</a>';
              row += '</div></span>';
              row += '<span class="remove spacing--3">';
              row += '<a aria-label="' + theme.translations.remove_item + '" role="button" href="#" class="cart--remove-button remove">' + theme.utils.addSymbol('cross-circle') + '</a>';
              row += '</span>';
              row += '</div>';
              row += '</div>';
              row += '<div class="spacer spacing--3y"></div>';
              _this.table_content.append(row);
            }
            row = '<div class="totals width--12 text-align--center ">';
            row += '<div class="width--12 width--large-8 block">';
            row += '</div>';
            row += '<div class="block spacing--3y width--12 width--large-4 font--size-3 text-align--large-right text--uppercase">';
            row += '<span class="spacing--3">' + theme.translations.cart_subtotal + '</span>';
            row += '<span class="total spacing--3 money font--accent font--subheading--size">' + _this.totals.price + '</span>';
            row += '</div>';
            row += '</div>';
            row += '<div class="spacer spacing--3y show--small-medium"></div>';
            _this.table_content.append(row);
            _this.updateTotals();
            if (callback) {
              callback();
            }
            $(window).trigger('resize.FrameworkModal');
            _this.render_locked = false;
            _this.removeItemListeners();
            _this.updateQuantityListeners();
            return _this.convertCurrency(_this.root.find('.money'));
          } else {
            return console.log('cart - render item status - ' + textStatus);
          }
        }).fail(function(jqXHR, textStatus) {
          console.log("cart rendering failed");
          return _this.render_locked = false;
        });
      }
    };

    FrameworkCart.prototype.renderListener = function() {
      var _this;
      _this = this;
      return _this.root.on('renderCart', function() {
        return _this.renderCart();
      });
    };

    FrameworkCart.prototype.renderOther = function() {
      var _this;
      _this = this;
      if (theme.utils.mqs.current_window === 'small') {
        return $('.fw--cart.modal--content').trigger('renderCart');
      } else {
        return $('.fw--cart.off-canvas').trigger('renderCart');
      }
    };

    FrameworkCart.prototype.addItem = function(form, callback) {
      var _this;
      _this = this;
      if (!_this.add_locked) {
        _this.add_locked = true;
        return $.ajax({
          type: "POST",
          url: "/cart/add.js",
          dataType: "json",
          data: form.serialize()
        }).done(function(data, textStatus, jqXHR) {
          callback(true);
          _this.renderOther();
          return _this.add_locked = false;
        }).fail(function(jqXHR, textStatus) {
          callback(false, $.parseJSON(jqXHR.responseText).description);
          return _this.add_locked = false;
        });
      }
    };

    FrameworkCart.prototype.updateQuantityListeners = function() {
      var _this;
      _this = this;
      _this.table_content.find('.input--number input').attr("autocomplete", "off").on('keyup.LayoutCartModal paste.LayoutCartModal', function() {
        var input, input_wrapper, variant_id;
        input_wrapper = $(this).closest('.input--number');
        input = input_wrapper.find('input');
        if (parseInt(input.val()) > 0) {
          input_wrapper.addClass('updating');
          clearTimeout(_this.adjusting_qty_timer);
          variant_id = $(this).closest('.variant-id').data('variant-id');
          _this.adjusting_qty_timer = setTimeout(function() {
            input_wrapper.removeClass('updating');
            return _this.updateTotals();
          }, 500);
        } else if (parseInt(input.val()) === 0) {
          variant_id = $(this).closest('.variant-id').data('variant-id');
          _this.removeItem(variant_id);
          if ($(this).closest('form').find('.variant-id').length === 1) {
            _this.root.addClass('no-items');
          } else {
            $(this).closest('.variant-id').remove();
          }
        }
        return false;
      });
      _this.table_content.find('.input--number .minus').on('keypress.LayoutCartModal click.LayoutCartModal', function(e) {
        var input, input_wrapper, variant_id;
        if (theme.utils.a11yClick(e) === true) {
          input_wrapper = $(this).closest('.input--number');
          input = input_wrapper.find('input');
          if (parseInt(input.val()) > 1) {
            input_wrapper.addClass('updating');
            clearTimeout(_this.adjusting_qty_timer);
            input.val(parseInt(input.val()) - 1);
            variant_id = $(this).closest('.variant-id').data('variant-id');
            _this.adjusting_qty_timer = setTimeout(function() {
              _this.minusQuantity(variant_id, parseInt(input.val()));
              input_wrapper.removeClass('updating');
              return _this.updateTotals();
            }, 500);
          }
          return false;
        }
      });
      return _this.table_content.find('.input--number .plus').on('keypress.LayoutCartModal click.LayoutCartModal', function(e) {
        var input, input_wrapper, variant_id;
        if (theme.utils.a11yClick(e) === true) {
          clearTimeout(_this.adjusting_qty_timer);
          input_wrapper = $(this).closest('.input--number');
          input = input_wrapper.find('input');
          if (_this.temp_quantity === 0) {
            _this.temp_quantity = parseInt(input.val());
          }
          input_wrapper.addClass('updating');
          input.val(1 + parseInt(input.val()));
          variant_id = $(this).closest('.variant-id').data('variant-id');
          _this.adjusting_qty_timer = setTimeout(function() {
            var add_quantity;
            add_quantity = parseInt(input.val()) - _this.temp_quantity;
            return _this.plusQuantity(variant_id, add_quantity, function(pass, error) {
              if (pass) {
                input_wrapper.removeClass('updating');
                _this.updateTotals();
                return _this.temp_quantity = 0;
              } else {
                input.val(_this.temp_quantity);
                input_wrapper.removeClass('updating');
                _this.updateTotals();
                return _this.temp_quantity = 0;
              }
            });
          }, 500);
          return false;
        }
      });
    };

    FrameworkCart.prototype.minusQuantity = function(variant_id, quantity) {
      var _this;
      _this = this;
      return $.ajax({
        type: "POST",
        url: "/cart/change.js",
        dataType: "json",
        data: 'quantity=' + quantity + '&id=' + variant_id
      }).done(function(data, textStatus, jqXHR) {
        if (textStatus === 'success') {
          _this.updateTotals();
          return _this.renderOther();
        } else {
          return console.log('cart - update cart item status - ' + textStatus);
        }
      }).fail(function(jqXHR, textStatus) {
        return console.log("cart - update failed");
      });
    };

    FrameworkCart.prototype.plusQuantity = function(variant_id, quantity, callback) {
      var _this;
      _this = this;
      if (!_this.add_locked) {
        _this.add_locked = true;
        return $.ajax({
          type: "POST",
          url: "/cart/add.js",
          dataType: "json",
          data: 'quantity=' + quantity + '&id=' + variant_id
        }).done(function(data, textStatus, jqXHR) {
          callback(true);
          _this.renderOther();
          return _this.add_locked = false;
        }).fail(function(jqXHR, textStatus) {
          callback(false, $.parseJSON(jqXHR.responseText).description);
          return _this.add_locked = false;
        });
      }
    };

    FrameworkCart.prototype.updateTotals = function() {
      var _this;
      _this = this;
      return $.ajax({
        type: "GET",
        url: "/cart.js",
        dataType: "json"
      }).done(function(data, textStatus, jqXHR) {
        var cart, cart_total, item, j, len, ref;
        if (textStatus === 'success') {
          cart = data;
          cart_total = {};
          cart_total.quantity = 0;
          cart_total.price = 0;
          ref = cart.items;
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            cart_total.quantity += item.quantity;
            cart_total.price += item.price * item.quantity;
          }
          _this.totals.count = cart_total.quantity;
          _this.totals.price = Currency.formatMoney(cart_total.price, theme.money_format);
          _this.render_trigger.find('.count').html(_this.totals.count);
          _this.render_trigger.find('.total-price').html(_this.totals.price);
          _this.table_content.find('.total').html(_this.totals.price);
          $('.layout--header .layout--off-canvas--open.right').html(_this.totals.count);
          $('.layout--header .cart-link .count').html('(' + _this.totals.count + ')');
          if (_this.totals.count > 0) {
            _this.render_trigger.css('display', 'inline-block');
            $('.layout--header .cart-link .count').css('display', 'inline');
            $('.header--cart-count').css('display', 'inline-block');
          } else {
            _this.render_trigger.hide();
            $('.layout--header .cart-link .count').hide();
          }
          if (theme.currency_switcher_enabled) {
            _this.convertCurrency(_this.render_trigger.find('.total-price'));
            _this.convertCurrency(_this.table_content.find('.total'));
          }
          return _this.updateTotalsComplete();
        } else {
          return console.log('cart - update totals item status - ' + textStatus);
        }
      }).fail(function(jqXHR, textStatus) {
        return console.log("cart - updating totals failed");
      });
    };

    FrameworkCart.prototype.updateTotalsComplete = function() {
      var _this;
      return _this = this;
    };

    FrameworkCart.prototype.removeItemListeners = function() {
      var _this;
      _this = this;
      return _this.table_content.find('a.remove').on('click.LayoutCartModal', function() {
        var variant_id;
        variant_id = $(this).closest('.variant-id').data('variant-id');
        _this.removeItem(variant_id);
        if ($(this).closest('form').find('.variant-id').length === 1) {
          _this.root.addClass('no-items');
          $(window).trigger('resize.FrameworkModal');
        } else {
          $(this).closest('.variant-id').remove();
        }
        _this.updateTotals();
        return false;
      });
    };

    FrameworkCart.prototype.removeItem = function(variant_id) {
      var _this;
      _this = this;
      return _this.minusQuantity(variant_id, 0);
    };

    FrameworkCart.prototype.openOffCanvasListener = function() {
      var _this;
      _this = this;
      return $('.layout--off-canvas--cart--open-trigger').on('click', function() {
        $('.layout--off-canvas--right-sidebar').trigger('open');
        return false;
      });
    };

    FrameworkCart.prototype.openModalListener = function() {
      var _this;
      _this = this;
      return $('.fw--cart-modal--trigger-render').on('click', function() {
        $('.cart-link .modal--link').trigger('click');
        return false;
      });
    };

    FrameworkCart.prototype.convertCurrency = function(elems) {
      var _this;
      _this = this;
      if (theme.currency_switcher_enabled) {
        return Currency.convertAll(shopCurrency, jQuery('[name=currencies]').val());
      } else {
        return false;
      }
    };

    return FrameworkCart;

  })();

  theme.classes.FrameworkContentBlocks = (function() {
    function FrameworkContentBlocks(root) {
      var _this;
      this.root = root;
      _this = this;
    }

    return FrameworkContentBlocks;

  })();

  theme.classes.FrameworkFeaturedBlog = (function() {
    function FrameworkFeaturedBlog(root) {
      var _this;
      this.root = root;
      this.resizeListeners = bind(this.resizeListeners, this);
      this.matchImageHeights = bind(this.matchImageHeights, this);
      _this = this;
      _this.item_container = _this.root.find('.featured-blog--body');
      _this.items = _this.root.find('.featured-blog--item');
      _this.matchImageHeights();
      _this.resizeListeners();
    }

    FrameworkFeaturedBlog.prototype.matchImageHeights = function() {
      var _this;
      _this = this;
      return theme.utils.matchImageHeights(_this.item_container, _this.items, '.featured-blog--item--image');
    };

    FrameworkFeaturedBlog.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.FeaturedGrid', theme.utils.debounce(100, function() {
        return _this.matchImageHeights();
      }));
    };

    return FrameworkFeaturedBlog;

  })();

  theme.classes.FrameworkFeaturedCollections = (function() {
    function FrameworkFeaturedCollections(root) {
      var _this;
      this.root = root;
      this.resizeListeners = bind(this.resizeListeners, this);
      this.matchImageHeights = bind(this.matchImageHeights, this);
      _this = this;
      _this.item_container = _this.root.find('.featured-collections--body');
      _this.items = _this.root.find('.featured-collections--item');
      _this.matchImageHeights();
      _this.resizeListeners();
    }

    FrameworkFeaturedCollections.prototype.matchImageHeights = function() {
      var _this;
      _this = this;
      return theme.utils.matchImageHeights(_this.item_container, _this.items, '.featured-collections--image');
    };

    FrameworkFeaturedCollections.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.FeaturedCollections', theme.utils.debounce(100, function() {
        return _this.matchImageHeights();
      }));
    };

    return FrameworkFeaturedCollections;

  })();

  theme.classes.FrameworkFeaturedGrid = (function() {
    function FrameworkFeaturedGrid(root) {
      var _this;
      this.root = root;
      this.resizeListeners = bind(this.resizeListeners, this);
      this.matchImageHeights = bind(this.matchImageHeights, this);
      _this = this;
      _this.item_container = _this.root.find('.featured-grid--body');
      _this.items = _this.root.find('.featured-grid--item');
      _this.text_position = _this.root.data('text-position');
      _this.matchImageHeights();
      _this.resizeListeners();
    }

    FrameworkFeaturedGrid.prototype.matchImageHeights = function() {
      var _this;
      _this = this;
      _this.items.find('.featured-grid--item--image, .placeholder--root').css('height', 'auto');
      if (_this.text_position === 'center' && theme.utils.mqs.current_window !== 'small') {
        return;
      }
      return theme.utils.matchImageHeights(_this.item_container, _this.items, '.featured-grid--item--image');
    };

    FrameworkFeaturedGrid.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.FeaturedGrid', theme.utils.debounce(100, function() {
        return _this.matchImageHeights();
      }));
    };

    return FrameworkFeaturedGrid;

  })();

  theme.classes.FrameworkFeaturedProduct = (function() {
    function FrameworkFeaturedProduct(root) {
      var _this;
      this.root = root;
      this.addProductComplete = bind(this.addProductComplete, this);
      this.renderCart = bind(this.renderCart, this);
      this.addToCartListener = bind(this.addToCartListener, this);
      this.updateVariantImage = bind(this.updateVariantImage, this);
      this.sectionListeners = bind(this.sectionListeners, this);
      this.variantSelected = bind(this.variantSelected, this);
      this.initiateVariants = bind(this.initiateVariants, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.id = _this.root.data('id');
      _this.add_button = _this.root.find('.featured-product--add-to-cart');
      _this.cart_form = _this.root.find('.featured-product--cart-form > form');
      _this.compare_price = _this.root.find('.featured-product--compare-price');
      _this.main_images = _this.root.find('.featured-product--image');
      _this.price = _this.root.find('.featured-product--actual-price');
      _this.price_wrapper = _this.root.find('.featured-product--price-wrapper');
      _this.smart_payment_buttons = _this.root.find('.featured-product--smart-payment-buttons');
      _this.unavailable_variant = _this.root.find('.featured-product--unavailable-variant');
      _this.variant_sold_out = _this.root.find('.featured-product--sold-out--variant');
      _this.cart_form = _this.root.find('.featured-product--cart-form > form');
      _this.json = $.parseJSON(_this.root.find('.featured-product--json').text());
      _this.load();
    }

    FrameworkFeaturedProduct.prototype.load = function() {
      var _this;
      _this = this;
      _this.initiateVariants();
      return _this.addToCartListener();
    };

    FrameworkFeaturedProduct.prototype.initiateVariants = function() {
      var _this, id, options;
      _this = this;
      if (_this.root.find('select').length > 0) {
        id = 'featured-product--select--' + _this.id;
        return options = new Shopify.OptionSelectors(id, {
          product: _this.json,
          onVariantSelected: _this.variantSelected,
          enableHistoryState: false
        });
      }
    };

    FrameworkFeaturedProduct.prototype.variantSelected = function(variant, selector, options) {
      var _this, product_sold_out, variant_compare_price, variant_price;
      _this = this;
      product_sold_out = false;
      if (_this.root.find('.featured-product--sold-out--product').length) {
        product_sold_out = true;
      }
      _this.variant_sold_out.hide();
      _this.unavailable_variant.hide();
      _this.add_button.hide();
      _this.price_wrapper.hide();
      if (!variant) {
        _this.unavailable_variant.show();
        _this.smart_payment_buttons.hide();
        return false;
      } else if (variant && variant.available) {
        _this.price_wrapper.show();
        _this.add_button.show();
        _this.smart_payment_buttons.show();
      } else if (product_sold_out) {
        _this.variant_sold_out.hide();
        _this.add_button.hide();
        _this.smart_payment_buttons.hide();
      } else {
        _this.variant_sold_out.show();
        _this.smart_payment_buttons.hide();
      }
      variant_price = Shopify.formatMoney(variant.price, theme.money_format);
      _this.price.replaceWith('<span class="featured-product--actual-price money">' + variant_price + '</span>');
      _this.price = _this.root.find('.featured-product--actual-price');
      if (variant.compare_at_price > variant.price) {
        variant_compare_price = Shopify.formatMoney(variant.compare_at_price, theme.money_format);
        _this.compare_price.replaceWith('<span class="featured-product--compare-price money">' + variant_compare_price + '</span>');
        _this.compare_price = _this.root.find('.featured-product--compare-price');
        _this.compare_price.show();
      } else {
        _this.compare_price.hide();
      }
      if (theme.settings.currency_switcher_enabled) {
        Currency.convertAll(shopCurrency, $('[name=currencies]').val());
      }
      if (variant.featured_image) {
        return _this.updateVariantImage(variant.featured_image.id);
      }
    };

    FrameworkFeaturedProduct.prototype.sectionListeners = function() {
      var _this;
      _this = this;
      return _this.root.on('theme:section:load', function() {
        return new Shopify.OptionSelectors('featured-product--select', {
          product: theme.product_json,
          onVariantSelected: _this.variantSelected,
          enableHistoryState: true
        });
      });
    };

    FrameworkFeaturedProduct.prototype.updateVariantImage = function(variant_id) {
      var _this, variant_image;
      _this = this;
      _this.main_images.attr('data-active', 'false');
      variant_image = _this.main_images.filter('[data-image-id="' + variant_id + '"]');
      return variant_image.attr('data-active', 'true');
    };

    FrameworkFeaturedProduct.prototype.addToCartListener = function() {
      var _this;
      _this = this;
      if (_this.cart_form.length > 0) {
        return _this.cart_form.submit(function() {
          _this.cart_form.find('.error').remove();
          _this.add_button.attr('data-loading', 'true');
          theme.partials.Cart.addItem($(this), function(pass, error) {
            if (pass) {
              return _this.renderCart();
            } else {
              _this.cart_form.append('<div class="featured-product--error error">' + error + '</div>');
              return _this.add_button.attr('data-loading', 'false');
            }
          });
          return false;
        });
      }
    };

    FrameworkFeaturedProduct.prototype.renderCart = function() {
      var _this;
      _this = this;
      return theme.partials.Cart.renderCart(function() {
        return _this.addProductComplete();
      });
    };

    FrameworkFeaturedProduct.prototype.addProductComplete = function() {
      var _this;
      _this = this;
      _this.add_button.attr('data-loading', 'false');
      return $('.modal.cart-link .modal--link').trigger('click');
    };

    return FrameworkFeaturedProduct;

  })();

  theme.classes.FrameworkFeedbackBar = (function() {
    function FrameworkFeedbackBar(root) {
      var _this;
      this.root = root;
      this.load = bind(this.load, this);
      _this = this;
      _this.messages = _this.root.find('.feedback-bar--message span');
      _this.load();
    }

    FrameworkFeedbackBar.prototype.load = function() {
      var _this, anchor_tag, message, message_elem;
      _this = this;
      _this.messages.hide();
      anchor_tag = window.location.hash.substr(1);
      message = anchor_tag.replace('feedback-bar--', '');
      message_elem = _this.messages.filter('[data-feedback-bar--message="' + message + '"]');
      if (message_elem.length) {
        message_elem.show();
        setTimeout(function() {
          return _this.root.attr('data-feedback-bar--open', 'true');
        }, 200);
        return setTimeout(function() {
          return _this.root.attr('data-feedback-bar--open', 'false');
        }, 3000);
      }
    };

    return FrameworkFeedbackBar;

  })();

  theme.classes.FrameworkInstagram = (function() {
    function FrameworkInstagram(container1) {
      var _this;
      this.container = container1;
      this.load = bind(this.load, this);
      _this = this;
      _this.username = _this.container.data('username');
      _this.access_token = _this.container.data('access-token');
      _this.body = _this.container.find('.instagram--body');
      _this.rows = _this.container.data('rows');
      _this.columns = _this.container.data('columns');
      _this.total_items = _this.rows * _this.columns;
      if (theme.utils.mqs.current_window === 'small') {
        _this.total_items = 4;
      }
      _this.load();
    }

    FrameworkInstagram.prototype.load = function() {
      var _this;
      _this = this;
      if (_this.access_token.length < 1) {
        return false;
      }
      return $.ajax({
        dataType: "jsonp",
        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + _this.access_token + '&count=' + _this.total_items,
        success: function(response) {
          var data, i, img_src, j, ref, results1;
          if (response.meta.code === 200) {
            data = response.data;
            results1 = [];
            for (i = j = 0, ref = _this.total_items - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
              if (data[i]) {
                img_src = data[i].images.standard_resolution.url;
                img_src = img_src.replace("http:", "https:");
                results1.push(_this.body.append('<a class="instagram--item" target="_blank" href="' + data[i].link + '" > <div class="instagram--item-container"> <div class="instagram--image" style="background-image: url(\'' + img_src + '\');" > </div> </div> </a>'));
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          } else {
            return _this.items.append('<h4 class="error">' + response.meta.error_message + '</h4>');
          }
        },
        error: function(jqXHR, textStatus) {
          console.log(jqXHR);
          return console.log(textStatus);
        }
      });
    };

    return FrameworkInstagram;

  })();

  theme.classes.FrameworkLoadingAnimation = (function() {
    function FrameworkLoadingAnimation(root) {
      var _this;
      this.root = root;
      _this = this;
      if (_this.root.hasClass('tiny')) {
        _this.root.spin('tiny');
      } else {
        _this.root.spin('small');
      }
    }

    return FrameworkLoadingAnimation;

  })();

  theme.classes.FrameworkMap = (function() {
    function FrameworkMap(root) {
      var _this;
      this.root = root;
      this.buildStyles = bind(this.buildStyles, this);
      this.buildMap = bind(this.buildMap, this);
      this.geolocate = bind(this.geolocate, this);
      this.loadMapsApi = bind(this.loadMapsApi, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.api_status = null;
      _this.map_instance = null;
      _this.key = _this.root.data('api-key');
      _this.address = _this.root.data('address');
      _this.theme = _this.root.data('theme');
      _this.styles = null;
      _this.container = _this.root.find('.map--google-maps');
      _this.center = null;
      _this.load();
    }

    FrameworkMap.prototype.load = function() {
      var _this;
      _this = this;
      if (_this.container.length > 0) {
        return _this.loadMapsApi();
      }
    };

    FrameworkMap.prototype.loadMapsApi = function() {
      var _this, other_map_loading_checker;
      _this = this;
      if (theme.utils.google_map_api_status === 'loading') {
        return other_map_loading_checker = setInterval(function() {
          if (theme.utils.google_map_api_status === 'loaded') {
            _this.geolocate();
            return clearInterval(other_map_loading_checker);
          }
        }, 100);
      } else if (typeof window.google === 'undefined') {
        theme.utils.google_map_api_status = 'loading';
        return $.getScript('https://maps.googleapis.com/maps/api/js?key=' + _this.key).then(function() {
          _this.geolocate();
          return theme.utils.google_map_api_status = 'loaded';
        });
      } else {
        return _this.geolocate();
      }
    };

    FrameworkMap.prototype.geolocate = function() {
      var _this, geocoder;
      _this = this;
      geocoder = new google.maps.Geocoder;
      return geocoder.geocode({
        address: _this.address
      }, function(results, status) {
        if (status === 'OK') {
          _this.center = results[0].geometry.location;
          _this.buildStyles();
          return _this.buildMap();
        } else {
          return console.log('couldn\'t convert address with geocoder');
        }
      });
    };

    FrameworkMap.prototype.buildMap = function() {
      var _this, center, map, mapOptions, marker;
      _this = this;
      mapOptions = {
        zoom: 15,
        center: _this.center,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: _this.styles
      };
      map = new google.maps.Map(_this.container[0], mapOptions);
      center = map.getCenter();
      marker = new google.maps.Marker({
        map: map,
        position: map.getCenter()
      });
      return _this.map_instance = google.maps.event.addDomListener(window, 'resize', theme.utils.debounce(500, function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      }));
    };

    FrameworkMap.prototype.buildStyles = function() {
      var _this;
      _this = this;
      if (_this.theme === 'grayscale') {
        return _this.styles = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          }, {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          }, {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          }, {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ];
      } else if (_this.theme === 'dark') {
        return _this.styles = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          }, {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }, {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          }, {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          }, {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ];
      }
    };

    return FrameworkMap;

  })();

  theme.classes.FrameworkMediaQueries = (function() {
    function FrameworkMediaQueries() {
      this.screenSizeListener = bind(this.screenSizeListener, this);
      this.getScreenSize = bind(this.getScreenSize, this);
      this.medium_screen = 768;
      this.large_screen = 1024;
      this.current_window = null;
      this.getScreenSize();
      this.screenSizeListener();
    }

    FrameworkMediaQueries.prototype.getScreenSize = function() {
      var _this;
      _this = this;
      if (window.matchMedia('only screen and (min-width: ' + _this.large_screen + 'px)').matches) {
        if (_this.current_window !== 'large') {
          $.event.trigger("largeWindow");
          return _this.current_window = 'large';
        }
      } else if (window.matchMedia('only screen and (min-width: ' + _this.medium_screen + 'px)').matches) {
        if (_this.current_window !== 'medium') {
          $.event.trigger("mediumWindow");
          return _this.current_window = 'medium';
        }
      } else {
        if (_this.current_window !== 'small') {
          $.event.trigger("smallWindow");
          return _this.current_window = 'small';
        }
      }
    };

    FrameworkMediaQueries.prototype.screenSizeListener = function() {
      var _this;
      _this = this;
      return $(window).resize(function() {
        return _this.getScreenSize();
      });
    };

    return FrameworkMediaQueries;

  })();

  theme.classes.FrameworkModal = (function() {
    function FrameworkModal(container1) {
      var _this;
      this.container = container1;
      _this = this;
      _this.fullscreen = _this.container.data('modal--fullscreen') ? true : false;
      if (_this.container.data('modal--custom-close')) {
        _this.custom_close_button = _this.container.data('modal--custom-close');
      } else {
        _this.custom_close_button = '';
      }
      _this.force_view = _this.container.data('force-view');
      _this.view = _this.container.data('modal--view');
      _this.links = _this.container.find('.modal--link');
      _this.content = _this.container.find('.modal--content');
      _this.window = _this.createModalWindow();
      _this.window_container = _this.window.find('.modal--container');
      _this.mask = _this.window.find('.modal--mask');
      _this.close_button = _this.window.find('.modal--close');
      _this.next_button = _this.window.find('.modal--next');
      _this.prev_button = _this.window.find('.modal--prev');
      _this.slider = null;
      _this.slides = null;
      _this.main_content_window = $('.off-canvas--main-content');
      _this.openListeners();
      _this.modal_state = 'closed';
      _this.nav_lock = false;
    }

    FrameworkModal.prototype.createModalWindow = function() {
      var _this, window, window_html;
      _this = this;
      window = null;
      if ($('.modal--window').length) {
        window = $('.modal--window');
      } else {
        window_html = '<div class="modal--window"> <div class="modal--mask"></div> <div class="modal--container"></div> <div class="modal--close">' + theme.utils.addSymbol('cross') + '</div> <div class="modal--prev">' + theme.utils.addSymbol('chevron-left') + '</div> <div class="modal--next">' + theme.utils.addSymbol('chevron-right') + '</div> </div>';
        window = $(window_html).appendTo('body');
      }
      return window;
    };

    FrameworkModal.prototype.openListeners = function() {
      var _this;
      _this = this;
      return _this.links.on('keypress.FrameworkModal, click.FrameworkModal, quick-open', function(e) {
        var clicked_item;
        if (e.type === 'keypress' && theme.utils.a11yClick(e) === false) {
          return false;
        }
        clicked_item = $(this);
        _this.links.each(function(index) {
          if ($(this).is(clicked_item)) {
            if (e.type === 'quick-open') {
              return _this.open(index, true);
            } else {
              return _this.open(index);
            }
          }
        });
        return false;
      });
    };

    FrameworkModal.prototype.open = function(index, quick_open) {
      var _this, scrolled_position;
      if (quick_open == null) {
        quick_open = false;
      }
      _this = this;
      if (_this.modal_state === 'closed') {
        _this.modal_state = 'opened';
        $('html').addClass('modal-open');
        _this.window.attr('data-modal--fullscreen', _this.fullscreen);
        _this.window.attr('data-modal--custom-close', _this.custom_close_button);
        _this.window.attr('data-modal--view', _this.view);
        _this.closeListeners();
        _this.positionListeners();
        scrolled_position = $(window).scrollTop();
        _this.main_content_window.css({
          position: 'fixed',
          top: -scrolled_position
        });
        _this.moveContentToWindow();
        if (_this.slides.length > 1) {
          _this.next_button.show();
          _this.prev_button.show();
          _this.prevListeners();
          _this.nextListeners();
        }
        _this.window.show();
        _this.window_container.show();
        _this.renderVideo(_this.slides.eq(index));
        if (quick_open) {
          _this.slides.eq(index).addClass('active');
          return _this.position();
        } else {
          _this.mask.fadeIn();
          return _this.loadModal(_this.slides.eq(index), function() {
            return setTimeout(function() {
              return _this.window_container.find('input[type="text"]').focus();
            }, 0);
          });
        }
      }
    };

    FrameworkModal.prototype.moveContentToWindow = function(index) {
      var _this, content;
      _this = this;
      content = _this.container.find('.modal--content');
      _this.window_container.append(content);
      return _this.slides = _this.window_container.find('.modal--content');
    };

    FrameworkModal.prototype.detectImageSlide = function(slide) {
      var _this;
      return _this = this;
    };

    FrameworkModal.prototype.renderVideo = function(slide) {
      var _this, id, iframe, src_url, type, video;
      _this = this;
      video = slide.find('.responsive-video').first();
      src_url = video.data('video');
      type = _this.extractVideoType(src_url);
      id = _this.extractVideoId(src_url, type);
      iframe = _this.createIframe(type, id);
      if (type === 'vimeo') {
        video.addClass('vimeo');
      }
      if (type === 'kickstarter') {
        video.addClass('kickstarter');
      }
      return video.append(iframe);
    };

    FrameworkModal.prototype.extractVideoType = function(src_url) {
      var _this, matches, re;
      _this = this;
      re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i;
      matches = re.exec(src_url);
      if (matches) {
        return 'youtube';
      }
      re = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/;
      matches = re.exec(src_url);
      if (matches) {
        return 'vimeo';
      }
      re = /^.*(kickstarter)\.com/g;
      matches = re.exec(src_url);
      if (matches) {
        return 'kickstarter';
      }
      return false;
    };

    FrameworkModal.prototype.extractVideoId = function(src_url, type) {
      var _this, match, regExp;
      _this = this;
      if (type === 'youtube') {
        regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        match = src_url.match(regExp);
        if (match && match[2].length === 11) {
          return match[2];
        }
      } else if (type === "vimeo") {
        regExp = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/;
        match = src_url.match(regExp);
        if (match) {
          return match[2];
        }
      } else if (type === "kickstarter") {
        regExp = /(?:kickstarter\.com\/projects\/)(.*)(|\?)/;
        match = src_url.match(regExp);
        if (match) {
          return match[1];
        }
      }
    };

    FrameworkModal.prototype.createIframe = function(type, id) {
      var _this;
      _this = this;
      if (type === "youtube") {
        return '<iframe  src="//www.youtube.com/embed/' + id + '?autoplay=1" frameborder="0" allowfullwidth></iframe>';
      } else if (type === "vimeo") {
        return '<iframe src="//player.vimeo.com/video/' + id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1?" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      } else if (type === "kickstarter") {
        return '<iframe src="//www.kickstarter.com/projects/' + id + '/widget/video.html" frameborder="0" webkitallowfullwidth mozallowfullwidth allowfullwidth></iframe>';
      }
    };

    FrameworkModal.prototype.removeVideos = function() {
      var _this;
      _this = this;
      return _this.slides.find('.responsive-video').each(function() {
        if ($(this).data('video')) {
          return $(this).find('iframe').remove();
        }
      });
    };

    FrameworkModal.prototype.loadModal = function(modal, callback) {
      var _this;
      _this = this;
      modal.addClass('active');
      _this.position();
      if (callback) {
        callback();
      }
      return _this.nav_lock = false;
    };

    FrameworkModal.prototype.position = function() {
      var _this, active_modal, entire_modal_height, modal_height, modal_width;
      _this = this;
      if (_this.window_container != null) {
        active_modal = _this.content.filter('.active');
        _this.window_container.attr('style', '');
        _this.positionVideoColumns(active_modal);
        _this.detectImageSlide(active_modal);
        _this.window.removeClass('fixed');
        modal_height = active_modal.outerHeight();
        modal_width = active_modal.outerWidth();
        entire_modal_height = modal_height + parseInt(_this.window.css('padding-top')) + parseInt(_this.window.css('padding-bottom'));
        if (_this.fullscreen) {
          return;
        }
        if (active_modal.hasClass('type--image')) {
          entire_modal_height = modal_height;
        }
        if ($(window).height() >= entire_modal_height && _this.force_view !== 'absolute') {
          return _this.window.addClass('fixed');
        } else {
          $("html, body").animate({
            scrollTop: 0
          }, '0');
          $('body,html').on('DOMMouseScroll.FrameworkModal mousewheel.FrameworkModal touchmove.FrameworkModal', function(e) {
            if (e.which > 0 || e.type === "mousewheel" || e.type === "touchmove") {
              return $("html,body").stop();
            }
          });
          return _this.window.removeClass('fixed');
        }
      }
    };

    FrameworkModal.prototype.positionVideoColumns = function(modal) {
      var _this, column_one, column_two, height_one, height_two;
      _this = this;
      if (modal.find('.responsive-video').length > 0) {
        column_one = modal.find('.fw--blocks > div').eq(0);
        column_two = modal.find('.fw--blocks > div').eq(1);
        column_one.css({
          width: ''
        });
        column_two.css({
          width: ''
        });
        height_one = column_one.outerHeight();
        height_two = column_two.outerHeight();
        if (height_one < height_two) {
          column_one.css({
            width: '100%'
          });
          return column_two.css({
            width: '100%'
          });
        }
      }
    };

    FrameworkModal.prototype.positionListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.FrameworkModal', function() {
        return _this.position();
      });
    };

    FrameworkModal.prototype.nextListeners = function() {
      var _this;
      _this = this;
      $(document).on('keydown.FrameworkModal', function(e) {
        if (e.keyCode === 39) {
          return _this.next();
        }
      });
      return _this.next_button.on('click.FrameworkModal', function() {
        return _this.next();
      });
    };

    FrameworkModal.prototype.next = function() {
      var _this, active_slide, index;
      _this = this;
      if (!_this.nav_lock) {
        _this.nav_lock = true;
        index = _this.slides.filter('.active').index();
        _this.slides.removeClass('active');
        _this.removeVideos();
        if ((index + 1) === _this.slides.length) {
          active_slide = _this.slides.eq(0);
        } else {
          active_slide = _this.slides.eq(index + 1);
        }
        _this.renderVideo(active_slide);
        return _this.loadModal(active_slide);
      }
    };

    FrameworkModal.prototype.prevListeners = function() {
      var _this;
      _this = this;
      $(document).on('keydown.FrameworkModal', function(e) {
        if (e.keyCode === 37) {
          return _this.prev();
        }
      });
      return _this.prev_button.on('click.FrameworkModal', function() {
        return _this.prev();
      });
    };

    FrameworkModal.prototype.prev = function() {
      var _this, active_slide, index;
      _this = this;
      if (!_this.nav_lock) {
        _this.nav_lock = true;
        index = _this.slides.filter('.active').index();
        _this.slides.removeClass('active');
        _this.removeVideos();
        if (index === 0) {
          active_slide = _this.slides.eq(_this.slides.length - 1);
        } else {
          active_slide = _this.slides.eq(index - 1);
        }
        _this.renderVideo(active_slide);
        return _this.loadModal(active_slide);
      }
    };

    FrameworkModal.prototype.closeListeners = function() {
      var _this;
      _this = this;
      _this.container.on('quick-close', function() {
        return _this.close(true);
      });
      $(document).on('keydown.FrameworkModal', function(e) {
        if (e.keyCode === 27) {
          return _this.close();
        }
      });
      _this.mask.on('click.FrameworkModal', function() {
        return _this.close();
      });
      _this.window_container.on('click.FrameworkModal', function() {
        return _this.close();
      });
      _this.content.on('click.FrameworkModal', function(e) {
        return e.stopPropagation();
      });
      return _this.close_button.on('click.FrameworkModal', function() {
        return _this.close();
      });
    };

    FrameworkModal.prototype.close = function(quick_close) {
      var _this, scrolled_position;
      if (quick_close == null) {
        quick_close = false;
      }
      _this = this;
      scrolled_position = parseInt(_this.main_content_window.css('top')) * -1;
      _this.container.trigger('modalClosed');
      _this.main_content_window.css({
        top: '0',
        position: 'relative'
      });
      $(window).scrollTop(scrolled_position);
      _this.putBackContent();
      _this.next_button.hide();
      _this.prev_button.hide();
      _this.window.hide();
      if (quick_close) {
        _this.mask.hide();
        this.window_container.empty();
        _this.modal_state = 'closed';
      } else {
        _this.mask.fadeOut(function() {
          _this.window_container.empty();
          return _this.modal_state = 'closed';
        });
      }
      $('html').removeClass('modal-open');
      _this.removeListeners();
      return $(window).trigger('FrameworkModal.afterClose');
    };

    FrameworkModal.prototype.putBackContent = function() {
      var _this;
      _this = this;
      _this.removeVideos();
      return _this.slides.removeClass('active').appendTo(_this.container);
    };

    FrameworkModal.prototype.removeListeners = function() {
      var _this;
      _this = this;
      $(document).off('keydown.FrameworkModal');
      $(window).off('resize.FrameworkModal');
      $('body,html').off('DOMMouseScroll.FrameworkModal mousewheel.FrameworkModal touchmove.FrameworkModal');
      _this.next_button.off('click.FrameworkModal');
      _this.prev_button.off('click.FrameworkModal');
      _this.close_button.off('click.FrameworkModal');
      _this.mask.off('click.FrameworkModal');
      return _this.window_container.off('click.FrameworkModal');
    };

    return FrameworkModal;

  })();

  theme.classes.FrameworkOffCanvas = (function() {
    function FrameworkOffCanvas(root) {
      var _this;
      this.root = root;
      this.touchListener = bind(this.touchListener, this);
      this.closeRight = bind(this.closeRight, this);
      this.closeLeft = bind(this.closeLeft, this);
      this.fadeInOverlay = bind(this.fadeInOverlay, this);
      this.openRight = bind(this.openRight, this);
      this.openLeft = bind(this.openLeft, this);
      this.toggle = bind(this.toggle, this);
      this.toggleListeners = bind(this.toggleListeners, this);
      this.viewPortHeightListener = bind(this.viewPortHeightListener, this);
      this.setViewPortHeight = bind(this.setViewPortHeight, this);
      this.setState = bind(this.setState, this);
      this.unload = bind(this.unload, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.viewport = $('.off-canvas--viewport');
      _this.left_sidebar = $('.off-canvas--left-sidebar');
      _this.right_sidebar = $('.off-canvas--right-sidebar');
      _this.main_content = $('.off-canvas--main-content');
      _this.overlay = $('.off-canvas--overlay');
      _this.state = 'closed';
      _this.load();
    }

    FrameworkOffCanvas.prototype.load = function() {
      var _this;
      _this = this;
      _this.close = $('.off-canvas--close');
      _this.triggers = $('.off-canvas--open');
      _this.setViewPortHeight();
      _this.viewPortHeightListener();
      _this.toggleListeners();
      return _this.touchListener();
    };

    FrameworkOffCanvas.prototype.unload = function() {
      var _this;
      _this = this;
      _this.triggers.off('click');
      _this.overlay.add(_this.close).off('click');
      $(document).off('touchstart.FrameworkOffCanvas');
      return $(document).off('touchend.FrameworkOffCanvas');
    };

    FrameworkOffCanvas.prototype.setState = function(state) {
      var _this;
      _this = this;
      _this.state = state;
      return _this.root.attr('data-off-canvas--state', state);
    };

    FrameworkOffCanvas.prototype.setViewPortHeight = function() {
      var _this;
      _this = this;
      return _this.viewport.css({
        'min-height': $(window).height()
      });
    };

    FrameworkOffCanvas.prototype.viewPortHeightListener = function() {
      var _this;
      _this = this;
      return $(window).resize(function() {
        return _this.setViewPortHeight();
      });
    };

    FrameworkOffCanvas.prototype.toggleListeners = function() {
      var _this;
      _this = this;
      _this.triggers.on('click', function() {
        if ($(this).data('off-canvas--open') === 'left-sidebar') {
          _this.toggle('left-sidebar');
        } else if ($(this).data('off-canvas--open') === 'right-sidebar') {
          _this.toggle('right-sidebar');
        }
        return false;
      });
      return _this.overlay.add(_this.close).on('click', function() {
        if (_this.state === 'left-open') {
          return _this.toggle('left-sidebar');
        } else if (_this.state === 'right-open') {
          return _this.toggle('right-sidebar');
        }
      });
    };

    FrameworkOffCanvas.prototype.toggle = function(element) {
      var _this;
      _this = this;
      if (element === 'left-sidebar' && _this.state === 'closed') {
        return _this.openLeft();
      } else if (element === 'left-sidebar' && _this.state === 'left-open') {
        return _this.closeLeft();
      } else if (element === 'right-sidebar' && _this.state === 'closed') {
        return _this.openRight();
      } else if (element === 'right-sidebar' && _this.state === 'right-open') {
        return _this.closeRight();
      }
    };

    FrameworkOffCanvas.prototype.openLeft = function() {
      var _this;
      _this = this;
      _this.setState('left-open');
      _this.main_content.css({
        position: 'fixed',
        top: -($(window).scrollTop())
      });
      _this.left_sidebar.velocity({
        translateX: [0, '-100%']
      }, {
        complete: function() {
          return _this.left_sidebar.css({
            position: 'relative'
          });
        }
      });
      return _this.fadeInOverlay();
    };

    FrameworkOffCanvas.prototype.openRight = function() {
      var _this;
      _this = this;
      _this.setState('right-open');
      _this.main_content.css({
        position: 'fixed',
        top: -($(window).scrollTop())
      });
      _this.right_sidebar.velocity({
        translateX: ['-100%', 0]
      }, {
        complete: function() {
          return _this.right_sidebar.css({
            position: 'relative'
          });
        }
      });
      return _this.fadeInOverlay();
    };

    FrameworkOffCanvas.prototype.fadeInOverlay = function() {
      var _this;
      _this = this;
      _this.overlay.show();
      return _this.overlay.velocity({
        opacity: '0.3'
      });
    };

    FrameworkOffCanvas.prototype.closeLeft = function() {
      var _this, scrolled_position;
      _this = this;
      if (_this.state !== 'left-open') {
        return false;
      }
      _this.setState('closed');
      scrolled_position = parseInt(_this.main_content.css('top')) * -1;
      _this.left_sidebar.velocity({
        translateX: ['-100%', 0]
      }, {
        complete: function() {
          _this.left_sidebar.css({
            position: 'absolute'
          });
          _this.main_content.css({
            position: 'relative',
            top: 'initial'
          });
          return $(window).scrollTop(scrolled_position);
        }
      });
      return _this.overlay.velocity('fadeOut');
    };

    FrameworkOffCanvas.prototype.closeRight = function() {
      var _this, scrolled_position;
      _this = this;
      if (_this.state !== 'right-open') {
        return false;
      }
      _this.setState('closed');
      scrolled_position = parseInt(_this.main_content.css('top')) * -1;
      _this.right_sidebar.velocity({
        translateX: [0, '-100%']
      }, {
        complete: function() {
          _this.right_sidebar.css({
            position: 'absolute'
          });
          _this.main_content.css({
            position: 'relative',
            top: 'initial'
          });
          return $(window).scrollTop(scrolled_position);
        }
      });
      return _this.overlay.velocity('fadeOut');
    };

    FrameworkOffCanvas.prototype.touchListener = function() {
      var _this, position;
      _this = this;
      if (!Modernizr.touchevents) {
        return false;
      }
      position = {
        start: {},
        end: {}
      };
      $(document).on('touchstart.FrameworkOffCanvas', function(e) {
        position.start.x = e.originalEvent.touches[0].clientX;
        position.start.y = e.originalEvent.touches[0].clientY;
      });
      return $(document).on('touchend.FrameworkOffCanvas', function(e) {
        position.end.x = e.originalEvent.changedTouches[0].clientX;
        position.end.y = e.originalEvent.changedTouches[0].clientY;
        if (Math.abs(position.start.y - position.end.y) > 30) {
          return false;
        }
        if (position.start.x > position.end.x + 5) {
          return _this.closeLeft();
        } else if (position.start.x < position.end.x - 5) {
          return _this.closeRight();
        }
      });
    };

    return FrameworkOffCanvas;

  })();

  theme.classes.FrameworkSearch = (function() {
    function FrameworkSearch(root) {
      var _this;
      this.root = root;
      this.resizeListeners = bind(this.resizeListeners, this);
      this.matchImageHeights = bind(this.matchImageHeights, this);
      this.getResults = bind(this.getResults, this);
      this.listenForKeyEntered = bind(this.listenForKeyEntered, this);
      this.getSearchUrl = bind(this.getSearchUrl, this);
      this.searchLinks = bind(this.searchLinks, this);
      this.loadSpinners = bind(this.loadSpinners, this);
      this.onOpen = bind(this.onOpen, this);
      _this = this;
      _this.articles = _this.root.find('.search--articles');
      _this.form = _this.root.find('form');
      _this.icon = _this.root.find('.search--icon');
      _this.loading = _this.root.find('.search--loading');
      _this.no_results = _this.root.find('.search--no-results');
      _this.products = _this.root.find('.search--products');
      _this.results = _this.root.find('.search--results');
      _this.text_box = _this.root.find('.search--textbox');
      _this.toggle_link = _this.root.find('.search--toggle');
      _this.show_articles = _this.root.data('show-articles');
      _this.show_pages = _this.root.data('show-pages');
      _this.view = _this.root.data('view');
      _this.ajax_request = null;
      _this.search_term = null;
      _this.search_url = null;
      _this.close_results_timer = null;
      _this.typing_timer = null;
      _this.article_page_combination = "";
      _this.offCanvas = null;
      if (theme.partials.OffCanvas !== void 0) {
        _this.offCanvas = theme.partials.OffCanvas;
      } else {
        _this.offCanvas = theme.partials.FrameworkOffCanvas;
      }
      if (_this.show_articles && _this.show_pages) {
        _this.article_page_combination = 'article,page';
      } else if (_this.show_articles) {
        _this.article_page_combination = 'article';
      } else if (_this.show_pages) {
        _this.article_page_combination = 'page';
      }
      if (_this.view === 'modal') {
        _this.searchLinks();
        _this.getSearchUrl();
        _this.listenForKeyEntered();
        _this.loadSpinners();
      }
      _this.resizeListeners();
      _this.matchImageHeights();
    }

    FrameworkSearch.prototype.onOpen = function() {
      var _this, temp_val;
      _this = this;
      _this.text_box.focus();
      temp_val = _this.text_box.val();
      _this.text_box.val('');
      _this.text_box.val(temp_val);
      return _this.text_box.trigger('keyup');
    };

    FrameworkSearch.prototype.loadSpinners = function() {
      var _this, spinner;
      _this = this;
      spinner = _this.loading.find('.animation');
      if (spinner.hasClass('tiny')) {
        return spinner.spin('tiny');
      } else {
        return spinner.spin('small');
      }
    };

    FrameworkSearch.prototype.searchLinks = function() {
      var _this;
      _this = this;
      $('.off-canvas--main-content a[href="/search"]').on('click', function() {
        $('[data-trigger="search-modal"]').trigger('click');
        _this.onOpen();
        return false;
      });
      $('.off-canvas--right-sidebar a[href="/search"]').on('click', function() {
        _this.offCanvas.closeRight();
        setTimeout(function() {
          $('[data-trigger="search-modal"]').trigger('click');
          return _this.onOpen();
        }, 450);
        return false;
      });
      return $('.off-canvas--left-sidebar a[href="/search"]').on('click', function() {
        _this.offCanvas.closeLeft();
        setTimeout(function() {
          $('[data-trigger="search-modal"]').trigger('click');
          return _this.onOpen();
        }, 450);
        return false;
      });
    };

    FrameworkSearch.prototype.getSearchUrl = function() {
      var _this;
      _this = this;
      _this.search_url = window.location.href;
      _this.search_url = _this.search_url.replace(window.location.hostname + window.location.pathname, window.location.hostname + '/search');
      _this.search_url = _this.search_url.replace('#', '');
      if (_this.search_url.indexOf("?") >= 0) {
        return _this.search_url = _this.search_url + '&';
      } else {
        return _this.search_url = _this.search_url + '?';
      }
    };

    FrameworkSearch.prototype.listenForKeyEntered = function() {
      var _this;
      _this = this;
      return _this.text_box.attr("autocomplete", "off").on("keyup paste", function(event) {
        var term;
        clearTimeout(_this.typing_timer);
        term = $(this).val();
        if (term.length < 2 && event.type !== 'paste') {
          _this.products.empty();
          _this.articles.empty();
          _this.loading.hide();
          _this.icon.show();
          return false;
        }
        _this.loading.show();
        _this.icon.hide();
        return _this.typing_timer = setTimeout(function() {
          var url;
          clearTimeout(_this.typing_timer);
          url = _this.search_url + "view=ajax-product&type=product&q=" + term + "*";
          _this.getResults(url, term, 'product');
          if (_this.show_articles || _this.show_pages) {
            url = _this.search_url + "view=ajax-article-page&type=" + _this.article_page_combination + "&q=" + term + "*";
            return _this.getResults(url, term, 'article');
          }
        }, 750);
      });
    };

    FrameworkSearch.prototype.getResults = function(url, term, type) {
      var _this;
      _this = this;
      _this.products.empty();
      _this.articles.empty();
      $.ajax({
        url: url,
        type: "GET",
        dataType: "html",
        success: function(data) {
          _this.loading.hide();
          _this.icon.show();
          if (type === 'product') {
            _this.products.empty();
            _this.products.append(data);
            return _this.matchImageHeights();
          } else if (type === 'article') {
            _this.articles.empty();
            return _this.articles.append(data);
          }
        },
        error: function(jqxhr, textStatus, error) {
          var err;
          err = textStatus + ', ' + error;
          return console.log('search.json Request Failed: ' + err);
        }
      });
    };

    FrameworkSearch.prototype.matchImageHeights = function() {
      var _this;
      _this = this;
      return theme.utils.matchImageHeights(_this.products, _this.products.find('.product--root'), '.product--image-wrapper');
    };

    FrameworkSearch.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.Search', theme.utils.debounce(100, function() {
        return _this.matchImageHeights();
      }));
    };

    return FrameworkSearch;

  })();

  theme.classes.Sections = (function() {
    function Sections() {
      this.unload = bind(this.unload, this);
      this.deselectBlock = bind(this.deselectBlock, this);
      this.selectBlock = bind(this.selectBlock, this);
      this.deselectSection = bind(this.deselectSection, this);
      this.selectSection = bind(this.selectSection, this);
      this.load = bind(this.load, this);
      this.getActiveBlock = bind(this.getActiveBlock, this);
      this.getActiveSection = bind(this.getActiveSection, this);
      this.listeners = bind(this.listeners, this);
      var _this;
      _this = this;
      _this.listeners();
    }

    Sections.prototype.listeners = function() {
      var _this;
      _this = this;
      _this.load();
      _this.unload();
      _this.selectSection();
      _this.deselectSection();
      _this.selectBlock();
      return _this.deselectBlock();
    };

    Sections.prototype.getActiveSection = function(evt) {
      var _this, active_section;
      _this = this;
      active_section = $(evt.target).find('[data-section-id]');
      return active_section;
    };

    Sections.prototype.getActiveBlock = function(evt) {
      var _this, active_block;
      _this = this;
      active_block = $(evt.target);
      return active_block;
    };

    Sections.prototype.load = function(evt) {
      var _this;
      _this = this;
      return $(document).on('shopify:section:load', function(evt) {
        var active_section;
        theme.utils.loadJsClasses();
        active_section = _this.getActiveSection(evt);
        active_section.triggerHandler("theme:section:load");
        return active_section.find('[data-js-class]').each(function() {
          return $(this).triggerHandler("theme:section:load");
        });
      });
    };

    Sections.prototype.selectSection = function() {
      var _this;
      _this = this;
      return $(document).on('shopify:section:select', function(evt) {
        var active_section;
        active_section = _this.getActiveSection(evt);
        return active_section.triggerHandler("theme:section:select");
      });
    };

    Sections.prototype.deselectSection = function() {
      var _this;
      _this = this;
      return $(document).on('shopify:section:deselect', function(evt) {
        var active_section;
        active_section = _this.getActiveSection(evt);
        return active_section.triggerHandler('theme:section:deselect');
      });
    };

    Sections.prototype.selectBlock = function() {
      var _this;
      _this = this;
      return $(document).on('shopify:block:select', function(evt) {
        var active_block;
        active_block = _this.getActiveBlock(evt);
        return active_block.triggerHandler('theme:block:select');
      });
    };

    Sections.prototype.deselectBlock = function() {
      var _this;
      _this = this;
      return $(document).on('shopify:block:deselect', function(evt) {
        var active_block;
        active_block = _this.getActiveBlock(evt);
        return active_block.triggerHandler('theme:block:deselect');
      });
    };

    Sections.prototype.unload = function(evt) {
      var _this;
      _this = this;
      return $(document).on('shopify:section:unload', function(evt) {
        var active_section;
        active_section = _this.getActiveSection(evt);
        active_section.triggerHandler("theme:section:unload");
        return active_section.find('[data-js-loaded="true"]').each(function() {
          return $(this).triggerHandler("theme:section:unload");
        });
      });
    };

    return Sections;

  })();

  theme.classes.FrameworkSlider = (function() {
    function FrameworkSlider(container1) {
      this.container = container1;
      this.eventListeners = bind(this.eventListeners, this);
      this.alignPlayButton = bind(this.alignPlayButton, this);
      this.updateContextMenu = bind(this.updateContextMenu, this);
      this.autoplay = bind(this.autoplay, this);
      this.formatPaginationNumbers = bind(this.formatPaginationNumbers, this);
      this.getActiveIndex = bind(this.getActiveIndex, this);
      this.createSlider = bind(this.createSlider, this);
      this.autoplay_enabled = this.container.data('autoplay') ? true : false;
      this.navigation = this.container.data('navigation') ? true : false;
      this.pagination_numbers = this.container.data('pagination-numbers') ? true : false;
      this.autoplay_frequency = 3000;
      this.slide_length = this.container.children().length;
      this.active_index = 0;
      this.news_panel = this.container.data('news-panel') ? true : false;
      this.createSlider();
      this.eventListeners();
      this.owl = this.container.data('owlCarousel');
    }

    FrameworkSlider.prototype.createSlider = function() {
      var _this, slider;
      _this = this;
      slider = this.container.owlCarousel({
        singleItem: true,
        navigation: _this.navigation,
        navigationText: false,
        pagination: _this.container.data('pagination') ? true : false,
        paginationNumbers: _this.pagination_numbers,
        scrollPerPageNav: true,
        slideSpeed: 800,
        autoHeight: false,
        autoPlay: _this.autoplay(),
        afterInit: function() {},
        afterAction: function() {
          _this.alignPlayButton();
          _this.active_index = _this.getActiveIndex();
          _this.updateContextMenu(_this.active_index);
          return _this.formatPaginationNumbers();
        }
      });
      if (_this.navigation) {
        slider.find('.owl-prev').html(theme.utils.addSymbol('chevron-left'));
        slider.find('.owl-next').html(theme.utils.addSymbol('chevron-right'));
      }
      return slider;
    };

    FrameworkSlider.prototype.getActiveIndex = function() {
      return this.container.find('.owl-pagination .owl-page.active').index();
    };

    FrameworkSlider.prototype.formatPaginationNumbers = function() {
      return this.container.find('.owl-page.active .owl-numbers').text((this.active_index + 1) + "/" + this.slide_length);
    };

    FrameworkSlider.prototype.autoplay = function() {
      if (this.autoplay_enabled) {
        return this.autoplay_frequency;
      }
      return false;
    };

    FrameworkSlider.prototype.updateContextMenu = function(index) {
      var context_navigation, type_class;
      if (this.news_panel) {
        type_class = '.' + this.container.find('.slide').eq(index).data('feed-type');
        context_navigation = this.container.closest('.template--index--news').find('.context-navigation');
        context_navigation.find('.item').hide();
        return context_navigation.find(type_class).show();
      }
    };

    FrameworkSlider.prototype.alignPlayButton = function() {
      var play_button, play_button_height, slide, slide_height, video_offset;
      slide = this.container.find('.owl-item').eq(this.active_index);
      play_button = slide.find('.play-button');
      if (play_button.length === 0) {
        return;
      }
      play_button.css('visibility', 'hidden');
      if (PAGE.hasClass('transparent-menu') && $('.main-header').css('position') === 'absolute') {
        slide_height = slide.outerHeight();
        play_button_height = play_button.outerHeight();
        video_offset = (slide_height - play_button_height) / 2;
        play_button.css({
          'margin-top': 0,
          'top': video_offset
        });
      } else {
        play_button.css({
          'margin-top': '-40px',
          'top': '50%'
        });
      }
      return play_button.css('visibility', 'visible');
    };

    FrameworkSlider.prototype.eventListeners = function() {
      var _this;
      _this = this;
      this.container.find(".play-button").on('click', function() {
        var video_modal;
        video_modal = new VideoModal($(this).closest('.video'));
        video_modal.open();
        _this.owl.stop();
        return false;
      });
      return this.container.find('.owl-pagination .owl-page, .skip-to-next').on('click', function() {
        _this.owl.next();
        return false;
      });
    };

    return FrameworkSlider;

  })();

  theme.classes.FrameworkStickyColumn = (function() {
    function FrameworkStickyColumn(container1, column_a, column_b, mq) {
      this.container = container1;
      this.column_a = column_a;
      this.column_b = column_b;
      this.mq = mq;
      this.Listeners = bind(this.Listeners, this);
      this.setColumnPosition = bind(this.setColumnPosition, this);
      this.getAlignment = bind(this.getAlignment, this);
      this.getState = bind(this.getState, this);
      this.resetLargerColumn = bind(this.resetLargerColumn, this);
      this.getSmallerColumn = bind(this.getSmallerColumn, this);
      this.heightsHaveChanged = bind(this.heightsHaveChanged, this);
      this.setHeights = bind(this.setHeights, this);
      this.loadColumns = bind(this.loadColumns, this);
      if (Modernizr.touchevents) {
        return false;
      }
      this.current_state = 'auto';
      this.column_a_height = 0;
      this.column_b_height = 0;
      this.loadColumns();
    }

    FrameworkStickyColumn.prototype.loadColumns = function() {
      var _this;
      _this = this;
      return theme.utils.imagesLoaded(_this.container, function() {
        _this.Listeners();
        return _this.setColumnPosition();
      });
    };

    FrameworkStickyColumn.prototype.setHeights = function() {
      this.column_a_height = this.column_a.outerHeight();
      return this.column_b_height = this.column_b.outerHeight();
    };

    FrameworkStickyColumn.prototype.heightsHaveChanged = function() {
      if (this.column_a.outerHeight() !== this.column_a_height) {
        this.setHeights();
        return true;
      }
      if (this.column_b.outerHeight() !== this.column_b_height) {
        this.setHeights();
        return true;
      }
      return false;
    };

    FrameworkStickyColumn.prototype.getSmallerColumn = function() {
      if (this.column_a_height < this.column_b_height) {
        return this.column_a;
      } else {
        return this.column_b;
      }
    };

    FrameworkStickyColumn.prototype.resetLargerColumn = function() {
      if (this.column_a_height > this.column_b_height) {
        return this.column_a.css({
          'position': 'relative',
          'top': 'auto',
          'bottom': 'auto'
        });
      } else {
        return this.column_b.css({
          'position': 'relative',
          'top': 'auto',
          'bottom': 'auto'
        });
      }
    };

    FrameworkStickyColumn.prototype.getState = function(scroll_pos, window_height, column) {
      var column_height, height_for_bottom, overflowing_column, state;
      state = 'auto';
      if (this.mq.current_window === 'small') {
        return 'auto';
      }
      column_height = column.outerHeight();
      if (window_height > column_height) {
        overflowing_column = true;
      }
      if (scroll_pos < this.container.offset().top) {
        state = 'auto';
      }
      if (overflowing_column) {
        height_for_bottom = column_height;
      } else {
        height_for_bottom = window_height;
      }
      if ((scroll_pos + height_for_bottom) > (this.container.offset().top + this.container.outerHeight())) {
        state = 'absolute-bottom';
      } else if (scroll_pos > this.container.offset().top && overflowing_column) {
        state = 'fixed-top';
      } else if (window_height < column_height && (scroll_pos + window_height) > (this.container.offset().top + column.outerHeight())) {
        state = 'fixed-bottom';
      }
      return state;
    };

    FrameworkStickyColumn.prototype.getAlignment = function(column) {
      if (column.hasClass('column-a')) {
        return 'left';
      } else if (column.hasClass('column-b')) {
        return 'right';
      }
    };

    FrameworkStickyColumn.prototype.setColumnPosition = function() {
      var _this, align, column, state;
      _this = this;
      _this.setHeights();
      column = _this.getSmallerColumn();
      state = _this.getState($(window).scrollTop(), $(window).height(), column);
      align = _this.getAlignment(column);
      if (state === 'auto' && this.current_state !== 'auto') {
        this.current_state = 'auto';
        column.css({
          'position': 'relative',
          'top': 'auto',
          'bottom': 'auto'
        });
      } else if (state === 'fixed-bottom' && this.current_state !== 'fixed-bottom') {
        this.current_state = 'fixed-bottom';
        column.css({
          'position': 'fixed',
          'top': 'auto',
          'bottom': 0
        });
      } else if (state === 'fixed-top' && this.current_state !== 'fixed-top') {
        this.current_state = 'fixed-top';
        column.css({
          'position': 'fixed',
          'top': 0,
          'bottom': 'auto'
        });
      } else if (state === 'absolute-bottom' && this.current_state !== 'absolute-bottom') {
        this.current_state = 'absolute-bottom';
        column.css({
          'position': 'absolute',
          'top': 'auto',
          'bottom': 0
        });
      }
      if (align === 'right') {
        return column.css({
          'right': 0
        });
      }
    };

    FrameworkStickyColumn.prototype.Listeners = function() {
      var _this;
      _this = this;
      $(window).scroll(function() {
        return _this.setColumnPosition();
      });
      setInterval(function() {
        if (_this.heightsHaveChanged()) {
          _this.resetLargerColumn();
          return _this.setColumnPosition();
        }
      }, 250);
      return $(window).resize(function() {
        _this.resetLargerColumn();
        return _this.setColumnPosition();
      });
    };

    return FrameworkStickyColumn;

  })();

  theme.classes.FrameworkUtils = (function() {
    function FrameworkUtils() {
      var _this;
      _this = this;
      _this.google_map_api_status = null;
      cssVars();
    }

    FrameworkUtils.prototype.debounce = function(delay, fn) {
      var timeoutId;
      timeoutId = void 0;
      return function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(fn.bind(this), delay, arguments);
      };
    };

    FrameworkUtils.prototype.imagesLoaded = function(selector, callback) {
      var count, images_length;
      count = 0;
      images_length = selector.find('img[data-sizes="auto"]').length;
      if (images_length < 1) {
        callback();
        return;
      }
      return selector.on('lazybeforeunveil', function(e) {
        return $(e.target).one('load', function() {
          count++;
          if (count === images_length) {
            return callback();
          }
        });
      });
    };

    FrameworkUtils.prototype.a11yClick = function(event) {
      var code;
      if (event.type === 'click') {
        return true;
      } else if (event.type === 'keypress') {
        code = event.charCode || event.keyCode;
        if (code === 32) {
          event.preventDefault();
        }
        if (code === 32 || code === 13) {
          return true;
        }
      }
      return false;
    };

    FrameworkUtils.prototype.matchImageHeights = function(container, items, image_class) {
      var _this, greatest_image_height, items_per_row, row_items;
      _this = this;
      items_per_row = Math.round(container.width() / items.first().outerWidth());
      greatest_image_height = 0;
      row_items = $();
      items.find(image_class).css('height', 'auto');
      items.find('.placeholder--root').css('height', 'auto');
      return items.each(function(index) {
        var this_height;
        if ($(this).find('.image--root').length > 0) {
          this_height = $(this).find(image_class + ' .image--root').outerHeight();
        } else {
          this_height = $(this).find('.placeholder--root').outerHeight();
        }
        row_items = row_items.add($(this));
        if (this_height > greatest_image_height) {
          greatest_image_height = this_height;
        }
        if (index % items_per_row === items_per_row - 1 || index + 1 === items.length) {
          row_items.find(image_class + ', .placeholder--root').height(greatest_image_height);
          greatest_image_height = 0;
          return row_items = $();
        }
      });
    };

    return FrameworkUtils;

  })();

  theme.classes.FrameworkVideo = (function() {
    function FrameworkVideo(root) {
      var _this;
      this.root = root;
      _this = this;
      _this.root.fitVids();
    }

    return FrameworkVideo;

  })();

  theme.classes.FrameworkXMenu = (function() {
    function FrameworkXMenu(root) {
      var _this;
      this.root = root;
      this.slideUp = bind(this.slideUp, this);
      this.slideDown = bind(this.slideDown, this);
      this.arrangeMegaNav = bind(this.arrangeMegaNav, this);
      this.resizeListeners = bind(this.resizeListeners, this);
      this.checkOverlap = bind(this.checkOverlap, this);
      this.listeners = bind(this.listeners, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.debugging = false;
      _this.state = 'closed';
      _this.parent_links = _this.root.find('.x-menu--level-1--link > a');
      _this.sub_menu_links = _this.root.find('.x-menu--level-1--link:not([data-x-menu--depth="1"]) > a');
      _this.sub_menu_items = _this.sub_menu_links.parent().find('ul a');
      _this.parents_with_sub_menu = _this.sub_menu_links.parent();
      _this.overlap_parent = _this.root.data('x-menu--overlap-parent');
      _this.load();
    }

    FrameworkXMenu.prototype.load = function() {
      var _this;
      _this = this;
      _this.arrangeMegaNav();
      _this.listeners();
      _this.checkOverlap();
      return _this.resizeListeners();
    };

    FrameworkXMenu.prototype.listeners = function() {
      var _this;
      _this = this;
      _this.parents_with_sub_menu.on('mouseenter.XMenu', function(e) {
        return _this.slideDown($(this).find('> a'));
      });
      _this.parents_with_sub_menu.on('mouseleave.XMenu', function() {
        return _this.slideUp();
      });
      _this.parent_links.on('focus', function(e) {
        return _this.slideUp();
      });
      _this.sub_menu_links.on('focus', function(e) {
        return _this.slideDown($(this));
      });
      return _this.sub_menu_links.on('touchstart.XMenu', function(e) {
        e.preventDefault();
        if ($(this).parent().attr('data-x-menu--open') === 'true') {
          return _this.slideUp();
        } else {
          return _this.slideDown($(this));
        }
      });
    };

    FrameworkXMenu.prototype.checkOverlap = function() {
      var _this, center_index, center_item, center_item_left_edge, center_item_right_edge, center_item_width, container, container_width, first_center_child, last_center_child, left_break_point, left_item, right_item, right_item_edge;
      _this = this;
      if (Modernizr.touchevents && theme.utils.mqs.current_window !== 'large') {
        _this.root.attr('data-x-menu--overlap', 'true');
        return false;
      }
      _this.root.attr('data-x-menu--overlap', 'false');
      center_item = _this.root;
      if (_this.overlap_parent === 1) {
        center_item = center_item.parent();
      } else if (_this.overlap_parent === 2) {
        center_item = center_item.parent().parent();
      }
      container = center_item.parent();
      center_index = center_item.index();
      left_item = false;
      if (center_index > 1) {
        left_item = container.children().eq(center_index - 1);
      }
      right_item = false;
      if (center_index + 1 < container.children().length) {
        right_item = container.children().eq(center_index + 1);
      }
      container_width = container.width();
      center_item_width = _this.root.outerWidth();
      if (left_item) {
        first_center_child = center_item.find('> :first-child');
        center_item_left_edge = first_center_child.offset().left - 1;
        left_break_point = (container_width - center_item_width) / 2;
        if (left_edge >= center_item_left_edge) {
          _this.root.attr('data-x-menu--overlap', 'true');
        }
      }
      if (right_item) {
        last_center_child = center_item.find('> :last-child');
        center_item_right_edge = last_center_child.outerWidth() + last_center_child.offset().left + 1;
        right_item_edge = right_item.offset().left;
        if (center_item_right_edge >= right_item_edge) {
          return _this.root.attr('data-x-menu--overlap', 'true');
        }
      }
    };

    FrameworkXMenu.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.XMenu', _this.debounce(100, function() {
        return _this.checkOverlap();
      }));
    };

    FrameworkXMenu.prototype.debounce = function(delay, fn) {
      var timeoutId;
      timeoutId = void 0;
      return function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(fn.bind(this), delay, arguments);
      };
    };

    FrameworkXMenu.prototype.arrangeMegaNav = function() {
      var _this, mega_navs;
      _this = this;
      if (_this.parents_with_sub_menu.length === 0) {
        return false;
      }
      mega_navs = _this.root.find('[data-x-menu--depth="3"] .x-menu--level-2--container');
      return mega_navs.each(function() {
        var container, single_parents, single_parents_container;
        container = $(this);
        single_parents = container.find('[data-x-menu--single-parent="true"]');
        if (single_parents.length > 0) {
          single_parents_container = $('<div class="x-menu--single-parents"></div>').insertAfter(container.find('.x-menu--bg'));
          return single_parents_container.append('<ul>').find('ul').append(single_parents);
        }
      });
    };

    FrameworkXMenu.prototype.slideDown = function(link, delay) {
      var _this, display_type, link_wrapper, menu_height, sub_menu;
      if (delay == null) {
        delay = false;
      }
      _this = this;
      clearTimeout(_this.timer);
      link_wrapper = link.parent();
      if (link_wrapper.attr('data-x-menu--open') === 'true' || _this.state === 'closing') {
        return false;
      }
      _this.slideUp(false);
      if (delay && delay !== 'complete') {
        _this.timer = setTimeout(function() {
          return _this.slideDown(link, 'complete');
        }, delay);
      } else {
        link.closest('.x-menu--level-1--link').find('.fw--icon--expand-less').show();
        link.closest('.x-menu--level-1--link').find('.fw--icon--expand-more').hide();
        link.closest('.x-menu--level-1--link').find('.fw--icon--minus').show();
        link.closest('.x-menu--level-1--link').find('.fw--icon--plus').hide();
        _this.state = 'open';
        link_wrapper.attr('data-x-menu--open', 'true');
        link.attr('aria-expanded', 'true');
        sub_menu = link.closest('.x-menu--level-1--link').find('.x-menu--level-2--container');
        display_type = 'block';
        if (link_wrapper.attr('data-x-menu--depth') === "3") {
          display_type = 'flex';
        }
        sub_menu.velocity('stop');
        sub_menu.css({
          height: 'auto',
          display: display_type
        });
        sub_menu.find('.x-menu--level-2--list').css({
          display: display_type
        });
        menu_height = sub_menu.outerHeight();
        sub_menu.css({
          height: 0,
          opacity: 1
        });
        sub_menu.velocity({
          height: [menu_height, 0]
        }, {
          queue: false,
          duration: 600,
          easing: "easeOutExpo"
        });
      }
    };

    FrameworkXMenu.prototype.slideUp = function(delay) {
      var _this, link, link_wrapper, sub_menu;
      if (delay == null) {
        delay = 300;
      }
      _this = this;
      if (_this.debugging) {
        return false;
      }
      link_wrapper = _this.parents_with_sub_menu.filter('[data-x-menu--open="true"]');
      link = link_wrapper.find('> a');
      if (link_wrapper.attr('data-x-menu--open') === 'false') {
        return false;
      }
      if (delay) {
        return _this.timer = setTimeout(function() {
          return _this.slideUp(false);
        }, delay);
      } else {
        link.closest('.x-menu--level-1--link').find('.fw--icon--expand-less').hide();
        link.closest('.x-menu--level-1--link').find('.fw--icon--expand-more').show();
        link.closest('.x-menu--level-1--link').find('.fw--icon--minus').hide();
        link.closest('.x-menu--level-1--link').find('.fw--icon--plus').show();
        sub_menu = link.closest('.x-menu--level-1--link').find('.x-menu--level-2--container');
        link_wrapper.attr('data-x-menu--open', 'false');
        link.attr('aria-expanded', 'false');
        return sub_menu.velocity({
          opacity: 0
        }, {
          begin: function() {
            return _this.state = 'closing';
          },
          complete: function() {
            sub_menu.css({
              'display': 'none'
            });
            return _this.state = 'closed';
          },
          duration: 200
        });
      }
    };

    return FrameworkXMenu;

  })();

  theme.classes.FrameworkYMenu = (function() {
    function FrameworkYMenu(root) {
      var _this;
      this.root = root;
      this.slideRight = bind(this.slideRight, this);
      this.slideLeft = bind(this.slideLeft, this);
      this.adjustHeight = bind(this.adjustHeight, this);
      this.listeners = bind(this.listeners, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.state = 'closed';
      _this.sub_menu_links = _this.root.find('.fw--icon--chevron-right').parent();
      _this.back_links = _this.root.find('.y-menu--back-link a');
      _this.regular_links = _this.root.find('.y-menu--level-1--link > a:not([data-submenu="true"]), .y-menu--level-2--link > a:not([data-submenu="true"]), .y-menu--level-3--link > a:not([data-submenu="true"])');
      _this.timer = null;
      _this.load();
    }

    FrameworkYMenu.prototype.load = function() {
      var _this;
      _this = this;
      return _this.listeners();
    };

    FrameworkYMenu.prototype.listeners = function() {
      var _this;
      _this = this;
      _this.regular_links.on('click', function(e) {
        var href;
        href = $(this).attr('href');
        if (href.indexOf('#') !== -1) {
          if (theme.partials.FrameworkOffCanvas.state === 'left-open') {
            theme.partials.FrameworkOffCanvas.closeLeft();
          } else if (theme.partials.FrameworkOffCanvas.state === 'right-open') {
            theme.partials.FrameworkOffCanvas.closeRight();
          }
          setTimeout(function() {
            return window.location.href = href;
          }, 450);
        }
      });
      _this.sub_menu_links.on('click', function(e) {
        _this.slideLeft($(this));
        return false;
      });
      return _this.back_links.on('click', function(e) {
        _this.slideRight($(this));
        return false;
      });
    };

    FrameworkYMenu.prototype.adjustHeight = function(open_list) {
      var _this, current_height, open_list_height;
      _this = this;
      _this.root.css({
        height: 'auto'
      });
      current_height = _this.root.outerHeight();
      open_list_height = open_list.outerHeight();
      if (open_list.css('position') === 'absolute') {
        open_list.css('position', 'relative');
        open_list_height = open_list.outerHeight();
        open_list.css('position', 'absolute');
      }
      return _this.root.velocity({
        height: open_list_height
      });
    };

    FrameworkYMenu.prototype.slideLeft = function(link) {
      var _this, sub_menu;
      _this = this;
      sub_menu = link.closest('li').find('ul').first();
      sub_menu.css({
        display: 'block'
      });
      _this.adjustHeight(sub_menu);
      return sub_menu.velocity({
        translateX: ['-100%', 0]
      });
    };

    FrameworkYMenu.prototype.slideRight = function(link) {
      var _this, container, parent_container;
      _this = this;
      container = link.closest('ul');
      parent_container = container.parent().closest('ul');
      _this.adjustHeight(parent_container);
      return container.velocity({
        translateX: [0, '-100%']
      });
    };

    return FrameworkYMenu;

  })();

  theme.classes.Article = (function(superClass) {
    extend(Article, superClass);

    function Article() {
      return Article.__super__.constructor.apply(this, arguments);
    }

    return Article;

  })(theme.classes.FrameworkArticle);

  theme.classes.Cart = (function(superClass) {
    extend(Cart, superClass);

    function Cart(root) {
      this.root = root;
      this.updateTotalsComplete = bind(this.updateTotalsComplete, this);
      Cart.__super__.constructor.call(this, this.root);
    }

    Cart.prototype.updateTotalsComplete = function() {
      var _this;
      _this = this;
      $('.header--cart .toggle .total').html(_this.totals.price);
      $('.header--cart .toggle .count').html(_this.totals.count);
      if (_this.totals.count > 0) {
        return $('.header--cart .cart-link').attr('data-cart--has-items', 'true');
      } else {
        return $('.header--cart .cart-link').attr('data-cart--has-items', 'false');
      }
    };

    return Cart;

  })(theme.classes.FrameworkCart);

  theme.classes.FeaturedProduct = (function(superClass) {
    extend(FeaturedProduct, superClass);

    function FeaturedProduct() {
      return FeaturedProduct.__super__.constructor.apply(this, arguments);
    }

    return FeaturedProduct;

  })(theme.classes.FrameworkFeaturedProduct);

  theme.classes.FeedbackBar = (function() {
    function FeedbackBar(container1) {
      var _this;
      this.container = container1;
      this.load = bind(this.load, this);
      _this = this;
      _this.messages = _this.container.find('.feedback-bar--message span');
      _this.load();
    }

    FeedbackBar.prototype.load = function() {
      var _this, anchor_tag, message, message_elem;
      _this = this;
      _this.messages.hide();
      anchor_tag = window.location.hash.substr(1);
      message = anchor_tag.replace('feedback-bar--', '');
      message_elem = _this.messages.filter('[data-feedback-bar--message="' + message + '"]');
      if (message_elem.length) {
        message_elem.show();
        setTimeout(function() {
          return _this.container.attr('data-feedback-bar--open', 'true');
        }, 200);
        return setTimeout(function() {
          return _this.container.attr('data-feedback-bar--open', 'false');
        }, 3000);
      }
    };

    return FeedbackBar;

  })();

  theme.classes.Slideshow = (function() {
    function Slideshow(root) {
      var _this, slide_parent;
      this.root = root;
      this.eventListeners = bind(this.eventListeners, this);
      this.alignPlayButton = bind(this.alignPlayButton, this);
      this.alignCaption = bind(this.alignCaption, this);
      this.isFirstSlider = bind(this.isFirstSlider, this);
      this.getActiveIndex = bind(this.getActiveIndex, this);
      this.autoplay = bind(this.autoplay, this);
      this.createSlider = bind(this.createSlider, this);
      _this = this;
      this.el = _this.root.find('.slides');
      slide_parent = this.el.closest('.slider');
      this.autoplay_enabled = slide_parent.data('autoplay');
      if (slide_parent.find('.slide').length < 2) {
        this.autoplay_enabled = false;
      }
      this.autoplay_frequency = slide_parent.data('rotateFrequency');
      this.transition_style = slide_parent.data('transitionStyle');
      this.createSlider();
      this.owl = $(".owl-carousel").data('owlCarousel');
    }

    Slideshow.prototype.createSlider = function() {
      var slider, slider_options;
      slider = this;
      slider_options = {
        singleItem: true,
        navigation: false,
        paginationNumbers: false,
        scrollPerPageNav: true,
        slideSpeed: 800,
        pagination: true,
        autoHeight: true,
        autoPlay: slider.autoplay(),
        afterInit: function() {
          return slider.eventListeners();
        },
        afterAction: function() {
          slider.alignCaption();
          return slider.alignPlayButton();
        }
      };
      if (this.transition_style !== 'default') {
        slider_options['transitionStyle'] = this.transition_style;
      }
      return slider.el.owlCarousel(slider_options);
    };

    Slideshow.prototype.autoplay = function() {
      if (this.autoplay_enabled) {
        return this.autoplay_frequency;
      }
      return false;
    };

    Slideshow.prototype.getActiveIndex = function() {
      return this.el.find('.owl-pagination .owl-page.active').index();
    };

    Slideshow.prototype.isFirstSlider = function() {
      var current_section_id, first_section, first_section_id;
      first_section = $('.index-sections').children('div:first');
      first_section_id = first_section.find('.slider').data('sectionId');
      current_section_id = this.el.closest('.slider').data('sectionId');
      if (first_section.hasClass('section--slideshow')) {
        return current_section_id === first_section_id;
      }
      return false;
    };

    Slideshow.prototype.alignCaption = function() {
      var caption, caption_height, caption_width, left_offset, middle_top, slide, slide_height, slide_padding, slide_width, top_offset;
      slide = this.el.find('.owl-item').eq(this.getActiveIndex());
      caption = slide.find('.caption');
      caption.css('visibility', 'hidden');
      caption_height = caption.outerHeight();
      caption_width = caption.outerWidth();
      slide_padding = 30;
      slide_height = slide.outerHeight();
      slide_width = slide.outerWidth();
      top_offset = 0;
      if (caption.hasClass('top')) {
        caption.css('top', top_offset + slide_padding);
      } else if (caption.hasClass('middle')) {
        middle_top = top_offset + (slide_height - top_offset - caption_height) / 2;
        caption.css('top', middle_top);
      }
      if (caption.hasClass('center')) {
        left_offset = (slide_width - caption_width) / 2;
        caption.css('left', left_offset);
      }
      return caption.css('visibility', 'visible');
    };

    Slideshow.prototype.alignPlayButton = function() {
      var play_button, slide;
      slide = this.el.find('.owl-item').eq(this.getActiveIndex());
      play_button = slide.find('.play-button');
      play_button.css('visibility', 'hidden');
      play_button.css({
        'margin-top': '-40px',
        'top': '50%'
      });
      return play_button.css('visibility', 'visible');
    };

    Slideshow.prototype.eventListeners = function() {
      var slider;
      slider = this;
      return this.el.find('.owl-pagination .owl-page').on('click', function() {
        return slider.owl.stop();
      });
    };

    return Slideshow;

  })();

  theme.classes.Header = (function() {
    function Header(root) {
      var _this;
      this.root = root;
      this.accelerationState = bind(this.accelerationState, this);
      this.newScrollDetected = bind(this.newScrollDetected, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.touchListener = bind(this.touchListener, this);
      this.scrollListener = bind(this.scrollListener, this);
      this.validScrollZone = bind(this.validScrollZone, this);
      this.detectAndLockHeader = bind(this.detectAndLockHeader, this);
      this.hideFixedHeader = bind(this.hideFixedHeader, this);
      this.closeWhenReady = bind(this.closeWhenReady, this);
      this.showFixedHeader = bind(this.showFixedHeader, this);
      this.resizeListeners = bind(this.resizeListeners, this);
      this.sectionListeners = bind(this.sectionListeners, this);
      this.moveContactButton = bind(this.moveContactButton, this);
      this.moveYMenu = bind(this.moveYMenu, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.container = _this.root.find('.header--container');
      _this.fixed_height = 0;
      _this.delta = 0;
      _this.scrollings = [];
      _this.prev_time = new Date().getTime();
      _this.prev_acceleration_state = 'decel';
      _this.scroll_detection_active = false;
      _this.time_last_scrolled = 0;
      _this.browser_type = null;
      _this.mouse_type = null;
      _this.animation_lock = false;
      _this.load();
    }

    Header.prototype.load = function() {
      var _this;
      _this = this;
      _this.moveYMenu();
      _this.moveContactButton();
      _this.resizeListeners();
      _this.sectionListeners();
      _this.scrollListener();
      return _this.touchListener();
    };

    Header.prototype.moveYMenu = function() {
      var _this;
      _this = this;
      $('.mobile-nav--menu').empty();
      return $('.y-menu').appendTo('.mobile-nav--menu');
    };

    Header.prototype.moveContactButton = function() {
      var _this;
      _this = this;
      $('.mobile-nav--contact-button').empty();
      if ($('.header--contact-button-for-off-canvas').length > 0) {
        return $('.header--contact-button-for-off-canvas .contact-modal').appendTo('.mobile-nav--contact-button');
      }
    };

    Header.prototype.sectionListeners = function() {
      var _this;
      _this = this;
      _this.root.on('theme:section:load', function() {
        if ($('.modal--window').css('display') === 'block') {
          $('.modal--close').trigger('click');
        }
        theme.partials.FrameworkOffCanvas.unload();
        return theme.partials.FrameworkOffCanvas.load();
      });
      return _this.root.on('theme:section:unload', function() {
        return $(window).off('resize.Header');
      });
    };

    Header.prototype.resizeListeners = function() {
      var _this;
      _this = this;
      return $(window).on('resize.Header', _this.checkOverlap);
    };

    Header.prototype.showFixedHeader = function(from_event) {
      var _this, valid_zone;
      if (from_event == null) {
        from_event = 'scroll';
      }
      _this = this;
      if (from_event === 'add-to-cart') {
        valid_zone = _this.validScrollZone(0);
      } else {
        valid_zone = _this.validScrollZone();
      }
      if (_this.root.attr('data-header--position') === 'fixed' || !valid_zone) {
        return false;
      }
      _this.animation_lock = true;
      _this.root.height(_this.root.height());
      _this.root.attr('data-header--position', 'fixed');
      if (_this.fixed_height === 0) {
        _this.fixed_height = _this.container.outerHeight();
      }
      return _this.container.velocity({
        translateY: [0, -_this.fixed_height]
      }, {
        duration: 500,
        complete: function() {
          _this.animation_lock = false;
          if (from_event === 'add-to-cart') {
            return _this.closeWhenReady();
          }
        }
      });
    };

    Header.prototype.closeWhenReady = function() {
      var _this, timer;
      _this = this;
      timer = setTimeout(function() {
        _this.hideFixedHeader();
        return _this.container.off('mouseenter mouseleave');
      }, 2000);
      _this.container.on('mouseenter', function() {
        return clearTimeout(timer);
      });
      return _this.container.on('mouseleave', function() {
        return timer = setTimeout(function() {
          _this.hideFixedHeader();
          return _this.container.off('mouseenter mouseleave');
        }, 500);
      });
    };

    Header.prototype.hideFixedHeader = function(duration) {
      var _this;
      if (duration == null) {
        duration = 400;
      }
      _this = this;
      if (_this.root.attr('data-header--position') !== 'fixed') {
        return false;
      }
      _this.animation_lock = true;
      _this.container.velocity("stop", true);
      return _this.container.velocity({
        translateY: [-_this.fixed_height, 0]
      }, {
        duration: duration,
        complete: function() {
          _this.root.attr('data-header--position', 'relative');
          _this.container.removeAttr('style');
          _this.root.height('auto');
          return _this.animation_lock = false;
        }
      });
    };

    Header.prototype.detectAndLockHeader = function() {
      var _this, header_offset, scroll_top;
      _this = this;
      if (_this.root.attr('data-header--position') !== 'fixed') {
        return;
      }
      scroll_top = $(window).scrollTop();
      header_offset = _this.root.offset().top;
      if ($('[data-banner--enabled="true"]').length === 0) {
        header_offset += 0;
      }
      if (scroll_top <= header_offset) {
        return _this.hideFixedHeader(0);
      }
    };

    Header.prototype.validScrollZone = function(offset_threshold) {
      var _this, header_offset, scroll_top;
      if (offset_threshold == null) {
        offset_threshold = 600;
      }
      _this = this;
      scroll_top = $(window).scrollTop();
      header_offset = _this.root.offset().top + (_this.root.outerHeight() / 2);
      if (scroll_top > header_offset + offset_threshold) {
        return true;
      } else {
        return false;
      }
    };

    Header.prototype.scrollListener = function() {
      var _this;
      _this = this;
      $(window).on("DOMMouseScroll mousewheel touchmove", function(e) {
        _this.scrollHandler(e);
        return _this.detectAndLockHeader();
      });
      return $(window).on("scroll", function(e) {
        return _this.detectAndLockHeader();
      });
    };

    Header.prototype.touchListener = function() {
      var _this, position;
      _this = this;
      if (!Modernizr.touchevents) {
        return false;
      }
      position = {
        start: {},
        end: {}
      };
      $(document).on('touchmove', function(e) {
        return _this.detectAndLockHeader();
      });
      $(document).on('touchstart', function(e) {
        position.start.x = e.originalEvent.touches[0].clientX;
        position.start.y = e.originalEvent.touches[0].clientY;
      });
      return $(document).bind('touchend', function(e) {
        if (_this.animation_lock) {
          return false;
        }
        position.end.x = e.originalEvent.changedTouches[0].clientX;
        position.end.y = e.originalEvent.changedTouches[0].clientY;
        if (Math.abs(position.start.x - position.end.x) > 30) {
          return false;
        }
        if (position.start.y > position.end.y + 5) {
          return _this.hideFixedHeader();
        } else if (position.start.y < position.end.y - 5) {
          return _this.showFixedHeader();
        }
      });
    };

    Header.prototype.scrollHandler = function(e) {
      var _this, delta, horizontalDetection, isScrollingVertically, value;
      _this = this;
      if (_this.animation_lock) {
        return false;
      }
      e = e.originalEvent;
      if (typeof e.wheelDelta !== 'undefined') {
        value = e.wheelDelta;
        _this.browser_type = 'webkit';
      } else if (typeof e.detail !== 'undefined') {
        value = -e.detail;
        _this.browser_type = 'firefox';
      }
      delta = Math.max(-1, Math.min(1, value));
      if (_this.scrollings.length > 149) {
        _this.scrollings.shift();
      }
      _this.scrollings.push(Math.abs(value));
      horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
      isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
      if (isScrollingVertically) {
        if (_this.newScrollDetected()) {
          if (delta < 0) {
            return _this.hideFixedHeader();
          } else {
            return _this.showFixedHeader();
          }
        }
      }
    };

    Header.prototype.newScrollDetected = function() {
      var _this, acceleration_state, cur_time, scrolled_recently;
      _this = this;
      cur_time = new Date().getTime();
      acceleration_state = _this.accelerationState();
      scrolled_recently = cur_time - _this.time_last_scrolled < 500;
      if (!acceleration_state) {
        return false;
      } else if (acceleration_state === 'accel' && _this.prev_acceleration_state === 'decel' && !scrolled_recently) {
        _this.prev_acceleration_state = acceleration_state;
        return true;
      } else {
        _this.prev_acceleration_state = acceleration_state;
        return false;
      }
    };

    Header.prototype.accelerationState = function() {
      var _this, accel_state, average_end, average_middle, cur_time, getAverage, time_diff;
      _this = this;
      cur_time = new Date().getTime();
      time_diff = cur_time - _this.prev_time;
      _this.prev_time = cur_time;
      if (time_diff > 50) {
        _this.scrollings = [_this.scrollings[_this.scrollings.length - 1]];
        _this.prev_acceleration_state = 'decel';
      }
      getAverage = function(elements, number) {
        var i, lastElements, sum;
        sum = 0;
        lastElements = elements.slice(elements.length - number);
        i = 0;
        while (i < lastElements.length) {
          sum = sum + lastElements[i];
          i++;
        }
        return sum / number;
      };
      average_middle = getAverage(_this.scrollings, Math.ceil(_this.scrollings.length * 0.5));
      average_end = getAverage(_this.scrollings, Math.ceil(_this.scrollings.length * 0.05));
      accel_state = 'decel';
      if (_this.scrollings.length > 1) {
        if (_this.scrollings[0] === 120) {
          accel_state = 'accel';
        } else if (_this.scrollings.length === 2) {
          if (_this.scrollings[0] === 1 && _this.scrollings[1] === 1) {
            accel_state = 'accel';
          }
        } else if (average_end > average_middle) {
          accel_state = 'accel';
        }
      }
      return accel_state;
    };

    return Header;

  })();

  theme.classes.MobileNav = (function() {
    function MobileNav(root) {
      var _this;
      this.root = root;
      this.contactModalTrigger = bind(this.contactModalTrigger, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.modal_content = _this.root.find('.modal--content');
      _this.load();
    }

    MobileNav.prototype.load = function() {
      var _this;
      _this = this;
      return _this.contactModalTrigger();
    };

    MobileNav.prototype.contactModalTrigger = function() {
      var _this, trigger;
      _this = this;
      trigger = $('.mobile-nav--contact-modal-trigger');
      if (trigger.length) {
        return trigger.on("click", function() {
          theme.partials.FrameworkOffCanvas.closeLeft();
          setTimeout(function() {
            return $('.header--contact-modal .modal--link').trigger('click');
          }, 400);
          return false;
        });
      }
    };

    return MobileNav;

  })();

  theme.classes.Popup = (function() {
    function Popup(root) {
      var _this;
      this.root = root;
      _this = this;
      _this.container = _this.root.find('.popup--container');
      _this.open_link = $('.popup--open');
      _this.close_link = _this.root.find('.popup--close');
      _this.show_again_after = _this.root.data('show-again-after');
      _this.mode = _this.root.data('mode');
      _this.newsletter_form = _this.root.find('#contact_form');
      _this.body = $('body');
      _this.eventListeners();
      _this.autoPopup();
    }

    Popup.prototype.eventListeners = function() {
      var _this;
      _this = this;
      _this.open_link.on('keypress.Popup, click.Popup', function(e) {
        if (_this.body.hasClass('popup--opened')) {
          _this.close();
        } else {
          _this.open();
        }
        return false;
      });
      return _this.close_link.on('keypress.Popup, click.Popup', function(e) {
        _this.close();
        return false;
      });
    };

    Popup.prototype.open = function(source) {
      var _this;
      _this = this;
      if ($('.template--index .banner').length && source === 'auto') {
        _this.delayUntilValidScrollPosition();
        return false;
      }
      _this.container.removeClass('popup--closed');
      _this.container.velocity({
        translateY: [0, _this.container.outerHeight()]
      }, {
        duration: 300
      });
      _this.body.addClass('popup--opened');
      return setTimeout(function() {
        return _this.body.css('padding-bottom', _this.container.outerHeight());
      }, 300);
    };

    Popup.prototype.delayUntilValidScrollPosition = function() {
      var _this;
      _this = this;
      return $(window).on("DOMMouseScroll.Popup mousewheel.Popup touchmove.Popup scroll.Popup touchmove.Popup", function(e) {
        var header_offset, scroll_top;
        header_offset = $('.header').offset().top;
        scroll_top = $(window).scrollTop();
        if (scroll_top > header_offset) {
          _this.open();
          return $(window).off("DOMMouseScroll.Popup mousewheel.Popup touchmove.Popup scroll.Popup touchmove.Popup");
        }
      });
    };

    Popup.prototype.close = function() {
      var _this;
      _this = this;
      _this.body.removeClass('popup--opened');
      _this.body.velocity({
        paddingBottom: 0
      }, {
        duration: 300
      });
      return _this.container.velocity({
        translateY: [_this.container.outerHeight(), 0]
      }, {
        duration: 300,
        complete: function() {
          return _this.container.addClass('popup--closed');
        }
      });
    };

    Popup.prototype.autoPopup = function() {
      var _this;
      _this = this;
      if (_this.mode === 'manual') {
        return;
      }
      if (!Modernizr.localstorage || _this.mode === 'test') {
        return setTimeout(function() {
          return _this.open('auto');
        }, 1000);
      } else if (localStorage['troop-themes'] === void 0) {
        _this.setResetTime();
        return setTimeout(function() {
          return _this.open('auto');
        }, 1000);
      } else if (_this.readyToReset()) {
        _this.setResetTime();
        return setTimeout(function() {
          return _this.open('auto');
        }, 1000);
      }
    };

    Popup.prototype.readyToReset = function() {
      var _this, expires, now, troop_local_storage;
      _this = this;
      troop_local_storage = JSON.parse(localStorage['troop-themes']);
      expires = troop_local_storage.popup_expires;
      now = new Date().getTime();
      if (parseFloat(expires - now) <= 0) {
        _this.setResetTime();
        return true;
      }
      return false;
    };

    Popup.prototype.setResetTime = function() {
      var _this, date, expires, object, seconds_from_now;
      _this = this;
      date = new Date();
      seconds_from_now = 1000 * 60 * 60 * 24 * _this.show_again_after;
      expires = date.setTime(date.getTime() + seconds_from_now);
      object = {
        popup_expires: expires
      };
      localStorage['troop-themes'] = JSON.stringify(object);
      return _this;
    };

    return Popup;

  })();

  theme.classes.QuickAdd = (function() {
    function QuickAdd(root) {
      var _this;
      this.root = root;
      this.addProductComplete = bind(this.addProductComplete, this);
      this.renderCart = bind(this.renderCart, this);
      this.variantSelected = bind(this.variantSelected, this);
      this.initiateVariants = bind(this.initiateVariants, this);
      this.handleDuplicates = bind(this.handleDuplicates, this);
      this.eventListeners = bind(this.eventListeners, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.id = _this.root.data('quick-add--id');
      _this.index = '';
      _this.json = theme.quick_add['json_' + _this.id];
      _this.show_variants = _this.root.data('quick-add--show-variants');
      _this.add_button = _this.root.find('.quick-add--add-button');
      _this.confirm_button_wrapper = _this.root.find('.quick-add--button-wrapper');
      _this.confirm_button = _this.root.find('.quick-add--confirm-button');
      _this.cancel_button = _this.root.find('.quick-add--cancel-button');
      _this.cart_form = _this.root.find('.quick-add--cart-form');
      _this.variant_sold_out = _this.root.find('.quick-add--sold-out--variant');
      _this.unavailable_variant = _this.root.find('.quick-add--unavailable-variant');
      _this.price_wrapper = _this.root.find('.quick-add--price-wrapper');
      _this.price = _this.root.find('.quick-add--price');
      _this.compare_price = _this.root.find('.quick-add--compare-price');
      _this.details = _this.root.find('.quick-add--details');
      _this.product_image = _this.root.closest('.product').find('.product--image img');
      _this.related_product_details = _this.root.closest('.product--details').find('.product--details--title-row, .product--excerpt, .product--vendor');
      _this.load();
    }

    QuickAdd.prototype.load = function() {
      var _this;
      _this = this;
      _this.handleDuplicates();
      _this.initiateVariants();
      return _this.eventListeners();
    };

    QuickAdd.prototype.eventListeners = function() {
      var _this;
      _this = this;
      _this.add_button.on('keypress click', function(e) {
        if (_this.show_variants) {
          _this.details.show();
          _this.add_button.hide();
          _this.related_product_details.hide();
        } else {
          _this.cart_form.trigger('submit');
        }
        return false;
      });
      _this.cancel_button.on('keypress click', function(e) {
        if (theme.utils.a11yClick(e) === true) {
          _this.details.hide();
          _this.add_button.show();
          _this.related_product_details.show();
        }
        return false;
      });
      if (_this.cart_form.length > 0) {
        return _this.cart_form.on('submit', function(e) {
          e.preventDefault();
          _this.cart_form.find('.error').remove();
          _this.add_button.attr('data-loading', 'true');
          _this.confirm_button.attr('data-loading', 'true');
          theme.partials.Cart.addItem($(this), function(pass, error) {
            if (pass) {
              return _this.renderCart();
            } else {
              _this.cart_form.append('<div class="product-page--error error">' + error + '</div>');
              _this.add_button.attr('data-loading', 'false');
              return _this.confirm_button.attr('data-loading', 'false');
            }
          });
          return false;
        });
      }
    };

    QuickAdd.prototype.handleDuplicates = function() {
      var _this, product;
      _this = this;
      product = $('[data-quick-add--id="' + _this.id + '"]');
      if (product.length > 1) {
        return product.each(function(index) {
          if ($(this).attr('data-quick-add--duplicates-processed') !== 'true') {
            $(this).find('select').attr('id', 'quick-add--select--' + _this.id + '-' + index);
            $(this).attr('data-quick-add--duplicates-processed', 'true');
          }
          if ($(this).is(_this.root)) {
            return _this.index = '-' + index;
          }
        });
      }
    };

    QuickAdd.prototype.initiateVariants = function() {
      var _this, id, options;
      _this = this;
      id = 'quick-add--select--' + _this.id + _this.index;
      if (_this.root.find('select').length > 0) {
        return options = new Shopify.OptionSelectors(id, {
          product: _this.json,
          onVariantSelected: _this.variantSelected,
          enableHistoryState: false
        });
      }
    };

    QuickAdd.prototype.variantSelected = function(variant, selector, options) {
      var _this, product_sold_out;
      _this = this;
      product_sold_out = false;
      if (_this.root.find('.quick-add--sold-out--product').length) {
        product_sold_out = true;
      }
      _this.variant_sold_out.hide();
      _this.unavailable_variant.hide();
      _this.add_button.hide();
      _this.price_wrapper.hide();
      _this.confirm_button_wrapper.hide();
      if (!variant) {
        _this.unavailable_variant.show();
        return false;
      } else if (variant && variant.available) {
        _this.price_wrapper.show();
        _this.confirm_button_wrapper.show();
        if (_this.details.css('display') !== 'block') {
          _this.add_button.show();
        }
      } else if (product_sold_out) {
        _this.variant_sold_out.hide();
        _this.add_button.hide();
      } else {
        _this.variant_sold_out.show();
      }
      _this.price.html(Shopify.formatMoney(variant.price, theme.money_format));
      if (variant.compare_at_price > variant.price) {
        _this.compare_price.html(Shopify.formatMoney(variant.compare_at_price, theme.money_format));
        return _this.compare_price.show();
      } else {
        return _this.compare_price.hide();
      }
    };

    QuickAdd.prototype.renderCart = function() {
      var _this;
      _this = this;
      return theme.partials.Cart.renderCart(function() {
        return _this.addProductComplete();
      });
    };

    QuickAdd.prototype.addProductComplete = function() {
      var _this;
      _this = this;
      _this.add_button.attr('data-loading', 'false');
      _this.confirm_button.attr('data-loading', 'false');
      _this.details.hide();
      _this.add_button.show();
      _this.related_product_details.show();
      theme.partials.Header.showFixedHeader('add-to-cart');
      return $('.header--cart .toggle .total, .header--cart .toggle .count').velocity({
        opacity: 0
      }, {
        delay: 500,
        duration: 200
      }).velocity({
        opacity: 1
      }, {
        duration: 500
      });
    };

    return QuickAdd;

  })();

  theme.classes.ServiceList = (function() {
    function ServiceList(root) {
      var _this;
      this.root = root;
      this.balanceColumns = bind(this.balanceColumns, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.section_id = _this.root.data('section-id');
      _this.block_list = _this.root.find('.service-list--blocks');
      _this.blocks = _this.root.find('li');
      _this.blocks_container = _this.root.find('.service-list--container');
      _this.headers = _this.root.find('.service-list--block-header');
      _this.single_column = _this.root.find('.service-list--single-column');
      _this.left_column = _this.root.find('.service-list--left-column');
      _this.right_column = _this.root.find('.service-list--right-column');
      _this.load();
    }

    ServiceList.prototype.load = function() {
      var _this;
      _this = this;
      return _this.balanceColumns();
    };

    ServiceList.prototype.balanceColumns = function() {
      var _this, assignLoopList, isTypeHeader, loop_list, offset, thresholdBreached, with_multiple_headers;
      _this = this;
      offset = _this.root.data('service-list--show-descriptions') === true ? 75 : 0;
      with_multiple_headers = _this.block_list.length > 1 ? true : false;
      isTypeHeader = function(item) {
        return item.hasClass('service-list--block-header');
      };
      thresholdBreached = function() {
        var left_column_height, right_column_height, single_column_height;
        single_column_height = _this.single_column.outerHeight();
        left_column_height = _this.left_column.outerHeight();
        right_column_height = _this.right_column.outerHeight();
        return left_column_height >= parseFloat(right_column_height + single_column_height - offset);
      };
      assignLoopList = function() {
        if (with_multiple_headers) {
          _this.root.attr('data-service-list--has-headers', true);
          return _this.block_list;
        } else {
          _this.left_column.append('<ul class="service-list--blocks"></ul>');
          return _this.blocks;
        }
      };
      loop_list = assignLoopList();
      return loop_list.each(function(index) {
        if (thresholdBreached()) {
          _this.single_column.find('.service-list--blocks').appendTo(_this.right_column);
          return;
        } else {
          if (with_multiple_headers) {
            $(this).appendTo(_this.left_column);
          } else {
            if (isTypeHeader($(this))) {
              $(this).find('.service-list--block-header--text').prependTo(_this.blocks_container);
              $(this).remove();
            } else {
              $(this).appendTo(_this.left_column.find('.service-list--blocks'));
            }
          }
        }
        if (index === loop_list.length - 1 && _this.right_column.is(':empty') && _this.headers.length > 1) {
          return _this.left_column.find('.service-list--blocks').last().appendTo(_this.right_column);
        }
      });
    };

    return ServiceList;

  })();

  theme.classes.XMenu = (function(superClass) {
    extend(XMenu, superClass);

    function XMenu(root) {
      var _this;
      this.root = root;
      this.getLongestDropDrown = bind(this.getLongestDropDrown, this);
      this.orientateDropDown = bind(this.orientateDropDown, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.longest_drop_down = _this.getLongestDropDrown();
      _this.bottom_position_for_sub_above = $(window).height() - _this.root.offset().top;
      _this.banner_exists = $('.banner--container').length > 0;
      XMenu.__super__.constructor.apply(this, arguments);
    }

    XMenu.prototype.load = function() {
      var _this;
      _this = this;
      XMenu.__super__.load.apply(this, arguments);
      $(window).on('resize scroll', function() {
        return _this.orientateDropDown();
      });
      return _this.orientateDropDown();
    };

    XMenu.prototype.orientateDropDown = function() {
      var _this, banner_exists;
      _this = this;
      banner_exists = $('.banner--container').length > 0;
      if (banner_exists && $(window).scrollTop() < 50 && _this.longest_drop_down + 150 < $(window).height()) {
        return _this.root.attr('data-x-menu--sub-above', 'true');
      } else {
        return _this.root.attr('data-x-menu--sub-above', 'false');
      }
    };

    XMenu.prototype.getLongestDropDrown = function() {
      var _this, longest, sub_menus;
      _this = this;
      longest = 0;
      sub_menus = _this.root.find('.x-menu--level-2--container');
      sub_menus.each(function() {
        if ($(this).outerHeight() > longest) {
          return longest = $(this).outerHeight();
        }
      });
      return longest;
    };

    return XMenu;

  })(theme.classes.FrameworkXMenu);

  theme.classes.Blog = (function(superClass) {
    extend(Blog, superClass);

    function Blog() {
      return Blog.__super__.constructor.apply(this, arguments);
    }

    return Blog;

  })(theme.classes.FrameworkBlog);

  theme.classes.IndexBanner = (function() {
    function IndexBanner(root) {
      var _this;
      this.root = root;
      this.parallaxScrollListener = bind(this.parallaxScrollListener, this);
      this.sectionListeners = bind(this.sectionListeners, this);
      this.setSectionCountAttribute = bind(this.setSectionCountAttribute, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.bg = _this.root.find('.banner--background-image');
      _this.fg = _this.root.find('.banner--foreground-object');
      _this.section_id = _this.root.data('section-id');
      _this.enabled = false;
      _this.parallax_options = {
        speed: 0.5,
        range: 350
      };
      _this.load();
    }

    IndexBanner.prototype.load = function() {
      var _this;
      _this = this;
      _this.setSectionCountAttribute();
      _this.sectionListeners();
      _this.root.on('theme:section:load', function() {
        return theme.partials.XMenu.orientateDropDown();
      });
      if (_this.root.find('.banner--container').length) {
        $('body').attr('data-banner--enabled', true);
        _this.enabled = true;
        if (!Modernizr.touchevents) {
          _this.parallaxScrollListener(_this.parallax_options.speed, _this.parallax_options.range);
          return $(window).on('scroll.' + _this.section_id, function() {
            return _this.parallaxScrollListener(_this.parallax_options.speed, _this.parallax_options.range);
          });
        }
      } else {
        return $('body').attr('data-banner--enabled', false);
      }
    };

    IndexBanner.prototype.setSectionCountAttribute = function() {
      var _this;
      _this = this;
      if (!$('.layout--main-content [data-section-id]').length) {
        return $('body').attr('data-no-content-sections', 'true');
      }
    };

    IndexBanner.prototype.sectionListeners = function() {
      var _this;
      _this = this;
      return _this.root.on('theme:section:unload', function() {
        return $(window).off('scroll.' + _this.section_id);
      });
    };

    IndexBanner.prototype.parallaxScrollListener = function(speed, range) {
      var _this, banner_offset, calc, fullscreen_container, y_offset;
      _this = this;
      y_offset = $(window).scrollTop();
      fullscreen_container = $('.fullscreen-container');
      banner_offset = fullscreen_container.offset().top + fullscreen_container.outerHeight() / 2;
      calc = 1 - (y_offset - banner_offset + range) / range;
      _this.bg.css('background-position-y', -(y_offset * speed) + 'px');
      _this.fg.css('opacity', calc);
      _this.fg.css({
        'opacity': calc > 1 ? 1 : calc < 0 ? 0 : void 0
      });
    };

    return IndexBanner;

  })();

  theme.classes.IndexFeaturedCollection = (function() {
    function IndexFeaturedCollection(root) {
      var _this;
      this.root = root;
      this.setGreatestHeight = bind(this.setGreatestHeight, this);
      this.sectionListeners = bind(this.sectionListeners, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.section_id = _this.root.data('section-id');
      _this.items = _this.root.find('.product--root');
      _this.load();
      _this.sectionListeners();
    }

    IndexFeaturedCollection.prototype.load = function() {
      var _this;
      _this = this;
      _this.setGreatestHeight();
      return $(window).on('resize.section-' + _this.section_id, theme.utils.debounce(100, function() {
        return _this.setGreatestHeight();
      }));
    };

    IndexFeaturedCollection.prototype.sectionListeners = function() {
      var _this;
      _this = this;
      return _this.root.on('theme:section:unload', function() {
        return $(window).off('resize.section-' + _this.section_id);
      });
    };

    IndexFeaturedCollection.prototype.setGreatestHeight = function() {
      var _this;
      _this = this;
      $('.product--image-wrapper').css('height', 'auto');
      if (theme.utils.mqs.current_window === 'small') {
        return _this.items.find('.product--image').css('height', 'auto');
      } else {
        return theme.utils.matchImageHeights(_this.root, _this.items, '.product--image-wrapper');
      }
    };

    return IndexFeaturedCollection;

  })();

  theme.classes.ProductPage = (function() {
    function ProductPage(container1) {
      var _this;
      this.container = container1;
      this.retractDetails = bind(this.retractDetails, this);
      this.setInfoBoxHeights = bind(this.setInfoBoxHeights, this);
      this.expandDetails = bind(this.expandDetails, this);
      this.moreDetailsListener = bind(this.moreDetailsListener, this);
      this.addProductComplete = bind(this.addProductComplete, this);
      this.renderCart = bind(this.renderCart, this);
      this.addToCartListener = bind(this.addToCartListener, this);
      this.updateVariantImage = bind(this.updateVariantImage, this);
      this.thumbListener = bind(this.thumbListener, this);
      this.sectionListeners = bind(this.sectionListeners, this);
      this.variantSelected = bind(this.variantSelected, this);
      this.load = bind(this.load, this);
      _this = this;
      _this.add_button = _this.container.find('.product-page--add-to-cart');
      _this.cart_form = _this.container.find('.product-page--cart-form > form');
      _this.close_description = _this.container.find('.product-page--close-description');
      _this.compare_price = _this.container.find('.product-page--compare-price');
      _this.description = _this.container.find('.product-page--description');
      _this.image_slider = _this.container.find('.product-page--slider');
      _this.info_box = _this.container.find('.product-page--info-box--container');
      _this.less_details = _this.container.find('.product-page--less-details');
      _this.main_images = _this.container.find('.product-page--image');
      _this.more_details = _this.container.find('.product-page--more-details');
      _this.price = _this.container.find('.product-page--price');
      _this.price_wrapper = _this.container.find('.product-page--price-wrapper');
      _this.smart_payment_buttons = _this.container.find('.product-page--smart-payment-buttons');
      _this.thumbs = _this.container.find('.product-page--thumb');
      _this.unavailable_variant = _this.container.find('.product-page--unavailable-variant');
      _this.variant_sold_out = _this.container.find('.product-page--sold-out--variant');
      _this.initial_height = 0;
      _this.initial_width = 0;
      _this.expanded_height = 0;
      _this.expanded_width = 700;
      _this.load();
    }

    ProductPage.prototype.load = function() {
      var _this;
      _this = this;
      _this.moreDetailsListener();
      _this.thumbListener();
      _this.addToCartListener();
      return _this.sectionListeners();
    };

    ProductPage.prototype.variantSelected = function(variant, selector, options) {
      var _this, product_sold_out;
      _this = this;
      product_sold_out = false;
      if (_this.container.find('.product-page--sold-out--product').length) {
        product_sold_out = true;
      }
      _this.variant_sold_out.hide();
      _this.unavailable_variant.hide();
      _this.add_button.hide();
      _this.price_wrapper.hide();
      if (!variant) {
        _this.unavailable_variant.show();
        _this.smart_payment_buttons.hide();
        return false;
      } else if (variant && variant.available) {
        _this.price_wrapper.show();
        _this.add_button.show();
        _this.smart_payment_buttons.show();
      } else if (product_sold_out) {
        _this.variant_sold_out.hide();
        _this.add_button.hide();
        _this.smart_payment_buttons.hide();
      } else {
        _this.variant_sold_out.show();
        _this.smart_payment_buttons.hide();
      }
      _this.price.html(Shopify.formatMoney(variant.price, theme.money_format));
      if (variant.compare_at_price > variant.price) {
        _this.compare_price.html(Shopify.formatMoney(variant.compare_at_price, theme.money_format));
        _this.compare_price.show();
      } else {
        _this.compare_price.hide();
      }
      if (variant.featured_image) {
        return _this.updateVariantImage(variant.featured_image.id);
      }
    };

    ProductPage.prototype.sectionListeners = function() {
      var _this;
      _this = this;
      return _this.container.on('theme:section:load', function() {
        return new Shopify.OptionSelectors('product-page--select', {
          product: theme.product_json,
          onVariantSelected: _this.variantSelected,
          enableHistoryState: true
        });
      });
    };

    ProductPage.prototype.thumbListener = function() {
      var _this;
      _this = this;
      return _this.thumbs.on('keypress click', function(e) {
        var variant_id;
        if (theme.utils.a11yClick(e) === true) {
          variant_id = $(this).data('image-id');
          console.log(variant_id);
          return _this.updateVariantImage(variant_id);
        }
      });
    };

    ProductPage.prototype.updateVariantImage = function(variant_id) {
      var _this, image_slide, variant_image;
      _this = this;
      _this.main_images.attr('data-active', 'false');
      variant_image = _this.main_images.filter('[data-image-id="' + variant_id + '"]');
      variant_image.attr('data-active', 'true');
      image_slide = _this.image_slider.find('[data-image-id="' + variant_id + '"]').closest('.owl-item');
      return _this.image_slider.find('.owl-carousel').trigger('owl.jumpTo', image_slide.index());
    };

    ProductPage.prototype.addToCartListener = function() {
      var _this;
      _this = this;
      if (_this.cart_form.length > 0) {
        return _this.cart_form.submit(function() {
          _this.cart_form.find('.error').remove();
          _this.add_button.attr('data-loading', 'true');
          theme.partials.Cart.addItem($(this), function(pass, error) {
            if (pass) {
              return _this.renderCart();
            } else {
              _this.cart_form.append('<div class="product-page--error error">' + error + '</div>');
              return _this.add_button.attr('data-loading', 'false');
            }
          });
          return false;
        });
      }
    };

    ProductPage.prototype.renderCart = function() {
      var _this;
      _this = this;
      return theme.partials.Cart.renderCart(function() {
        return _this.addProductComplete();
      });
    };

    ProductPage.prototype.addProductComplete = function() {
      var _this;
      _this = this;
      _this.add_button.attr('data-loading', 'false');
      return $('.modal.cart-link .modal--link').trigger('click');
    };

    ProductPage.prototype.moreDetailsListener = function() {
      var _this;
      _this = this;
      _this.more_details.on('keypress click', function(e) {
        if (theme.utils.a11yClick(e) === true) {
          _this.expandDetails();
        }
        return false;
      });
      _this.less_details.on('keypress click', function(e) {
        if (theme.utils.a11yClick(e) === true) {
          _this.retractDetails();
        }
        return false;
      });
      return _this.close_description.on('click', function() {
        return _this.retractDetails();
      });
    };

    ProductPage.prototype.expandDetails = function() {
      var _this;
      _this = this;
      _this.setInfoBoxHeights();
      _this.info_box.height(_this.info_box.height());
      _this.info_box.width(_this.info_box.width());
      _this.info_box.find('> *').hide();
      _this.info_box.find('.product-page--title').show();
      _this.info_box.find('.product-page--close-description').show();
      _this.info_box.find('.product-page--more-details').hide();
      _this.info_box.find('.product-page--less-details').show();
      _this.info_box.find('.product-page--description-toggle').show().css({
        position: 'absolute',
        bottom: '15px'
      });
      _this.info_box.velocity({
        width: _this.expanded_width,
        height: _this.expanded_height
      }, {
        duration: 400
      });
      return _this.info_box.find('.product-page--description').css({
        display: 'block',
        opacity: 0
      }).velocity({
        opacity: 1
      }, {
        delay: 300
      });
    };

    ProductPage.prototype.setInfoBoxHeights = function() {
      var _this, info_box_clone, ratio;
      _this = this;
      if (_this.expanded_height === 0) {
        _this.initial_height = _this.info_box.outerHeight();
        _this.initial_width = _this.info_box.outerWidth();
        info_box_clone = _this.info_box.clone().css({
          visibility: 'hidden',
          width: _this.expanded_width,
          position: 'fixed'
        }).attr('data-show-description', 'true').appendTo(_this.container);
        _this.expanded_height = info_box_clone.outerHeight();
        ratio = _this.expanded_height / _this.expanded_width;
        if (ratio < .65) {
          _this.expanded_width = _this.expanded_height * 1.5;
          info_box_clone.css({
            width: _this.expanded_width
          });
          _this.expanded_height = info_box_clone.outerHeight();
        }
        return info_box_clone.remove();
      }
    };

    ProductPage.prototype.retractDetails = function() {
      var _this;
      _this = this;
      _this.info_box.find('.product-page--more-details').show();
      _this.info_box.find('.product-page--less-details').hide();
      _this.info_box.find('.product-page--close-description').hide();
      _this.info_box.find('.product-page--description').hide();
      _this.info_box.find('.product-page--description-toggle').css({
        bottom: 'auto',
        position: 'relative'
      });
      _this.info_box.velocity({
        width: _this.initial_width,
        height: _this.initial_height
      }, {
        duration: 400,
        complete: function() {
          return _this.info_box.removeAttr('style');
        }
      });
      return _this.info_box.find('.product-page--excerpt, .product-page--cart-form, .product-page--description-toggle, .product-page--social-media').css({
        display: 'block',
        opacity: 0
      }).velocity({
        opacity: 1
      }, {
        delay: 300,
        complete: function() {
          return _this.info_box.find('> *').removeAttr('style');
        }
      });
    };

    return ProductPage;

  })();

  jQuery(function($) {
    var $filter_select, MAIN, PAGE, copyLink, digitalDownloads, fw_media_queries, isFirefox, stickyFooter, templateArticle;
    $('.responsive-video--root').fitVids();
    PAGE = $('body');
    MAIN = $('.layout--main-content');
    $('.fw--cart-modal--trigger-render span.total-price').addClass('money');
    $('.template--product .partial--product.view--full .actual-price').addClass('money');
    theme.sections = new theme.classes.Sections();
    fw_media_queries = new theme.classes.FrameworkMediaQueries();
    theme.utils = new theme.classes.FrameworkUtils();
    theme.utils.mqs = fw_media_queries;
    theme.utils.a11yClick = function(event) {
      var code;
      if (event.type === 'click') {
        return true;
      } else if (event.type === 'keypress') {
        code = event.charCode || event.keyCode;
        if (code === 32) {
          event.preventDefault();
        }
        if (code === 32 || code === 13) {
          return true;
        }
      }
      return false;
    };
    theme.utils.addSymbol = function(icon_name) {
      return '<svg class="fw--icon fw--icon--' + icon_name + '"> <use xlink:href="#fw--icon--' + icon_name + '" /> </svg>';
    };
    theme.utils.loadJsClasses = function() {
      return $('[data-js-class]').each(function() {
        var js_class, partial_class;
        js_class = $(this).attr('data-js-class');
        if ($(this).attr('data-js-loaded') !== 'true') {
          partial_class = theme.classes[js_class];
          if (typeof partial_class !== "undefined") {
            theme.partials[js_class] = new partial_class($(this));
            return $(this).attr('data-js-loaded', 'true');
          }
        }
      });
    };
    $('a').each(function() {
      var _this;
      _this = $(this);
      if (this.host === location.host) {
        return _this.attr('target', '_self');
      } else {
        return _this.attr('target', '_blank').attr('rel', 'noopener');
      }
    });
    isFirefox = typeof InstallTrigger !== "undefined";
    if (isFirefox) {
      $('img').addClass('image-scale-hack');
    }
    $('.fw--align--center-y').each(function() {
      return new FrameworkAlign($(this), 'center-y');
    });
    $('.partial--popup #mc-embedded-subscribe-form').on('submit', function(event) {
      $('.modal--close').click();
      return true;
    });
    $('.partial--popup #contact_form').on('submit', function(event) {
      var form, modal, wrapper;
      form = this;
      modal = $(this).closest('.partial--popup');
      modal.find('.error, .success').remove();
      wrapper = modal.find('.wrapper');
      event.preventDefault();
      if (modal.find('[type="email"]').val().length === 0) {
        return false;
      } else {
        wrapper.find('*').remove().end().prepend('<p class="success">' + theme.translations.mailing_list_success_message + '</p>').show();
        setTimeout(function() {
          return form.submit();
        }, 500);
      }
      return false;
    });
    if (PAGE.hasClass('template--collection')) {
      $filter_select = $('.collection--filter--select');
      if ($filter_select.length) {
        $filter_select.on('change', function() {
          location.href = $(this).val();
        });
      }
    }
    if (PAGE.hasClass('template--password')) {
      $(document).on('click', '.login-link', function() {
        $(this).css('visibility', 'hidden');
        $('.wrapper').hide();
        $('.login-form').css('visibility', 'visible');
        $('.login-form input[type="password"]').focus();
        return false;
      }).on('click', '.login-form .cancel', function() {
        $('.login-link').css('visibility', 'visible');
        $('.wrapper').fadeIn();
        $('.login-form').css('visibility', 'hidden');
        return false;
      });
      if ($('.login-form .errors').size()) {
        $('.login-link').click();
      }
    }
    if (PAGE.hasClass('template--article')) {
      templateArticle = (function() {
        var first_article_img, pinterest_button;
        pinterest_button = $('.partial--social-media .pinterest--link');
        first_article_img = $('article img').first().attr('src');
        return pinterest_button.attr('href', pinterest_button.attr('href') + '&media=' + first_article_img);
      })();
      copyLink = (function() {
        var copy_link, copy_link_textarea;
        copy_link = $('.partial--social-media .copy-link a');
        copy_link_textarea = copy_link.parent().find('textarea');
        copy_link.on('click', function() {
          copy_link_textarea.toggle();
          copy_link_textarea.focus();
          return false;
        });
        return copy_link.parent().find('textarea').on('focus', function() {
          var $this;
          $this = $(this);
          $this.select();
          return $this.on('mouseup', function() {
            $this.unbind("mouseup");
            return false;
          });
        });
      })();
    }
    digitalDownloads = function() {
      if ($('.sdd-download').length) {
        return $('.sdd-download-button').removeClass('sdd-download-button').css('visibility', 'visible');
      }
    };
    digitalDownloads();
    theme.utils.loadJsClasses();
    $('.fw--align--fill-y--dynamic').each(function() {
      return new FrameworkAlign($(this), 'fill-y--dynamic');
    });
    $('.fw--align--max-img-height').each(function() {
      return new FrameworkAlign($(this), 'max-img-height');
    });
    $('html').addClass('after-js-loaded');
    if (!PAGE.hasClass('template--index')) {
      stickyFooter = function() {
        var height;
        if ($(window).outerHeight() > $('.off-canvas--main-content').outerHeight()) {
          height = $(window).outerHeight() - $('.header').outerHeight() - $('.footer').outerHeight() - parseInt($('.off-canvas--main-content').css('borderWidth')) * 2;
          return $('.layout--main-content').css({
            'min-height': height
          });
        }
      };
      stickyFooter();
      $(window).resize(function() {
        return stickyFooter();
      });
    }
    return setTimeout(function() {
      return $(".owl-carousel").each(function() {
        return $(this).data('owlCarousel').calculateAll();
      });
    }, 0);
  });

}).call(this);
