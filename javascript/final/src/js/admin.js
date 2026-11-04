/////////////////////////
// 1. 後台：全產品類別營收比重
/////////////////////////
/*
- 顯示圓餅圖，做全產品類別營收比重，類別含三項，共有：床架、收納、窗簾
- 下方顯示訂單列表，可修改訂單狀態、刪除訂單、刪除全部訂單
*/

////////////////////////
// 2. 後台：全品項營收比重
////////////////////////
/*
- 顯示圓餅圖，做全品項營收比重，類別含四項，篩選出前三名營收品項，其他 4~8 名都統整為「其它」
- 下方顯示訂單列表，可修改訂單狀態、刪除訂單、刪除全部訂單
*/

////////////////////////
// 3. C3.js 範例
////////////////////////
/*
// C3.js
let chart = c3.generate({
  bindto: "#chart", // HTML 元素綁定
  data: {
    type: "pie",
    columns: [
      ["Louvre 雙人床架", 1],
      ["Antony 雙人床架", 2],
      ["Anty 雙人床架", 3],
      ["其他", 4],
    ],
    colors: {
      "Louvre 雙人床架": "#DACBFF",
      "Antony 雙人床架": "#9D7FEA",
      "Anty 雙人床架": "#5434A7",
      其他: "#301E5F",
    },
  },
});
*/

import axios from "axios";

//////////////////////////
// API 設定
//////////////////////////

const apiPath = "joylwalker";
const apiUrl = `https://livejs-api.hexschool.io/api/livejs/v1/admin/${apiPath}`;

// 各功能的 API
const ordersUrl = `${apiUrl}/orders`;

// 取得本機測試用的管理端 Token
const apiToken = sessionStorage.getItem("woworoomAdminToken");

//////////////////////////
// 取得 DOM 元素
//////////////////////////

const orderPageBody = document.querySelector(".orderPage-body");
const discardAllBtn = document.querySelector(".discardAllBtn");

// 圖表區塊
const chartTitle = document.querySelector("#chartTitle");
const chartSelect = document.querySelector("#chartSelect");

//////////////////////////
// 資料狀態
//////////////////////////

// 訂單資料
let allOrders = [];

// C3 圖表實例
let chart;

// 目前選擇的圖表模式
let chartMode = "category";

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

// 計算各產品類別營收
function getCategoryRevenue(orders) {
  const categoryData = {
    床架: 0,
    收納: 0,
    窗簾: 0,
  };

  orders.forEach(function (order) {
    order.products.forEach(function (product) {
      const category = product.category;
      const revenue = product.price * product.quantity;

      if (categoryData[category] !== undefined) {
        // 相同類別的營收累加
        categoryData[category] += revenue;
      }
    });
  });

  // 將統計完的物件轉換成 C3.js 格式
  return Object.entries(categoryData);
}

// 計算全品項營收：前三名與其他
function getProductRevenue(orders) {
  const productData = {};

  orders.forEach(function (order) {
    order.products.forEach(function (product) {
      const title = product.title;
      const revenue = product.price * product.quantity;

      if (productData[title] === undefined) {
        productData[title] = 0;
      }

      productData[title] += revenue;
    });
  });

  // 依照營收由高到低排序
  const sortedProducts = Object.entries(productData).sort(function (a, b) {
    return b[1] - a[1];
  });

  // 取前三名
  const chartData = sortedProducts.slice(0, 3);

  // 第四名以後加總為「其他」
  // reduce(): 可將陣列中的多個元素，累積成一個最終結果
  const othersTotal = sortedProducts.slice(3).reduce(function (total, item) {
    // 目前累積營收 ＋ 正在處理的這項商品營收，再回傳更新後的累積值
    return total + item[1];
  }, 0);

  // 判斷是否需要顯示「其他」
  if (othersTotal > 0) {
    chartData.push(["其他", othersTotal]);
  }

  return chartData;
}

//////////////////////////
// 渲染函式
//////////////////////////

// 1) 渲染訂單列表
function renderOrders(orders) {
  let str = "";

  orders.forEach(function (order) {
    // 取得訂單內所有商品名稱
    let productStr = "";

    order.products.forEach(function (product) {
      productStr += `<p>${product.title}</p>`;
    });

    // 將 Unix Timestamp 轉換成日期
    const orderDate = new Date(order.createdAt * 1000);
    const formattedDate = orderDate.toLocaleDateString("zh-TW");

    // 判斷訂單狀態
    const orderStatus = order.paid ? "已處理" : "未處理";

    str += `
      <tr>
        <td>${order.id}</td>
        <td>
          <p>${order.user.name}</p>
          <p>${order.user.tel}</p>
        </td>
        <td>${order.user.address}</td>
        <td>${order.user.email}</td>
        <td>
          ${productStr}
        </td>
        <td>${formattedDate}</td>
        <td class="orderStatus">
          <a href="#" data-id=${order.id}>${orderStatus}</a>
        </td>
        <td>
          <input type="button" class="delSingleOrder-Btn" 
          data-id=${order.id}
          value="刪除" />
        </td>
      </tr>
    `;
  });

  orderPageBody.innerHTML = str;
}

