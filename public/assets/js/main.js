(function () {
  // Tells the page head this script is running, so animated content isn't left hidden
  window.mainReady = true;

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
  document.querySelectorAll('.has-sub > button.main-nav__link, .has-sub .main-nav__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest('.has-sub');
      var open = !li.classList.contains('open');
      document.querySelectorAll('.has-sub.open').forEach(function (o) { if (o !== li) { o.classList.remove('open'); o.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false'); } });
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
    var i = 0, timer, paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-100 * i) + '%)';
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k !== i); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i); });
    }
    function auto() { clearInterval(timer); if (!paused) timer = setInterval(function () { go(i + 1); }, 7000); }
    c.querySelector('.carousel__nav--prev').addEventListener('click', function () { go(i - 1); auto(); });
    c.querySelector('.carousel__nav--next').addEventListener('click', function () { go(i + 1); auto(); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); auto(); }); });
    // Hold the slideshow while it's hovered or has keyboard focus
    c.addEventListener('mouseenter', function () { clearInterval(timer); });
    c.addEventListener('mouseleave', function () { if (!c.contains(document.activeElement)) auto(); });
    c.addEventListener('focusin', function () { clearInterval(timer); });
    c.addEventListener('focusout', function (e) { if (!c.contains(e.relatedTarget)) auto(); });
    go(0);
    auto();
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

  // Review slideshow: starts when scrolled into view, auto-advances, always slides forward. A copy of the
  // first review sits at the end; after sliding onto it the track jumps back to the real first review.
  document.querySelectorAll('.reviews').forEach(function (r) {
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var track = r.querySelector('.reviews__track');
    var real = Array.prototype.slice.call(track.children);
    var n = real.length;
    var copy = real[0].cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
    var slides = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(r.querySelectorAll('.reviews__dots button'));
    var i = 0, busy = false, timer = null, paused = false;
    slides.forEach(function (s) { s.classList.remove('is-active'); });
    function place(k, animate) {
      if (!animate) track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-100 * k) + '%)';
      if (!animate) { void track.offsetWidth; track.style.transition = ''; }
    }
    function activate(k) {
      slides.forEach(function (s, j) {
        s.classList.toggle('is-active', j === k);
        if (j < n) s.setAttribute('aria-hidden', j === k % n ? 'false' : 'true');
      });
      dots.forEach(function (d, j) { if (j === k % n) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }
    function go(k) {
      if (busy || k === i) return;
      if (k < 0) { place(n, false); activate(n); i = n; k = n - 1; }
      busy = true;
      if (!still) r.classList.add('is-moving');
      place(k, !still);
      setTimeout(function () {
        r.classList.remove('is-moving');
        if (k === n) { place(0, false); k = 0; }
        i = k; activate(k); busy = false;
      }, still ? 0 : 900);
    }
    function auto() { clearInterval(timer); if (!paused) timer = setInterval(function () { go(i + 1); }, 7000); }
    r.querySelector('[data-dir="prev"]').addEventListener('click', function () { go(i - 1); auto(); });
    r.querySelector('[data-dir="next"]').addEventListener('click', function () { go(i + 1); auto(); });
    dots.forEach(function (d, j) { d.addEventListener('click', function () { go(j); auto(); }); });
    r.addEventListener('mouseenter', function () { paused = true; clearInterval(timer); });
    r.addEventListener('mouseleave', function () { paused = false; auto(); });
    var started = false;
    function start() { if (started) return; started = true; activate(0); auto(); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { start(); io.disconnect(); } }, { threshold: .35 });
      io.observe(r);
    } else start();
  });

  // Cabinet solutions slider: loops endlessly. A copy of the cards sits on each side of the originals;
  // once scrolling settles outside the middle set, the track jumps one set back to the same-looking spot.
  document.querySelectorAll('.solutions').forEach(function (s) {
    var track = s.querySelector('.solutions__track');
    var originals = Array.prototype.slice.call(track.children);
    var n = originals.length;
    function copy(card) { var c = card.cloneNode(true); c.setAttribute('aria-hidden', 'true'); return c; }
    originals.forEach(function (card) { track.appendChild(copy(card)); });
    originals.slice().reverse().forEach(function (card) { track.insertBefore(copy(card), track.firstChild); });
    function setWidth() { return track.children[2 * n].offsetLeft - track.children[n].offsetLeft; }
    function jumpTo(left) {
      track.style.scrollSnapType = 'none';
      track.scrollLeft = left;
      track.style.scrollSnapType = '';
    }
    jumpTo(setWidth());
    var settle;
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var w = setWidth();
        if (track.scrollLeft < w * .5) jumpTo(track.scrollLeft + w);
        else if (track.scrollLeft >= w * 1.5) jumpTo(track.scrollLeft - w);
      }, 140);
    }, { passive: true });
    window.addEventListener('resize', function () { jumpTo(setWidth() + (track.scrollLeft % setWidth())); });
    function step(dir) {
      var card = track.children[n];
      track.scrollBy({ left: dir * (card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 20)), behavior: 'smooth' });
    }
    s.querySelector('[data-dir="prev"]').addEventListener('click', function () { step(-1); });
    s.querySelector('[data-dir="next"]').addEventListener('click', function () { step(1); });
  });

  // Estimate form: the tiles and the "View all products" dropdown are one choice, so picking either clears the other
  document.querySelectorAll('.interest').forEach(function (set) {
    var select = set.querySelector('.interest__more select');
    if (!select) return;
    var tiles = set.querySelectorAll('input[type="radio"]');
    select.addEventListener('change', function () {
      select.classList.toggle('is-chosen', !!select.value);
      if (select.value) tiles.forEach(function (t) { t.checked = false; });
    });
    tiles.forEach(function (t) { t.addEventListener('change', function () { select.value = ''; select.classList.remove('is-chosen'); }); });
  });

  // Promo cards: on small screens the grid scrolls sideways one card at a time; dots show and pick the card
  document.querySelectorAll('.offer-grid--slider').forEach(function (grid) {
    var cards = grid.children;
    if (cards.length < 2) return;
    var dots = document.createElement('div');
    dots.className = 'offer-dots';
    Array.prototype.forEach.call(cards, function (card, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show promo ' + (k + 1));
      b.addEventListener('click', function () { grid.scrollTo({ left: k * (card.offsetWidth + 16), behavior: 'smooth' }); });
      dots.appendChild(b);
    });
    grid.parentNode.insertBefore(dots, grid.nextSibling);
    function mark() {
      var i = Math.round(grid.scrollLeft / (cards[0].offsetWidth || 1));
      Array.prototype.forEach.call(dots.children, function (d, k) { d.setAttribute('aria-current', k === i); });
    }
    grid.addEventListener('scroll', mark, { passive: true });
    mark();
  });

  // Product photo viewer: thumbnails and arrows swap the large photo
  document.querySelectorAll('.image-gallery').forEach(function (g) {
    var main = g.querySelector('.image-gallery__main img');
    var thumbs = Array.prototype.slice.call(g.querySelectorAll('.image-gallery__thumb'));
    var i = 0;
    function show(n) {
      i = (n + thumbs.length) % thumbs.length;
      main.src = thumbs[i].getAttribute('data-src');
      thumbs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      var row = thumbs[i].parentElement;
      row.scrollTo({ left: thumbs[i].offsetLeft - row.clientWidth / 2 + thumbs[i].offsetWidth / 2, behavior: 'smooth' });
    }
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k); }); });
    g.querySelector('.image-gallery__nav--prev').addEventListener('click', function () { show(i - 1); });
    g.querySelector('.image-gallery__nav--next').addEventListener('click', function () { show(i + 1); });
  });

  // Scroll animations: sections and cards below the fold fade up once as they come into view.
  // Anything already on screen at load stays visible, so nothing flashes.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // These play their own animation when they come into view (no fade of their own)
  var animated = document.querySelectorAll('.process__steps, .anatomy__grid, .solutions');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    var targets = Array.prototype.slice.call(document.querySelectorAll('main > section:not(.carousel):not(.hero)'));
    ['.offer-grid', '.tile-grid', '.difference__grid', '.material-grid', '.swatch-grid', '.ba-collage', '.product-grid', '.card-grid', '.process__photos'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (group) {
        // Sideways sliders keep their cards visible (off-screen cards would never scroll into view)
        if (group.scrollWidth > group.clientWidth + 1) return;
        var i = 0;
        Array.prototype.forEach.call(group.children, function (child) {
          var d = Math.min(i++ * 90, 630) + 'ms';
          child.style.transitionDelay = d + ', ' + d + ', 0s, 0s';
          targets.push(child);
        });
      });
    });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('is-visible'); return; }
      el.classList.add('reveal');
      io.observe(el);
    });
    animated.forEach(function (el) { io.observe(el); });
    // Safety net for big jumps (scrollbar drag, End key, links): reveal anything already scrolled past
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        document.querySelectorAll('.reveal:not(.is-visible), .process__steps:not(.is-visible), .anatomy__grid:not(.is-visible)').forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('is-visible'); io.unobserve(el); }
        });
      });
    }, { passive: true });
  }

  // Product grid category filters
  document.querySelectorAll('.product-grid-section').forEach(function (sec) {
    var btns = sec.querySelectorAll('[data-filter]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        btns.forEach(function (o) {
          var on = o === b;
          o.setAttribute('aria-pressed', on);
          o.classList.toggle('button--outline', !on);
        });
        sec.querySelectorAll('.product-grid__item').forEach(function (it) {
          it.hidden = f !== 'all' && it.getAttribute('data-cat') !== f;
        });
      });
    });
  });

  // Placeholder form handling: replace with a real form endpoint (HubSpot, Formspree, etc.)
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
