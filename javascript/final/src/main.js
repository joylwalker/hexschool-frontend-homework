// 瀏覽器載入前台或後台
import "./scss/all.scss";

const page = document.body.dataset.page;

if (page === "customer") {
  import("./js/customer.js");
} else if (page === "admin") {
  import("./js/admin.js");
}
