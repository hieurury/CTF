// ======================* LOCATE *==================//
// Rút gọn nội dung khi bấm vào tiêu đề
document.querySelectorAll("section h3").forEach((header) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === "none" ? "block" : "none";
    });
  });
  
  // Hàm để thay đổi trạng thái của mục lục
  function toggleMenu() {
    const tocList = document.querySelector(".mucluc-container-list");
    // Kiểm tra xem mục lục đang hiện/ẩn
    const isMenuVisible = tocList.classList.contains("show");
    // Chuyển trạng thái của mục lục
    tocList.classList.toggle("show", !isMenuVisible); // Hiện mục lục nếu chưa hiện
    tocList.classList.toggle("hide", isMenuVisible); // Ẩn mục lục nếu đang hiện
    // Nếu mục hiện/ẩn, sau 500ms
    if (isMenuVisible) {
      setTimeout(() => tocList.classList.remove("show", "hide"), 500);
    }
  }
  // JavaScript để chuyển đổi giữa các slide
  let slideIndex = 0; // Biến lưu trữ chỉ số slide hiện tại
  function moveSlide(direction) {
    const slides = document.querySelector(".slides"); // Lấy phần tử chứa các slide
    const totalSlides = slides.children.length; // Lấy tổng số slide
    // Thay đổi chỉ số slide theo hướng (trái hoặc phải)
    slideIndex = (slideIndex + direction + totalSlides) % totalSlides; // Duy trì giá trị trong phạm vi hợp lệ
    // Di chuyển slider đến vị trí tương ứng với chỉ số slide mới
    slides.style.transform = `translateX(-${slideIndex * 100}%)`; // Di chuyển slider theo trục X
  }
  