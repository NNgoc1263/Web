/* Ô tìm kiếm trên thanh đầu trang (chạy ở mọi trang), chỉ minh họa giao diện: không kiểm tra định dạng, không tìm thật.
   - Bấm / gõ vào ô tìm nhanh thì bảng "Tìm kiếm nâng cao" hiện ra, lần nào cũng vậy (kể cả khi đang đứng sẵn trong ô).
   - Bấm ra ngoài hoặc nhấn Esc thì thu bảng lại.
   - Gửi form (HTML thuần, method GET) luôn mở trang kết quả search.html; trang mới tải xong thì các ô tự trống để tìm lượt tiếp theo.
   - "Xóa nội dung tìm kiếm" là nút reset của form nên không cần mã ở đây. */
(function () {
  document.querySelectorAll('form.search-wrap').forEach(function (form) {
    var panel = form.querySelector('.adv-panel');
    var quick = form.elements.q;
    if (!panel || !quick) return;
    var open = function () { panel.hidden = false; };
    ['focus', 'click', 'input'].forEach(function (type) { quick.addEventListener(type, open); });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) panel.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.hidden = true; });
  });
})();
