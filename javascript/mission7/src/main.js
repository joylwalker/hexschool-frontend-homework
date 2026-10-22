// 任務描述
/*
選擇一個任務等級，練習使用 C3.js
LV1：修改老師的 Codepen，接 API 顯示 Donut 圖
LV2：依照此 Figma 設計稿，用 axios 介接資料，並顯示 C3 圖表
LV3：做 LV2，並加上上方套票新增時，下方 C3 與套票列表也會即時更新
*/

// 導入 SCSS 入口檔案
import "./scss/all.scss";
// import { testData } from "./test-data";

// 初始化票券資料
let data = [];

// 儲存 C3.js 圖表
let chart;

// API 網址
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

// 使用 Axios 取得遠端票券資料
function getData() {
  axios
    .get(url)
    .then(function (response) {
      data = response.data.data;
      console.log("取得票券資料", data);

      // 更新票券列表
      updateTickets();
      // 產生 Donut 圖
      renderChart();
    })
    .catch(function (error) {
      console.error("取得資料失敗", error);
    });
}

// 載入 Figma，測試用函式
/*
function getTestData() {
  data = [...testData];

  updateTickets();
  renderChart();
}
*/

// 取得 DOM 變數
const ticketForm = document.querySelector(".ticket-form");
const ticketList = document.querySelector(".ticket-list");
const areaFilter = document.querySelector(".areaFilter");
const ticketCount = document.querySelector(".ticketCount");
const noResult = document.querySelector(".no-result");

// 渲染票券卡片＆搜尋筆數
function renderTickets(tickets) {
  let str = "";

  tickets.forEach(function (ticket) {
    str += `
    <div class="ticket-card">
      <div class="ticket-card-image">
        <img src="${ticket.imgUrl}" alt="${ticket.name}" />
        <span class="ticket-area">${ticket.area}</span>
        <span class="ticket-rate">${ticket.rate}</span>
      </div>

      <div class="ticket-card-body">
        <h3 class="ticket-card-title">${ticket.name}</h3>
        <p class="ticket-card-description">
          ${ticket.description}
        </p>
      </div>

      <div class="ticket-card-footer">
        <div class="ticket-card-stock">
          <span class="material-symbols-outlined"> error </span>
          <p class="ticket-card-group">剩下最後 ${ticket.group} 組</p>
        </div>

        <div class="ticket-card-cost">
          <span>TWD</span>
          <p class="ticket-card-price">${ticket.price}</p>
        </div>
      </div>
    </div>
    `;
  });

  ticketList.innerHTML = str;
  ticketCount.textContent = tickets.length;

  // 沒有票券時顯示查無資料
  noResult.hidden = tickets.length > 0;
}

// 根據篩選條件更新列表
function updateTickets() {
  const selectedArea = areaFilter.value;

  if (selectedArea === "" || selectedArea === "全部地區") {
    // 將完整的 data 陣列重新渲染成票券卡片
    renderTickets(data);
  } else {
    // filter()：篩選符合地區的資料
    // 只有判斷結果是 true 的物件，才會被放進 filterTickets
    const filterTickets = data.filter(function (ticket) {
      return ticket.area === selectedArea;
    });

    renderTickets(filterTickets);
  }
}

// 監聽地區篩選（用 change 監聽）
areaFilter.addEventListener("change", function () {
  updateTickets();
});

// 監聽新增票券表單
ticketForm.addEventListener("submit", function (event) {
  // 防止表單提交時重新載入頁面
  event.preventDefault();

  // 取得各個欄位的值
  const name = document.querySelector("#ticketName").value;
  const imgUrl = document.querySelector("#ticketImage").value;
  const area = document.querySelector("#ticketArea").value;
  const price = Number(document.querySelector("#ticketPrice").value);
  const group = Number(document.querySelector("#ticketGroup").value);
  const rate = Number(document.querySelector("#ticketRate").value);
  const description = document.querySelector("#ticketDescription").value;

  // 驗證表單輸入資料
  // 1)檢查文字欄位是否填寫
  if (!name.trim() || !imgUrl.trim() || !area || !description.trim()) {
    alert("請填寫所有欄位");
    return;
  }
  // 2) 檢查金額
  // Number.isFinite() 用來判斷是不是有限數字
  if (!Number.isFinite(price) || price <= 0) {
    alert("套票金額須大於 0");
    return;
  }
  // 3) 檢查組數
  // Number.isInteger 檢查值是否為整數
  if (
    !Number.isInteger(group) ||
    group < 0 ||
    document.querySelector("#ticketGroup").value.trim() === ""
  ) {
    alert("套票組數須為整數，且不得為負數");
    return;
  }
  // 4) 套票星級
  // Number.isFinite() 用來判斷是不是有限數字
  if (!Number.isFinite(rate) || rate < 1 || rate > 10) {
    alert("套票星級須介於 1 ~ 10 分");
    return;
  }

  // 建立新票券物件
  const newTicket = {
    id: data.length,
    name,
    imgUrl,
    area,
    description,
    group,
    price,
    rate,
  };

  // 把新物件加入原本的陣列
  data.push(newTicket);

  // 更新下方票券列表&圖表
  updateTickets();
  updateChart();

  // 新增成功後清空表單
  alert("套票新增成功");
  ticketForm.reset();
});

// 初始化頁面
getData(); // 正式 API 資料
// getTestData(); // Figma 測試資料

/////////////////////////
// C3.js: Donut chart
////////////////////////

/*
getChartData(): 統計票券地區，並回傳 C3.js 資料
renderChart(): 建立圖表，使用 c3.generate()
updateChart(): 更新圖表，使用 chart.load()
*/

// 1. 統計各地區票券數量，並將統計結果轉成 C3.js 所需格式後回傳
function getChartData() {
  // 1) 統計各區票券數量
  // totalObj：統計各地區票券數量
  // 使用 Object {} 儲存「地區名稱：票券數量」
  const totalObj = {};

  data.forEach(function (item) {
    if (totalObj[item.area] === undefined) {
      totalObj[item.area] = 1;
    } else {
      totalObj[item.area] += 1;
    }
  });

  // 2) 轉換成 C3.js 所需格式
  const newData = [];
  // Object.keys() 取得物件的所有 Key，並回傳陣列
  const areas = Object.keys(totalObj);

  // forEach 是陣列方法，所以需要先透過 object.keys() 把物件的屬性名稱整理成陣列
  areas.forEach(function (area) {
    // C3.js columns 格式: [["地區", 數量], ...]
    const arr = [area, totalObj[area]];
    newData.push(arr);
  });

  return newData;
}

// 建立 Donut Chart
function renderChart() {
  chart = c3.generate({
    bindto: "#chart",
    size: {
      width: 162,
      height: 192,
    },
    data: {
      // 呼叫函式，取得整理好的資料
      columns: getChartData(),
      type: "donut",
      // 停用 C3.js 預設的數值排序，保留資料輸入順序
      order: null,
      colors: {
        台北: "#26C0C7",
        台中: "#5151D3",
        高雄: "#E68618",
      },
    },
    donut: {
      title: "套票地區比重",
      width: 14,
      // 隱藏各區塊上的 33.3%
      label: {
        show: false,
      },
    },
  });
}

// 新增票券後，更新 Donut 圖
function updateChart() {
  chart.load({
    columns: getChartData(),
    // 移除舊資料並載入新資料
    unload: true,
  });
}
