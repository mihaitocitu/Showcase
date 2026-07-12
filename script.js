// Nav scroll-to-section behavior
document.querySelectorAll('[data-scroll-to]').forEach(function (el) {
  el.addEventListener('click', function () {
    var targetId = el.getAttribute('data-scroll-to');
    var target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// External links (e.g. "Let's talk UX!" -> Calendly)
document.querySelectorAll('[data-external-link]').forEach(function (el) {
  el.addEventListener('click', function () {
    var url = el.getAttribute('data-external-link');
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
