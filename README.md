# BOOKLY – website bán sách (HTML/CSS/JS thuần)

Mở `index.html` để bắt đầu.

## Cấu trúc thư mục
```
index.html            Trang chủ cho khách (điểm vào)
pages/
  guest/              Trang cho khách chưa đăng nhập (danh mục, sách, liên hệ, đăng nhập/đăng ký)
  user/               Trang cho người dùng đã đăng nhập (trang chủ, giỏ hàng, thanh toán, đơn hàng, thông báo...)
  admin/              Khu quản trị: login.html, index.html (bảng điều khiển), order-detail.html
assets/
  css/                base.css (dùng chung) · site.css (website) · admin.css (quản trị)
  js/                 flash, pagination, search (ô tìm kiếm đầu trang), category (lọc theo thể loại), stepper, product (website)
  js/admin/           auth (đăng nhập), data (dữ liệu minh họa đơn hàng), dashboard (form sản phẩm/khách hàng, chi tiết khách, tìm/thống kê giả lập), tabs (tab trạng thái đơn), order-detail
  images/             Ảnh sách, logo, banner
```

## Quản trị
Vào `pages/admin/login.html` và bấm đăng nhập (chế độ minh họa: không cần nhập gì cũng vào được; muốn bắt buộc tài khoản thì sửa lại phần `submit` trong `assets/js/admin/auth.js`).

## Sản phẩm
- 24 sách đang bán trên website (mỗi thể loại 4 sách): trang chi tiết là `pages/{guest,user}/product.html` (SP001) và `product-N.html` (SP00N / SP0NN). `product-9` không có vì SP009 (Truyện cổ Grimm) chưa đăng bán, chỉ xuất hiện ở trang quản trị. Ảnh bìa: `assets/images/product-itemN.png`.
- Trang danh mục: bấm một thể loại để xem 4 sách của thể loại đó. Phân trang ở trang danh mục khi chỉ chọn thể loại vẫn là minh họa (số trang tính theo tổng 10.888 sản phẩm). Tìm kiếm xem mục "Cập nhật đợt 6"; bấm số trang chỉ đổi nút sáng và cuộn về đầu trang, không đổi nội dung.
- Trang quản trị chỉ liệt kê 8 sản phẩm đại diện để test (SP001, 004, 006: đã có đơn nên bấm Xóa chỉ ẩn; SP009: chưa đăng bán; SP010, 013, 016, 019: đang bán, chưa có đơn nên xóa được). Phân trang chỉ là giao diện (10.888 sản phẩm / 8 mỗi trang).
- Form sản phẩm ở trang quản trị có đủ các trường như trang chi tiết bên web: tên, thể loại, mã, tác giả, nhà xuất bản, năm xuất bản, hình thức, số trang, kích thước, ngôn ngữ, giá, số lượng (hiện thành "Còn hàng (N cuốn)"), trạng thái, điểm nổi bật, mô tả (2 đoạn), "Phù hợp với". Sửa nội dung một sách thì sửa ở cả hai nơi: `data-*` của nút "Sửa" trong `pages/admin/index.html` và `pages/{guest,user}/product-N.html`.
- Ô tìm sách, nút "Thống kê" (Top 5 khách hàng) và ô tìm khách hàng ở trang quản trị đều chỉ giả lập: bấm là trang nhảy lại đúng mục đó, không tìm/tính thật. Bấm "Xem" ở từng khách trong Top 5 để xem các đơn, bấm tiếp vào đơn để mở chi tiết.
- Chi tiết đơn hàng (admin): admin xử lý đơn ngay trong trang (Chờ xác nhận → Xác nhận / Hủy; Đã xác nhận → Giao hàng / Hủy; Đang giao → Đã giao).  Trạng thái chỉ đổi trên trang đó (minh họa), tải lại sẽ về ban đầu.
- Trang chi tiết sách (web): khung thông tin nhanh chỉ giữ mã, nhà xuất bản, năm xuất bản, tình trạng; hình thức, số trang, kích thước, ngôn ngữ nằm ở tab "Thông tin chi tiết" (tách đúng như các ô nhập bên admin).

