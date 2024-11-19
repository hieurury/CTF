_ĐỒ ÁN NHẬP MÔN LẬP TRÌNH WEB_

1. **TỔNG QUAN**

   - Tên đồ án: Trang web giới thiệu ẩm thực Cần Thơ
   - Nội dung:
     - Thức ăn, nước uống
     - Đặc sản vùng
     - Địa điểm ăn uống nổi tiếng
     - map chỉ đường
     - _Thêm nếu có..._

2. **CHI TIẾT**

   - Trang web bao gồm:
     1. [Trang chủ](./src/resources/index.html);
     2. [Trang phản hồi](./src/resources/feedback.html);
     3. [Trang Món ăn](./src/resources/foods.html);
     4. [Trang đồ uống](./src/resources/drink.html);
     5. [Trang tài khoản](./src/resources/auth.html);
     6. [Trang sản phẩm yêu thích](./src/resources/me.html);
     7. [Trang địa điểm](./src/resources/location.html);
     8. _Thêm nếu có..._
   - Các tài nguyên:
     1. Nguồn ảnh được lấy từ internet hoặc dùng các công nghệ tạo ảnh
        - [Ảnh được sử dụng](./src/img)
     2. CSS được viết thuần hoặc dùng các công nghệ
        - [CSS thuần](./src/css/)
        - [Boostrap](./vender/boostrap-5/)
        - [Font chữ](./vender/fonts)
        - [Icons](./vender/icons)
     3. Javascript được viết thuần hoặc dùng các thư viện có sẵn
        - [Javascript thuần](./src/js/)
        - [Jquery](./vender/jquery/jquery-3.7.1.js)
     4. Dữ liệu người dùng được sử dụng thông qua localStorage hoặc json
        - [Dữ liệu json](./src/json/)

3. **CÁC CHỨC NĂNG**
   - Chức năng về form:
     1. Đăng kí []
        - validate thông tin đăng kí []
        - xác nhận nhập lại mật khẩu []
        - xác nhận người dùng đã tồn tại []
          1. cách 1: [file json](./src/json/users.json)
          2. cách 2: local storage.
     2. Đăng nhập []
        - validate thông tin đăng nhập []
        - xác minh tài khoản và mật khẩu từ dữ liệu tại []
          1. cách 1: [file json](./src/json/users.json)
          2. cách 2: local storage.
     3. Gửi mail cảm ơn phản hồi
        - validate form phản hồi []
        - sau khi người dùng gửi phản hồi, gửi mail cảm ơn lại vào mail của người dùng []
          - nếu thấy gửi mail khó quá thì chỉ cần hiện 1 modal cảm ơn là được []
     4. Thêm đối tượng yêu thích (thức ăn, nước uống, địa điểm,....)
        - bấm vào nút thích trên 1 đối tượng thì in đậm biểu tượng icon lên []
        - sau khi thích thì lưu đối tượng đó vào dữ liệu của người dùng hiện tại []
        - nếu chưa đăng nhập thì bắt người dùng đăng nhập để được thích []
        - những đối tượng đã được thích thì nút tim sẽ được hiện đỏ []
        - khi bỏ thích thì xoá đối tượng khỏi dữ liệu và đổi biểu tượng nút thích lại []
4. **Responsive**
   - Thêm Responsive cho Mobile
   - Thêm Responsive cho Tablet
   - Thêm Responsive cho PC
