import{g as e,y as a,c as l,i as s,d as t,l as d,e as n,E as o,F as m,k as i,a as r,B as c,C as p,p as u,m as v,t as f,r as b,q as x}from"./app.b2599db3.js";import{t as C}from"./index.cd6cb096.js";import{b as _}from"./index.3857b3e0.js";import{c as h}from"./animate.56026573.js";const g={class:"md-example-child md-example-child-transition"},j=[u("p",null,"Hello Mand Mobile",-1)];var k=e({setup(e){const b=a(!1),x=a("md-fade"),h=a(["md-fade","md-fade-up","md-fade-down","md-fade-left","md-fade-right","md-slide-up","md-slide-down","md-slide-left","md-slide-right","md-bounce","md-punch","md-zoom"]);return(e,a)=>(r(),l("div",g,[(r(),s(o,{to:"body"},[t(n(C),{name:x.value},{default:d((()=>[c(u("div",{class:"popup",onClick:a[0]||(a[0]=e=>b.value=!1)},j,512),[[p,b.value]])])),_:1},8,["name"])])),(r(!0),l(m,null,i(h.value,((e,a)=>(r(),s(n(_),{key:a,onClick:a=>{return l=e,x.value=l,void(b.value=!b.value);var l}},{default:d((()=>[v(f(e.replace(/^md-/,"").replace(/^\w/,(e=>e.toUpperCase())).replace(/\-\w/,(e=>" "+e[1].toUpperCase()))),1)])),_:2},1032,["onClick"])))),128))]))}}),y=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:k});const z={"./demo0.vue":y};var w=h("Transion",Object.entries(z).map((e=>e[1].default)));const M={class:"md-nav"},S=u("p",{class:"name"},"Transition",-1),T=u("p",{class:"name-zh"},"动画",-1),O={class:"md-example"},U=["textContent"],q=["textContent"],B={class:"md-example-content"};w.render=function(e,a,d,n,o,c){const p=b("md-icon");return r(),l(m,null,[u("div",M,[u("p",{class:"home",onClick:a[0]||(a[0]=a=>e.$router.push("/"))},[t(p,{name:"home",size:"lg"})]),S,T]),u("div",O,[(r(!0),l(m,null,i(e.demos,((e,a)=>(r(),l("section",{key:a,class:"md-example-section"},[u("div",{class:"md-example-title",textContent:f(e.title||"基础")},null,8,U),u("div",{class:"md-example-describe",textContent:f(e.describe)},null,8,q),u("div",B,[(r(),s(x(e)))])])))),128))])],64)};var E=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:w});export{y as _,E as a};