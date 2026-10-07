// Reusable page sections. Each returns an HTML string.
const SITE = require('./site');
const icon = require('./icons');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (name) => `/assets/img/${name}.jpg`;
const picture = (name, alt, attrs = '') => `<img src="${img(name)}" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs}>`;

function logo() {
  return `<a class="logo" href="/" aria-label="${SITE.name} home">
    ${icon.logoMark}
    <span class="logo__text"><span class="logo__name">BULLDOG</span><span class="logo__sub">Kitchen &amp; Bath</span></span>
  </a>`;
}

function navItem(item, current) {
  if (!item.children) {
    const cur = current === item.href ? ' aria-current="page"' : '';
    return `<li><a class="main-nav__link" href="${item.href}"${cur}>${item.label}</a></li>`;
  }
  const subs = item.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('');
  return `<li class="has-sub"><button class="main-nav__link" type="button" aria-expanded="false">${item.label}${icon.chevron}</button><ul class="submenu">${subs}</ul></li>`;
}

function header(current) {
  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="site-header__inner">
    ${logo()}
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul>${SITE.nav.map((n) => navItem(n, current)).join('')}</ul>
      <div class="mobile-only">
        <a class="button button--block" href="/contact/">Request an Estimate</a>
        <p style="margin-top:1rem"><a class="header-phone" href="tel:${SITE.phoneHref}">${icon.phone}${SITE.phone}</a></p>
      </div>
    </nav>
    <div class="header-actions">
      <a class="promos-pill" href="/current-promos/">${icon.tag}Promos</a>
      <a class="header-phone" href="tel:${SITE.phoneHref}" aria-label="Call ${SITE.phone}">${icon.phoneSolid}</a>
      <a class="header-cta" href="/contact/">Request an Estimate</a>
      <button class="nav-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle menu">${icon.menu}</button>
    </div>
  </div>
</header>
<div class="promo-bar"><a href="${SITE.promoBar.href}">${SITE.promoBar.text} ${SITE.promoBar.link}</a></div>`;
}

function footer() {
  const links = SITE.footerLinks.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('');
  const util = SITE.utilityLinks.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="container footer__top">
    <div class="footer__brand">
      ${logo()}
      <p>Subscribe to receive updates, offers, and remodeling inspiration from ${SITE.name}.</p>
      <form class="newsletter" data-placeholder-form>
        <label class="sr-only" for="nl-email">Email address</label>
        <input id="nl-email" type="email" placeholder="Email address" required>
        <button type="submit">Subscribe</button>
        <div class="form-success" role="status">Thanks! You're on the list.</div>
      </form>
      <ul class="social">
        <li><a href="${SITE.social.facebook}" aria-label="Facebook">${icon.facebook}</a></li>
        <li><a href="${SITE.social.instagram}" aria-label="Instagram">${icon.instagram}</a></li>
        <li><a href="${SITE.social.youtube}" aria-label="YouTube">${icon.youtube}</a></li>
      </ul>
    </div>
    <div class="footer__contact">
      <div>${SITE.address}</div>
      <div><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></div>
      <div><a href="mailto:${SITE.email}">${SITE.email}</a></div>
      <div>${SITE.hours}</div>
      <span class="footer__badge">Licensed &amp; Insured</span>
    </div>
    <ul class="footer__links">${links}</ul>
  </div>
  <div class="footer__bottom">
    <div class="container">
      <ul class="footer__utility">${util}</ul>
      <p>Copyright &copy; <span id="year">${new Date().getFullYear()}</span> ${SITE.legalName}. All Rights Reserved.</p>
      <p>${SITE.disclaimer}</p>
    </div>
  </div>
</footer>`;
}

