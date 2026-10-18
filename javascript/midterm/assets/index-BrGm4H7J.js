(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new URL(`travel_1-jP7WML0f.png`,import.meta.url).href,t=new URL(`travel_2-CkjUmr60.png`,import.meta.url).href,n=new URL(`travel_3-BIw7E8w7.png`,import.meta.url).href,r=new URL(`travel_4-DVCBlUM8.png`,import.meta.url).href,i=new URL(`travel_5-D5SKR6sl.png`,import.meta.url).href,a=new URL(`travel_6-DtG77kpc.png`,import.meta.url).href,o=[{id:0,name:`綠島自由行套裝行程`,imgUrl:e,area:`台東`,description:`嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。`,group:8,price:1280,rate:8.6},{id:1,name:`清境高空觀景步道二日遊`,imgUrl:t,area:`南投`,description:`清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。`,group:12,price:2580,rate:8.2},{id:2,name:`南庄度假村露營車二日遊`,imgUrl:n,area:`台中`,description:`南庄雲水豪華露營車，擁有最愜意的露營體驗吧！一泊一食，輕鬆享受露營車樂趣。獨立衛浴與私人戶外露臺。入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。`,group:2,price:1280,rate:9.6},{id:3,name:`山林悠遊雙人套票`,imgUrl:r,area:`台中`,description:`山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。
（含雙龍瀑布入場券 x2）`,group:10,price:880,rate:8.6},{id:4,name:`漁樂碼頭釣魚體驗套票`,imgUrl:i,area:`台中`,description:`台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！`,group:5,price:1280,rate:8.6},{id:5,name:`熊森公園親子二日遊套票`,imgUrl:a,area:`高雄`,description:`來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！`,group:3,price:2480,rate:8.6}],s=document.querySelector(`.ticket-form`),c=document.querySelector(`.ticket-list`),l=document.querySelector(`.areaFilter`),u=document.querySelector(`.ticketCount`);function d(e){let t=``;e.forEach(function(e){t+=`
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
    `}),c.innerHTML=t,u.textContent=e.length}function f(){let e=l.value;d(e===``||e===`全部地區`?o:o.filter(function(t){return t.area===e}))}l.addEventListener(`change`,function(){f()}),s.addEventListener(`submit`,function(e){e.preventDefault();let t=document.querySelector(`#ticketName`).value,n=document.querySelector(`#ticketImage`).value,r=document.querySelector(`#ticketArea`).value,i=Number(document.querySelector(`#ticketPrice`).value),a=Number(document.querySelector(`#ticketGroup`).value),c=Number(document.querySelector(`#ticketRate`).value),l=document.querySelector(`#ticketDescription`).value;if(!t.trim()||!n.trim()||!r||!l.trim()){alert(`請填寫所有欄位`);return}if(!Number.isFinite(i)||i<=0){alert(`套票金額須大於 0`);return}if(!Number.isInteger(a)||a<0||document.querySelector(`#ticketGroup`).value.trim()===``){alert(`套票組數須為整數，且不得為負數`);return}if(!Number.isFinite(c)||c<1||c>10){alert(`套票星級須介於 1 ~ 10 分`);return}let u={id:o.length,name:t,imgUrl:n,area:r,description:l,group:a,price:i,rate:c};o.push(u),f(),alert(`套票新增成功`),s.reset()}),d(o);