- Form thêm/sửa sản phẩm (admin; cột Thao tác dùng icon bút chì và thùng rác) có bố cục giống trang chi tiết sách trên web: ảnh bìa bên trái, thông tin bên phải, tab "Mô tả sách" / "Thông tin chi tiết"; mỗi mục là một ô nhập. Các id ô nhập (`pf-*`) giữ nguyên nên `dashboard.js` vẫn điền dữ liệu như cũ.
- Lịch sử mua hàng: cột chia đều, link "Xem" có mũi tên.

- Quản lý khách hàng (admin) làm theo mẫu: 3 ô tổng quan (Tổng người dùng 1.248 = Hoạt động 1.236 + Đã khóa 12, khớp số "Khách hàng 1.248" ở đầu trang và 156 trang × 8 khách), bảng 8 khách đại diện (KH001–KH008) gồm Thông tin người dùng (tên, mã · email, các nút Chi tiết / Sửa / Khóa hoặc Mở khóa / Xóa), Ngày đăng ký, Đơn hàng, Trạng thái (Đang hoạt động / Đã khóa). Số đơn của mỗi khách bằng số đơn của khách đó trong `assets/js/admin/data.js` (kể cả đơn đã hủy); khung "Chi tiết" liệt kê đúng các đơn ấy, bấm "Xem" để mở chi tiết đơn.
- Thao tác khách hàng chỉ là giao diện minh họa (không đổi dữ liệu): Khóa / Mở khóa hiện thông báo; Xóa giống sản phẩm: khách đã có đơn hàng thì không xóa được (thông báo nhắc dùng Khóa), khách chưa có đơn (KH007) thì hiện hộp xác nhận rồi thông báo "Đã xóa". Form "Thêm người dùng" / "Sửa người dùng" có Họ và tên, Email, Số điện thoại, Địa chỉ, Mật khẩu, Xác nhận mật khẩu, Trạng thái, Ngày đăng ký (chỉ xem; tự ghi nhận khi tạo tài khoản). Sửa một khách thì sửa ở cả `data-*` của nút "Sửa" lẫn khung chi tiết cùng khách trong `pages/admin/index.html`.
- Chi tiết khách hàng là trang riêng `pages/admin/customer-detail.html?id=KH001` (thông tin cá nhân, tài khoản, thống kê mua hàng, lịch sử đơn có nút "Xem chi tiết" mở `order-detail.html`; nút quay lại của đơn trở về đúng khách). Dữ liệu 8 khách nằm ở `CUSTOMERS` trong `assets/js/admin/data.js`; nút "Chỉnh sửa" mở `index.html?edit=KH001` (form sửa điền sẵn). Sửa thông tin khách thì sửa cả `data.js` và `data-*` của nút "Sửa" trong `pages/admin/index.html`.
- Mật khẩu: form "Sửa người dùng" không còn ô mật khẩu (admin không xem, không sửa trực tiếp mật khẩu cũ); thay bằng khối "Bảo mật tài khoản" để đặt lại mật khẩu mới và tick "Yêu cầu người dùng đổi mật khẩu ở lần đăng nhập tiếp theo". Form "Thêm người dùng" vẫn có Mật khẩu / Xác nhận mật khẩu.

