/////////////////////
// 前台功能：
/////////////////////
/*
- 顯示產品列表（需串接 API )
- 產品可加入購物車（需串接 API )
- 產品可透過左上角搜尋功能做篩選
- 我的購物車顯示目前在購物車的產品清單（需串接 API )
- 可編輯、刪除單一、刪除全部購物車內的品項（需串接 API )
- 可填寫資料並送出訂單（需串接 API )
*/

import axios from "axios";

//////////////////////////
// API 設定
//////////////////////////

const apiPath = "joylwalker";
const apiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/customer/${apiPath}`;

// 各功能的 API
const productsUrl = `${apiUrl}/products`;
const cartsUrl = `${apiUrl}/carts`;
const ordersUrl = `${apiUrl}/orders`;

//////////////////////////
// 取得 DOM 元素
//////////////////////////

// 商品區塊
const productWrap = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");

// 購物車區塊
const cartItems = document.querySelector(".cartItems");
const cartTotal = document.querySelector(".finalTotal");
const discardAllBtn = document.querySelector(".discardAllBtn");

// 訂單區塊
const orderInfoForm = document.querySelector(".orderInfo-form");

// 表單輸入欄位
const customerNameInput = document.querySelector("#customerName");
const customerPhoneInput = document.querySelector("#customerPhone");
const customerEmailInput = document.querySelector("#customerEmail");
const customerAddressInput = document.querySelector("#customerAddress");
const tradeWaySelect = document.querySelector("#tradeWay");

// 表單錯誤訊息
const customerNameMessage = document.querySelector('[data-message="姓名"]');
const customerPhoneMessage = document.querySelector('[data-message="電話"]');
const customerEmailMessage = document.querySelector('[data-message="Email"]');
const customerAddressMessage = document.querySelector(
  '[data-message="寄送地址"]',
);

// 由 JavaScript 統一處理表單驗證訊息
orderInfoForm.noValidate = true;

//////////////////////////
// 資料狀態
//////////////////////////

// 取得商品列表資料
let allProducts = [];

// 取得購物車資料
let currentCarts = [];

//////////////////////////
// 共用函式
//////////////////////////

// 統一處理 Axios 請求錯誤
function handleApiError(error, action) {
  if (error.response) {
    console.error(`${action}失敗：`, error.response.data.message);
  } else {
    console.error(`${action}失敗：`, error.message);
  }
}

// 使用 API 回傳的資料更新購物車
function updateCartUI(response) {
  const carts = response.data.carts;
  const finalTotal = response.data.finalTotal;

  currentCarts = carts;

  renderCart(carts, finalTotal);
}

// 恢復表單預設提示
function resetFormMessages() {
  customerNameMessage.textContent = "必填";
  customerPhoneMessage.textContent = "必填";
  customerEmailMessage.textContent = "必填";
  customerAddressMessage.textContent = "必填";
}

//////////////////////////
// 渲染函式
//////////////////////////

// 渲染商品列表
function renderProducts(products) {
  let str = "";

  products.forEach(function (product) {
    str += `
      <li class="productCard">
        <h4 class="productType">新品</h4>
        <img src="${product.images}" alt="${product.title}">
        <a href="#" class="addCardBtn" data-id="${product.id}">加入購物車</a>
        <h3>${product.title}</h3>
        <del class="originPrice">NT$${product.origin_price.toLocaleString()}</del>
        <p class="nowPrice">NT$${product.price.toLocaleString()}</p>
      </li>
    `;
  });

  productWrap.innerHTML = str;
}

// 渲染購物車列表 & 總金額
function renderCart(carts, finalTotal) {
  let str = "";

  carts.forEach(function (cart) {
    str += `
      <tr>
        <td>
          <div class="cardItem-title">
            <img src="${cart.product.images}" alt="${cart.product.title}" />
            <p>${cart.product.title}</p>
          </div>
        </td>

        <td>NT$${cart.product.price.toLocaleString()}</td>

        <td>
          <div class="quantityControl" data-id="${cart.id}">
            <button type="button" class="minusBtn" aria-label="減少商品數量" ${cart.quantity <= 1 ? "disabled" : ""}>-</button>

            <span class="quantityValue" >${cart.quantity}</span>

            <button type="button" class="plusBtn" aria-label="增加商品數量">+</button>
          </div>
        </td>
        <td>NT$${(cart.product.price * cart.quantity).toLocaleString()}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${cart.id}"> clear </a>
        </td>
      </tr>
    `;
  });

  // 渲染購物車列表
  cartItems.innerHTML = str;

  // 渲染購物車總金額
  cartTotal.textContent = `NT$${finalTotal.toLocaleString()}`;
}

//////////////////////////
// API 函式
//////////////////////////

// 1) GET：取得商品列表
function getProducts() {
  axios
    .get(productsUrl)
    .then(function (response) {
      allProducts = response.data.products;
      renderProducts(allProducts);
    })
    .catch(function (error) {
      handleApiError(error, "取得商品列表");
    });
}

// 2) GET：取得購物車資料
function getCart() {
  axios
    .get(cartsUrl)
    .then(function (response) {
      updateCartUI(response);
    })
    .catch(function (error) {
      handleApiError(error, "取得購物車資料");
    });
}

// 3) POST：新增購物車
function addToCart(productId) {
  const cartData = {
    data: {
      // productId: productId,
      productId,
      quantity: 1,
    },
  };

  axios
    .post(cartsUrl, cartData)
    .then(function (response) {
      updateCartUI(response);
    })
    .catch(function (error) {
      handleApiError(error, "新增購物車");
    });
}

// 4) DELETE：刪除單筆購物車商品
function deleteCartItem(cartId) {
  const deleteUrl = `${cartsUrl}/${cartId}`;

  axios
    .delete(deleteUrl)
    .then(function (response) {
      updateCartUI(response);
    })
    .catch(function (error) {
      handleApiError(error, "刪除購物車商品");
    });
}

// 5) DELETE：清空購物車
function deleteAllCart() {
  axios
    .delete(cartsUrl)
    .then(function (response) {
      updateCartUI(response);
    })
    .catch(function (error) {
      handleApiError(error, "清空購物車");
    });
}

// 6) PATCH：修改購物車商品數量
function updateCartQuantity(cartId, quantity) {
  const cartData = {
    data: {
      id: cartId,
      quantity,
      // quantity: quantity,
    },
  };

  axios
    .patch(cartsUrl, cartData)
    .then(function (response) {
      updateCartUI(response);
    })
    .catch(function (error) {
      handleApiError(error, "修改購物車內商品數量");

      // 重新取得購物車資料，還原畫面
      getCart();
    });
}

// 7) POST：送出訂單
function createOrder(orderData) {
  axios
    .post(ordersUrl, orderData)
    .then(function (response) {
      // 確認 API 是否成功建立訂單
      if (response.data.status === false) {
        console.log("訂單建立失敗：", response.data.message);
        return;
      }

      console.log("訂單建立成功：", response.data);

      alert("訂單已成功送出!");

      // 清空表單，恢復必填提示
      orderInfoForm.reset();
      resetFormMessages();

      // 重新取得購物車資料
      getCart();
    })
    .catch(function (error) {
      handleApiError(error, "送出訂單");
    });
}

//////////////////////////
// 事件監聽
//////////////////////////

// 1) 商品分類篩選
// 監聽事件：change － 立即觸發或失焦後觸發
productSelect.addEventListener("change", function (e) {
  const category = e.target.value;

  // 選擇全部：顯示所有商品
  if (category === "全部") {
    renderProducts(allProducts);
    return;
  }

  // 選擇其他商品：filter
  const filteredProducts = allProducts.filter(function (product) {
    return product.category === category;
  });

  renderProducts(filteredProducts);
});

// 2) 加入購物車按鈕
// 事件委派：監聽父元素，判斷被點擊的子元素
productWrap.addEventListener("click", function (e) {
  const addCardBtn = e.target.closest(".addCardBtn");

  if (!addCardBtn) return;
  e.preventDefault();

  // 取得商品 ID
  const productId = addCardBtn.dataset.id;

  // 呼叫新增購物車函式
  addToCart(productId);
});

// 3) 刪除單筆購物車商品
cartItems.addEventListener("click", function (e) {
  const discardBtn = e.target.closest(".discardBtn a");

  if (!discardBtn) return;

  e.preventDefault();

  // 取得購物車品項 ID
  const cartId = discardBtn.dataset.id;

  // 呼叫刪除單筆購物車商品的函式
  deleteCartItem(cartId);
});

// 4) 清空購物車
discardAllBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const isConfirmed = window.confirm("確定要清空整個購物車嗎？");

  if (!isConfirmed) return;

  deleteAllCart();
});

// 5) 修改購物車商品數量(含數量控制器)
cartItems.addEventListener("click", function (e) {
  const plusBtn = e.target.closest(".plusBtn");
  const minusBtn = e.target.closest(".minusBtn");

  // 不是點擊加減按鈕就結束
  if (!plusBtn && !minusBtn) return;

  // 取得數量控制區塊
  const quantityControl = e.target.closest(".quantityControl");

  // 取得購物車品項 ID
  const cartId = quantityControl.dataset.id;

  // 取得目前的數量
  const currentQuantity = Number(
    quantityControl.querySelector(".quantityValue").textContent,
  );

  // 計算新數量
  let quantity = currentQuantity;

  if (plusBtn) {
    quantity++;
  } else if (minusBtn) {
    quantity--;
  }

  // 商品數量不能小於 1
  if (!Number.isInteger(quantity) || quantity < 1) {
    alert("商品數量必須大於或等於 1 的整數!");
    getCart();
    return;
  }

  // 呼叫 PATCH 函式
  updateCartQuantity(cartId, quantity);
});

// 6) 送出訂單
orderInfoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 若購物車沒有商品，則不需進行訂單表單驗證
  if (currentCarts.length === 0) {
    alert("購物車內目前沒有商品，請先加入商品!");
    return;
  }

  // 取得表單資料
  const customerName = document.querySelector("#customerName").value.trim();
  const customerPhone = document.querySelector("#customerPhone").value.trim();
  const customerEmail = document.querySelector("#customerEmail").value.trim();
  const customerAddress = document
    .querySelector("#customerAddress")
    .value.trim();
  const tradeWay = document.querySelector("#tradeWay").value;

  // 逐欄驗證
  // 預設表單驗證通過
  let isValid = true;

  // 1. 姓名驗證
  if (customerName === "") {
    customerNameMessage.textContent = "請填寫姓名";
    isValid = false;
  } else {
    customerNameMessage.textContent = "";
  }

  // 2. 電話驗證
  if (customerPhone === "") {
    customerPhoneMessage.textContent = "請填寫電話";
    isValid = false;
  } else {
    customerPhoneMessage.textContent = "";
  }

  // 3. Email 驗證
  if (customerEmail === "") {
    customerEmailMessage.textContent = "請填寫 Email";
    isValid = false;
  } else if (!customerEmailInput.checkValidity()) {
    customerEmailMessage.textContent = "請填寫正確的 Email 格式";
    isValid = false;
  } else {
    customerEmailMessage.textContent = "";
  }

  // 4. 寄送地址驗證
  if (customerAddress === "") {
    customerAddressMessage.textContent = "請填寫寄送地址";
    isValid = false;
  } else {
    customerAddressMessage.textContent = "";
  }

  // 有任何欄位不通過，就不送出表單
  if (!isValid) return;

  // 建立符合 API 規格的訂單資料
  const orderData = {
    data: {
      user: {
        name: customerName,
        tel: customerPhone,
        email: customerEmail,
        address: customerAddress,
        payment: tradeWay,
      },
    },
  };

  // 呼叫送出訂單函式
  createOrder(orderData);
});

//////////////////////////
// 初始化
//////////////////////////

// 初始化時取得商品列表資料
getProducts();

// 初始化時取得購物車資料
getCart();
