var e=Object.defineProperty,t=Object.defineProperties,l=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,l,a)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[l]=a,r=(e,t)=>{for(var l in t||(t={}))n.call(t,l)&&s(e,l,t[l]);if(a)for(var l of a(t))o.call(t,l)&&s(e,l,t[l]);return e},d=(e,a)=>t(e,l(a));import{g as i,a as m,i as c,f as u,d as p,F as v,k as f,j as b,y,c as k,e as g,o as h,l as S,p as _,r as x,t as w,q as j}from"./app.b2599db3.js";import{f as O}from"./index.e6979d99.js";import{c as z}from"./index.8fb47a6b.js";import{c as W}from"./animate.56026573.js";var T={loading:{type:Boolean,default:!0},avatar:{type:Boolean,default:!1},row:{type:Number,default:3},title:{type:Boolean,default:!1},titleWidth:{type:[Number,String],default:"40%"},rowWidth:{type:[Number,String,Array],default:"100%"},avatarSize:{type:String,default:"md"}},C=i({name:"MdSkeleton",props:T,setup:e=>r({},(e=>{const t=e=>"number"==typeof e;return{getRowWidth:l=>{const a=e.rowWidth;if(e&&Array.isArray(a)){const e=a[l];return t(e)?`${e}%`:e}return a?t(a)?`${a}%`:a:"100%"},getTitleWidth:()=>{const l=e.titleWidth;return l?t(l)?`${l}%`:l:"40%"}}})(e))}),M={key:0,class:"md-skeleton"},P={class:"md-skeleton-content"},$={key:1};C.render=function(e,t){return e.loading?(m(),c("div",M,[e.avatar?(m(),c("div",{key:0,class:{"md-skeleton-avatar":!0,"md-skeleton-avatar-large":"lg"===e.avatarSize,"md-skeleton-avatar-small":"sm"===e.avatarSize}},null,2)):u("v-if",!0),p("div",P,[e.title?(m(),c("h4",{key:0,class:"md-skeleton-title",style:{width:e.getTitleWidth()}},null,4)):u("v-if",!0),(m(!0),c(v,null,f(e.row,(t=>(m(),c("div",{key:t,class:"md-skeleton-row",style:{width:t===e.row?"60%":e.getRowWidth(t-1)}},null,4)))),128))])])):(m(),c("div",$,[b(e.$slots,"default")]))};var D=C;D.install=e=>{e.component(D.name,D)};var A=D;const B={class:"\n      md-example-child\n      md-example-child-skeleton\n      md-example-child-skeleton-0\n    "};var N=i(d(r({},{name:"SkeletonDemo",title:"基础"}),{setup(e){const t=y(!0);return(e,l)=>(m(),k("div",B,[p(g(A),{title:"",loading:t.value},null,8,["loading"])]))}})),E=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:N});const R={class:"\n      md-example-child\n      md-example-child-skeleton\n      md-example-child-skeleton-1\n    "};var q=i(d(r({},{name:"SkeletonDemo",title:"组合骨架",titleEnUS:"Combined skeleton"}),{setup:e=>(e,t)=>(m(),k("div",R,[p(g(A),{avatar:"",title:""})]))})),F=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:q});const I={class:"\n      md-example-child\n      md-example-child-skeleton\n      md-example-child-skeleton-0\n    "},U=_("span",{class:"holder"},null,-1),G=_("span",{class:"holder"},null,-1);var H=i(d(r({},{name:"SkeletonDemo",title:"3s后加载完成"}),{setup(e){const t=y(!0);return h((()=>{t.value=!0,setTimeout((()=>{t.value=!1}),3e3)})),(e,l)=>(m(),k("div",I,[p(g(O),null,{default:S((()=>[p(g(A),{avatar:"",title:"",loading:t.value,row:2,class:"skeleton-item"},{default:S((()=>[p(g(z),{title:"交通银行",brief:"展示摘要描述",addon:"附加文案",arrow:""},{left:S((()=>[U])),_:1})])),_:1},8,["loading"]),p(g(A),{avatar:"",title:"",loading:t.value,row:2,class:"skeleton-item"},{default:S((()=>[p(g(z),{title:"招商银行",brief:"展示摘要描述",addon:"附加文案",arrow:""},{left:S((()=>[G])),_:1})])),_:1},8,["loading"])])),_:1})]))}})),J=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:H});const K={"./demo0.vue":E,"./demo1.vue":F,"./demo2.vue":J};var L=W("Skeleton",Object.entries(K).map((e=>e[1].default)));const Q={class:"md-nav"},V=_("p",{class:"name"},"Skeleton",-1),X=_("p",{class:"name-zh"},"骨架屏",-1),Y={class:"md-example skeleton"},Z=["textContent"],ee=["textContent"],te={class:"md-example-content"};L.render=function(e,t,l,a,n,o){const s=x("md-icon");return m(),k(v,null,[_("div",Q,[_("p",{class:"home",onClick:t[0]||(t[0]=t=>e.$router.push("/"))},[p(s,{name:"home",size:"lg"})]),V,X]),_("div",Y,[(m(!0),k(v,null,f(e.demos,((e,t)=>(m(),k("section",{key:t,class:"md-example-section"},[_("div",{class:"md-example-title",textContent:w(e.title)},null,8,Z),_("div",{class:"md-example-describe",textContent:w(e.describe)},null,8,ee),_("div",te,[(m(),c(j(e)))])])))),128))])],64)};var le=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:L});export{E as _,F as a,J as b,le as c};