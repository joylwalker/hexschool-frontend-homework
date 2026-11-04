import{t as e}from"./axios-DIouOxUT.js";var t=`https://livejs-api.hexschool.io/api/livejs/v1/customer/joylwalker`,n=`${t}/products`,r=`${t}/carts`,i=`${t}/orders`,a=document.querySelector(`.productWrap`),o=document.querySelector(`.productSelect`),s=document.querySelector(`.cartItems`),c=document.querySelector(`.finalTotal`),l=document.querySelector(`.discardAllBtn`),u=document.querySelector(`.orderInfo-form`);document.querySelector(`#customerName`),document.querySelector(`#customerPhone`);var d=document.querySelector(`#customerEmail`);document.querySelector(`#customerAddress`),document.querySelector(`#tradeWay`);var f=document.querySelector(`[data-message="姓名"]`),p=document.querySelector(`[data-message="電話"]`),m=document.querySelector(`[data-message="Email"]`),h=document.querySelector(`[data-message="寄送地址"]`);u.noValidate=!0;var g=[],_=[];function v(e,t){e.response?console.error(`${t}失敗：`,e.response.data.message):console.error(`${t}失敗：`,e.message)}function y(e){let t=e.data.carts,n=e.data.finalTotal;_=t,S(t,n)}function b(){f.textContent=`必填`,p.textContent=`必填`,m.textContent=`必填`,h.textContent=`必填`}function x(e){let t=``;e.forEach(function(e){t+=`
      <li class="productCard">
        <h4 class="productType">新品</h4>
        <img src="${e.images}" alt="${e.title}">
        <a href="#" class="addCardBtn" data-id="${e.id}">加入購物車</a>
        <h3>${e.title}</h3>
        <del class="originPrice">NT$${e.origin_price.toLocaleString()}</del>
        <p class="nowPrice">NT$${e.price.toLocaleString()}</p>
      </li>
    `}),a.innerHTML=t}function S(e,t){let n=``;e.forEach(function(e){n+=`
      <tr>
        <td>
          <div class="cardItem-title">
            <img src="${e.product.images}" alt="${e.product.title}" />
            <p>${e.product.title}</p>
          </div>
        </td>

        <td>NT$${e.product.price.toLocaleString()}</td>

        <td>
          <div class="quantityControl" data-id="${e.id}">
            <button type="button" class="minusBtn" aria-label="減少商品數量" ${e.quantity<=1?`disabled`:``}>-</button>

            <span class="quantityValue" >${e.quantity}</span>

            <button type="button" class="plusBtn" aria-label="增加商品數量">+</button>
          </div>
        </td>
        <td>NT$${(e.product.price*e.quantity).toLocaleString()}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${e.id}"> clear </a>
        </td>
      </tr>
    `}),s.innerHTML=n,c.textContent=`NT$${t.toLocaleString()}`}function C(){e.get(n).then(function(e){g=e.data.products,x(g)}).catch(function(e){v(e,`取得商品列表`)})}function w(){e.get(r).then(function(e){y(e)}).catch(function(e){v(e,`取得購物車資料`)})}function T(t){let n={data:{productId:t,quantity:1}};e.post(r,n).then(function(e){y(e)}).catch(function(e){v(e,`新增購物車`)})}function E(t){let n=`${r}/${t}`;e.delete(n).then(function(e){y(e)}).catch(function(e){v(e,`刪除購物車商品`)})}function D(){e.delete(r).then(function(e){y(e)}).catch(function(e){v(e,`清空購物車`)})}function O(t,n){let i={data:{id:t,quantity:n}};e.patch(r,i).then(function(e){y(e)}).catch(function(e){v(e,`修改購物車內商品數量`),w()})}function k(t){e.post(i,t).then(function(e){e.data.status===!1?console.log(`訂單建立失敗：`,e.data.message):(console.log(`訂單建立成功：`,e.data),alert(`訂單已成功送出!`),u.reset(),b(),w())}).catch(function(e){v(e,`送出訂單`)})}o.addEventListener(`change`,function(e){let t=e.target.value;x(t===`全部`?g:g.filter(function(e){return e.category===t}))}),a.addEventListener(`click`,function(e){let t=e.target.closest(`.addCardBtn`);if(!t)return;e.preventDefault();let n=t.dataset.id;T(n)}),s.addEventListener(`click`,function(e){let t=e.target.closest(`.discardBtn a`);if(!t)return;e.preventDefault();let n=t.dataset.id;E(n)}),l.addEventListener(`click`,function(e){e.preventDefault(),window.confirm(`確定要清空整個購物車嗎？`)&&D()}),s.addEventListener(`click`,function(e){let t=e.target.closest(`.plusBtn`),n=e.target.closest(`.minusBtn`);if(!t&&!n)return;let r=e.target.closest(`.quantityControl`),i=r.dataset.id,a=Number(r.querySelector(`.quantityValue`).textContent);t?a++:n&&a--,!Number.isInteger(a)||a<1?(alert(`商品數量必須大於或等於 1 的整數!`),w()):O(i,a)}),u.addEventListener(`submit`,function(e){if(e.preventDefault(),_.length===0){alert(`購物車內目前沒有商品，請先加入商品!`);return}let t=document.querySelector(`#customerName`).value.trim(),n=document.querySelector(`#customerPhone`).value.trim(),r=document.querySelector(`#customerEmail`).value.trim(),i=document.querySelector(`#customerAddress`).value.trim(),a=document.querySelector(`#tradeWay`).value,o=!0;t===``?(f.textContent=`請填寫姓名`,o=!1):f.textContent=``,n===``?(p.textContent=`請填寫電話`,o=!1):p.textContent=``,r===``?(m.textContent=`請填寫 Email`,o=!1):d.checkValidity()?m.textContent=``:(m.textContent=`請填寫正確的 Email 格式`,o=!1),i===``?(h.textContent=`請填寫寄送地址`,o=!1):h.textContent=``,o&&k({data:{user:{name:t,tel:n,email:r,address:i,payment:a}}})}),C(),w();