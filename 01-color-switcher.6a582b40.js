!function(){var t,e=document.querySelector("body"),a=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");d.disabled=!0;var n=function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))};a.addEventListener("click",(function(e){t=setInterval(n,1e3),a.disabled=!0,d.disabled=!1})),d.addEventListener("click",(function(){clearInterval(t),d.disabled=!0,a.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.6a582b40.js.map
