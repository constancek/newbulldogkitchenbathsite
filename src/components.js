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
<div class="promo-bar">${SITE.promoBar.text}<a href="${SITE.promoBar.href}">${SITE.promoBar.link}</a></div>
<header class="site-header">
  <div class="container site-header__inner">
    ${logo()}
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul>${SITE.nav.map((n) => navItem(n, current)).join('')}</ul>
      <div class="mobile-only">
        <a class="button button--block" href="/contact/">Get a Free Estimate</a>
        <p style="margin-top:1rem"><a class="header-phone" href="tel:${SITE.phoneHref}">${icon.phone}${SITE.phone}</a></p>
      </div>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${SITE.phoneHref}">${icon.phone}<span>${SITE.phone}</span></a>
      <a class="button" href="/contact/">Get a Free Estimate</a>
      <button class="nav-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle menu">${icon.menu}</button>
    </div>
  </div>
</header>`;
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
  <div class="carousel__dots">${dots}</div>
  <button class="carousel__nav carousel__nav--prev" type="button" aria-label="Previous slide">${icon.left}</button>
  <button class="carousel__nav carousel__nav--next" type="button" aria-label="Next slide">${icon.right}</button>
</section>`;
}

function callout(html) {
  return `<section class="callout"><div class="container callout__inner">
  <div class="callout__badge" aria-hidden="true"><strong>${SITE.years}+</strong>Years<br>Serving</div>
  <div class="callout__content"><h2>${html}</h2></div>
</div></section>`;
}

function offerCards({ title, offers, allLink = true, grey = false }) {
  const cards = offers.map((o) => `<article class="offer-card">
    <div class="offer-card__image">${picture(o.img, o.alt)}<span class="offer-card__icon">${icon[o.icon] || icon.tag}</span></div>
    <div class="offer-card__content">
      <h3 class="offer-card__title">${o.title}</h3>
      <div class="offer-card__text">${o.text}</div>
      <a class="offer-card__link" href="${o.href || '/contact/'}">Claim Promo</a>
    </div>
  </article>`).join('');
  return `<section class="section${grey ? ' section--grey' : ''}"><div class="container">
  <header class="section-head"><h2>${title}</h2>${allLink ? '<a class="button button--outline" href="/current-promos/">View All Promos</a>' : ''}</header>
  <div class="offer-grid">${cards}</div>
</div></section>`;
}

function estimateForm({ heading = 'Get <strong>a Free Estimate</strong>', text = 'Tell us about your project and we\'ll reach out to schedule your free in-home consultation.', id = 'estimate', button = 'Get My Free Estimate', message = false } = {}) {
  return `<div class="form-card">
  <h2>${heading}</h2>
  ${text ? `<p>${text}</p>` : ''}
  <form data-placeholder-form novalidate>
    <div class="form-grid">
      <div class="field"><label for="${id}-first">First name <span class="req">*</span></label><input id="${id}-first" name="first_name" autocomplete="given-name" required></div>
      <div class="field"><label for="${id}-last">Last name <span class="req">*</span></label><input id="${id}-last" name="last_name" autocomplete="family-name" required></div>
      <div class="field"><label for="${id}-phone">Phone <span class="req">*</span></label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="field"><label for="${id}-zip">ZIP code <span class="req">*</span></label><input id="${id}-zip" name="zip" inputmode="numeric" autocomplete="postal-code" required></div>
      <div class="field full"><label for="${id}-email">Email <span class="req">*</span></label><input id="${id}-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field full"><label for="${id}-project">Project type</label><select id="${id}-project" name="project">
        <option>Bathroom remodel</option><option>Kitchen remodel</option><option>Kitchen &amp; bathroom</option><option>Walk-in tub / accessibility</option><option>Not sure yet</option>
      </select></div>
      ${message ? `<div class="field full"><label for="${id}-msg">How can we help?</label><textarea id="${id}-msg" name="message"></textarea></div>` : ''}
    </div>
    <p class="form-legal">By submitting, you agree that ${SITE.name} may contact you by phone, text, or email about your project. Consent is not a condition of purchase. Message &amp; data rates may apply.</p>
    <button class="button button--block" type="submit">${button}</button>
    <div class="form-success" role="status">Thank you! A ${SITE.short} design consultant will be in touch shortly.</div>
  </form>
</div>`;
}

