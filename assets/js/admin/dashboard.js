/* Trang quản trị (pages/admin/index.html), chỉ minh họa giao diện: bấm "Sửa" thì điền sẵn thông tin của mục đó, bấm "Thêm" thì để trống.
   Ô tìm sách, nút "Thống kê" và ô tìm khách hàng đều là form gửi về chính mục đó: bấm là trang nhảy lại mục ấy, không tìm hay tính thật.
   Khách hàng: "Chi tiết" mở customer-detail.html, "Sửa" / "+ Thêm khách hàng" mở trang riêng customer-edit.html; "Khóa / Mở khóa" và "Xóa" chỉ hiện thông báo (flash.js), không thay đổi dữ liệu. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var coverImg = $('pf-cover-img'), coverEmpty = $('pf-cover-empty');
  function setCover(src, alt) {
    coverImg.hidden = !src; coverEmpty.hidden = !!src;
    $('pf-cover').classList.toggle('has-img', !!src);
    if (src) { coverImg.src = src; coverImg.alt = alt || 'Ảnh bìa sách'; }
  }
  /* Chọn ảnh từ máy: xem trước ngay trong khung ảnh bìa. */
  $('pf-file').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (f) setCover(URL.createObjectURL(f), 'Ảnh bìa mới');
  });
  /* Form sản phẩm giống trang chi tiết sách: tab Mô tả / Thông tin chi tiết, và các mục hiển thị lại
     (tên trong tiêu đề mô tả, bảng thông tin, tình trạng còn hàng) luôn khớp với ô đang nhập. */
  var form = $('product-edit-form');
  var tabs = Array.prototype.slice.call($('pf-more').querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { selectTab(t); }); });
  function syncForm() {
    var qty = Number($('pf-qty').value);
    $('pf-stock-text').textContent = qty > 0 ? 'Còn hàng (' + qty.toLocaleString('vi-VN') + ' cuốn)' : 'Hết hàng';
    $('pf-stock-text').classList.toggle('in-stock', qty > 0);
    form.querySelectorAll('[data-mirror]').forEach(function (el) {
      var src = $(el.dataset.mirror);
      var v = src ? (src.value !== undefined && src.tagName !== 'DD' && src.tagName !== 'TD' ? src.value : src.textContent) : '';
      el.textContent = v || '—';
    });
  }
  form.addEventListener('input', syncForm);
  form.addEventListener('change', syncForm);
  syncForm();
  /* Top 5 khách hàng: bấm "Xem" để sổ ra các đơn của khách. */
  document.addEventListener('click', function (e) {
    var tg = e.target.closest('[data-top-toggle]');
    if (!tg) return;
    var open = tg.getAttribute('aria-expanded') !== 'true';
    tg.setAttribute('aria-expanded', String(open));
    tg.textContent = open ? 'Ẩn' : 'Xem';
    document.querySelectorAll('tr[data-group="' + tg.dataset.topToggle + '"]').forEach(function (r) { r.hidden = !open; });
  });
  /* Giá, số lượng, số trang không được nhỏ hơn 0: chặn gõ dấu "-", và tự đưa về 0 nếu dán/nhập số âm. */
  ['pf-price', 'pf-qty', 'pf-pages'].forEach(function (id) {
    var inp = $(id);
    inp.addEventListener('keydown', function (e) {
      if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') e.preventDefault();
    });
    inp.addEventListener('input', function () {
      if (inp.value !== '' && Number(inp.value) < 0) inp.value = 0;
    });
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
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-edit="product"], a[data-add="product"]');
    if (!a) return;
    $('product-edit-form').reset();
    if (a.dataset.edit) {
      $('pf-title').textContent = 'Sửa sản phẩm ' + a.dataset.code;
      $('pf-code').value = a.dataset.code;
      $('pf-name').value = a.dataset.name;
      $('pf-intro').value = a.dataset.name;   // "Giới thiệu về ...": điền sẵn tên sách, vẫn sửa tự do
      $('pf-author').value = a.dataset.author;
      $('pf-pub').value = a.dataset.pub;
      $('pf-year').value = a.dataset.pubyear;
      $('pf-binding').value = a.dataset.binding;
      $('pf-pages').value = a.dataset.pages;
      $('pf-size').value = a.dataset.size;
      $('pf-lang').value = a.dataset.lang;
      $('pf-cat').value = a.dataset.cat;
      $('pf-price').value = a.dataset.price;
      $('pf-qty').value = a.dataset.qty;
      $('pf-status').value = a.dataset.status;
      $('pf-hl').value = a.dataset.hl;
      $('pf-desc').value = a.dataset.desc;
      $('pf-desc2').value = a.dataset.desc2;
      $('pf-fit').value = a.dataset.fit;
      setCover(a.dataset.img, 'Bìa sách ' + a.dataset.name);   // Sửa: hiện ảnh bìa hiện tại của sách đó
    } else {
      $('pf-title').textContent = 'Thêm sản phẩm';
      setCover('');                      // Thêm mới: khung ảnh bìa để trống
    }
    selectTab(tabs[0]);                  // luôn mở lại ở tab "Mô tả sách"
    syncForm();
  });
})();
