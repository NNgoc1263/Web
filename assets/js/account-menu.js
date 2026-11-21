document.addEventListener('click', function (e) {
  document.querySelectorAll('details.account-dropdown[open]').forEach(function (d) {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('details.account-dropdown[open]').forEach(function (d) { d.removeAttribute('open'); });
});