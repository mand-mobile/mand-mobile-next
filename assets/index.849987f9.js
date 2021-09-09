var e=Object.defineProperty,l=Object.defineProperties,t=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,i=(l,t,a)=>t in l?e(l,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[t]=a,d=(e,l)=>{for(var t in l||(l={}))o.call(l,t)&&i(e,t,l[t]);if(a)for(var t of a(l))n.call(l,t)&&i(e,t,l[t]);return e},u=(e,a)=>l(e,t(a));import{g as r,c as m,d as p,l as s,e as c,a as x,y as v,i as h,h as f,p as g,s as b,r as y,F as _,k as V,t as j,q as O}from"./app.b2599db3.js";import{i as S}from"./index.36478065.js";import{f as I}from"./index.e6979d99.js";import{t as U}from"./index.c0f55d13.js";import{c as z}from"./animate.56026573.js";const k={class:"md-example-child md-example-child-input-item-0"};var w=r(u(d({},{name:"InputItemDemo",title:"基本"}),{setup:e=>(e,l)=>(x(),m("div",k,[p(c(I),null,{default:s((()=>[p(c(S),{title:"普通文本",placeholder:"普通文本",maxlength:5}),p(c(S),{title:"禁用表单","model-value":"禁用表单",disabled:""}),p(c(S),{title:"只读表单","model-value":"只读表单",readonly:""}),p(c(S),{title:"高亮表单",placeholder:"高亮表单","is-highlight":""}),p(c(S),{title:"文本居中",placeholder:"文本居中",align:"center"}),p(c(S),{title:"文本居右",placeholder:"文本居右",align:"right"})])),_:1})]))})),C=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:w});const M={class:"md-example-child md-example-child-input-item-1"};var T=r(u(d({},{name:"InputItemDemo",title:"标题浮动输入框",titleEnUS:"Floating title input"}),{setup(e){const l=v("6222 **** **** 1234"),t=v("张**");return(e,a)=>(x(),m("div",M,[p(c(I),null,{default:s((()=>[p(c(S),{modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=e=>t.value=e),"preview-type":"text",title:"真实姓名",placeholder:"投保人姓名","is-title-latent":""},null,8,["modelValue"]),p(c(S),{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=e=>l.value=e),type:"bankCard","preview-type":"text",title:"银行卡号",placeholder:"投保人银行卡号","is-title-latent":"","is-virtual-keyboard":""},null,8,["modelValue"])])),_:1})]))}})),D=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:T});var P=r(u(d({},{name:"InputItemDemo",title:"业务场景输入框"}),{setup(e){const l=v("");return(e,t)=>(x(),h(c(I),null,{default:s((()=>[p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value=e),title:"虚拟键盘",type:"phone","is-virtual-keyboard":!0,maxlength:5,placeholder:"phone xxx xxxx xxxx"},null,8,["modelValue"]),p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[1]||(t[1]=e=>l.value=e),title:"手机号",type:"phone",placeholder:"phone xxx xxxx xxxx",maxlength:11},null,8,["modelValue"]),p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[2]||(t[2]=e=>l.value=e),title:"数字",type:"digit",placeholder:"digit 0123456789",maxlength:13},null,8,["modelValue"]),p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[3]||(t[3]=e=>l.value=e),title:"银行卡",type:"bankCard",placeholder:"bankCard xxxx xxxx xxxx xxxx",maxlength:13},null,8,["modelValue"]),p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[4]||(t[4]=e=>l.value=e),title:"金额",type:"money",placeholder:"money xx, xxx.xxxx",maxlength:13},null,8,["modelValue"]),p(c(S),{title:"密码",type:"password",placeholder:"password *********"}),p(c(S),{title:"邮箱",type:"email",placeholder:"其他标准 html input 类型"})])),_:1}))}})),E=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:P});const F={class:"md-example-child md-example-child-input-item-3"};var q=r(u(d({},{title:"大尺寸金融表单",titleEnUS:"Large size financial input-item"}),{setup(e){const l=v(""),t=f((()=>l.value.length>10?"small":"large")),a=()=>{U.create({content:"some information",icon:"warn"})};return(e,o)=>(x(),m("div",F,[p(c(I),{title:"转出金额(元)"},{action:s((()=>[g("div",{class:"field-operator",onClick:a},[p(c(b),{name:"info"})])])),default:s((()=>[p(c(S),{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=e=>l.value=e),type:"money",brief:"理财提示文案，字符超出10个自动变小",placeholder:"最多30万元",size:c(t),"is-amount":"","is-highlight":""},{right:s((()=>[g("div",{class:"input-operator",onClick:o[0]||(o[0]=e=>l.value="300000")}," 全部取出 ")])),_:1},8,["modelValue","size"])])),_:1})]))}})),L=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:q});const $={class:"md-example-child md-example-child-input-item-5"};var A=r(u(d({},{name:"InputItemDemo",title:"错误提示",titleEnUS:"Input with error message"}),{setup(e){const l=v("1999999999999");return(e,t)=>(x(),m("div",$,[p(c(I),null,{default:s((()=>[p(c(S),{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value=e),type:"phone",title:"手机号码",error:"手机号码无效",clearable:""},null,8,["modelValue"])])),_:1})]))}})),B=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:A});const G={"./demo0.vue":C,"./demo1.vue":D,"./demo2.vue":E,"./demo3.vue":L,"./demo5.vue":B};var H=z("InputItem",Object.entries(G).map((e=>e[1].default)));const J={class:"md-nav"},K=g("p",{class:"name"},"InputItem",-1),N=g("p",{class:"name-zh"},"输入框",-1),Q={class:"md-example input-item"},R=["textContent"],W=["textContent"],X={class:"md-example-content"};H.render=function(e,l,t,a,o,n){const i=y("md-icon");return x(),m(_,null,[g("div",J,[g("p",{class:"home",onClick:l[0]||(l[0]=l=>e.$router.push("/"))},[p(i,{name:"home",size:"lg"})]),K,N]),g("div",Q,[(x(!0),m(_,null,V(e.demos,((e,l)=>(x(),m("section",{key:l,class:"md-example-section"},[g("div",{class:"md-example-title",textContent:j(e.title)},null,8,R),g("div",{class:"md-example-describe",textContent:j(e.describe)},null,8,W),g("div",X,[(x(),h(O(e)))])])))),128))])],64)};var Y=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:H});export{C as _,D as a,E as b,L as c,B as d,Y as e};