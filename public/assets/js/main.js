(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Dropdowns: click to toggle (needed on touch / mobile), close on outside click
  document.querySelectorAll('.has-sub > .main-nav__link').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = !li.classList.contains('open');
      document.querySelectorAll('.has-sub.open').forEach(function (o) { if (o !== li) { o.classList.remove('open'); o.firstElementChild.setAttribute('aria-expanded', 'false'); } });
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) document.querySelectorAll('.has-sub.open').forEach(function (o) { o.classList.remove('open'); });
  });

  // Home carousel
  document.querySelectorAll('.carousel').forEach(function (c) {
    var track = c.querySelector('.carousel__track');
    var slides = c.querySelectorAll('.carousel__slide');
    var dots = c.querySelectorAll('.carousel__dots button');
    var i = 0, timer;
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-100 * i) + '%)';
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k !== i); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i); });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 7000); }
    c.querySelector('.carousel__nav--prev').addEventListener('click', function () { go(i - 1); auto(); });
    c.querySelector('.carousel__nav--next').addEventListener('click', function () { go(i + 1); auto(); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); auto(); }); });
    c.addEventListener('mouseenter', function () { clearInterval(timer); });
    c.addEventListener('mouseleave', auto);
    go(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto();
  });

  // Gallery sliders
  document.querySelectorAll('.gallery').forEach(function (g) {
    var track = g.querySelector('.gallery__track');
    function step(dir) {
      var item = track.querySelector('.gallery__item');
      track.scrollBy({ left: dir * (item ? item.offsetWidth + 16 : 400), behavior: 'smooth' });
    }
    g.querySelector('[data-dir="prev"]').addEventListener('click', function () { step(-1); });
    g.querySelector('[data-dir="next"]').addEventListener('click', function () { step(1); });
  });

  // Placeholder form handling — replace with a real form endpoint (HubSpot, Formspree, etc.)
  document.querySelectorAll('form[data-placeholder-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      f.classList.add('sent');
      f.querySelectorAll('input, select, textarea, button').forEach(function (el) { el.disabled = true; });
    });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
