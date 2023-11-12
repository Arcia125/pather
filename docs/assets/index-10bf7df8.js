var I=Object.defineProperty;var D=(t,e,i)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var a=(t,e,i)=>(D(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();class N{constructor(e=null,i){a(this,"g",0);a(this,"h",0);a(this,"equals",e=>N.equals(this,e));this.parent=e,this.position=i}static equals(e,i){return!e.position||!i.position?!1:e.x===i.x&&e.y===i.y}get f(){return this.g+this.h}get x(){return this.position.x}set x(e){this.position.x=e}get y(){return this.position.y}set y(e){this.position.y=e}}const A=t=>{const e=[];let i=t;for(;i.parent;)e.push(i),i=i.parent;return e},C=(t,e=!1)=>{const i=t.x,o=t.y;let n=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];return e&&(n=n.concat([{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}])),n.map(r=>new N(t,{x:i+r.x,y:o+r.y}))},k={DEFAULT:(t,e)=>Math.abs(t.x-e.x)+Math.abs(t.y-e.y)},O={DEFAULT:(t,e)=>t.equals(e)},R=99999;class F{constructor(e){a(this,"possibleNodes");a(this,"checkedNodes");a(this,"start");a(this,"end");a(this,"iterations");a(this,"config");a(this,"initialState",()=>{const i=new N(null,this.config.startPos),o=new N(null,this.config.endPos),n=[],r=[];return n.push(i),{iterations:0,start:i,end:o,possibleNodes:n,checkedNodes:r}});a(this,"findPath",()=>{if(this.iterations!==0){const{start:e,end:i,iterations:o,possibleNodes:n,checkedNodes:r}=this.initialState();this.possibleNodes=n,this.checkedNodes=r,this.start=e,this.end=i,this.iterations=o}for(;this.possibleNodes.length;){if(this.iterations>=this.config.maxIterations)return;const e=this.checkNode();if(e!=null&&e.path)return e.path;this.iterations++}});a(this,"checkNode",()=>{this.possibleNodes.sort((o,n)=>n.f-o.f);const e=this.possibleNodes.pop();if(!e)return;if(this.checkedNodes.push(e),this.config.isDone(e,this.end))return{path:A(e).reverse()};const i=C(e,this.config.diagonal);for(let o of i)this.config.isOutOfBounds(o)||this.config.wouldCollide(o)||this.possibleNodes.filter(n=>n.equals(o)).length>0||this.checkedNodes.filter(n=>n.equals(o)).length>0||(o.g=e.g+1,o.h=this.config.heuristic(o,this.end),this.possibleNodes.push(o))});this.config={...e,heuristic:e.heuristic||k.DEFAULT,diagonal:e.diagonal||!1,maxIterations:e.maxIterations||R,isDone:e.isDone||O.DEFAULT};const{start:i,end:o,iterations:n,possibleNodes:r,checkedNodes:f}=this.initialState();this.possibleNodes=r,this.checkedNodes=f,this.start=i,this.end=o,this.iterations=n}*findPathGen(){if(this.iterations!==0){const{start:e,end:i,iterations:o,possibleNodes:n,checkedNodes:r}=this.initialState();this.possibleNodes=n,this.checkedNodes=r,this.start=e,this.end=i,this.iterations=o}for(;this.possibleNodes.length;){if(this.iterations>=this.config.maxIterations)return;const e=this.checkNode();if(this.iterations++,yield{solution:e,aStar:this},e!=null&&e.path)return}}}class b{constructor(e,i){a(this,"element");a(this,"onChange",e=>{this.element.addEventListener("change",e)});if(this.element=document.querySelector(e),!this.element)throw new Error(`missing button ${e}`);this.onChange(i)}}class p{constructor(e,i){a(this,"element");a(this,"onClick",e=>{this.element.addEventListener("click",e)});if(this.element=document.querySelector(e),!this.element)throw new Error(`missing button ${e}`);this.onClick(i)}}const h={NOTHING:"#ffffff",START:"#00b894",END:"#d63031",PATH:"#00cec9",CHECKED:"#4CAF50",POSSIBLE:"#8e44ad",WALL:"#2d3436",GRID:"#00b894"},l={NOTHING:0,WALL:1,START:2,END:3},S=t=>{for(let e=0;e<s.grid.length;e++){const i=s.grid[e];for(let o=0;o<i.length;o++)if(i[o]===t)return{x:o,y:e}}throw new Error(`${t} not found`)},T=t=>Math.min(t.width,t.height)/s.grid.length,v=t=>{const e=Object.keys(l).find(o=>l[o]===t);return e?h[e]:null},M=(t,e)=>{let i=0;for(let o of s.grid){let n=0;for(let r of o)g(t,e,{x:n,y:i,...r===1?{fill:h.WALL,stroke:h.GRID}:{stroke:h.GRID}}),n++;i++}t.closePath()},g=(t,e,i)=>{t.beginPath();const o=T(e);i.fill&&(t.fillStyle=i.fill),i.stroke&&(t.strokeStyle=i.stroke),t.rect(i.x*o,i.y*o,o,o),i.fill&&t.fill(),i.stroke&&t.stroke(),t.closePath()},q=(t,e)=>{const i=S(l.START);g(t,e,{x:i.x,y:i.y,fill:h.START})},G=(t,e)=>{const i=S(l.END);g(t,e,{x:i.x,y:i.y,fill:h.END})},U=(t,e)=>{if(!s.path){console.warn("no state.path");return}for(let i=0;i<s.pathIndex;i++){const o=s.path[i].position;g(t,e,{x:o.x,y:o.y,fill:h.PATH})}},H=(t,e)=>{var i,o;for(let n of((i=d.value)==null?void 0:i.aStar.possibleNodes)||[])n&&g(t,e,{x:n.x,y:n.y,fill:h.POSSIBLE});for(let n of((o=d.value)==null?void 0:o.aStar.checkedNodes)||[])n&&g(t,e,{x:n.x,y:n.y,fill:h.CHECKED})},W=(t,e)=>{const i=T(e),o={x:Math.floor(s.mousePos.x/i),y:Math.floor(s.mousePos.y/i)},n=v(s.placing);g(t,e,{x:o.x,y:o.y,fill:`${n}bf`})},z=(t,e)=>{t.beginPath(),t.fillStyle="#fff",t.rect(0,0,e.width,e.height),t.fill(),t.closePath(),t.beginPath(),t.fillStyle="#000",M(t,e),H(t,e),U(t,e),q(t,e),G(t,e),W(t,e)},$={lastFrameTimeMs:0,maxFPS:60,frameID:0,stepID:0,delta:0,framesThisSecond:0,lastFpsUpdate:0,fps:0,resetDeltaCount:0,timeStep:1e3/60};let B=!1,K=0;const X=()=>[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,0,0,l.START,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,l.END]],s={time:$,running:B,pathIndex:K,speed:100,diagonal:!1,placing:l.WALL,grid:X(),mousePos:{x:0,y:0}},L=()=>new F({startPos:S(l.START),endPos:S(l.END),diagonal:s.diagonal,wouldCollide:t=>s.grid[t.y][t.x]===1,isOutOfBounds:t=>{var e,i;return typeof((i=(e=s.grid)==null?void 0:e[t.y])==null?void 0:i[t.x])>"u"}});let y=L(),P=y.findPathGen(),d={done:!1,value:{aStar:y,solution:void 0}};var E;let m=(E=d.value)==null?void 0:E.solution;const x=()=>{s.pathIndex=0,s.running=!1,y=L(),P=y.findPathGen(),d={done:!1,value:{aStar:y,solution:void 0}}};let w=0;const _=t=>{var e;if(!d.done&&Math.abs(t-w)>s.speed){let i=P.next();i.done||(d=i,w=t)}!d.done&&d.value&&(m=(e=d.value)==null?void 0:e.solution),m&&m.path&&s.pathIndex<m.path.length&&Math.abs(t-w)>s.speed/2&&(s.path=m.path,s.pathIndex++,w=t)},Y=()=>{s.time.resetDeltaCount++,s.time.delta=0},j=(t,e)=>{if(!t)throw new Error("Missing canvas context");const i=o=>{if(o<s.time.lastFrameTimeMs+1e3/s.time.maxFPS){s.time.stepID=window.requestAnimationFrame(i);return}if(s.running){s.time.delta+=o-s.time.lastFrameTimeMs,s.time.lastFrameTimeMs=o,o>s.time.lastFpsUpdate+1e3&&(s.time.fps=.25*s.time.framesThisSecond+.75*s.time.fps,s.time.lastFpsUpdate=o,s.time.framesThisSecond=0),s.time.framesThisSecond++;let n=0;for(;s.time.delta>=s.time.timeStep;)if(_(o),s.time.delta-=s.time.timeStep,++n>=240){Y();break}}else s.time.lastFrameTimeMs=o;s.time.frameID++,z(t,e),s.time.stepID=window.requestAnimationFrame(i)};i(1)},J=()=>{new p("#reset-button",()=>{x()}),new p("#start-button",()=>{x(),s.running=!0}),new p("#place-start-button",()=>{s.placing=l.START}),new p("#place-end-button",()=>{s.placing=l.END}),new p("#clear-button",()=>{for(let t=0;t<s.grid.length;t++){const e=s.grid[t];for(let i=0;i<e.length;i++)s.grid[t][i]=l.NOTHING}s.grid[0][0]=l.START,s.grid[s.grid.length-1][s.grid[0].length-1]=l.END,x()}),new b("#diagonal-checkbox",t=>{s.diagonal=t.target.checked}).element.checked=s.diagonal,new b("#speed-slider",t=>{s.speed=1e3-parseInt(t.target.value)}).element.value=`${1e3-s.speed}`},Q=()=>{const t=document.querySelector("#main-demo-canvas"),e=t.getContext("2d");if(J(),!e)throw new Error("no context found");const i=()=>{t.width=window.innerWidth,t.height=window.innerHeight,e.msImageSmoothingEnabled=!1,e.mozImageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1;const o=document.querySelector(".actions");o.style.left=`calc(50vw - ${o==null?void 0:o.offsetWidth}px / 2)`};i(),window.addEventListener("resize",()=>{i()}),t.addEventListener("click",o=>{const n=t.getBoundingClientRect(),r={x:o.clientX-n.left,y:o.clientY-n.top},f=T(t),c={x:Math.floor(r.x/f),y:Math.floor(r.y/f)};if(s.placing===l.WALL){if([l.START,l.END].includes(s.grid[c.y][c.x]))return;s.grid[c.y][c.x]=s.grid[c.y][c.x]===l.WALL?l.NOTHING:l.WALL}else{const u=S(s.placing);s.grid[c.y][c.x]===l.END&&s.placing===l.START?s.grid[u.y][u.x]=l.END:s.grid[c.y][c.x]===l.START&&s.placing===l.END?s.grid[u.y][u.x]=l.START:s.grid[u.y][u.x]=l.NOTHING,s.grid[c.y][c.x]=s.placing,s.placing=l.WALL}x()}),t.addEventListener("mousemove",o=>{const n=t.getBoundingClientRect(),r={x:o.clientX-n.left,y:o.clientY-n.top};s.mousePos=r,console.log(s)}),j(e,t)};Q();
