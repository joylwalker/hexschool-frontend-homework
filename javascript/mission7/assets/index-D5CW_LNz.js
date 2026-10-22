(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t,n=`https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`;function r(){axios.get(n).then(function(t){e=t.data.data,console.log(`取得票券資料`,e),u(),f()}).catch(function(e){console.error(`取得資料失敗`,e)})}var i=document.querySelector(`.ticket-form`),a=document.querySelector(`.ticket-list`),o=document.querySelector(`.areaFilter`),s=document.querySelector(`.ticketCount`),c=document.querySelector(`.no-result`);function l(e){let t=``;e.forEach(function(e){t+=`
    <div class="ticket-card">
      <div class="ticket-card-image">
        <img src="${e.imgUrl}" alt="${e.name}" />
        <span class="ticket-area">${e.area}</span>
        <span class="ticket-rate">${e.rate}</span>
      </div>

      <div class="ticket-card-body">
        <h3 class="ticket-card-title">${e.name}</h3>
        <p class="ticket-card-description">
          ${e.description}
        </p>
      </div>

      <div class="ticket-card-footer">
        <div class="ticket-card-stock">
          <span class="material-symbols-outlined"> error </span>
          <p class="ticket-card-group">剩下最後 ${e.group} 組</p>
        </div>

        <div class="ticket-card-cost">
          <span>TWD</span>
          <p class="ticket-card-price">${e.price}</p>
        </div>
      </div>
    </div>
    `}),a.innerHTML=t,s.textContent=e.length,c.hidden=e.length>0}function u(){let t=o.value;l(t===``||t===`全部地區`?e:e.filter(function(e){return e.area===t}))}o.addEventListener(`change`,function(){u()}),i.addEventListener(`submit`,function(t){t.preventDefault();let n=document.querySelector(`#ticketName`).value,r=document.querySelector(`#ticketImage`).value,a=document.querySelector(`#ticketArea`).value,o=Number(document.querySelector(`#ticketPrice`).value),s=Number(document.querySelector(`#ticketGroup`).value),c=Number(document.querySelector(`#ticketRate`).value),l=document.querySelector(`#ticketDescription`).value;if(!n.trim()||!r.trim()||!a||!l.trim()){alert(`請填寫所有欄位`);return}if(!Number.isFinite(o)||o<=0){alert(`套票金額須大於 0`);return}if(!Number.isInteger(s)||s<0||document.querySelector(`#ticketGroup`).value.trim()===``){alert(`套票組數須為整數，且不得為負數`);return}if(!Number.isFinite(c)||c<1||c>10){alert(`套票星級須介於 1 ~ 10 分`);return}let d={id:e.length,name:n,imgUrl:r,area:a,description:l,group:s,price:o,rate:c};e.push(d),u(),p(),alert(`套票新增成功`),i.reset()}),r();function d(){let t={};e.forEach(function(e){t[e.area]===void 0?t[e.area]=1:t[e.area]+=1});let n=[];return Object.keys(t).forEach(function(e){let r=[e,t[e]];n.push(r)}),n}function f(){t=c3.generate({bindto:`#chart`,size:{width:162,height:192},data:{columns:d(),type:`donut`,order:null,colors:{台北:`#26C0C7`,台中:`#5151D3`,高雄:`#E68618`}},donut:{title:`套票地區比重`,width:14,label:{show:!1}}})}function p(){t.load({columns:d(),unload:!0})}