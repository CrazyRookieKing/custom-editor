!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(self,(()=>(()=>{var e={815:e=>{var t={exports:{}};function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(t){var i=e[t];"object"!=typeof i||Object.isFrozen(i)||n(i)})),e}t.exports=n,t.exports.default=n;class i{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function o(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function r(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const a=e=>!!e.scope||e.sublanguage&&e.language;class s{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=o(e)}openNode(e){if(!a(e))return;let t="";t=e.sublanguage?`language-${e.language}`:((e,{prefix:t})=>{if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix}),this.span(t)}closeNode(e){a(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const l=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class c{constructor(){this.rootNode=l(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=l({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class u extends c{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.sublanguage=!0,n.language=t,this.add(n)}toHTML(){return new s(this,this.options).value()}finalize(){return!0}}function h(e){return e?"string"==typeof e?e:e.source:null}function d(e){return p("(?=",e,")")}function g(e){return p("(?:",e,")*")}function f(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>h(e))).join("")}function b(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>h(e))).join("|")+")"}function y(e){return new RegExp(e.toString()+"|").exec("").length-1}const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function w(e,{joinWith:t}){let n=0;return e.map((e=>{n+=1;const t=n;let i=h(e),o="";for(;i.length>0;){const e=m.exec(i);if(!e){o+=i;break}o+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?o+="\\"+String(Number(e[1])+t):(o+=e[0],"("===e[0]&&n++)}return o})).map((e=>`(${e})`)).join(t)}const x="[a-zA-Z]\\w*",_="[a-zA-Z_]\\w*",v="\\b\\d+(\\.\\d+)?",E="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",k="\\b(0b[01]+)",j={begin:"\\\\[\\s\\S]",relevance:0},S={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[j]},O={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[j]},M=function(e,t,n={}){const i=r({scope:"comment",begin:e,end:t,contains:[]},n);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const o=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:p(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},N=M("//","$"),T=M("/\\*","\\*/"),R=M("#","$"),A={scope:"number",begin:v,relevance:0},L={scope:"number",begin:E,relevance:0},I={scope:"number",begin:k,relevance:0},C={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[j,{begin:/\[/,end:/\]/,relevance:0,contains:[j]}]}]},P={scope:"title",begin:x,relevance:0},H={scope:"title",begin:_,relevance:0};var B=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:x,UNDERSCORE_IDENT_RE:_,NUMBER_RE:v,C_NUMBER_RE:E,BINARY_NUMBER_RE:k,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=p(t,/.*\b/,e.binary,/\b.*/)),r({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:j,APOS_STRING_MODE:S,QUOTE_STRING_MODE:O,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:M,C_LINE_COMMENT_MODE:N,C_BLOCK_COMMENT_MODE:T,HASH_COMMENT_MODE:R,NUMBER_MODE:A,C_NUMBER_MODE:L,BINARY_NUMBER_MODE:I,REGEXP_MODE:C,TITLE_MODE:P,UNDERSCORE_TITLE_MODE:H,METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function z(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function D(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function $(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=z,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function U(e,t){Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function K(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function W(e,t){void 0===e.relevance&&(e.relevance=1)}const X=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=n.keywords,e.begin=p(n.beforeMatch,d(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},F=["of","and","for","in","not","or","if","then","parent","list","value"];function G(e,t,n="keyword"){const i=Object.create(null);return"string"==typeof e?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach((function(n){Object.assign(i,G(e[n],t,n))})),i;function o(e,n){t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((function(t){const n=t.split("|");i[n[0]]=[e,Z(n[0],n[1])]}))}}function Z(e,t){return t?Number(t):function(e){return F.includes(e.toLowerCase())}(e)?0:1}const q={},V=e=>{console.error(e)},J=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Y=(e,t)=>{q[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),q[`${e}/${t}`]=!0)},Q=new Error;function ee(e,t,{key:n}){let i=0;const o=e[n],r={},a={};for(let e=1;e<=t.length;e++)a[e+i]=o[e],r[e+i]=!0,i+=y(t[e-1]);e[n]=a,e[n]._emit=r,e[n]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw V("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw V("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=w(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw V("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw V("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=w(e.end,{joinWith:""})}}(e)}function ne(e){function t(t,n){return new RegExp(h(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(n?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=y(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(w(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),i=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new n;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=r(e.classNameAliases||{}),function n(o,a){const s=o;if(o.isCompiled)return s;[D,K,te,X].forEach((e=>e(o,a))),e.compilerExtensions.forEach((e=>e(o,a))),o.__beforeBegin=null,[$,U,W].forEach((e=>e(o,a))),o.isCompiled=!0;let l=null;return"object"==typeof o.keywords&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),l=o.keywords.$pattern,delete o.keywords.$pattern),l=l||/\w+/,o.keywords&&(o.keywords=G(o.keywords,e.case_insensitive)),s.keywordPatternRe=t(l,!0),a&&(o.begin||(o.begin=/\B|\b/),s.beginRe=t(s.begin),o.end||o.endsWithParent||(o.end=/\B|\b/),o.end&&(s.endRe=t(s.end)),s.terminatorEnd=h(s.end)||"",o.endsWithParent&&a.terminatorEnd&&(s.terminatorEnd+=(o.end?"|":"")+a.terminatorEnd)),o.illegal&&(s.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return r(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:ie(e)?r(e,{starts:e.starts?r(e.starts):null}):Object.isFrozen(e)?r(e):e}("self"===e?o:e)}))),o.contains.forEach((function(e){n(e,s)})),o.starts&&n(o.starts,a),s.matcher=function(e){const t=new i;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(s),s}(e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class oe extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const re=o,ae=r,se=Symbol("nomatch");var le=function(e){const n=Object.create(null),o=Object.create(null),r=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let c={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:u};function h(e){return c.noHighlightRe.test(e)}function y(e,t,n){let i="",o="";"object"==typeof t?(i=e,n=t.ignoreIllegals,o=t.language):(Y("10.7.0","highlight(lang, code, ...args) has been deprecated."),Y("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),o=e,i=t),void 0===n&&(n=!0);const r={code:i,language:o};S("before:highlight",r);const a=r.result?r.result:m(r.language,r.code,n);return a.code=r.code,S("after:highlight",a),a}function m(e,t,o,r){const l=Object.create(null);function u(){if(!j.keywords)return void O.addText(M);let e=0;j.keywordPatternRe.lastIndex=0;let t=j.keywordPatternRe.exec(M),n="";for(;t;){n+=M.substring(e,t.index);const o=_.case_insensitive?t[0].toLowerCase():t[0],r=(i=o,j.keywords[i]);if(r){const[e,i]=r;if(O.addText(n),n="",l[o]=(l[o]||0)+1,l[o]<=7&&(N+=i),e.startsWith("_"))n+=t[0];else{const n=_.classNameAliases[e]||e;O.addKeyword(t[0],n)}}else n+=t[0];e=j.keywordPatternRe.lastIndex,t=j.keywordPatternRe.exec(M)}var i;n+=M.substring(e),O.addText(n)}function h(){null!=j.subLanguage?function(){if(""===M)return;let e=null;if("string"==typeof j.subLanguage){if(!n[j.subLanguage])return void O.addText(M);e=m(j.subLanguage,M,!0,S[j.subLanguage]),S[j.subLanguage]=e._top}else e=w(M,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(N+=e.relevance),O.addSublanguage(e._emitter,e.language)}():u(),M=""}function d(e,t){let n=1;const i=t.length-1;for(;n<=i;){if(!e._emit[n]){n++;continue}const i=_.classNameAliases[e[n]]||e[n],o=t[n];i?O.addKeyword(o,i):(M=o,u(),M=""),n++}}function g(e,t){return e.scope&&"string"==typeof e.scope&&O.openNode(_.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(O.addKeyword(M,_.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),M=""):e.beginScope._multi&&(d(e.beginScope,t),M="")),j=Object.create(e,{parent:{value:j}}),j}function f(e,t,n){let o=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(e.endRe,n);if(o){if(e["on:end"]){const n=new i(e);e["on:end"](t,n),n.isMatchIgnored&&(o=!1)}if(o){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,t,n)}function p(e){return 0===j.matcher.regexIndex?(M+=e[0],1):(A=!0,0)}function b(e){const n=e[0],i=t.substring(e.index),o=f(j,e,i);if(!o)return se;const r=j;j.endScope&&j.endScope._wrap?(h(),O.addKeyword(n,j.endScope._wrap)):j.endScope&&j.endScope._multi?(h(),d(j.endScope,e)):r.skip?M+=n:(r.returnEnd||r.excludeEnd||(M+=n),h(),r.excludeEnd&&(M=n));do{j.scope&&O.closeNode(),j.skip||j.subLanguage||(N+=j.relevance),j=j.parent}while(j!==o.parent);return o.starts&&g(o.starts,e),r.returnEnd?0:n.length}let y={};function x(n,r){const s=r&&r[0];if(M+=n,null==s)return h(),0;if("begin"===y.type&&"end"===r.type&&y.index===r.index&&""===s){if(M+=t.slice(r.index,r.index+1),!a){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=y.rule,t}return 1}if(y=r,"begin"===r.type)return function(e){const t=e[0],n=e.rule,o=new i(n),r=[n.__beforeBegin,n["on:begin"]];for(const n of r)if(n&&(n(e,o),o.isMatchIgnored))return p(t);return n.skip?M+=t:(n.excludeBegin&&(M+=t),h(),n.returnBegin||n.excludeBegin||(M=t)),g(n,e),n.returnBegin?0:t.length}(r);if("illegal"===r.type&&!o){const e=new Error('Illegal lexeme "'+s+'" for mode "'+(j.scope||"<unnamed>")+'"');throw e.mode=j,e}if("end"===r.type){const e=b(r);if(e!==se)return e}if("illegal"===r.type&&""===s)return 1;if(R>1e5&&R>3*r.index)throw new Error("potential infinite loop, way more iterations than matches");return M+=s,s.length}const _=E(e);if(!_)throw V(s.replace("{}",e)),new Error('Unknown language: "'+e+'"');const v=ne(_);let k="",j=r||v;const S={},O=new c.__emitter(c);!function(){const e=[];for(let t=j;t!==_;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>O.openNode(e)))}();let M="",N=0,T=0,R=0,A=!1;try{for(j.matcher.considerAll();;){R++,A?A=!1:j.matcher.considerAll(),j.matcher.lastIndex=T;const e=j.matcher.exec(t);if(!e)break;const n=x(t.substring(T,e.index),e);T=e.index+n}return x(t.substring(T)),O.closeAllNodes(),O.finalize(),k=O.toHTML(),{language:e,value:k,relevance:N,illegal:!1,_emitter:O,_top:j}}catch(n){if(n.message&&n.message.includes("Illegal"))return{language:e,value:re(t),illegal:!0,relevance:0,_illegalBy:{message:n.message,index:T,context:t.slice(T-100,T+100),mode:n.mode,resultSoFar:k},_emitter:O};if(a)return{language:e,value:re(t),illegal:!1,relevance:0,errorRaised:n,_emitter:O,_top:j};throw n}}function w(e,t){t=t||c.languages||Object.keys(n);const i=function(e){const t={value:re(e),illegal:!1,relevance:0,_top:l,_emitter:new c.__emitter(c)};return t._emitter.addText(e),t}(e),o=t.filter(E).filter(j).map((t=>m(t,e,!1)));o.unshift(i);const r=o.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(E(e.language).supersetOf===t.language)return 1;if(E(t.language).supersetOf===e.language)return-1}return 0})),[a,s]=r,u=a;return u.secondBest=s,u}function x(e){let t=null;const n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=c.languageDetectRe.exec(t);if(n){const t=E(n[1]);return t||(J(s.replace("{}",n[1])),J("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find((e=>h(e)||E(e)))}(e);if(h(n))return;if(S("before:highlightElement",{el:e,language:n}),e.children.length>0&&(c.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),c.throwUnescapedHTML))throw new oe("One of your code blocks includes unescaped HTML.",e.innerHTML);t=e;const i=t.textContent,r=n?y(i,{language:n,ignoreIllegals:!0}):w(i);e.innerHTML=r.value,function(e,t,n){const i=t&&o[t]||n;e.classList.add("hljs"),e.classList.add(`language-${i}`)}(e,n,r.language),e.result={language:r.language,re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),S("after:highlightElement",{el:e,result:r,text:i})}let _=!1;function v(){"loading"!==document.readyState?document.querySelectorAll(c.cssSelector).forEach(x):_=!0}function E(e){return e=(e||"").toLowerCase(),n[e]||n[o[e]]}function k(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{o[e.toLowerCase()]=t}))}function j(e){const t=E(e);return t&&!t.disableAutodetect}function S(e,t){const n=e;r.forEach((function(e){e[n]&&e[n](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){_&&v()}),!1),Object.assign(e,{highlight:y,highlightAuto:w,highlightAll:v,highlightElement:x,highlightBlock:function(e){return Y("10.7.0","highlightBlock will be removed entirely in v12.0"),Y("10.7.0","Please use highlightElement now."),x(e)},configure:function(e){c=ae(c,e)},initHighlighting:()=>{v(),Y("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){v(),Y("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,i){let o=null;try{o=i(e)}catch(e){if(V("Language definition for '{}' could not be registered.".replace("{}",t)),!a)throw e;V(e),o=l}o.name||(o.name=t),n[t]=o,o.rawDefinition=i.bind(null,e),o.aliases&&k(o.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e];for(const t of Object.keys(o))o[t]===e&&delete o[t]},listLanguages:function(){return Object.keys(n)},getLanguage:E,registerAliases:k,autoDetection:j,inherit:ae,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),r.push(e)}}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString="11.6.0",e.regex={concat:p,lookahead:d,either:b,optional:f,anyNumberOfTimes:g};for(const e in B)"object"==typeof B[e]&&t.exports(B[e]);return Object.assign(e,B),e}({});e.exports=le,le.HighlightJS=le,le.default=le}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return(()=>{"use strict";n.r(i),n.d(i,{default:()=>k,vue2Plugin:()=>E,vue3Plugin:()=>v});const e=n(815),t="/*!\n  Theme: Default\n  Description: Original highlight.js style\n  Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n  Maintainer: @highlightjs/core-team\n  Website: https://highlightjs.org/\n  License: see project LICENSE\n  Touched: 2021\n*/pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#f3f3f3;color:#444}.hljs-comment{color:#697070}.hljs-punctuation,.hljs-tag{color:#444a}.hljs-tag .hljs-attr,.hljs-tag .hljs-name{color:#444}.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-name,.hljs-selector-tag{font-weight:700}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-operator,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#ab5656}.hljs-literal{color:#695}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta .hljs-string{color:#38a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}",o=":host {\n    margin: 0;\n    padding: 0;\n    display: inline-block;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    border: 1px solid rgb(118, 118, 118);\n    font-size: 0px;\n}\n\n* {\n    margin: 0px;\n    padding: 0px;\n    text-align: left;\n}\n\n/* 容器 */\n#editor-container {\n    position: relative;\n    font-size: 14px;\n    display: inline-block;\n    padding: 0px !important;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n\n/* 遮板 */\n#fake-container {\n    position: absolute;\n    padding: 0.5em;\n    width: 100%;\n    height: 100%;\n    z-index: 2;\n    background-color: rgba(0, 0, 0, 0);\n    -webkit-appearance: textarea;\n    pointer-events: none;\n    font-size: 14px;\n    line-height: 20px;\n    font-family: monospace;\n    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);\n    caret-color: #606266;\n    box-sizing: border-box;\n    border: 0 none;\n    word-break: break-all;\n    white-space: pre-wrap;\n    display: block;\n    overflow-y: auto;\n}\n\n#fake-container pre {\n    white-space: pre-wrap;\n    margin: 0;\n}\n\n#textarea {\n    font-size: 14px;\n    font-weight: 200;\n    line-height: 20px;\n    width: 100%;\n    height: 100%;\n    font-family: monospace;\n    padding: 0.5em;\n    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);\n    color: rgba(0, 0, 0, 0);\n    caret-color: #606266;\n    background: rgba(0, 0, 0, 0);\n    border: 0 none;\n    box-sizing: border-box;\n    word-break: break-all;\n    white-space: pre-wrap;\n    display: block;\n    overflow-y: auto;\n    resize: none;\n}\n\n#textarea::-webkit-input-placeholder,\n#textarea::-ms-input-placeholder,\n#textarea::-moz-input-placeholder {\n    color: #dcdfe6;\n    text-shadow: none;\n    -webkit-text-fill-color: inital;\n}\n\n/** textarea 滚动条样式 */\n#textarea::-webkit-scrollbar {\n    /* 滚动条整体样式 */\n    width: 5px;\n    /* 高宽分别对应横竖滚动条的尺寸 */\n    height: 5px;\n}\n\n#textarea::-webkit-scrollbar-thumb {\n    /* 滚动条里面小方块 */\n    border-radius: 5px;\n    padding-right: 2px;\n    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n    background: rgba(0, 0, 0, 0.2);\n}\n\n#textarea:-webkit-scrollbar-track {\n    display: none;\n}\n\n/** fake-container 滚动条样式 */\n#fake-container::-webkit-scrollbar {\n    /* 滚动条整体样式 */\n    width: 5px;\n    /* 高宽分别对应横竖滚动条的尺寸 */\n    height: 5px;\n    background: rgba(0, 0, 0, 0);\n    color: rgba(0, 0, 0, 0);\n}\n\n#fake-container::-webkit-scrollbar-thumb {\n    display: none;\n}";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}function u(e){var t=p();return function(){var n,i=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return h(this,n)}}function h(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return d(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){var t="function"==typeof Map?new Map:void 0;return g=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,i)}function i(){return f(e,arguments,y(this).constructor)}return i.prototype=Object.create(e.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),b(i,e)},g(e)}function f(e,t,n){return f=p()?Reflect.construct.bind():function(e,t,n){var i=[null];i.push.apply(i,t);var o=new(Function.bind.apply(e,i));return n&&b(o,n.prototype),o},f.apply(null,arguments)}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=["auto","none","horizontal","vertical"];function x(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{name:"custom-editor"},i=n.name;i||(i="custom-editor");var r=document.createElement("template");r.setAttribute("id","userCardTemplate"),r.innerHTML="\n            <style>\n            ".concat(t,"\n            </style>\n            <style>\n            ").concat(o,'\n            </style>\n            <span id="editor-style-container">\n            </span>\n            <div id="editor-container" class="hljs">\n                <code id="fake-container"></code>\n                <textarea id="textarea">\n                </textarea>\n            </div>');var s=["value","readonly","height","width","resize"],h=new Set,f=!1;function p(e){h.add(e),f||(f=!0,b())}function b(){Promise.resolve().then(y)}function y(){f=!1,h.forEach((function(e){e()}))}var x=function(t){c(i,t);var n=u(i);function i(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"open";return a(this,i),m(d(e=n.call(this)),"_mode","open"),m(d(e),"_language",null),m(d(e),"_readonly",!1),m(d(e),"_value",""),m(d(e),"_height","100%"),m(d(e),"_width","100%"),m(d(e),"_resize","none"),e._host=d(e),e._content=r.content.cloneNode(!0),e._container=e._content.querySelector("#editor-container"),e._textarea=e._content.querySelector("textarea"),e._fake=e._content.querySelector("#fake-container"),e._themeStyleContainer=e._content.querySelector("#editor-style-container"),e._mode=t,e._hightlight=e._hightlight.bind(d(e)),e._inputHandler=e._inputHandler.bind(d(e)),e._scrollHandler=e._scrollHandler.bind(d(e)),e}return l(i,[{key:"connectedCallback",value:function(){if(!this._initialized){this._initialized=!0;var e=this.attachShadow({mode:this._mode});this.style.display="inline-block",e.appendChild(this._content),this.resize=this.resize}this._textarea.addEventListener("input",this._inputHandler),this._textarea.addEventListener("scroll",this._scrollHandler)}},{key:"_inputHandler",value:function(e){var t=e.target.value;this.setAttribute("value",t);var n=new CustomEvent("cInput",{detail:{value:t}});this.dispatchEvent(n),this._resetScrollTop()}},{key:"_scrollHandler",value:function(){this._resetScrollTop()}},{key:"disconnectedCallback",value:function(){this._textarea.removeEventListener("input",this._inputHandler),this._textarea.removeEventListener("scroll",this._scrollHandler)}},{key:"attributeChangedCallback",value:function(e,t,n){"readonly"===e?this.readonly=null!==n:s.includes(e)?this[e]=n:console.warn(e,"属性配置暂不支持")}},{key:"language",get:function(){return this._language},set:function(e){this._language=e;try{p(this._hightlight)}catch(e){throw e}this.setAttribute("language",e)}},{key:"setLanguage",value:function(t,n){if(e.listLanguages().includes(t))this.language=t;else{try{e.registerLanguage(t,n)}catch(e){throw e}this.language=t}}},{key:"readonly",get:function(){return this._readonly},set:function(e){e?(this._readonly=!0,this._textarea.setAttribute("readonly","readonly")):(this._readonly=!1,this._textarea.removeAttribute("readonly"))}},{key:"value",get:function(){return this._value||""},set:function(e){this._value=e,this._textarea.value=e,p(this._hightlight)}},{key:"appendStyle",value:function(e){var t=document.createElement("style"),n=document.createTextNode(e);t.appendChild(n),this._themeStyleContainer.appendChild(t)}},{key:"appendLink",value:function(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e,this._themeStyleContainer.appendChild(t)}},{key:"removeCss",value:function(){this._themeStyleContainer.innerHTML=""}},{key:"height",get:function(){return this._host.style.height||window.getComputedStyle(this._host,null).height},set:function(e){this._height=e,this._host.style.height=e}},{key:"width",get:function(){return this._host.style.width||window.getComputedStyle(this._host,null).width},set:function(e){this._width=e,this._host.style.width=e}},{key:"resize",get:function(){return this._resize},set:function(e){w.includes(e)?(this._resize=e,this._host.style.resize=e):this.hasAttribute("resize")?(this._resize="auto",this._host.style.resize="auto"):(this._resize="none",this._host.style.resize="none")}},{key:"_hightlight",value:function(){var t;if(this.language){var n=e.highlight(this.value,{language:this.language}).value,i=(null===(t=this.value.match(/\s+$/))||void 0===t?void 0:t[0])||"";this._fake.innerHTML=n+i}else this._fake.innerHTML=e.highlightAuto(this.value).value}},{key:"_resetScrollTop",value:function(){this._fake.scrollTop=this._textarea.scrollTop,this._textarea.scrollTop=this._fake.scrollTop}}],[{key:"observedAttributes",get:function(){return s}}]),i}(g(HTMLElement));window.customElements.get(i)||window.customElements.define(i,x)}var _="custom-editor",v={install:function(e,t){var n=e.config.globalProperties.isCustomElement,i=t.name,o=void 0===i?_:i;e.config.globalProperties.isCustomElement=function(e){return e==o||"function"==typeof n&&n(e)},x(t)}},E={install:function(e,t){var n=t.name,i=void 0===n?_:n;e.config.ignoredElements.push(i),x(t)}};const k={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{name:_},n=Number(e.version.split(".")[0]);3===n?(console.log("当前环境为 vue 3"),v.install(e,t)):2===n?(console.log("当前环境为 vue 2"),E.install(e,t)):console.warn("请正确使用插件，custom-editor 支持 vue2, vue3")}}})(),i})()));