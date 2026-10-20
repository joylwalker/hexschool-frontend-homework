(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=`https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`;function n(){axios.get(t).then(function(t){e=t.data.data,console.log(`取得票券資料`,e),l()}).catch(function(e){console.error(`取得資料失敗`,e)})}var r=document.querySelector(`.ticket-form`),i=document.querySelector(`.ticket-list`),a=document.querySelector(`.areaFilter`),o=document.querySelector(`.ticketCount`),s=document.querySelector(`.no-result`);function c(e){let t=``;e.forEach(function(e){t+=`
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
    `}),i.innerHTML=t,o.textContent=e.length,s.hidden=e.length>0}function l(){let t=a.value;c(t===``||t===`全部地區`?e:e.filter(function(e){return e.area===t}))}a.addEventListener(`change`,function(){l()}),r.addEventListener(`submit`,function(t){t.preventDefault();let n=document.querySelector(`#ticketName`).value,i=document.querySelector(`#ticketImage`).value,a=document.querySelector(`#ticketArea`).value,o=Number(document.querySelector(`#ticketPrice`).value),s=Number(document.querySelector(`#ticketGroup`).value),c=Number(document.querySelector(`#ticketRate`).value),u=document.querySelector(`#ticketDescription`).value;if(!n.trim()||!i.trim()||!a||!u.trim()){alert(`請填寫所有欄位`);return}if(!Number.isFinite(o)||o<=0){alert(`套票金額須大於 0`);return}if(!Number.isInteger(s)||s<0||document.querySelector(`#ticketGroup`).value.trim()===``){alert(`套票組數須為整數，且不得為負數`);return}if(!Number.isFinite(c)||c<1||c>10){alert(`套票星級須介於 1 ~ 10 分`);return}let d={id:e.length,name:n,imgUrl:i,area:a,description:u,group:s,price:o,rate:c};e.push(d),l(),alert(`套票新增成功`),r.reset()}),n();