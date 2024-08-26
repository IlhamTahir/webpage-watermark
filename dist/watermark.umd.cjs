(function(i,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i.Watermark={}))})(this,function(i){"use strict";var m=Object.defineProperty;var d=(i,e,n)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var u=(i,e,n)=>(d(i,typeof e!="symbol"?e+"":e,n),n);const e={fontFamily:"Arial",fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontSize:"14px",color:"#c1c1c1",id:"watermark",text:"Watermark",density:100,clarity:2,zIndex:1,duration:1e3,supportTip:"\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Canvas"};class n{constructor(t){u(this,"watermarkConfig");this.watermarkConfig=Object.assign(e,t),this.init(),this._setAntiDeletion()}resetText(t){this.watermarkConfig.text=t,this.init()}_setAntiDeletion(){let t=this;window.setInterval(function(){document.getElementById(t.watermarkConfig.id+"-canvas")||t.init()},this.watermarkConfig.duration)}init(){this.createCanvas(),this.fill()}createCanvas(){let t=document.getElementById(this.watermarkConfig.id);if(!t){this.watermarkConfig.supportTip="\u65E0\u6CD5\u5B9A\u4F4D\u6C34\u5370\u8282\u70B9";return}t.style.cssText=t.style.cssText+"position: relative;";let o=t.offsetWidth,r=t.offsetHeight,a=document.createElement("canvas");a.setAttribute("id",this.watermarkConfig.id+"-canvas"),a.innerHTML=this.watermarkConfig.supportTip,a.width=o*this.watermarkConfig.clarity,a.height=r*this.watermarkConfig.clarity,a.style.cssText=`position:absolute;width: 100%;height: 100%;left:0;top:0;z-index: ${this.watermarkConfig.zIndex}`,t.appendChild(a)}fill(){let t=10,o=document.getElementById(this.watermarkConfig.id+"-canvas"),r=document.getElementById(this.watermarkConfig.id);if(!o||!r){this.watermarkConfig.supportTip="\u65E0\u6CD5\u5B9A\u4F4D\u6C34\u5370\u8282\u70B9";return}let a=o.getContext("2d");if(!a){this.watermarkConfig.supportTip="\u65E0\u6CD5\u5B9A\u4F4D\u6C34\u5370\u8282\u70B9";return}let l=r.offsetWidth*this.watermarkConfig.clarity/this.watermarkConfig.density+t,h=r.offsetHeight*this.watermarkConfig.clarity*1.5/this.watermarkConfig.density;a.rotate(-15*Math.PI/180);for(let s=0;s<l;s++)for(let f=0;f<h;f++)a.fillStyle=this.watermarkConfig.color,a.font=this.watermarkConfig.fontStyle+" "+this.watermarkConfig.fontVariant+" "+this.watermarkConfig.fontWeight+" "+this.watermarkConfig.fontSize+" "+this.watermarkConfig.fontFamily+" ",a.fillText(this.watermarkConfig.text,this.watermarkConfig.density*(s-t/2),f*this.watermarkConfig.density)}}i.Watermark=n,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