function layout({ path, title, description, body }) {
  const fullTitle = path === '/' ? `${SITE.name} | ${title}` : `${title} | ${SITE.name}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://${SITE.domain}${path}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;
}

// ---------- Sections ----------

function carousel(slides) {
  const s = slides.map((sl, i) => {
    const H = i === 0 ? 'h1' : 'h2';
    return `<div class="carousel__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">
      <img src="${img(sl.img)}" alt="${esc(sl.alt)}"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}>
      <div class="carousel__content">
        ${sl.eyebrow ? `<span class="carousel__eyebrow">${sl.eyebrow}</span>` : ''}
        <${H}>${sl.title}</${H}>
        ${sl.text ? `<p>${sl.text}</p>` : ''}
        <a class="button button--white" href="${sl.href}">${sl.cta}</a>
      </div>
    </div>`;
  }).join('');
  const dots = slides.map((_, i) => `<button type="button" aria-label="Go to slide ${i + 1}"></button>`).join('');
  return `<section class="carousel" aria-roledescription="carousel" aria-label="Featured">
  <div class="carousel__track">${s}</div>
  <div class="carousel__controls">
    <button class="carousel__nav carousel__nav--prev" type="button" aria-label="Previous slide">${icon.left}</button>
    <button class="carousel__nav carousel__nav--next" type="button" aria-label="Next slide">${icon.right}</button>
  </div>
  <div class="carousel__dots">${dots}</div>
  <button class="carousel__pause" type="button" aria-label="Pause slideshow" aria-pressed="false">${icon.pause}${icon.play}</button>
</section>`;
}

function callout(html) {
  return `<section class="callout"><div class="callout__inner">
  <div class="callout__badge">${icon.shieldCheck}<span><strong>Lifetime</strong>Warranty</span></div>
  <div class="callout__content"><h2>${html}</h2></div>
  <div class="callout__years" aria-hidden="true"><strong>${SITE.years}</strong><span>Years</span></div>
</div></section>`;
}

function banner({ title, titleTag = 'h2', text, buttons = [], img: im, alt, badge, bold = false }) {
  const btns = buttons.map(([l, h]) => `<a class="button button--outline-light" href="${h}">${l}</a>`).join('');
  return `<section class="banner${bold ? ' banner--bold' : ''}">
  ${picture(im, alt || '')}
  <div class="banner__content">
    ${badge ? `<div class="diamond-badge" aria-hidden="true"><span>${badge}</span></div>` : ''}
    <${titleTag}>${title}</${titleTag}>
    ${text ? `<p>${text}</p>` : ''}
    <div class="button-row">${btns}</div>
  </div>
</section>`;
}

function offerCards({ title, titleTag = 'h2', offers, allLink = true, grey = false }) {
  const cards = offers.map((o) => `<article class="offer-card">
    <div class="offer-card__image">${picture(o.img, o.alt)}<span class="offer-card__icon">${icon[o.icon] || icon.tag}</span></div>
    <div class="offer-card__content">
      <h3 class="offer-card__title">${o.title}</h3>
      <div class="offer-card__text">${o.text}</div>
      <a class="offer-card__link" href="${o.href || '/contact/'}">Claim Promo</a>
    </div>
  </article>`).join('');
  return `<section class="section bleed${grey ? ' section--grey' : ''}">
  <header class="section-head"><${titleTag}>${title}</${titleTag}>${allLink ? '<a class="button button--outline" href="/current-promos/">View All Promos</a>' : ''}</header>
  <div class="offer-grid">${cards}</div>
