/* Trang sửa / thêm khách hàng (pages/admin/customer-edit.html?id=KH001 để sửa, không có id để thêm mới), chỉ minh họa giao diện.
   Dữ liệu lấy từ data.js (CUSTOMERS, ORDERS). Không kiểm tra dữ liệu nhập: bỏ trống vẫn lưu "giả" và chuyển về index.html#customer-saved (flash.js hiện thông báo).
   Xóa tài khoản: chỉ cho bấm khi khách không còn đơn đang xử lý (chờ xác nhận / đã xác nhận / đang giao); bấm xác nhận chỉ quay về danh sách và hiện thông báo, không xóa thật. */
(function () {
  var D = BOOKLY;
  var $ = function (id) { return document.getElementById(id); };
  var id = (new URLSearchParams(location.search).get('id') || '').toUpperCase();
  var c = id ? D.CUSTOMERS[id] : null;
  var editing = !!c;

  if (id && !c) {
    $('ce-page').innerHTML = '<h1>Không tìm thấy khách hàng</h1><div class="ce-card"><p class="ce-note">Khách hàng <b>' + id.replace(/[<>&"]/g, '') + '</b> không tồn tại. Hãy quay lại danh sách và chọn lại.</p></div>';
    return;
  }

  /* ---------- Điền sẵn / chế độ thêm mới ---------- */
  if (editing) {
    document.title = 'BOOKLY - Sửa khách hàng ' + id;
    $('ce-title').textContent = c.name;
    $('ce-crumb').textContent = 'Quản lý người dùng / ' + id + ' / Chỉnh sửa';
    $('ce-sub').textContent = 'Cập nhật thông tin tài khoản · Mã người dùng ' + id;
    $('cf-submit').textContent = 'LƯU THAY ĐỔI';
    $('cf-name').value = c.name; $('cf-email').value = c.email; $('cf-phone').value = c.phone;
    $('cf-address').value = c.addr; $('cf-date').value = c.date;
    document.querySelector('input[name="cf-status"][value="' + (c.locked ? 'locked' : 'active') + '"]').checked = true;
    $('cf-login').hidden = true;                // sửa: không có ô mật khẩu cũ
    $('ce-step-acc').textContent = '2';
    $('cf-security').hidden = false;
    $('ce-summary').hidden = false;
    $('ce-layout').classList.remove('is-solo');   // sửa: có cột phải (tóm tắt, bảo mật, xóa)
    $('ce-back').setAttribute('href', 'customer-detail.html?id=' + id);
    $('ce-back').textContent = 'Về chi tiết khách hàng';
    $('ce-detail-link').setAttribute('href', 'customer-detail.html?id=' + id);
    var avatar = c.name.trim().split(/\s+/).pop().charAt(0).toUpperCase();
    $('ce-avatar').textContent = avatar;
  } else {
    $('ce-step-acc').textContent = '3';
  }

  /* ---------- Đơn của khách -> quyết định có cho xóa không ---------- */
  var OPEN = { wait: 1, confirm: 1, ship: 1 };
  if (editing) {
    var mine = Object.keys(D.ORDERS).filter(function (k) { return D.ORDERS[k].name === c.name; });
    var open = mine.filter(function (k) { return OPEN[D.ORDERS[k].status]; });
    $('ce-orders').textContent = mine.length;
    $('ce-open').textContent = open.length;
    $('ce-danger').hidden = false;
    var del = $('ce-del');
    if (open.length) {
      del.disabled = true;
      $('ce-danger-note').textContent = 'Chưa thể xóa vì khách còn đơn chưa giao xong (' + open.map(function (k) { return '#' + k; }).join(', ') + '). Hãy đợi đơn hoàn tất, hoặc dùng trạng thái "Đã khóa" để ngừng hoạt động.';
    } else {
      $('ce-danger-note').textContent = mine.length
        ? 'Các đơn của khách đã giao xong hoặc đã hủy nên có thể xóa. Đơn cũ vẫn được giữ trong lịch sử đơn hàng.'
        : 'Khách chưa có đơn hàng nào nên tài khoản sẽ bị xóa hẳn.';
    }
    var box = $('ce-confirm');
    del.addEventListener('click', function () {
      if (del.disabled) return;
      $('ce-confirm-text').innerHTML = 'Bạn có chắc muốn xóa <b>' + c.name + '</b> (' + id + ')? Thao tác này không thể hoàn tác.';
      box.classList.add('open');
    });
    $('ce-confirm-no').addEventListener('click', function () { box.classList.remove('open'); });
    box.addEventListener('click', function (e) { if (e.target === box) box.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
    $('ce-confirm-yes').addEventListener('click', function () {
      location.href = 'index.html#deleted-' + id;
    });
  }

  /* Không bắt buộc nhập gì: bỏ trống vẫn lưu được (chỉ minh họa giao diện, giống trang đăng nhập admin). */
})();
