/* Trang thêm / sửa sản phẩm (product-add.html, product-edit.html, product-edit-N.html), chỉ minh họa giao diện.
   Nội dung từng sản phẩm đã được viết sẵn trực tiếp trong từng file HTML (không đọc ID từ URL, không có mảng dữ liệu).
   File này chỉ lo phần tương tác trong form: xem trước ảnh bìa, đổi tab, cập nhật tình trạng kho, định dạng giá. */
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
  /* Tab Mô tả / Thông tin chi tiết; các mục hiển thị lại (tên, bảng thông tin, tình trạng còn hàng) luôn khớp với ô đang nhập. */
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
  /* Ô giá bán: tự thêm dấu chấm ngăn cách hàng nghìn khi gõ (10000 → 10.000, 1000000 → 1.000.000). */
  function fmtMoney(v) { return String(v == null ? '' : v).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  $('pf-price').addEventListener('input', function () { this.value = fmtMoney(this.value); });
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
  syncForm();
})();