</section>`;
}

function estimateForm({ heading = 'Request <strong>an Estimate</strong>', text = 'Tell us about your project and we\'ll reach out to schedule your in-home consultation.', id = 'estimate', button = 'Request My Estimate', message = false, promo = false, picker = promo, bare = false } = {}) {
  const interest = picker ?`<fieldset class="interest"><legend>I'm interested in:</legend>
      ${[['bath', 'Bath<br>Installation'], ['shower', 'Shower<br>Installation'], ['walkin', 'Walk-in Tub<br>Installation']].map(([v, l], i) => `<label class="interest__opt"><input type="radio" name="interest" value="${v}"${i === 0 ? ' checked' : ''}><img src="/assets/img/icon-${v}.png" alt="" width="50" height="51"><span>${l}</span></label>`).join('')}
    </fieldset>` : '';
  const head = bare ? '' : promo
    ?`<div class="form-card__promo"><h2>Get <strong>$1,250 OFF</strong></h2><p>and transform your bathroom in as little as one day.*</p></div>`
    : `<h2>${heading}</h2>${text ? `<p>${text}</p>` : ''}`;
  return `<div class="form-card${promo ? ' form-card--promo' : ''}">
  ${head}
  <form data-placeholder-form novalidate>
    ${interest}
    <div class="form-grid">
      <div class="field"><label for="${id}-first">First name <span class="req">*</span></label><input id="${id}-first" name="first_name" autocomplete="given-name" required></div>
      <div class="field"><label for="${id}-last">Last name <span class="req">*</span></label><input id="${id}-last" name="last_name" autocomplete="family-name" required></div>
      <div class="field"><label for="${id}-phone">Phone <span class="req">*</span></label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="field"><label for="${id}-zip">ZIP code <span class="req">*</span></label><input id="${id}-zip" name="zip" inputmode="numeric" autocomplete="postal-code" required></div>
      <div class="field full"><label for="${id}-email">Email <span class="req">*</span></label><input id="${id}-email" name="email" type="email" autocomplete="email" required></div>
      ${picker ? '' : `<div class="field full"><label for="${id}-project">Product of interest</label><select id="${id}-project" name="project">
        <option>Bath installation</option><option>Shower installation</option><option>Walk-in tub installation</option><option>Accessibility products</option><option>Shower enclosure</option><option>Kitchen cabinets</option><option>Countertops</option><option>Backsplash</option><option>Sinks &amp; faucets</option><option>Not sure yet</option>
      </select></div>`}
      ${message ? `<div class="field full"><label for="${id}-msg">How can we help?</label><textarea id="${id}-msg" name="message"></textarea></div>` : ''}
    </div>
    <p class="form-legal">By submitting, you agree that ${SITE.name} may contact you by phone, text, or email about your project. Consent is not a condition of purchase. Message &amp; data rates may apply.</p>
    <button class="button button--block" type="submit">${promo ? 'Submit' : button}</button>
    <div class="form-success" role="status">Thank you! A ${SITE.short} design consultant will be in touch shortly.</div>
  </form>
</div>`;
}

function hero({ img: im, alt, title, lead, form = true }) {
  return `<section class="hero">
  <img src="${img(im)}" alt="${esc(alt || '')}" fetchpriority="high">
  <div class="container hero__inner${form ? '' : ' hero__inner--solo'}">
    <div><h1>${title}</h1>${lead ? `<p class="hero__lead">${lead}</p>` : ''}</div>
    ${form ? estimateForm({ id: 'hero', promo: true }) : ''}
  </div>
</section>`;
}

function pageBand({ title, lead, extra = '' }) {
  return `<section class="page-band"><div class="container"><h1>${title}</h1>${lead ? `<p>${lead}</p>` : ''}${extra}</div></section>`;
}

function sideBySide({ title, titleTag = 'h2', text = '', bullets, img: im, alt, media, reverse = false, grey = false, navy = false, spot = false, buttons = [], id }) {
  const btns = buttons.length ? `<div class="button-row">${buttons.map(([l, h, cls]) => `<a class="button${cls ? ' ' + cls : (navy ? ' button--outline-light' : '')}" href="${h}">${l}</a>`).join('')}</div>` : '';
  const list = bullets ? `<ul class="check-list">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : '';
  const mediaHtml = media || (im ? picture(im, alt || '') : '');
  return `<section class="sbs${reverse ? ' sbs--reverse' : ''}${grey ? ' section--grey' : ''}${navy ? ' sbs--navy' : ''}${spot ? ' sbs--spot' : ''}"${id ? ` id="${id}"` : ''}><div class="sbs__grid">
  <div class="sbs__media${media ? ' sbs__media--pad' : ''}">${mediaHtml}</div>
  <div class="sbs__content">
    <${titleTag} class="sbs__title">${title}</${titleTag}>
    ${text ? `<div class="sbs__text">${text}</div>` : ''}
    ${list}${btns}
  </div>
</div></section>`;
}

function cards({ title, intro, items, perRow = 4, grey = false, center = false, link = 'Learn More' }) {
  const html = items.map((c) => `<a class="card" href="${c.href}">
    <div class="card__image">${picture(c.img, c.alt || c.title)}</div>
    <div class="card__body">
      ${c.meta ? `<div class="card__meta">${c.meta}</div>` : ''}
      <h3 class="card__title">${c.title}</h3>
      ${c.text ? `<p class="card__text">${c.text}</p>` : ''}
      <span class="card__link">${c.link || link}</span>
    </div>
  </a>`).join('');
  return `<section class="section${grey ? ' section--grey' : ''}"><div class="container">
  ${title ? `<header class="section-head${center ? ' section-head--center' : ''}"><div><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ''}</div></header>` : ''}
  <div class="card-grid" style="--per-row:${perRow}">${html}</div>
</div></section>`;
}