// 2) 渲染全產品類別營收比重圖表
function renderRevenueChart(orders) {
  // 若沒有訂單時，則不會產生圖表
  if (orders.length === 0) {
    if (chart) {
      chart.destroy();
      chart = null;
    }

    document.querySelector("#chart").textContent = "目前沒有訂單資料";
    return;
  }

  let columns;

  // 依照目前模式取得對應的營收資料
  if (chartMode === "category") {
    columns = getCategoryRevenue(orders);
  } else {
    columns = getProductRevenue(orders);
  }

  // 已經有圖表時，先清除舊圖表
  if (chart) {
    chart.destroy();
  }

  // 設定圖表顏色
  const chartColors = ["#DACBFF", "#9D7FEA", "#5434A7", "#301E5F"];

  const colors = {};

  columns.forEach(function (item, index) {
    colors[item[0]] = chartColors[index];
  });

  // 產生新圖表
  chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: columns,
      type: "pie",
      colors: colors,
    },
  });
}

//////////////////////////
// API 函式
//////////////////////////

// 1) GET：取得訂單列表
const config = {
  headers: {
    Authorization: apiToken,
  },
};

function getOrders() {
  axios
    .get(ordersUrl, config)
    .then(function (response) {
      allOrders = response.data.orders;

      renderOrders(allOrders);
      renderRevenueChart(allOrders);
    })
    .catch(function (error) {
      handleApiError(error, "取得訂單列表");
    });
}

// 2) PUT：修改訂單狀態
function updateOrderStatus(orderId, paid) {
  const orderData = {
    data: {
      id: orderId,
      paid,
    },
  };

  axios
    .put(ordersUrl, orderData, config)
    .then(function (response) {
      console.log("訂單修改成功：", response.data);
      getOrders();
    })
    .catch(function (error) {
      handleApiError(error, "修改訂單狀態");
    });
}

// 3) DELETE：刪除單筆訂單
function deleteOrderItem(orderId) {
  const deleteUrl = `${ordersUrl}/${orderId}`;

  axios
    .delete(deleteUrl, config)
    .then(function (response) {
      console.log("刪除訂單成功：", response.data);

      // 重新取得最新訂單列表
      getOrders();
    })
    .catch(function (error) {
      handleApiError(error, "刪除單筆訂單");
    });
}

// 4) DELETE：清除全部訂單
function deleteAllOrders() {
  axios
    .delete(ordersUrl, config)
    .then(function (response) {
      console.log("已刪除全部訂單：", response.data);

      getOrders();
    })
    .catch(function (error) {
      handleApiError(error, "清除全部訂單");
    });
}

//////////////////////////
// 事件監聽
//////////////////////////

// 1) 修改訂單狀態
orderPageBody.addEventListener("click", function (e) {
  // 找出被點擊的訂單狀態
  const statusBtn = e.target.closest(".orderStatus a");

  if (!statusBtn) return;

  e.preventDefault();

  // 取得訂單 ID
  const orderId = statusBtn.dataset.id;

  // 找出相對應的訂單資料
  const order = allOrders.find(function (item) {
    return item.id === orderId;
  });

  if (!order) return;

  // 更改原本的訂單狀態
  const newStatus = !order.paid;

  // 呼叫 PUT API
  updateOrderStatus(orderId, newStatus);
});

// 2) 刪除單筆訂單
orderPageBody.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".delSingleOrder-Btn");

  if (!deleteBtn) return;

  const orderId = deleteBtn.dataset.id;

  // 確認是否刪除
  const isConfirmed = window.confirm("確定要刪除這筆訂單嗎？");

  if (!isConfirmed) return;

  // 呼叫 DELETE API
  deleteOrderItem(orderId);
});

// 3) 清除全部訂單
discardAllBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // 確認使用者是否要清除全部訂單
  const isConfirmed = window.confirm("確定要清除全部訂單嗎？");

  if (!isConfirmed) return;

  // 呼叫 DELETE API
  deleteAllOrders();
});

// 4) 切換營收比圖表
chartSelect.addEventListener("change", function (e) {
  chartMode = e.target.value;

  // 更新圖表標題
  if (chartMode === "category") {
    chartTitle.textContent = "全產品類別營收比重";
  } else {
    chartTitle.textContent = "全品項營收比重";
  }

  // 重新渲染圖表
  renderRevenueChart(allOrders);
});

//////////////////////////
// 初始化
//////////////////////////

getOrders();
