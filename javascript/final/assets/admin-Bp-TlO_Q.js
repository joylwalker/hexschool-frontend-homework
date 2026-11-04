import{t as e}from"./axios-DIouOxUT.js";var t=`https://livejs-api.hexschool.io/api/livejs/v1/admin/joylwalker/orders`,n=sessionStorage.getItem(`woworoomAdminToken`),r=document.querySelector(`.orderPage-body`),i=document.querySelector(`.discardAllBtn`),a=document.querySelector(`#chartTitle`),o=document.querySelector(`#chartSelect`),s=[],c,l=`category`;function u(e,t){e.response?console.error(`${t}失敗：`,e.response.data.message):console.error(`${t}失敗：`,e.message)}function d(e){let t={床架:0,收納:0,窗簾:0};return e.forEach(function(e){e.products.forEach(function(e){let n=e.category,r=e.price*e.quantity;t[n]!==void 0&&(t[n]+=r)})}),Object.entries(t)}function f(e){let t={};e.forEach(function(e){e.products.forEach(function(e){let n=e.title,r=e.price*e.quantity;t[n]===void 0&&(t[n]=0),t[n]+=r})});let n=Object.entries(t).sort(function(e,t){return t[1]-e[1]}),r=n.slice(0,3),i=n.slice(3).reduce(function(e,t){return e+t[1]},0);return i>0&&r.push([`其他`,i]),r}function p(e){let t=``;e.forEach(function(e){let n=``;e.products.forEach(function(e){n+=`<p>${e.title}</p>`});let r=new Date(e.createdAt*1e3).toLocaleDateString(`zh-TW`),i=e.paid?`已處理`:`未處理`;t+=`
      <tr>
        <td>${e.id}</td>
        <td>
          <p>${e.user.name}</p>
          <p>${e.user.tel}</p>
        </td>
        <td>${e.user.address}</td>
        <td>${e.user.email}</td>
        <td>
          ${n}
        </td>
        <td>${r}</td>
        <td class="orderStatus">
          <a href="#" data-id=${e.id}>${i}</a>
        </td>
        <td>
          <input type="button" class="delSingleOrder-Btn" 
          data-id=${e.id}
          value="刪除" />
        </td>
      </tr>
    `}),r.innerHTML=t}function m(e){if(e.length===0){c&&=(c.destroy(),null),document.querySelector(`#chart`).textContent=`目前沒有訂單資料`;return}let t;t=l===`category`?d(e):f(e),c&&c.destroy();let n=[`#DACBFF`,`#9D7FEA`,`#5434A7`,`#301E5F`],r={};t.forEach(function(e,t){r[e[0]]=n[t]}),c=c3.generate({bindto:`#chart`,data:{columns:t,type:`pie`,colors:r}})}var h={headers:{Authorization:n}};function g(){e.get(t,h).then(function(e){s=e.data.orders,p(s),m(s)}).catch(function(e){u(e,`取得訂單列表`)})}function _(n,r){let i={data:{id:n,paid:r}};e.put(t,i,h).then(function(e){console.log(`訂單修改成功：`,e.data),g()}).catch(function(e){u(e,`修改訂單狀態`)})}function v(n){let r=`${t}/${n}`;e.delete(r,h).then(function(e){console.log(`刪除訂單成功：`,e.data),g()}).catch(function(e){u(e,`刪除單筆訂單`)})}function y(){e.delete(t,h).then(function(e){console.log(`已刪除全部訂單：`,e.data),g()}).catch(function(e){u(e,`清除全部訂單`)})}r.addEventListener(`click`,function(e){let t=e.target.closest(`.orderStatus a`);if(!t)return;e.preventDefault();let n=t.dataset.id,r=s.find(function(e){return e.id===n});r&&_(n,!r.paid)}),r.addEventListener(`click`,function(e){let t=e.target.closest(`.delSingleOrder-Btn`);if(!t)return;let n=t.dataset.id;window.confirm(`確定要刪除這筆訂單嗎？`)&&v(n)}),i.addEventListener(`click`,function(e){e.preventDefault(),window.confirm(`確定要清除全部訂單嗎？`)&&y()}),o.addEventListener(`change`,function(e){l=e.target.value,a.textContent=l===`category`?`全產品類別營收比重`:`全品項營收比重`,m(s)}),g();