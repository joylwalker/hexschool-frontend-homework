// 任務描述
/*
搭配第五堂課的版型，透過 axios 撈資料後，再顯示在網頁上
依照等級表選取一種資料撈取（JSON LV2）
*/

// 導入 SCSS 入口檔案
import "./scss/all.scss";

// 初始化票券資料
let data = [];

// API 網址
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

// Testing Area
// axios.get(url).then(function (response) {
//   console.log(response);
//   console.log(response.data);
//   console.log(response.data.data);
// });

// 取得遠端票券資料
function getData() {
  axios
    .get(url)
    .then(function (response) {
      data = response.data.data;
      console.log("取得票券資料", data);

      updateTickets();
    })
    .catch(function (error) {
      console.error("取得資料失敗", error);
    });
}

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

// renderTickets(data);

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

  // 更新下方票券列表
  updateTickets();

  // 新增成功後清空表單
  alert("套票新增成功");
  ticketForm.reset();
});

// 初始化頁面
getData();
