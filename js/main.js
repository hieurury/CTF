// ========================* MAIN *=================//
//TODO: thực hiện tim một sản phẩm
const emoteContainers = document.querySelectorAll(".emote-wrapper");
//hàm đệ quy giúp tìm phần tử cha
function findParentContainer(childElement) {
  const parent = childElement.parentElement;
  if (parent) {
    if (parent.nodeName == "SECTION") return parent;
    return findParentContainer(parent);
  }
}
// lập qua từng phần tử con(từng nút biểu cảm)
emoteContainers.forEach((emote) => {
  emote.onclick = function (e) {
    const emoteOn = emote.querySelector(".emote-on");
    const emoteOff = emote.querySelector(".emote-off");
    emoteOn.classList.toggle("d-none");
    emoteOff.classList.toggle("d-none");

    //TODO: lưu vào localStorage
    //lấy phần tử cha là khung chứa
    const parentEmote = findParentContainer(emote);
    //lấy link ảnh
    const linkImg = parentEmote.querySelector("img").src;
    //lấy tên sản phẩm
    const nameProduct = parentEmote.querySelector(".content-title").innerText;
    //lấy thời gian
    const date = new Date();
    const dayOfWeek = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() +1;
    const year = date.getFullYear();

    const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const finalTime = `${daysOfWeek[dayOfWeek]} Ngày ${day}/${month}/${year}`;
    //kiểm tra dữ liệu từ localStorage
    const dataLocalStorage = window.localStorage.getItem("favoriteProducts");
    if (dataLocalStorage) {
      //nếu đã có dữ liệu trong localStorage thì thêm vào
      const data = JSON.parse(dataLocalStorage);
      const indexProduct = data.findIndex(
        (product) => nameProduct == product.name
      );
      if (indexProduct != -1) {
        //nếu đã có đối tượng bên trong localStorage thì xoá đi
        data.splice(indexProduct, 1);
      } else {
        data.push({
          name: nameProduct,
          img: linkImg,
          time: finalTime,
        });
      }
      window.localStorage.setItem("favoriteProducts", JSON.stringify(data));
      console.log(data);
    } else {
      //nếu localStorage chưa có gì thì khởi tạo
      const favoriteProducts = [];
      favoriteProducts.push({
        name: nameProduct,
        img: linkImg,
        time: finalTime,
      });
      window.localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
      );
      console.log(favoriteProducts);
    }
  };
});

//TODO: load các đối tượng đã được yêu thích
const dataLocalStorage = JSON.parse(
  window.localStorage.getItem("favoriteProducts")
);
emoteContainers.forEach((emote) => {
  //tìm thẻ section cha của biểu cảm hiện tại
  const emoteParent = findParentContainer(emote);
  //lấy tên của từng sản phẩm
  const nameProduct = emoteParent.querySelector(".content-title").innerText;
  //tìm sản phẩm đó có trong local storage không
  const isStorage = dataLocalStorage.find(
    (product) => product.name === nameProduct
  );
  //nếu sản phẩm có trong localStorage thì hiện tim lên
  if (isStorage) {
    const emoteOn = emote.querySelector(".emote-on");
    const emoteOff = emote.querySelector(".emote-off");

    if (emoteOn.classList.contains("d-none")) {
      emoteOn.classList.remove("d-none");
      emoteOff.classList.add("d-none");
    }
  }
});
console.log(dataLocalStorage);

//TODO: phần partials (header và footer)
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("ul.menu");
//* xử lí sự kiện
menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("menu-header-display");
  console.log(menuList.classList);
});




