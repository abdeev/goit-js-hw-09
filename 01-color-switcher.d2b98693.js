const e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");let a;d.disabled=!0;const r=()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`};t.addEventListener("click",(e=>{a=setInterval(r,1e3),t.disabled=!0,d.disabled=!1})),d.addEventListener("click",(()=>{clearInterval(a),d.disabled=!0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.d2b98693.js.map