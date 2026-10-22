///////////////////////
// Testing Records
///////////////////////
/**
 * 測試資料：主線五中：Figma 6 筆旅遊票券
 *
 * 測試項目（皆通過）：
 * 六筆資料正常載入及顯示
 * 各地區票券數量能正確統計
 * 新增票券後，列表與 Donut Chart 能同步更新
 * 地區篩選器功能正常運作
 *
 * NOTE:
 * - 正式版使用 Axios 取得 API 資料。
 * - 新增票券僅更新目前頁面資料，重新整理後不會保留。
 * - 此檔案保留作為開發測試與學習紀錄。
 */

// 導入本地圖片資源
import travel1 from "./assets/img/travel_1.png";
import travel2 from "./assets/img/travel_2.png";
import travel3 from "./assets/img/travel_3.png";
import travel4 from "./assets/img/travel_4.png";
import travel5 from "./assets/img/travel_5.png";
import travel6 from "./assets/img/travel_6.png";

// 主線五: Figma Testing Data
// export: 讓其他 JavaScript 檔案可以使用這份資料。
export const testData = [
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
