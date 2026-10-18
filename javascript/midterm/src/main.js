// 版型資料設計
/*
1) 地區用 change 監聽
2) 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
3) 地區的篩選下拉需要加上『全部地區』option
4) 不需要有「清除資料」的按鈕
5) 預設資料為 3 筆（內容需依照目前提供的 JSON data）
6) 篩選後會顯示『搜尋資料為 ? 筆』
7) 描述欄位使用 textarea
8) 星級區間是 1-10 分
9) 金額、組數、星級的 type 為 Number
*/

// 導入 SCSS 入口檔案
import "./scss/all.scss";
// 導入本地圖片資源
import travel1 from "./assets/img/travel_1.png";
import travel2 from "./assets/img/travel_2.png";
import travel3 from "./assets/img/travel_3.png";
import travel4 from "./assets/img/travel_4.png";
import travel5 from "./assets/img/travel_5.png";
import travel6 from "./assets/img/travel_6.png";

// 初始化票券資料
let data = [
  {
    id: 0,
    name: "綠島自由行套裝行程",
    imgUrl: travel1,
    area: "台東",
    description:
      "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。",
    group: 8,
    price: 1280,
    rate: 8.6,
  },
  {
    id: 1,
    name: "清境高空觀景步道二日遊",
    imgUrl: travel2,
    area: "南投",
    description:
      "清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
    group: 12,
    price: 2580,
    rate: 8.2,
  },
  {
    id: 2,
    name: "南庄度假村露營車二日遊",
    imgUrl: travel3,
    area: "台中",
    description:
      "南庄雲水豪華露營車，擁有最愜意的露營體驗吧！一泊一食，輕鬆享受露營車樂趣。獨立衛浴與私人戶外露臺。入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。",
    group: 2,
    price: 1280,
    rate: 9.6,
  },
  {
    id: 3,
    name: "山林悠遊雙人套票",
    imgUrl: travel4,
    area: "台中",
    description:
      "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。\n（含雙龍瀑布入場券 x2）",
    group: 10,
    price: 880,
    rate: 8.6,
  },
  {
    id: 4,
    name: "漁樂碼頭釣魚體驗套票",
    imgUrl: travel5,
    area: "台中",
    description:
      "台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！",
    group: 5,
    price: 1280,
    rate: 8.6,
  },
  {
    id: 5,
    name: "熊森公園親子二日遊套票",
    imgUrl: travel6,
    area: "高雄",
    description:
      "來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！",
    group: 3,
    price: 2480,
    rate: 8.6,
  },
];

// 取得 DOM 變數
const ticketForm = document.querySelector(".ticket-form");
const ticketList = document.querySelector(".ticket-list");
const areaFilter = document.querySelector(".areaFilter");
const ticketCount = document.querySelector(".ticketCount");

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
renderTickets(data);
