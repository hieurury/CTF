// ==================* FOODS *====================//
// Hàm hiển thị Modal
console.log("test");
function showProductDetails(
  title,
  price,
  description,
  address,
  shopUrl,
  imageUrl
) {
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalAddress = document.getElementById("modalAddress");
  const modalImage = document.getElementById("modalImage");
  const buyNowButton = document.getElementById("buyNow");
  const productDetailsModal = document.getElementById("productDetails");

  // Cập nhật thông tin sản phẩm vào modal
  modalTitle.textContent = title;
  modalPrice.textContent = price;
  modalDescription.textContent = description;
  modalAddress.textContent = address;
  modalImage.src = imageUrl;

  // Đặt onclick cho nút 'Mua ngay tại ShopeeFood'
  buyNowButton.addEventListener("click", function () {
    window.open(shopUrl, "_blank");
  });

  // Mở modal chi tiết sản phẩm
  productDetailsModal.style.display = "flex";
}

// Đóng Modal
function closeProductDetails() {
  const productDetailsModal = document.getElementById("productDetails");
  productDetailsModal.style.display = "none";
}
