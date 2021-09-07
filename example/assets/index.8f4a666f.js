import{i as e}from"./animate.8ea3c80e.js";import{n as t,r}from"./function.6b03fa63.js";import{f as n,g as a,E as o}from"./constants.3b37bb64.js";import{m as i,k as l,d as s,o as c,c as d}from"./vendor.cf144a98.js";function f(e){let t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);const r=e.split(",")[0].split(":")[1].split(";")[0],n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return new Blob([n.buffer],{type:r})}class h{constructor(e){const{files:t,size:r}=e;this.files=t,this.index=0,this.size=r||0,this.complete=e.complete}readImage(){this.start(this.files)}start(e){e.map((e=>{this.readFileContent(e)}))}readFileContent(e){if(this.size&&e.size>this.size)return void this.complete({errorCode:101,errorMsg:`上传失败，您的图片超过最大值${this.size}kb`,file:e,data:null});const t=new FileReader;t.onload=()=>{this.complete({errorCode:0,errorMsg:"上传成功",file:e,data:t.result})},t.onerror=()=>{this.complete({errorCode:102,errorMsg:"上传失败",file:e,data:null})},t.readAsDataURL(e)}}function u(e){const t=Math.floor,r=new Array(64),n=new Array(64),a=new Array(64),o=new Array(64);let i,l,s,c;const d=new Array(65535),f=new Array(65535),h=new Array(64),u=new Array(64);let g=[],m=0,p=7;const w=new Array(64),y=new Array(64),b=new Array(64),A=new Array(256),C=new Array(2048);let M;const I=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],U=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],x=[0,1,2,3,4,5,6,7,8,9,10,11],S=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],v=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],O=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],k=[0,1,2,3,4,5,6,7,8,9,10,11],z=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],B=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function T(e,t){let r=0,n=0;const a=[];for(let o=1;o<=16;o++){for(let i=1;i<=e[o];i++)a[t[n]]=[],a[t[n]][0]=r,a[t[n]][1]=o,n++,r++;r*=2}return a}function P(e){const t=e[0];let r=e[1]-1;for(;r>=0;)t&1<<r&&(m|=1<<p),r--,p--,p<0&&(255==m?(D(255),D(0)):D(m),p=7,m=0)}function D(e){g.push(e)}function F(e){D(e>>8&255),D(255&e)}function Q(e,t,r,n,a){const o=a[0],i=a[240];let l;const s=function(e,t){let r,n,a,o,i,l,s,c,d,f,u=0;for(d=0;d<8;++d){r=e[u],n=e[u+1],a=e[u+2],o=e[u+3],i=e[u+4],l=e[u+5],s=e[u+6],c=e[u+7];const t=r+c,d=r-c,f=n+s,h=n-s,g=a+l,m=a-l,p=o+i,w=o-i;let y=t+p;const b=t-p;let A=f+g,C=f-g;e[u]=y+A,e[u+4]=y-A;const M=.707106781*(C+b);e[u+2]=b+M,e[u+6]=b-M,y=w+m,A=m+h,C=h+d;const I=.382683433*(y-C),U=.5411961*y+I,x=1.306562965*C+I,S=.707106781*A,v=d+S,O=d-S;e[u+5]=O+U,e[u+3]=O-U,e[u+1]=v+x,e[u+7]=v-x,u+=8}for(u=0,d=0;d<8;++d){r=e[u],n=e[u+8],a=e[u+16],o=e[u+24],i=e[u+32],l=e[u+40],s=e[u+48],c=e[u+56];const t=r+c,d=r-c,f=n+s,h=n-s,g=a+l,m=a-l,p=o+i,w=o-i;let y=t+p;const b=t-p;let A=f+g,C=f-g;e[u]=y+A,e[u+32]=y-A;const M=.707106781*(C+b);e[u+16]=b+M,e[u+48]=b-M,y=w+m,A=m+h,C=h+d;const I=.382683433*(y-C),U=.5411961*y+I,x=1.306562965*C+I,S=.707106781*A,v=d+S,O=d-S;e[u+40]=O+U,e[u+24]=O-U,e[u+8]=v+x,e[u+56]=v-x,u++}for(d=0;d<64;++d)f=e[d]*t[d],h[d]=f>0?f+.5|0:f-.5|0;return h}(e,t);for(let d=0;d<64;++d)u[I[d]]=s[d];const c=u[0]-r;r=u[0],0==c?P(n[0]):(l=32767+c,P(n[f[l]]),P(d[l]));let g=63;for(;g>0&&0==u[g];g--);if(0==g)return P(o),r;let m,p=1;for(;p<=g;){const e=p;for(;0==u[p]&&p<=g;++p);let t=p-e;if(t>=16){m=t>>4;for(let e=1;e<=m;++e)P(i);t&=15}l=32767+u[p],P(a[(t<<4)+f[l]]),P(d[l]),p++}return 63!=g&&P(o),r}function E(e){if(e<=0&&(e=1),e>100&&(e=100),M==e)return;let i=0;i=e<50?Math.floor(5e3/e):Math.floor(200-2*e),function(e){const i=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99];for(let n=0;n<64;n++){let a=t((i[n]*e+50)/100);a<1?a=1:a>255&&(a=255),r[I[n]]=a}const l=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99];for(let r=0;r<64;r++){let a=t((l[r]*e+50)/100);a<1?a=1:a>255&&(a=255),n[I[r]]=a}const s=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379];let c=0;for(let t=0;t<8;t++)for(let e=0;e<8;e++)a[c]=1/(r[I[c]]*s[t]*s[e]*8),o[c]=1/(n[I[c]]*s[t]*s[e]*8),c++}(i),M=e}this.encode=function(e,t){var d;(new Date).getTime(),t&&E(t),g=[],m=0,p=7,F(65496),F(65504),F(16),D(74),D(70),D(73),D(70),D(0),D(1),D(1),D(0),F(1),F(1),D(0),D(0),void 0!==(d=e.comments)&&d.constructor===Array&&d.forEach((e=>{if("string"!=typeof e)return;F(65534);const t=e.length;let r;for(F(t+2),r=0;r<t;r++)D(e.charCodeAt(r))})),function(e){if(e){F(65505),69===e[0]&&120===e[1]&&105===e[2]&&102===e[3]?F(e.length+2):(F(e.length+5+2),D(69),D(120),D(105),D(102),D(0));for(let t=0;t<e.length;t++)D(e[t])}}(e.exifBuffer),function(){F(65499),F(132),D(0);for(let e=0;e<64;e++)D(r[e]);D(1);for(let e=0;e<64;e++)D(n[e])}(),function(e,t){F(65472),F(17),D(8),F(t),F(e),D(3),D(1),D(17),D(0),D(2),D(17),D(1),D(3),D(17),D(1)}(e.width,e.height),function(){F(65476),F(418),D(0);for(let e=0;e<16;e++)D(U[e+1]);for(let e=0;e<=11;e++)D(x[e]);D(16);for(let e=0;e<16;e++)D(S[e+1]);for(let e=0;e<=161;e++)D(v[e]);D(1);for(let e=0;e<16;e++)D(O[e+1]);for(let e=0;e<=11;e++)D(k[e]);D(17);for(let e=0;e<16;e++)D(z[e+1]);for(let e=0;e<=161;e++)D(B[e])}(),F(65498),F(12),D(3),D(1),D(0),D(2),D(17),D(3),D(17),D(0),D(63),D(0);let f=0,h=0,u=0;m=0,p=7,this.encode.displayName="_encode_";const A=e.data,M=e.width,I=e.height,T=4*M;let R,j,_,L,N,q,K,X,V,$=0;for(;$<I;){for(R=0;R<T;){for(N=T*$+R,q=N,K=-1,X=0,V=0;V<64;V++)X=V>>3,K=4*(7&V),q=N+X*T+K,$+X>=I&&(q-=T*($+1+X-I)),R+K>=T&&(q-=R+K-T+4),j=A[q++],_=A[q++],L=A[q++],w[V]=(C[j]+C[_+256>>0]+C[L+512>>0]>>16)-128,y[V]=(C[j+768>>0]+C[_+1024>>0]+C[L+1280>>0]>>16)-128,b[V]=(C[j+1280>>0]+C[_+1536>>0]+C[L+1792>>0]>>16)-128;f=Q(w,a,f,i,s),h=Q(y,o,h,l,c),u=Q(b,o,u,l,c),R+=32}$+=8}if(p>=0){const e=[];e[1]=p+1,e[0]=(1<<p+1)-1,P(e)}return F(65497),"undefined"==typeof module?new Uint8Array(g):Buffer.from(g)},(new Date).getTime(),e||(e=50),function(){const e=String.fromCharCode;for(let t=0;t<256;t++)A[t]=e(t)}(),i=T(U,x),l=T(O,k),s=T(S,v),c=T(z,B),function(){let e=1,t=2;for(let r=1;r<=15;r++){for(let n=e;n<t;n++)f[32767+n]=r,d[32767+n]=[],d[32767+n][1]=r,d[32767+n][0]=n;for(let n=-(t-1);n<=-e;n++)f[32767+n]=r,d[32767+n]=[],d[32767+n][1]=r,d[32767+n][0]=t-1+n;e<<=1,t<<=1}}(),function(){for(let e=0;e<256;e++)C[e]=19595*e,C[e+256>>0]=38470*e,C[e+512>>0]=7471*e+32768,C[e+768>>0]=-11059*e,C[e+1024>>0]=-21709*e,C[e+1280>>0]=32768*e+8421375,C[e+1536>>0]=-27439*e,C[e+1792>>0]=-5329*e}(),E(e),(new Date).getTime()}const g=e?(e=>{const t=/OS (\d)_.* like Mac OS X/g.exec(e),r=/Android (\d.*?);/g.exec(e)||/Android\/(\d.*?) /g.exec(e),n=null==t?void 0:t.pop(),a=null==r?void 0:r.pop();return{oldIOS:!!n&&+n<8.3,oldAndroid:!!a&&+a.substr(0,3)<4.5,ios:/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e),android:/Android/g.test(e),mQQBrowser:/MQQBrowser/g.test(e)}})(navigator.userAgent):{oldIOS:!1,oldAndroid:!1,ios:!1,android:!1,mQQBrowser:!1};function m(e){const t=function(e){e=e.replace(/^data:([^;]+);base64,/gim,"").replace(/\s/g,"");const t=atob(e),r=t.length,n=new ArrayBuffer(r),a=new Uint8Array(n);for(let o=0;o<r;o++)a[o]=t.charCodeAt(o);return n}(e),r=new DataView(t);if(65496!==r.getUint16(0,!1))return-2;const n=r.byteLength;let a=2;for(;a<n;){const e=r.getUint16(a,!1);if(a+=2,65505===e){if(1165519206!==r.getUint32(a+=2,!1))return-1;const e=18761===r.getUint16(a+=6,!1);a+=r.getUint32(a+4,e);const t=r.getUint16(a,e);a+=2;for(let n=0;n<t;n++)if(274===r.getUint16(a+12*n,e))return r.getUint16(a+12*n+8,e)}else{if(65280!=(65280&e))break;a+=r.getUint16(a,!1)}}return-1}function p(t,r,n,a,o){if(!e)return;const{width:i,height:l}=function(e,t,r,n){const a={width:e.width,height:e.height};if("5678".indexOf(t)>-1&&(a.width=e.height,a.height=e.width),a.width<r||a.height<n)return a;const o=+a.width/+a.height;return r&&n?o>=r/n?a.width>r&&(a.width=r,a.height=Math.ceil(r/o)):a.height>n&&(a.height=n,a.width=Math.ceil(n*o)):r?r<a.width&&(a.width=r,a.height=Math.ceil(r/o)):n<a.height&&(a.width=Math.ceil(n*o),a.height=n),(a.width>=3264||a.height>=2448)&&(a.width*=.8,a.height*=.8),a}(t,r,n,a),s=document.createElement("canvas"),c=s.getContext("2d");s.width=+i,s.height=+l,c.drawImage(t,0,0,i,l);let d=null;if(CSS&&CSS.supports&&!CSS.supports("image-orientation:none"))switch(r){case 3:c.rotate(180*Math.PI/180),c.drawImage(t,-i,-l,i,l);break;case 6:c.rotate(90*Math.PI/180),c.drawImage(t,0,-i,l,i);break;case 8:c.rotate(270*Math.PI/180),c.drawImage(t,-l,0,l,i);break;case 2:c.translate(i,0),c.scale(-1,1),c.drawImage(t,0,0,i,l);break;case 4:c.translate(i,0),c.scale(-1,1),c.rotate(180*Math.PI/180),c.drawImage(t,-i,-l,i,l);break;case 5:c.translate(i,0),c.scale(-1,1),c.rotate(90*Math.PI/180),c.drawImage(t,0,-i,l,i);break;case 7:c.translate(i,0),c.scale(-1,1),c.rotate(270*Math.PI/180),c.drawImage(t,-l,0,l,i);break;default:c.drawImage(t,0,0,i,l)}else"5678".includes(r)?c.drawImage(t,0,0,l,i):c.drawImage(t,0,0,i,l);if(g.oldIOS||g.oldAndroid||g.mQQBrowser||!navigator.userAgent){const e=c.getImageData(0,0,s.width,s.height);f=e,void 0===(h=100*o)&&(h=50),d={data:new u(h).encode(f,h),width:f.width,height:f.height}}else d=s.toDataURL("image/jpeg",o);var f,h;return d}const w=function(e,r=t){return new Promise(((t,n)=>{const{dataUrl:a,width:o,height:i,quality:l}=e,s=m(a),c=f(a);if(s>1||l<1||o||i){const e=new Image;e.src=a,e.onload=()=>{const n=p(e,s,o,i,l),a=f(n);r(n,a),t({dataUrl:n,blob:a})},e.onerror=()=>{r(null),n(new Error("image load error"))}}else r(a,c),t({dataUrl:a,blob:c})}))},y="the number of pictures exceeds the limit",b={name:{type:String,default:()=>r("image-reader")},disabled:{type:Boolean,deault:()=>!1},maxSize:{type:[String,Number],default:Number.MAX_VALUE},accept:{type:Array,default:()=>[]},isCameraOnly:{type:Boolean,default:!1},isMultiple:{type:Boolean,default:!1},maxAmount:{type:Number,default:Number.MAX_VALUE},beforeRead:{type:Function,default:void 0},isProcessor:{type:Boolean,default:()=>!1},processorOption:{type:Object,default:()=>({width:300,height:300,quality:.8})}},A=(e,{emit:t})=>{const r=i(Date.now()),s=()=>{r.value=Date.now()},c=l((()=>{if(e.accept.length){let t="";return e.accept.forEach((e=>{t+=`image/${e},`})),t.substring(0,t.length-1)}return"image/*"})),d=r=>{if(0===r.errorCode)if(e.isProcessor&&e.processorOption&&r.data){const{width:n,height:o,quality:i}=e.processorOption;w({dataUrl:r.data,width:n,height:o,quality:i}).then((({dataUrl:e})=>{t(a,{dataUrl:e,blob:f(e),file:r.file,errorMsg:"上传成功",errorCode:0})}))}else t(a,{dataUrl:r.data,blob:f(r.data),file:r.file,errorMsg:"上传成功",errorCode:0});else t(o,r)};return{inputTempKey:r,acceptType:c,onFileChange:r=>{const{files:a}=r.target;if(!a||!a.length||e.disabled)return;if(e.beforeRead){if(!e.beforeRead(a))return void s()}const i=[].slice.call(a);if(t(n,{files:i}),i&&e.maxAmount&&i.length>e.maxAmount)return t(o,{errorCode:"103",errorMsg:y,data:null}),void s();(t=>{const r={files:t,size:1e3*+e.maxSize,complete:d};new h(r).readImage()})(i)}}};var C=s({name:"MdImageReader",props:b,emits:[n,a,o],setup(e,t){const{inputTempKey:r,acceptType:n,onFileChange:a}=A(e,t);return{inputTempKey:r,acceptType:n,onFileChange:a}}});C.render=function(e,t,r,n,a,o){return c(),d("div",{class:["md-image-reader",{disabled:e.disabled}]},[(c(),d("input",{key:e.inputTempKey,class:"md-image-reader-file",type:"file",name:e.name,maxSize:e.maxSize,maxAmount:e.maxAmount,disabled:e.disabled,accept:e.acceptType,capture:e.isCameraOnly,multiple:e.isMultiple,onChange:t[1]||(t[1]=(...t)=>e.onFileChange&&e.onFileChange(...t))},null,40,["name","maxSize","maxAmount","disabled","accept","capture","multiple"]))],2)},C.install=e=>{e.component(C.name,C)};export{C as _,w as a,b as i};
