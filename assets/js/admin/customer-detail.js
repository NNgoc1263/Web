/* Trang chi tiết khách hàng (pages/admin/customer-detail.html?id=KH001), chỉ xem.
   Dữ liệu lấy từ data.js: CUSTOMERS (thông tin) và ORDERS (đơn của khách, ghép theo tên).
   Mỗi đơn có nút "Xem chi tiết" mở order-detail.html; nút "Chỉnh sửa" mở trang customer-edit.html. */
(function () {
  var D = BOOKLY;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var money = function (n) { return n.toLocaleString('vi-VN') + ' ₫'; };
  var root = document.getElementById('cd-page');

  var id = (new URLSearchParams(location.search).get('id') || '').toUpperCase();
  var c = D.CUSTOMERS[id];
  if (!c) {
    root.innerHTML = '<h1>Không tìm thấy khách hàng</h1><div class="cdp-card"><p class="cdp-empty">Khách hàng <b>' + esc(id || '(trống)') + '</b> không tồn tại. Hãy quay lại danh sách và chọn lại.</p></div>';
    return;
  }
  document.title = 'BOOKLY - Chi tiết khách hàng ' + id;

  /* Đơn của khách (mới nhất trước), tổng chi tiêu không tính đơn đã hủy */
  var list = Object.keys(D.ORDERS).filter(function (k) { return D.ORDERS[k].name === c.name; })
    .sort(function (a, b) { return D.dayKey(D.ORDERS[b].date) - D.dayKey(D.ORDERS[a].date) || (a < b ? 1 : -1); });
  var spent = 0;
  list.forEach(function (k) { if (D.ORDERS[k].status !== 'cancel') spent += D.orderTotal(D.ORDERS[k]); });

  var pill = c.locked ? '<span class="status status-cancel">Đã khóa</span>' : '<span class="status status-done">Đang hoạt động</span>';
  var field = function (label, value) { return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>'; };

  var orders = list.length ? '<div class="cdp-orders">' + list.map(function (k) {
    var o = D.ORDERS[k];
    return '<div class="cdp-order"><div><b>#' + k + '</b><small>' + o.date + '</small></div>' +
      '<div><span class="status status-' + o.status + '">' + D.STATUS[o.status] + '</span></div>' +
      '<div class="cdp-money">' + money(D.orderTotal(o)) + '</div>' +
      '<a class="admin-btn" href="order-detail.html?id=' + k + '&from=customer&cid=' + id + '">Xem chi tiết</a></div>';
  }).join('') + '</div>' : '<p class="cdp-empty">Khách hàng chưa có đơn hàng nào.</p>';

  root.innerHTML =
    '<header class="ce-head"><div class="ce-avatar" aria-hidden="true">' + esc(c.name.trim().split(/\s+/).pop().charAt(0).toUpperCase()) + '</div>' +
      '<div class="ce-head-text"><p class="ce-crumb">Quản lý người dùng / ' + id + '</p><h1>' + esc(c.name) + '</h1><p class="ce-sub">Chi tiết người dùng · Thành viên từ ' + c.date + '</p></div></header>' +
    '<div class="cdp-card">' +
      '<div class="cdp-sec"><h3>1. Thông tin cá nhân</h3><dl class="cdp-grid">' +
        field('Họ và tên', esc(c.name)) + field('Email', esc(c.email)) + field('Số điện thoại', c.phone) +
        '<div style="grid-column:1/-1"><dt>Địa chỉ</dt><dd>' + esc(c.addr) + '</dd></div></dl></div>' +
      '<div class="cdp-sec"><h3>2. Thông tin tài khoản</h3><dl class="cdp-grid">' +
        field('Tên đăng nhập', esc(c.email)) + field('Trạng thái', pill) + field('Ngày đăng ký', c.date) + field('Vai trò', 'Khách hàng') + '</dl></div>' +
      '<div class="cdp-sec"><h3>3. Thống kê mua hàng</h3><div class="cdp-stats">' +
        '<div class="cdp-stat"><span>Tổng đơn hàng</span><b>' + list.length + '</b></div>' +
        '<div class="cdp-stat"><span>Tổng chi tiêu (không tính đơn hủy)</span><b>' + money(spent) + '</b></div></div></div>' +
      '<div class="cdp-sec"><h3>4. Lịch sử đơn hàng</h3>' + orders + '</div>' +
    '</div>' +
    '<div class="cdp-actions"><a class="btn-outline" href="index.html#customers">← Quay lại</a>' +
    '<a class="btn" href="customer-edit.html?id=' + id + '">Chỉnh sửa</a></div>';
})();
