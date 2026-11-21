/* Trang quản trị (pages/admin/index.html), chỉ minh họa giao diện.
   Ô tìm sách, nút "Thống kê" và ô tìm khách hàng đều là form gửi về chính mục đó: bấm là trang nhảy lại mục ấy, không tìm hay tính thật.
   Khách hàng: "Chi tiết" / "Sửa" / "+ Thêm khách hàng" là liên kết sang các trang HTML tĩnh riêng (customer-detail*.html, customer-edit*.html, customer-add.html).
   Sản phẩm: "Sửa" / "+ Thêm sản phẩm" cũng là liên kết sang trang riêng (product-edit*.html, product-add.html).
   "Khóa / Mở khóa" và "Xóa" chỉ hiện thông báo (flash.js), không thay đổi dữ liệu. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  /* Top 5 khách hàng: bấm "Xem" để sổ ra các đơn của khách. */
  document.addEventListener('click', function (e) {
    var tg = e.target.closest('[data-top-toggle]');
    if (!tg) return;
    var open = tg.getAttribute('aria-expanded') !== 'true';
    tg.setAttribute('aria-expanded', String(open));
    tg.textContent = open ? 'Ẩn' : 'Xem';
    document.querySelectorAll('tr[data-group="' + tg.dataset.topToggle + '"]').forEach(function (r) { r.hidden = !open; });
  });
  /* Nút Xóa chỉ là giao diện: mở hộp xác nhận rồi hiện thông báo (flash.js). Không gỡ dòng nào khỏi bảng, không lưu gì. */
  var openBox = null;
  function closeBox() { if (openBox) { openBox.classList.remove('open'); openBox = null; } }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
  document.addEventListener('click', function (e) {
    var ask = e.target.closest('a[href^="#confirm-del-"]');
    if (ask) {
      var box = $(ask.getAttribute('href').slice(1));
      if (!box) return;
      e.preventDefault();                 // không đổi URL, nên không bị kẹt hộp thoại khi quay lại/tải lại
      closeBox(); box.classList.add('open'); openBox = box;
      return;
    }
    if (e.target.closest('.confirm-box a[href^="#deleted-"]')) { closeBox(); return; }   // Xóa: flash.js hiện thông báo
    if (e.target.closest('.confirm-box a[href="#products"], .confirm-box a[href="#customers"]')) { e.preventDefault(); closeBox(); return; }   // Hủy
    if (e.target.classList && e.target.classList.contains('confirm-box')) closeBox();                       // bấm nền mờ
  });
})();
