var e=Object.defineProperty,l=Object.defineProperties,t=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,n=(l,t,a)=>t in l?e(l,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[t]=a,d=(e,l)=>{for(var t in l||(l={}))o.call(l,t)&&n(e,t,l[t]);if(a)for(var t of a(l))i.call(l,t)&&n(e,t,l[t]);return e},u=(e,a)=>l(e,t(a));import{g as r,c as p,d as m,k as s,e as x,a as c,s as h,h as v,n as g}from"./app.99820c14.js";import{i as f}from"./index.4fb71d0a.js";import{f as b}from"./index.4ede8af6.js";import{t as y}from"./index.ca5b43d8.js";const V={class:"md-example-child md-example-child-input-item-0"};var _=r(u(d({},{name:"InputItemDemo",title:"基本"}),{expose:[],setup:e=>(e,l)=>(c(),p("div",V,[m(x(b),null,{default:s((()=>[m(x(f),{title:"普通文本",placeholder:"普通文本",maxlength:5}),m(x(f),{title:"禁用表单","model-value":"禁用表单",disabled:""}),m(x(f),{title:"只读表单","model-value":"只读表单",readonly:""}),m(x(f),{title:"高亮表单",placeholder:"高亮表单","is-highlight":""}),m(x(f),{title:"文本居中",placeholder:"文本居中",align:"center"}),m(x(f),{title:"文本居右",placeholder:"文本居右",align:"right"})])),_:1})]))})),j=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:_});const O={class:"md-example-child md-example-child-input-item-1"};var S=r(u(d({},{name:"InputItemDemo",title:"标题浮动输入框",titleEnUS:"Floating title input"}),{expose:[],setup(e){const l=h("6222 **** **** 1234"),t=h("张**");return(e,a)=>(c(),p("div",O,[m(x(b),null,{default:s((()=>[m(x(f),{modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=e=>t.value=e),"preview-type":"text",title:"真实姓名",placeholder:"投保人姓名","is-title-latent":""},null,8,["modelValue"]),m(x(f),{modelValue:l.value,"onUpdate:modelValue":a[2]||(a[2]=e=>l.value=e),type:"bankCard","preview-type":"text",title:"银行卡号",placeholder:"投保人银行卡号","is-title-latent":"","is-virtual-keyboard":""},null,8,["modelValue"])])),_:1})]))}})),U=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:S});var w=r(u(d({},{name:"InputItemDemo",title:"业务场景输入框"}),{expose:[],setup(e){const l=h("");return(e,t)=>(c(),p(x(b),null,{default:s((()=>[m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[1]||(t[1]=e=>l.value=e),title:"虚拟键盘",type:"phone","is-virtual-keyboard":!0,maxlength:5,placeholder:"phone xxx xxxx xxxx"},null,8,["modelValue"]),m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[2]||(t[2]=e=>l.value=e),title:"手机号",type:"phone",placeholder:"phone xxx xxxx xxxx",maxlength:11},null,8,["modelValue"]),m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[3]||(t[3]=e=>l.value=e),title:"数字",type:"digit",placeholder:"digit 0123456789",maxlength:13},null,8,["modelValue"]),m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[4]||(t[4]=e=>l.value=e),title:"银行卡",type:"bankCard",placeholder:"bankCard xxxx xxxx xxxx xxxx",maxlength:13},null,8,["modelValue"]),m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[5]||(t[5]=e=>l.value=e),title:"金额",type:"money",placeholder:"money xx, xxx.xxxx",maxlength:13},null,8,["modelValue"]),m(x(f),{title:"密码",type:"password",placeholder:"password *********"}),m(x(f),{title:"邮箱",type:"email",placeholder:"其他标准 html input 类型"})])),_:1}))}})),I=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:w});const k={class:"md-example-child md-example-child-input-item-3"};var z=r(u(d({},{title:"大尺寸金融表单",titleEnUS:"Large size financial input-item"}),{expose:[],setup(e){const l=h(""),t=v((()=>l.value.length>10?"small":"large")),a=()=>{y.create({content:"some information",icon:"warn"})};return(e,o)=>(c(),p("div",k,[m(x(b),{title:"转出金额(元)"},{action:s((()=>[m("div",{class:"field-operator",onClick:a},[m(x(g),{name:"info"})])])),default:s((()=>[m(x(f),{modelValue:l.value,"onUpdate:modelValue":o[2]||(o[2]=e=>l.value=e),type:"money",brief:"理财提示文案，字符超出10个自动变小",placeholder:"最多30万元",size:x(t),"is-amount":"","is-highlight":""},{right:s((()=>[m("div",{class:"input-operator",onClick:o[1]||(o[1]=e=>l.value="300000")}," 全部取出 ")])),_:1},8,["modelValue","size"])])),_:1})]))}})),C=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:z});const D={class:"md-example-child md-example-child-input-item-5"};var M=r(u(d({},{name:"InputItemDemo",title:"错误提示",titleEnUS:"Input with error message"}),{expose:[],setup(e){const l=h("1999999999999");return(e,t)=>(c(),p("div",D,[m(x(b),null,{default:s((()=>[m(x(f),{modelValue:l.value,"onUpdate:modelValue":t[1]||(t[1]=e=>l.value=e),type:"phone",title:"手机号码",error:"手机号码无效",clearable:""},null,8,["modelValue"])])),_:1})]))}})),P=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:M});export{j as _,U as a,I as b,C as c,P as d};