## Cập nhật quản trị (đợt mới)
- Bỏ "Giới tính" ở khách hàng (đăng ký không nhập giới tính): `data.js`, chi tiết khách và form sửa đều không còn.
- Sửa / thêm khách hàng là trang riêng `pages/admin/customer-edit.html?id=KH001` (không có `id` = thêm mới), bố cục 2 cột: thông tin cá nhân, tài khoản (hoạt động / khóa), cột phải gồm tóm tắt, đặt lại mật khẩu và xóa tài khoản. Có kiểm tra email, số điện thoại, mật khẩu. Logic ở `assets/js/admin/customer-edit.js`.
- Quy tắc xóa khách: chỉ xóa được khi khách KHÔNG còn đơn đang xử lý (chờ xác nhận, đã xác nhận, đang giao). Khách chỉ có đơn đã giao / đã hủy hoặc chưa có đơn (KH007, KH008) thì xóa được (hộp xác nhận rồi hiện thông báo; chỉ là giao diện, dòng vẫn còn trong bảng). Khách còn đơn chưa xong (KH001–KH006) thì hiện thông báo kèm mã đơn, gợi ý dùng Khóa.
- Quản lý sản phẩm hiển thị liên tục SP001 → SP008 (trước đây nhảy SP001, 004, 006, 009...). Cả 8 sách đều đã có đơn nên bấm Xóa chỉ ẩn khỏi website.
- Top 5 khách hàng và Quản lý đơn hàng: cột "Chi tiết" nằm cuối cùng, nút "Xem" không còn khung mà là chữ kèm mũi tên dài (class `.view-link`). 

## Cập nhật đợt 2
- Mũi tên "Xem" chỉ còn dấu `>` (xoay xuống khi sổ danh sách đơn ở Top 5).
- Trang `customer-edit.html`: bỏ nhãn trạng thái trên đầu (đã có ô chọn Trạng thái bên dưới); trang thêm khách dùng bố cục rộng hết cỡ (thẻ 1 trên, thẻ 2 và 3 cạnh nhau). Trang `customer-detail.html` dùng cùng kiểu banner đầu trang, cũng không còn nhãn trạng thái (đã có mục "Thông tin tài khoản").
- Quản lý khách hàng: 3 ô tổng quan có khung riêng, icon, màu và ghi chú tỷ lệ.
- Quản lý sản phẩm: SP001 → SP010. SP001–SP008 đã có đơn (xóa chỉ ẩn). SP009 (chưa đăng bán) và SP010 (chưa có đơn) xóa hẳn được, có hộp "Xác nhận xóa hẳn sản phẩm?" rồi hiện thông báo; chỉ là giao diện, dòng vẫn còn trong bảng. Phân trang đổi thành 10 sản phẩm/trang (1089 trang).

## Cập nhật đợt 3
- Thêm / sửa khách hàng: không kiểm tra dữ liệu, bỏ trống vẫn lưu "giả" (như trang đăng nhập admin), bỏ dấu * bắt buộc.
- Quản lý đơn hàng: xem mục "Cập nhật đợt 4" bên dưới (đã đổi sang dạng thẻ).

## Cập nhật đợt 4
- Quản lý đơn hàng (admin) chỉ là giao diện, không có code lọc/tìm thật. Mỗi đơn là một thẻ nằm trên một dòng (mã đơn, khách · ngày đặt, trạng thái, địa chỉ giao hàng đầy đủ, số điện thoại, số sản phẩm, tổng tiền, nút Xem chi tiết / thao tác theo trạng thái). Thao tác (Xác nhận đơn, Giao hàng, Đã giao, Hủy đơn) chỉ hiện thông báo (flash.js); đơn đã giao / đã hủy chỉ còn Xem chi tiết.
- Trang 1 hiển thị 6 đơn mới nhất (DH1030 → DH1025) lấy đúng từ `data.js` (cùng mã, ngày, địa chỉ, số sản phẩm, tổng tiền với trang chi tiết đơn và website); phân trang 15 trang (86 đơn / 6) chỉ là giao diện, dùng chung `pagination.js`. Các trạng thái: Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy (giống website).
- 6 tab trạng thái xếp một hàng, mỗi ô có icon, số đơn và tên (86 = 9 + 14 + 11 + 47 + 5, khớp mục Thống kê); bấm tab chỉ đổi ô đang chọn (`tabs.js`).
- Bộ lọc gồm tìm kiếm, từ ngày, đến ngày, Tỉnh/Thành phố giao hàng (đủ 63 tỉnh/thành, không còn quận/huyện), sắp xếp và nút Lọc; bấm Lọc chỉ tải lại về đầu mục đơn hàng, không lọc thật, không có nút Đặt lại.
- Icon của mục này là icon dạng mặt nạ (`.oi-*` trong `admin.css`), HTML chỉ cần `<i class="oi oi-pin"></i>`. Đã gỡ khoảng 380 dòng CSS cũ của bảng đơn hàng bị ghi chồng nhiều lần.

