(this.webpackJsonptranscode2=this.webpackJsonptranscode2||[]).push([[0],{55:function(e,t,n){},82:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),a=n.n(c),s=n(34),i=n.n(s),u=(n(55),n(24)),o=n(3),d=n.n(o),j=n(9),b=n(7),l=n(22),p=n(35),f=n.n(p),h=(n(82),n(36));n(88);var x=n(87);var O=function(e){var t=Object(c.useState)(""),n=Object(b.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)("spinner"),u=Object(b.a)(i,2),o=u[0];return u[1],console.log(e.aud),(new FormData).append("data",e.aud),fetch("/speechToText",{method:"post",headers:{"Content-Type":"application/octet-stream"},body:e.aud}).then((function(e){return e.json()})).then((function(e){return s(e.text)})),Object(r.jsx)("div",{children:Object(r.jsxs)("div",{className:"slide",children:[Object(r.jsx)("p",{className:"timeStamp",children:e.time}),Object(r.jsx)("video",{src:e.vid,width:"32%",controls:!0}),Object(r.jsx)("div",{className:o,children:Object(r.jsx)(x.a,{})}),Object(r.jsx)("p",{className:"text",children:a})]})})};var m=function(){var e,t=Object(c.useState)(),n=Object(b.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(),o=Object(b.a)(i,2),p=o[0],x=o[1],m=Object(c.useState)([]),v=Object(b.a)(m,2),w=v[0],g=v[1],k=Object(c.useRef)(null),y=Object(c.useRef)(null),S=Object(c.useState)(),F=Object(b.a)(S,2),T=(F[0],F[1],Object(c.useState)()),N=Object(b.a)(T,2),C=(N[0],N[1],Object(c.useState)(0)),L=Object(b.a)(C,2),R=L[0],U=L[1],M=Object(c.useState)("input"),B=Object(b.a)(M,2),I=B[0],P=B[1],D=Object(l.createFFmpeg)({log:!1});Object(c.useEffect)((function(){(e=k.current.getContext("2d")).drawImage(y.current,0,0,k.width,k.height)}));var A,E=function(){var e=Object(j.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p){e.next=5;break}return P("inputHidden"),setTimeout((function(){P("hidden")}),1e3),e.next=5,s(URL.createObjectURL(new Blob([p],{type:"video/mp4"})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=Object(j.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P("inputHidden"),s("output.mp4"),setTimeout((function(){P("hidden")}),1e3);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(e){return new Promise((function(t){return setTimeout(t,e)}))},G=function(){var e=Object(j.a)(d.a.mark((function e(t){var n,c,a,s,i,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return new FileReader,e.next=3,D.load();case 3:return e.t0=D,e.next=6,Object(l.fetchFile)(p);case 6:e.t1=e.sent,e.t0.FS.call(e.t0,"writeFile","vid.mp4",e.t1),7,n=1,c=d.a.mark((function e(){var c,j;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(n),e.next=3,Y(n);case 3:c=e.sent,a=!0,s=n+1;case 6:if(!a){e.next=38;break}return U(s/t*100),V(s),e.next=11,Y(s);case 11:return j=e.sent,e.next=14,q(c,j,7);case 14:if(e.t0=e.sent,!e.t0){e.next=17;break}e.t0=s-n>30;case 17:if(!e.t0){e.next=35;break}return e.next=20,z(n,s,"out.mp4");case 20:return i=e.sent,e.next=23,D.run.apply(D,Object(u.a)("-i out.mp4 out.wav".split(" ")));case 23:return e.t1=Blob,e.next=26,D.FS("readFile","out.wav").buffer;case 26:e.t2=e.sent,e.t3=[e.t2],e.t4={type:"audio/mp3"},o=new e.t1(e.t3,e.t4),g((function(e){return e.concat(Object(r.jsx)(O,{aud:o,vid:i,img:c,time:V(n)},n))})),a=!1,n=s+2,e.next=36;break;case 35:s+=1;case 36:e.next=6;break;case 38:case"end":return e.stop()}}),e)}));case 11:if(!(n<t)){e.next=15;break}return e.delegateYield(c(),"t2",13);case 13:e.next=11;break;case 15:U(0);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(e){return new Date(1e3*e).toISOString().substr(11,8)},Y=function(){var t=Object(j.a)(d.a.mark((function t(n,r){var c;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n;case 2:return y.current.currentTime=t.sent,t.next=5,e.drawImage(y.current,0,0,k.current.width,k.current.height);case 5:return t.next=7,k.current.toDataURL();case 7:return c=t.sent,t.next=10,J(50);case 10:return t.abrupt("return",c);case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),q=function(){var e=Object(j.a)(d.a.mark((function e(t,n,r){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f()(t).compareTo(n).onComplete((function(e){e.rawMisMatchPercentage>r?(console.log(e.rawMisMatchPercentage),A=!0):A=!1}));case 2:return e.sent,e.abrupt("return",A);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),z=function(){var e=Object(j.a)(d.a.mark((function e(t,n,r){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(V(t)),e.next=3,D.run.apply(D,Object(u.a)("-i vid.mp4 -ss ".concat(V(t)," -to ").concat(V(n)," -c:v copy -c:a copy ").concat(r).split(" ")));case 3:return e.next=5,D.FS("readFile",r);case 5:return c=e.sent,e.abrupt("return",URL.createObjectURL(new Blob([c.buffer],{type:"video/mp4"})));case 7:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("div",{className:"header",children:Object(r.jsx)("h1",{className:"name",children:"Slides to Article"})}),Object(r.jsx)(h.a,{color:"#f11946",progress:R,onLoaderFinished:function(){return U(0)}}),Object(r.jsxs)("div",{className:I,children:[Object(r.jsx)("p",{children:"This tool converts a recording of a lecture into a readable and searchable article. "}),Object(r.jsx)("p",{children:"Good lectures to use are voiceovers of slides without much else going on"}),Object(r.jsx)("br",{}),Object(r.jsx)("h2",{children:"Upload a file to get started"}),Object(r.jsx)("input",{type:"file",onChange:function(e){x(e.target.files[0])}}),Object(r.jsx)("button",{onClick:E,children:"Upload!"}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("h2",{children:"Or try a demo"}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{onClick:H,children:"Try a demo!"})})]}),Object(r.jsx)("video",{className:"mainVid",ref:y,src:a,width:"250",controls:!0,onLoadedMetadata:function(e){G(e.target.duration)}}),Object(r.jsx)("canvas",{ref:k}),Object(r.jsx)("div",{className:"slides",children:w})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,89)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(m,{})}),document.getElementById("root")),v()}},[[85,1,2]]]);
//# sourceMappingURL=main.039763f2.chunk.js.map