function tiles({ title, items, grey = false, tall = false }) {
  const html = items.map((t) => `<a class="tile" href="${t.href}"><div class="tile__img">${picture(t.img, t.title)}</div><h3 class="tile__title">${t.title}</h3></a>`).join('');
  return `<section class="section bleed${grey ? ' section--grey' : ''}">
  ${title ? `<header class="section-head"><h2>${title}</h2></header>` : ''}
  <div class="tile-grid${tall ? ' tile-grid--tall' : ''}">${html}</div>
</section>`;
}

function gallery({ title, images, grey = false, spot = false }) {
  const items = images.map((g) => `<div class="gallery__item">${picture(g, 'Project photo')}</div>`).join('');
  return `<section class="section gallery${grey ? ' section--grey' : ''}${spot ? ' gallery--spot' : ''}">
  ${title ? `<div class="container"><header class="section-head"><h2>${title}</h2></header></div>` : ''}
  <div class="gallery__track" tabindex="0" aria-label="Photo gallery">${items}</div>
  <div class="gallery__controls">
    <button class="round-btn" type="button" data-dir="prev" aria-label="Previous photos">${icon.left}</button>
    <button class="round-btn" type="button" data-dir="next" aria-label="Next photos">${icon.right}</button>
  </div>
</section>`;
}

// Product photo viewer: one large photo with arrows, thumbnails below (behaviour in main.js)
function imageGallery({ images, alt = 'Project photo', wide = false }) {
  const thumbs = images.map((g, i) => `<button class="image-gallery__thumb" type="button" data-src="${img(g)}" aria-label="Show photo ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}>${picture(g, '')}</button>`).join('');
  return `<section class="image-gallery${wide ? ' image-gallery--wide' : ''}" aria-label="Photo gallery">
  <div class="image-gallery__main">
    <img src="${img(images[0])}" alt="${esc(alt)}" loading="lazy" decoding="async">
    <button class="image-gallery__nav image-gallery__nav--prev" type="button" aria-label="Previous photo">${icon.left}</button>
    <button class="image-gallery__nav image-gallery__nav--next" type="button" aria-label="Next photo">${icon.right}</button>
  </div>
  <div class="image-gallery__thumbs">${thumbs}</div>
</section>`;
}

function columns({ title, items, grey = true }) {
  const html = items.map((c) => `<div class="column"><div class="column__icon">${icon[c.icon]}</div><h3>${c.title}</h3><p>${c.text}</p></div>`).join('');
  return `<section class="section${grey ? ' section--tint' : ''}"><div class="container">
  ${title ? `<header class="section-head section-head--center"><h2>${title}</h2></header>` : ''}
  <div class="columns">${html}</div>
</div></section>`;
}

function steps({ title, items, grey = true }) {
  const html = items.map((s, i) => `<div class="step"><div class="step__num">0${i + 1}</div><h3>${s.title}</h3><p>${s.text}</p></div>`).join('');
  return `<section class="section${grey ? ' section--grey' : ''}"><div class="container">
  <header class="section-head"><h2>${title}</h2></header>
  <div class="steps">${html}</div>
</div></section>`;
}

// Option swatches: photos (img), flat colors (color) or CSS-drawn samples (bg).
// "wide" lays four landscape samples edge to edge with a centered bold heading (glass options).
// "lead" is a short sentence shown above the heading.
function swatches({ title, intro, lead, items, grey = false, wide = false, flush = false }) {
  const html = items.map((s) => {
    const fill = s.img ? picture(s.img, s.name) : `<span style="background:${esc(s.bg || s.color)}"></span>`;
    return `<div class="swatch${s.img ? '' : ' swatch--drawn'}">${fill}<h3>${s.name}</h3></div>`;
  }).join('');
  const head = wide
    ? `<header class="section-head section-head--center"><div><h2 class="swatch-title--bold">${title}</h2>${intro ? `<p>${intro}</p>` : ''}</div></header>`
    : `<header class="section-head"><div><h2 class="swatch-title">${title}</h2>${intro ? `<p>${intro}</p>` : ''}</div></header>`;
  const cls = `section swatch-section${flush ? ' swatch-section--flush' : ''}${grey ? ' section--grey' : ''}`;
  return wide
    ? `<section class="${cls}">${head}<div class="swatch-grid swatch-grid--wide">${html}</div></section>`
    : `<section class="${cls}"><div class="container">${lead ? `<p class="swatch-lead">${lead}</p>` : ''}${head}<div class="swatch-grid">${html}</div></div></section>`;
}

