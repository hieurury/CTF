// Load danh sách yêu thích từ localStorage
const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];

const favoriteContainer = document.getElementById('favorite-products');

// Kiểm tra nếu danh sách yêu thích rỗng và hiển thị thông báo
if (favoriteProducts.length === 0) {
    const noFavoritesMessage = document.createElement('div');
    noFavoritesMessage.classList.add('no-favorites');
    noFavoritesMessage.innerHTML = "Không có yêu thích gì cả";
    favoriteContainer.appendChild(noFavoritesMessage);
} else {
    // Hiển thị các sản phẩm yêu thích
    favoriteProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('favorite-item');

        productItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-time">${product.time}</div>
            <button class="remove-btn">
                <i class="bi bi-trash"></i> Bỏ thích
            </button>
        `;

        // Thêm sự kiện cho nút Bỏ thích
        productItem.querySelector('.remove-btn').addEventListener('click', () => {
            // Xóa sản phẩm khỏi danh sách yêu thích
            const index = favoriteProducts.findIndex(p => p.name === product.name);
            if (index !== -1) {
                favoriteProducts.splice(index, 1);
                localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));

                // Cập nhật lại danh sách hiển thị
                favoriteContainer.removeChild(productItem);

                // Nếu không còn sản phẩm yêu thích, hiển thị thông báo
                if (favoriteProducts.length === 0) {
                    const noFavoritesMessage = document.createElement('div');
                    noFavoritesMessage.classList.add('no-favorites');
                    noFavoritesMessage.innerHTML = "Hiện tại không có sản phẩm nào trong danh sách yêu thích!";
                    favoriteContainer.appendChild(noFavoritesMessage);
                }
            }
        });

        favoriteContainer.appendChild(productItem);
    });
}
