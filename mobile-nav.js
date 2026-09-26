(function(){
  var root = document.getElementById('mob-nav-root');
  if (!root) return;

  var isHome = document.body.dataset.page === 'homepage';
  var hiHref = isHome ? '#mob-hi' : 'index.html';
  var workHref = isHome ? '#mob-work' : 'index.html?section=work';

  root.outerHTML =
    '<nav class="mob-nav" aria-label="Main">' +
      '<img class="mob-avatar" src="assets/mobile/profile-photo.png" alt="Mihai Tocitu" />' +
      '<a class="mob-link" href="' + hiHref + '">Hi</a>' +
      '<a class="mob-link" href="' + workHref + '">Work</a>' +
      '<span class="mob-nav-sep">/</span>' +
      '<a class="mob-link" href="assets/Mihai-Tocitu-resume-EN.pdf" target="_blank" rel="noopener noreferrer">Resume</a>' +
      '<a href="https://www.linkedin.com/in/mihaitocitu/" target="_blank" rel="noopener noreferrer" style="margin-left:auto; flex-shrink:0; display:flex;">' +
        '<img class="mob-li-icon" style="margin:0;" src="assets/mobile/linkedin-icon.png" alt="LinkedIn" />' +
      '</a>' +
    '</nav>';
})();