## Cập nhật đợt 5
- Thống kê: 4 khối có màu riêng và icon. Doanh thu 6 tháng (cột tháng 10 đậm màu), Đơn hàng theo trạng thái (tháng 10/2026, cùng bảng màu với tab trạng thái; 9 + 14 + 11 + 47 + 5 = 86 khớp ô "Đơn hàng" ở đầu trang, độ dài thanh theo tỉ lệ so với 47), Top 5 khách hàng và Top 5 sách có huy hiệu thứ hạng vàng / bạc / đồng.
- Top 5 khách hàng: từ 01/09/2026 đến 30/09/2026, chỉ tính đơn đã giao, xếp giảm dần theo tổng tiền (1.322.000 > 1.037.000 > 780.000 > 635.000 > 513.000), khớp `data.js`; bấm "Xem" để mở các đơn của khách, mỗi đơn mở được trang chi tiết đơn.
- Top 5 sách: xếp giảm dần theo doanh thu (số lượng × giá, giá khớp website): Lược sử về loài người 5.535.000 > Tội Ác Và Hình Phạt 5.104.000 > Sherlock Holmes 4.465.000 > Nhà Giả Kim 4.352.000 > Doraemon 1.980.000.
- Ô "Sản phẩm" ở đầu trang ghi 10.888 (đúng định dạng và số liệu với trang danh mục).
- Mọi nút Xóa (sản phẩm, khách hàng, ở cả trang sửa khách) chỉ là giao diện: hiện hộp xác nhận và thông báo, không gỡ dòng nào, không lưu gì vào trình duyệt. Chỉ còn `sessionStorage` cho trạng thái đăng nhập admin.
- Dọn code: gom CSS thống kê về một khối duy nhất (gỡ khoảng 350 dòng ghi chồng nhau) và bỏ 16 class CSS không còn dùng; bỏ khối `{ }` thừa và hàm gỡ dòng trong `dashboard.js`.

## Cập nhật đợt 6
- Tìm kiếm chỉ là giao diện: ô tìm nhanh và "Tìm kiếm nâng cao" gửi form GET bằng HTML thuần. Mọi nội dung (kể cả chữ trong ô năm, giá từ, giá đến, không còn báo "Please enter a number") đều mở đúng một trang kết quả `search.html` (guest / user), luôn hiện cùng 24 sách và một dòng "Tìm thấy 24 sách". Không có tìm thật.
- Tìm xong, trang kết quả tải mới nên mọi ô tự trống để tìm lượt tiếp theo. Nút "Xóa nội dung tìm kiếm" là nút reset của form.
- Bảng "Tìm kiếm nâng cao" hiện mỗi khi bấm hoặc gõ vào ô tìm nhanh (kể cả khi con trỏ đang đứng sẵn trong ô); chỉ thu lại khi bấm ra ngoài hoặc nhấn Esc. Bảng là `div.adv-panel` có thuộc tính `hidden`, không còn `details/summary`.
- Lỗi hai dòng "Tìm thấy ..." và tiêu đề "Thể loại: ..." ở trang kết quả đã hết: bộ lọc thể loại tách ra `assets/js/category.js`, chỉ nạp ở `category.html`.
- Dọn code: `search.js` còn khoảng 15 dòng (bỏ kiểm tra giá, điền lại ô, tự dựng URL), gỡ các rule CSS `.adv-toggle` / `.adv-search` không còn dùng.
