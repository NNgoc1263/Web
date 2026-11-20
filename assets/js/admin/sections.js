/* Sidebar admin chọn một khu vực tại một thời điểm trên dashboard tĩnh. */
(function () {
  var main = document.querySelector('.admin-main');
  if (!main) return;

  var sectionIds = ['customers', 'products', 'orders', 'stats'];
  var activeSection = '';
  var sectionStorageKey = 'bookly-admin-active-section';

  function rememberSection(sectionId) {
    try { window.sessionStorage.setItem(sectionStorageKey, sectionId); } catch (err) { /* storage may be unavailable */ }
  }

  function recalledSection() {
    try {
      var saved = window.sessionStorage.getItem(sectionStorageKey) || '';
      return sectionIds.indexOf(saved) !== -1 ? saved : '';
    } catch (err) {
      return '';
    }
  }

  function renderSection() {
    var hashId = window.location.hash.slice(1);
    if (sectionIds.indexOf(hashId) !== -1) {
      activeSection = hashId;
      rememberSection(activeSection);
    } else if (!hashId) {
      activeSection = '';
      rememberSection(activeSection);
    } else if (!activeSection) {
      activeSection = recalledSection();
    }

    var selected = activeSection ? document.getElementById(activeSection) : null;
    main.querySelectorAll(':scope > *').forEach(function (item) {
      var isSection = item.classList.contains('admin-box') || item.classList.contains('admin-split');
      if (isSection) {
        item.hidden = Boolean(activeSection) && item !== selected;
      } else if (item.matches('h1, p, .stats')) {
        item.hidden = Boolean(activeSection);
      }
    });

    document.querySelectorAll('.sidebar a').forEach(function (link) {
      var url = new URL(link.href, window.location.href);
      var linkId = url.hash.slice(1);
      var isOverview = url.pathname === window.location.pathname && !linkId && link.textContent.trim().indexOf('Tổng quan') !== -1;
      var isActive = activeSection ? linkId === activeSection : isOverview;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  document.querySelectorAll('.sidebar a[href*="index.html#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var sectionId = new URL(link.href, window.location.href).hash.slice(1);
      if (sectionIds.indexOf(sectionId) === -1) return;
      event.preventDefault();
      activeSection = sectionId;
      rememberSection(activeSection);
      window.history.pushState(null, '', link.href);
      renderSection();
      var section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderSection();
  window.addEventListener('hashchange', renderSection);
})();
