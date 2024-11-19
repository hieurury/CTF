//TODO: thanh điều hướng ở trang chủ
//*khai báo các đối tượng elements
const pageControlsBtn = document.querySelector("button.page-controls");
const controlsMenu = document.querySelector("ul.menu-list");
pageControlsBtn.addEventListener("click", function () {
  controlsMenu.classList.toggle("d-none");
});
