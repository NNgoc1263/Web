/* Trang danh mục (category.html): bấm một thể loại (?category=...) thì chỉ hiện sách của thể loại đó, kèm dòng "Tìm thấy N sách". */
(function () {
  /* Bỏ dấu + chữ thường để so sánh "Cổ tích" với "co tich". */
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
  }

  var category = (new URLSearchParams(location.search).get('category') || '').trim();
  var cat = norm(category);
  var list = document.querySelector('.products');
  var cards = list ? Array.prototype.slice.call(list.querySelectorAll(':scope > .card[data-cat]')) : [];

  // Thanh danh mục: đánh dấu thể loại đang xem
  document.querySelectorAll('.category-browser a').forEach(function (a) {
    var c = new URL(a.href, location.href).searchParams.get('category');
    if (cat && c && norm(c) === cat) a.setAttribute('aria-current', 'page');
  });

  if (!cat || !cards.length) return;

  /* Phân trang minh họa: cửa hàng có hàng nghìn đầu sách, mỗi trang thể loại hiện 4 sách.
     Số sách mỗi thể loại cộng lại bằng tổng sản phẩm ở trang quản trị (10.888). */
  var CAT_BOOKS = { 'tieu thuyet': 2412, 'co tich': 1356, 'trinh tham': 1680, 'truyen tranh': 2260, 'lich su': 1544, 'phat trien ban than': 1636 };
  var PER_PAGE = 4;

  cards.forEach(function (card) { card.hidden = norm(card.dataset.cat) !== cat; });

  var head = document.querySelector('#all-products h2');
  if (head) head.textContent = 'Thể loại: ' + category;

  var summary = document.createElement('p');
  summary.className = 'search-summary';
  summary.innerHTML = '<b></b><a></a>';
  summary.firstChild.textContent = 'Tìm thấy ' + (CAT_BOOKS[cat] || 0).toLocaleString('vi-VN') + ' sách';
  summary.lastChild.href = location.pathname.split('/').pop();
  summary.lastChild.textContent = 'Xóa bộ lọc';
  var holder = document.getElementById('all-products');
  if (holder) holder.parentNode.insertBefore(summary, holder.nextSibling);

  var groups = document.querySelector('.category-groups');
  if (groups) groups.hidden = true;
  var pager = document.querySelector('.container > .pagination');
  if (pager) {
    var last = pager.querySelector('.dots + a');
    pager.hidden = !(CAT_BOOKS[cat] && last);
    if (!pager.hidden) last.textContent = Math.ceil(CAT_BOOKS[cat] / PER_PAGE);
  }
})();