function hero({ img: im, alt, title, lead, crumbs, form = true }) {
  const bc = crumbs ? `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([l, h]) => ` / ${h ? `<a href="${h}">${l}</a>` : l}`).join('')}</nav>` : '';
  return `<section class="hero">
  <img src="${img(im)}" alt="${esc(alt || '')}" fetchpriority="high">
  <div class="container hero__inner${form ? '' : ' hero__inner--solo'}">
    <div>${bc}<h1>${title}</h1>${lead ? `<p class="hero__lead">${lead}</p>` : ''}</div>
    ${form ? estimateForm({ id: 'hero' }) : ''}
  </div>
</section>`;
}

function pageBand({ title, lead, extra = '' }) {
  return `<section class="page-band"><div class="container"><h1>${title}</h1>${lead ? `<p>${lead}</p>` : ''}${extra}</div></section>`;
}

function sideBySide({ title, titleTag = 'h2', text = '', bullets, img: im, alt, media, reverse = false, grey = false, navy = false, buttons = [], id }) {
  const btns = buttons.length ? `<div class="button-row">${buttons.map(([l, h, cls]) => `<a class="button${cls ? ' ' + cls : (navy ? ' button--white' : '')}" href="${h}">${l}</a>`).join('')}</div>` : '';
  const list = bullets ? `<ul class="check-list">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : '';
  const mediaHtml = media || (im ? picture(im, alt || '') : '');
  return `<section class="section sbs${reverse ? ' sbs--reverse' : ''}${grey ? ' section--grey' : ''}${navy ? ' sbs--navy' : ''}"${id ? ` id="${id}"` : ''}><div class="container sbs__grid">
  <div class="sbs__media">${mediaHtml}</div>
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

function tiles({ title, items, perRow = 4, grey = false }) {
  const html = items.map((t) => `<a class="tile" href="${t.href}">${picture(t.img, t.title)}<div class="tile__body"><h3 class="tile__title">${t.title}</h3><span class="tile__link">Learn More</span></div></a>`).join('');
  return `<section class="section${grey ? ' section--grey' : ''}"><div class="container">
  <header class="section-head"><h2>${title}</h2></header>
  <div class="card-grid" style="--per-row:${perRow}">${html}</div>
</div></section>`;
}

function gallery({ title, images, grey = false }) {
  const items = images.map((g) => `<div class="gallery__item">${picture(g, 'Project photo')}</div>`).join('');
  return `<section class="section gallery${grey ? ' section--grey' : ''}">
  ${title ? `<div class="container"><header class="section-head"><h2>${title}</h2></header></div>` : ''}
  <div class="gallery__track" tabindex="0" aria-label="Photo gallery">${items}</div>
  <div class="gallery__controls">
    <button class="round-btn" type="button" data-dir="prev" aria-label="Previous photos">${icon.left}</button>
    <button class="round-btn" type="button" data-dir="next" aria-label="Next photos">${icon.right}</button>
  </div>
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

function swatches({ title, intro, items, grey = false }) {
  const html = items.map((s) => s.color
    ? `<div class="swatch swatch--solid"><span style="background:${s.color}"></span><h3>${s.name}</h3></div>`
    : `<div class="swatch">${picture(s.img, s.name)}<h3>${s.name}</h3></div>`).join('');
  return `<section class="section${grey ? ' section--grey' : ''}"><div class="container">
  <header class="section-head"><div><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ''}</div></header>
  <div class="swatch-grid">${html}</div>
</div></section>`;
}

function faqGroups(groups) {
  const html = groups.map((g) => `<div class="faq-group"><h2>${g.title}</h2>${g.items.map(([q, a]) => `<details class="faq"><summary>${q}</summary><div class="faq__body"><p>${a}</p></div></details>`).join('')}</div>`).join('');
  return `<section class="section"><div class="container">${html}</div></section>`;
}

function brochureCover(im = 'bath-12') {
  return `<div class="brochure">${picture(im, 'Brochure cover')}<div class="brochure__label"><strong>BULLDOG</strong><span>Kitchen &amp; Bath Lookbook</span></div></div>`;
}

module.exports = {
  esc, img, picture, layout, carousel, callout, offerCards, estimateForm, hero, pageBand,
  sideBySide, cards, tiles, gallery, columns, steps, swatches, faqGroups, brochureCover, icon,
};
