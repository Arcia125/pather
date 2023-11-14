var A=Object.defineProperty;var P=(t,e,n)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var c=(t,e,n)=>(P(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();class w{constructor(e=null,n){c(this,"g",0);c(this,"h",0);c(this,"equals",e=>w.equals(this,e));this.parent=e,this.position=n}static equals(e,n){return!e.position||!n.position?!1:e.x===n.x&&e.y===n.y}get f(){return this.g+this.h}get x(){return this.position.x}set x(e){this.position.x=e}get y(){return this.position.y}set y(e){this.position.y=e}}const C=t=>{const e=[];let n=t;for(;n.parent;)e.push(n),n=n.parent;return e},k=(t,e=!1)=>{const n=t.x,s=t.y;let o=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];return e&&(o=o.concat([{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}])),o.map(r=>new w(t,{x:n+r.x,y:s+r.y}))},R={DEFAULT:(t,e)=>Math.abs(t.x-e.x)+Math.abs(t.y-e.y)},M={DEFAULT:(t,e)=>t.equals(e)},O=99999;class F{constructor(e){c(this,"possibleNodes");c(this,"checkedNodes");c(this,"start");c(this,"end");c(this,"iterations");c(this,"config");c(this,"initialState",()=>{const n=new w(null,this.config.startPos),s=new w(null,this.config.endPos),o=[],r=[];return o.push(n),{iterations:0,start:n,end:s,possibleNodes:o,checkedNodes:r}});c(this,"findPath",()=>{if(this.iterations!==0){const{start:e,end:n,iterations:s,possibleNodes:o,checkedNodes:r}=this.initialState();this.possibleNodes=o,this.checkedNodes=r,this.start=e,this.end=n,this.iterations=s}for(;this.possibleNodes.length;){if(this.iterations>=this.config.maxIterations)return;const e=this.checkNode();if(e!=null&&e.path)return e.path;this.iterations++}});c(this,"checkNode",()=>{this.possibleNodes.sort((s,o)=>o.f-s.f);const e=this.possibleNodes.pop();if(!e)return;if(this.checkedNodes.push(e),this.config.isDone(e,this.end))return{path:C(e).reverse()};const n=k(e,this.config.diagonal);for(let s of n)this.config.isOutOfBounds(s)||this.config.wouldCollide(s)||this.possibleNodes.filter(o=>o.equals(s)).length>0||this.checkedNodes.filter(o=>o.equals(s)).length>0||(s.g=e.g+1,s.h=this.config.heuristic(s,this.end),this.possibleNodes.push(s))});this.config={...e,heuristic:e.heuristic||R.DEFAULT,diagonal:e.diagonal||!1,maxIterations:e.maxIterations||O,isDone:e.isDone||M.DEFAULT};const{start:n,end:s,iterations:o,possibleNodes:r,checkedNodes:d}=this.initialState();this.possibleNodes=r,this.checkedNodes=d,this.start=n,this.end=s,this.iterations=o}*findPathGen(){if(this.iterations!==0){const{start:e,end:n,iterations:s,possibleNodes:o,checkedNodes:r}=this.initialState();this.possibleNodes=o,this.checkedNodes=r,this.start=e,this.end=n,this.iterations=s}for(;this.possibleNodes.length;){if(this.iterations>=this.config.maxIterations)return;const e=this.checkNode();if(this.iterations++,yield{solution:e,aStar:this},e!=null&&e.path)return}}}class E{constructor(e,n){c(this,"element");c(this,"onChange",e=>{this.element.addEventListener("change",e)});if(this.element=document.querySelector(e),!this.element)throw new Error(`missing button ${e}`);this.onChange(n)}}class m{constructor(e,n){c(this,"element");c(this,"onClick",e=>{this.element.addEventListener("click",e)});if(this.element=document.querySelector(e),!this.element)throw new Error(`missing button ${e}`);this.onClick(n)}}const f={NOTHING:"#ffffff",START:"#00b894",END:"#d63031",PATH:"#00cec9",CHECKED:"#4CAF50",POSSIBLE:"#8e44ad",WALL:"#2d3436",GRID:"#00b894"},l={NOTHING:0,WALL:1,START:2,END:3},S=t=>{for(let e=0;e<i.grid.length;e++){const n=i.grid[e];for(let s=0;s<n.length;s++)if(n[s]===t)return{x:s,y:e}}throw new Error(`${t} not found`)},N=t=>Math.min(t.width,t.height)/i.grid[0].length,v=t=>{const e=Object.keys(l).find(s=>l[s]===t);return e?f[e]:null},G=(t,e)=>{let n=0;for(let s of i.grid){let o=0;for(let r of s)u(t,e,{x:o,y:n,...r===1?{fill:f.WALL,stroke:f.GRID}:{stroke:f.GRID}}),o++;n++}t.closePath()},u=(t,e,n)=>{t.beginPath();const s=N(e);n.fill&&(t.fillStyle=n.fill),n.stroke&&(t.strokeStyle=n.stroke),t.rect(n.x*s,n.y*s,s,s),n.fill&&t.fill(),n.stroke&&t.stroke(),t.closePath()},q=(t,e)=>{const n=S(l.START);u(t,e,{x:n.x,y:n.y,fill:f.START})},H=(t,e)=>{const n=S(l.END);u(t,e,{x:n.x,y:n.y,fill:f.END})},U=(t,e)=>{if(!i.path){console.warn("no state.path");return}for(let n=0;n<i.pathIndex;n++){const s=i.path[n].position;u(t,e,{x:s.x,y:s.y,fill:f.PATH})}},W=(t,e)=>{var n,s;for(let o of((n=h.value)==null?void 0:n.aStar.possibleNodes)||[])o&&u(t,e,{x:o.x,y:o.y,fill:f.POSSIBLE});for(let o of((s=h.value)==null?void 0:s.aStar.checkedNodes)||[])o&&u(t,e,{x:o.x,y:o.y,fill:f.CHECKED})},z=(t,e)=>{const n=N(e),s={x:Math.floor(i.mousePos.x/n),y:Math.floor(i.mousePos.y/n)},o=v(i.placing);u(t,e,{x:s.x,y:s.y,fill:`${o}bf`})},B=(t,e)=>{t.beginPath(),t.fillStyle="#fff",t.rect(0,0,e.width,e.height),t.fill(),t.closePath(),t.beginPath(),t.fillStyle="#000",G(t,e),W(t,e),U(t,e),q(t,e),H(t,e),z(t,e)},$={lastFrameTimeMs:0,maxFPS:60,frameID:0,stepID:0,delta:0,framesThisSecond:0,lastFpsUpdate:0,fps:0,resetDeltaCount:0,timeStep:1e3/60};let K=!1,X=0;const Y=window.matchMedia("(max-width: 768px)"),_=()=>[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,l.START,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,l.END]],j=()=>[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,l.START,0,1,0,1,0,0,l.END,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],Q=()=>Y.matches?_():j(),i={time:$,running:K,pathIndex:X,speed:1,diagonal:!1,placing:l.WALL,dragging:null,grid:Q(),mousePos:{x:0,y:0},mouseDown:!1},D=()=>new F({startPos:S(l.START),endPos:S(l.END),diagonal:i.diagonal,wouldCollide:t=>i.grid[t.y][t.x]===1,isOutOfBounds:t=>{var e,n;return typeof((n=(e=i.grid)==null?void 0:e[t.y])==null?void 0:n[t.x])>"u"}});let x=D(),I=x.findPathGen(),h={done:!1,value:{aStar:x,solution:void 0}};var L;let y=(L=h.value)==null?void 0:L.solution;const p=()=>{i.pathIndex=0,i.running=!1,x=D(),I=x.findPathGen(),h={done:!1,value:{aStar:x,solution:void 0}}};let T=0;const J=t=>{var e;if(!h.done&&Math.abs(t-T)>i.speed){let n=I.next();n.done||(h=n,T=t)}!h.done&&h.value&&(y=(e=h.value)==null?void 0:e.solution),y&&y.path&&i.pathIndex<y.path.length&&Math.abs(t-T)>i.speed/2&&(i.path=y.path,i.pathIndex++,T=t)},Z=()=>{i.time.resetDeltaCount++,i.time.delta=0},V=(t,e)=>{if(!t)throw new Error("Missing canvas context");const n=s=>{if(s<i.time.lastFrameTimeMs+1e3/i.time.maxFPS){i.time.stepID=window.requestAnimationFrame(n);return}if(i.running){i.time.delta+=s-i.time.lastFrameTimeMs,i.time.lastFrameTimeMs=s,s>i.time.lastFpsUpdate+1e3&&(i.time.fps=.25*i.time.framesThisSecond+.75*i.time.fps,i.time.lastFpsUpdate=s,i.time.framesThisSecond=0),i.time.framesThisSecond++;let o=0;for(;i.time.delta>=i.time.timeStep;)if(J(s),i.time.delta-=i.time.timeStep,++o>=240){Z();break}}else i.time.lastFrameTimeMs=s;i.time.frameID++,B(t,e),i.time.stepID=window.requestAnimationFrame(n)};n(1)},e0=()=>{new m("#reset-button",()=>{p()}),new m("#start-button",()=>{p(),i.running=!0}),new m("#place-start-button",()=>{i.placing=l.START}),new m("#place-end-button",()=>{i.placing=l.END}),new m("#clear-button",()=>{for(let t=0;t<i.grid.length;t++){const e=i.grid[t];for(let n=0;n<e.length;n++)i.grid[t][n]=l.NOTHING}i.grid[0][0]=l.START,i.grid[i.grid.length-1][i.grid[0].length-1]=l.END,p()}),new E("#diagonal-checkbox",t=>{i.diagonal=t.target.checked}).element.checked=i.diagonal,new E("#speed-slider",t=>{i.speed=1e3-parseInt(t.target.value)}).element.value=`${1e3-i.speed}`},b=t=>{if(console.log(i.grid[t.y].length,t.x),i.grid[t.y].length<t.x)for(let e=i.grid[t.y].length;e<t.x;e++)i.grid[t.y][e]=l.NOTHING,console.log(e);console.log(i.grid[t.y])},t0=()=>{const t=document.querySelector("#main-demo-canvas"),e=t.getContext("2d");if(e0(),!e)throw new Error("no context found");const n=()=>{t.width=window.innerWidth,t.height=window.innerHeight,e.msImageSmoothingEnabled=!1,e.mozImageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1;const s=document.querySelector(".actions");s.style.left=`calc(50vw - ${s==null?void 0:s.offsetWidth}px / 2)`};n(),window.addEventListener("resize",()=>{n()}),t.addEventListener("mousedown",s=>{i.mouseDown=!0;const o=t.getBoundingClientRect(),r={x:s.clientX-o.left,y:s.clientY-o.top},d=N(t),a={x:Math.floor(r.x/d),y:Math.floor(r.y/d)};b(a),i.placing===l.WALL&&(i.dragging||(i.dragging=i.grid[a.y][a.x]===l.WALL?l.NOTHING:l.WALL),i.grid[a.y][a.x]=i.dragging,p())}),t.addEventListener("mouseup",s=>{i.mouseDown=!1;const o=t.getBoundingClientRect(),r={x:s.clientX-o.left,y:s.clientY-o.top},d=N(t),a={x:Math.floor(r.x/d),y:Math.floor(r.y/d)};if(b(a),i.placing!==l.WALL){const g=S(i.placing);i.grid[a.y][a.x]===l.END&&i.placing===l.START?i.grid[g.y][g.x]=l.END:i.grid[a.y][a.x]===l.START&&i.placing===l.END?i.grid[g.y][g.x]=l.START:i.grid[g.y][g.x]=l.NOTHING,i.grid[a.y][a.x]=i.placing,i.placing=l.WALL,p()}i.dragging=null}),t.addEventListener("mousemove",s=>{const o=t.getBoundingClientRect(),r={x:s.clientX-o.left,y:s.clientY-o.top};if(i.mouseDown){const d=N(t),a={x:Math.floor(r.x/d),y:Math.floor(r.y/d)};if(b(a),i.placing===l.WALL){if([l.START,l.END].includes(i.grid[a.y][a.x]))return;i.grid[a.y][a.x]=i.dragging||l.NOTHING}p()}i.mousePos=r}),V(e,t)};t0();