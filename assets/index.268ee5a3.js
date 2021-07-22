import{g as e,G as t,H as o,S as n,a3 as a,J as s,s as l,V as d,W as c,x as u,r,a as i,c as p,k as m,d as h,t as x,f,i as v,l as g,a4 as w}from"./app.99820c14.js";import{d as y}from"./index.e67670b2.js";import{c as S}from"./index.969eccc6.js";import{t as b}from"./index.02bb6ec7.js";var C={title:{type:String},brief:{type:String,default:""},content:{type:String,default:""},visible:{type:Boolean,default:!1},maxlength:{type:Number,default:4},mask:{type:Boolean,default:!1},system:{type:Boolean,default:!1},autoSend:{type:Boolean,default:!0},autoCountdown:{type:Boolean,default:!0},count:{type:Number,default:60},countNormalText:{type:String,default:b("md.captcha.sendCaptcha")},countActiveText:{type:String,default:b("md.captcha.countdown")},isView:{type:Boolean,default:!1}},H=(e,{emit:t})=>{const{popupShow:o,onShow:n,onHide:r,hide:i}=s(e,t),p=l(null),m=l("");d((()=>{m.value.length===e.maxlength&&t(a,m.value)}));const h=l(!1),x=l("");let f,v=e.count;const g=()=>{v&&(h.value=!0,x.value=e.countActiveText.replace("{$1}",`${v}`),f=globalThis.setInterval((()=>{v<=1?w():(v-=1,x.value=e.countActiveText.replace("{$1}",`${v}`))}),1e3))},w=()=>{h.value=!1,x.value=e.countNormalText,clearInterval(f)},y=l(""),S=()=>{e.autoSend&&(t("send",g),e.autoCountdown&&g())},b=u(o,(e=>{e&&S(),b()}));return{popupShow:o,onShow:()=>{p.value.focusHandler(),n()},onHide:()=>{m.value="",r()},hide:i,code:m,errorMsg:y,countBtnText:x,isCounting:h,codeboxRef:p,countdown:g,setError:e=>{c((()=>{y.value=e}))},sendHandler:S}},T=e({name:"MdCaptcha",components:{MdDialog:y,MdCodebox:S},props:C,emits:[t,o,n,a,"send"],setup(e,t){const{popupShow:o,onShow:n,onHide:a,code:s,errorMsg:l,countBtnText:d,isCounting:c,codeboxRef:u,countdown:r,setError:i,sendHandler:p}=H(e,t);return{popupShow:o,onShow:n,onHide:a,code:s,errorMsg:l,countBtnText:d,isCounting:c,codebox:u,countdown:r,setError:i,sendHandler:p}}}),k={class:"md-captcha-content"},B={class:"md-captcha-message"},V={class:"md-captcha-footer"};T.render=function(e,t){const o=r("md-codebox");return i(),p(w(e.isView?"div":"MdDialog"),{modelValue:e.popupShow,"onUpdate:modelValue":t[3]||(t[3]=t=>e.popupShow=t),class:"md-captcha",onShow:e.onShow,onHide:e.onHide},{default:m((()=>[h("div",k,[e.title?(i(),p("p",{key:0,class:"md-captcha-title",textContent:x(e.title)},null,8,["textContent"])):f("v-if",!0),h("div",B,[v(e.$slots,"default",{},(()=>[g(x(e.content),1)]))])]),h(o,{ref:"codebox",modelValue:e.code,"onUpdate:modelValue":t[2]||(t[2]=t=>e.code=t),maxlength:e.maxlength,system:e.system,mask:e.mask,justify:!0,"is-view":e.isView},{default:m((()=>[h("footer",V,[e.errorMsg?(i(),p("div",{key:0,class:"md-captcha-error",textContent:x(e.errorMsg)},null,8,["textContent"])):(i(),p("div",{key:1,class:"md-captcha-brief",textContent:x(e.brief)},null,8,["textContent"])),e.count?(i(),p("button",{key:2,class:"md-captcha-btn",disabled:e.isCounting,onClick:t[1]||(t[1]=(...t)=>e.sendHandler&&e.sendHandler(...t)),textContent:x(e.countBtnText||e.countNormalText)},null,8,["disabled","textContent"])):f("v-if",!0)])])),_:1},8,["modelValue","maxlength","system","mask","is-view"])])),_:3},8,["modelValue","onShow","onHide"])};var M=T;M.install=e=>{e.component(M.name,M)};var j=M;export{j as c};