function benefitList(items) {
  return `<ul class="benefit-list">${items.map(([label, text]) => `<li><strong>${label}:</strong> ${text}</li>`).join('')}</ul>`;
}

// Named product photos with category filter buttons (filtering in main.js)
function productGrid({ title, filters = [], items }) {
  const btns = filters.length ? `<div class="filter-row" role="group" aria-label="Filter by category">
    <button class="button" type="button" data-filter="all" aria-pressed="true">All</button>
    ${filters.map(([key, label]) => `<button class="button button--outline" type="button" data-filter="${key}" aria-pressed="false">${label}</button>`).join('')}
  </div>` : '';
  const html = items.map((it) => `<figure class="product-grid__item" data-cat="${it.cat}">${picture(it.img, it.name)}<figcaption>${it.name}</figcaption></figure>`).join('');
  return `<section class="section bleed product-grid-section">
  <header class="section-head section-head--center"><h2>${title}</h2></header>
  ${btns}
  <div class="product-grid">${html}</div>
</section>`;
}

// "The Bulldog Difference": intro on a light band, then value cards over a marble photo
function difference({ eyebrow, title, text, img: im, items }) {
  const cards = items.map((c) => `<div class="difference__card"><span class="difference__icon">${icon[c.icon]}</span><h3>${c.title}</h3><p>${c.text}</p></div>`).join('');
  return `<section class="difference">
  <div class="difference__intro"><div class="container">
    ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}<h2>${title}</h2><p>${text}</p>
  </div></div>
  <div class="difference__band">${picture(im, '')}<div class="container difference__grid">${cards}</div></div>
</section>`;
}

// Numbered process steps joined by a line, with a photo per step
function processSteps({ title, text, items }) {
  const steps = items.map((s, i) => `<li class="process__step"><span class="process__num">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('');
  const photos = items.map((s) => `<div class="process__photo">${picture(s.img, s.alt)}</div>`).join('');
  return `<section class="section process"><div class="container">
  <header class="process__head"><h2>${title}</h2>${text ? `<p>${text}</p>` : ''}</header>
  <ol class="process__steps">${steps}</ol>
  <div class="process__photos">${photos}</div>
</div></section>`;
}

function ctaBlock({ title, text, buttons = [] }) {
  return `<section class="section cta-block"><div class="container">
  <h2>${title}</h2>${text ? `<p>${text}</p>` : ''}
  <div class="button-row">${buttons.map(([l, h]) => `<a class="button" href="${h}">${l}</a>`).join('')}</div>
</div></section>`;
}

function faqGroups(groups, intro = '') {
  const html = groups.map((g, i) => `<div class="faq-group"><div>${i === 0 && intro ? `<p class="faq-group__intro">${intro}</p>` : ''}<h2>${g.title}</h2></div><div class="faq-list">${g.items.map(([q, a]) => `<details class="faq"><summary>${q}</summary><div class="faq__body"><p>${a}</p></div></details>`).join('')}</div></div>`).join('');
  return `<section class="section"><div class="container">${html}</div></section>`;
}

function formPage({ title, text, media = '', form, bold = false }) {
  return `<section class="form-page${bold ? ' form-page--bold' : ''}"><div class="form-page__inner">
  <h1>${title}</h1>${text ? `<p>${text}</p>` : ''}
  ${media ? `<div class="form-page__media">${media}</div>` : ''}
  ${form}
</div></section>`;
}

function photoStrip(im, alt) {
  return `<div class="photo-strip">${picture(im, alt)}</div>`;
}

function brochureCover(im = 'bath-12') {
  return `<div class="brochure">${picture(im, 'Brochure cover')}<div class="brochure__label"><strong>BULLDOG</strong><span>Kitchen &amp; Bath Lookbook</span></div></div>`;
}

module.exports = {
  esc, img, picture, layout, carousel, callout, banner, offerCards, estimateForm, hero, pageBand,
  sideBySide, cards, tiles, gallery, imageGallery, columns, steps, swatches, ctaBlock, benefitList, productGrid, difference, processSteps, faqGroups, brochureCover, formPage, photoStrip, icon,
};
