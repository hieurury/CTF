// Dữ liệu sản phẩm Món Ăn (có id riêng cho món ăn)
const productsFood = [
    { id: 'food_1', name: 'Bánh canh cua', votes: 0 },
    { id: 'food_2', name: 'Bánh xèo', votes: 0 },
    { id: 'food_3', name: 'Phở', votes: 0 },
    { id: 'food_4', name: 'Cơm tấm', votes: 0 },
    { id: 'food_5', name: 'Bánh ướt', votes: 0 },
    { id: 'food_6', name: 'Mì cay', votes: 0 },
];

// Dữ liệu sản phẩm Thức Uống (có id riêng cho thức uống)
const productsDrink = [
    { id: 'drink_1', name: 'Trà sữa', votes: 0 },
    { id: 'drink_2', name: 'Cà phê', votes: 0 },
    { id: 'drink_3', name: 'Nước mía', votes: 0 },
];

// Biến lưu trạng thái đã bỏ phiếu của mỗi sản phẩm
let votedFood = new Set();  // Lưu trạng thái đã bỏ phiếu cho món ăn
let votedDrink = new Set(); // Lưu trạng thái đã bỏ phiếu cho thức uống

// Hàm sắp xếp và hiển thị sản phẩm
function displayProducts() {
    const foodList = document.getElementById('product-list-food');
    const drinkList = document.getElementById('product-list-drink');
    const foodSelector = document.getElementById('product-selector-food');
    const drinkSelector = document.getElementById('product-selector-drink');

    // Sắp xếp lại danh sách sản phẩm theo số phiếu (từ cao đến thấp)
    productsFood.sort((a, b) => b.votes - a.votes);
    productsDrink.sort((a, b) => b.votes - a.votes);

    // Xóa nội dung cũ
    foodList.innerHTML = '';
    drinkList.innerHTML = '';
    foodSelector.innerHTML = '<option value="">Chọn món ăn</option>';
    drinkSelector.innerHTML = '<option value="">Chọn thức uống</option>';

    // Hiển thị sản phẩm món ăn
    productsFood.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.dataset.id = product.id;

        // Tạo cấu trúc cho mỗi món ăn
        div.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="vote-count" data-id="${product.id}">Số phiếu: ${product.votes}</span>
        `;
        foodList.appendChild(div);

        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        foodSelector.appendChild(option);
    });

    // Hiển thị sản phẩm thức uống
    productsDrink.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.dataset.id = product.id;

        // Tạo cấu trúc cho mỗi thức uống
        div.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="vote-count" data-id="${product.id}">Số phiếu: ${product.votes}</span>
        `;
        drinkList.appendChild(div);

        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        drinkSelector.appendChild(option);
    });
}

// Xử lý sự kiện bỏ phiếu cho món ăn
document.getElementById('vote-button-food').addEventListener('click', function() {
    const selectedFoodId = document.getElementById('product-selector-food').value;
    if (selectedFoodId) {
        if (votedFood.has(selectedFoodId)) {
            alert('Bạn đã bỏ phiếu cho món ăn này rồi!');
            return;
        }

        const product = productsFood.find(p => p.id === selectedFoodId);
        if (product) {
            product.votes++;

            // Cập nhật số phiếu cho món ăn
            const foodVoteCount = document.querySelector(`.vote-count[data-id='${product.id}']`);
            if (foodVoteCount) {
                foodVoteCount.textContent = `Số phiếu: ${product.votes}`;
            }

            // Thêm hiệu ứng "voted" vào sản phẩm
            const foodItem = document.querySelector(`.product-item[data-id='${product.id}']`);
            if (foodItem) {
                foodItem.classList.add('voted');
            }

            votedFood.add(selectedFoodId);
        }
    } else {
        alert('Vui lòng chọn món ăn để bỏ phiếu!');
    }
});

// Xử lý sự kiện bỏ phiếu cho thức uống
document.getElementById('vote-button-drink').addEventListener('click', function() {
    const selectedDrinkId = document.getElementById('product-selector-drink').value;
    if (selectedDrinkId) {
        if (votedDrink.has(selectedDrinkId)) {
            alert('Bạn đã bỏ phiếu cho thức uống này rồi!');
            return;
        }

        const product = productsDrink.find(p => p.id === selectedDrinkId);
        if (product) {
            product.votes++;

            // Cập nhật số phiếu cho thức uống
            const drinkVoteCount = document.querySelector(`.vote-count[data-id='${product.id}']`);
            if (drinkVoteCount) {
                drinkVoteCount.textContent = `Số phiếu: ${product.votes}`;
            }

            // Thêm hiệu ứng "voted" vào sản phẩm
            const drinkItem = document.querySelector(`.product-item[data-id='${product.id}']`);
            if (drinkItem) {
                drinkItem.classList.add('voted');
            }

            votedDrink.add(selectedDrinkId);
        }
    } else {
        alert('Vui lòng chọn thức uống để bỏ phiếu!');
    }
});

// Khởi tạo trang ban đầu
displayProducts();
