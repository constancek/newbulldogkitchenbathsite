// Static site generator: node src/build.js  ->  writes HTML into /public
const fs = require('fs');
const path = require('path');
const SITE = require('./site');
const C = require('./components');
const { bath, kitchen } = require('./content/products');
const options = require('./content/options');
const extras = require('./content/product-extras');
const { faqs } = require('./content/faqs');
const { posts } = require('./content/blog');
const legal = require('./content/legal');

const OUT = path.join(__dirname, '..', 'public');
const pages = [];
const page = (p, title, description, body) => pages.push({ path: p, title, description, body });

// ---------- Shared blocks ----------
const promos = {
  dollarsOff: { title: 'Get $1,250 OFF', text: 'Your full kitchen or bathroom remodel — and a new bath in as little as one day.*', img: 'bath-22', alt: 'Remodeled bathroom', icon: 'tag' },
  financing: { title: 'FREE Financing', text: 'No interest for 24 months on approved credit.*', img: 'planning-1', alt: 'Couple planning a remodel budget', icon: 'percent' },
  senior: { title: 'Senior Discounts', text: 'Special savings for homeowners 65 and up. See a design consultant for details.*', img: 'senior-1', alt: 'Senior couple at home', icon: 'heart' },
  military: { title: 'Military Discounts', text: 'Thank you for your service. Extra savings for active-duty military and veterans.*', img: 'military-1', alt: 'Military service member', icon: 'flag' },
  sixty: { title: 'Up to 60-Month Financing', text: 'Low monthly payments with flexible terms on approved credit.*', img: 'planning-2', alt: 'Reviewing financing options', icon: 'calendar', href: '/financing/' },
  design: { title: '3D Design Preview', text: 'See your new kitchen or bath in 3D before you commit.', img: 'design-2', alt: 'Designer reviewing samples', icon: 'pencil', href: '/design-your-space/' },
};

const designStudio = () => C.sideBySide({
  title: 'Plan Your Dream Space <strong>With Our Design Studio</strong>',
  text: '<p>Customize wall patterns, fixtures, cabinets, trim, and more — then see a 3D rendering of your new room.</p>',
  img: 'design-3', alt: 'Designer reviewing finish samples',
  buttons: [['Get Started', '/design-your-space/']], reverse: true, navy: true,
});

const exploreBath = (grey = false) => C.tiles({
  title: 'Explore Our <strong>Products</strong>', grey,
  items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/products/${b.slug}/`, img: b.card })), { title: 'Kitchens', href: '/kitchens/', img: 'kitchen-17' }],
});

const learnMore = (custom = {}) => C.banner({
  title: custom.title || 'Learn More About <strong>Bulldog Kitchen &amp; Bath Products</strong>', img: 'texture-13', alt: 'Stone and tile finish samples',
  text: custom.text || 'Download our free lookbook to see real before-and-after transformations and explore every finish, fixture, and layout option we offer for kitchens and baths.',
  buttons: [['Get Free Brochure', '/download-brochure/'], ['Schedule an Estimate', '/contact/']],
});

const bulldogDifference = () => C.difference({
  eyebrow: 'The Bulldog Difference',
  title: 'Leave the Worry <strong>to Us</strong>',
  text: 'A renovation should be exciting—not overwhelming. Our process is designed to remove the uncertainty, stress, and disruption homeowners have come to expect.',
  img: 'texture-2',
  items: [
    { icon: 'sparkles', title: 'Designed Around Your Life', text: 'Every detail is thoughtfully managed to simplify decisions, reduce disruption, and respect everyday life.' },
    { icon: 'homeShield', title: 'Built on Certainty', text: 'Careful planning, guaranteed commitments, and clear communication help homeowners know what to expect.' },
    { icon: 'calendarCheck', title: 'Done In Days, Not Months', text: 'Efficient systems and dedicated project focus help reduce time spent living through construction.' },
    { icon: 'diamond', title: 'Custom Without Compromise', text: 'Thoughtful design and quality craftsmanship are delivered without sacrificing personalization or attention to detail.' },
  ],
});

const processSteps = () => C.processSteps({
  title: 'A Thoughtfully Managed Experience <strong>From Start to Finish</strong>',
  text: 'From your first consultation to the final walkthrough, every step is planned with care to keep your renovation organized, efficient, and designed around your life.',
  items: [
    { title: 'Discover', text: 'We learn about your home, goals, priorities, and vision.', img: 'step-discover', alt: 'Finished bathroom with freestanding tub' },
    { title: 'Design', text: 'We guide the layout, selections, investment, and project plan.', img: 'step-design', alt: 'Reviewing floor plans' },
    { title: 'Build', text: 'Your dedicated team coordinates and manages the renovation with clear communication and minimal disruption.', img: 'step-build', alt: 'Tools laid out on project plans' },
    { title: 'Enjoy', text: 'Return to everyday life in a space thoughtfully designed for you.', img: 'step-enjoy', alt: 'Relaxing in a new bathtub' },
  ],
});

// ---------- Home ----------
page('/', 'Kitchen & Bathroom Remodeling', `${SITE.name} designs and installs beautiful, affordable kitchens and bathrooms — many bath remodels in as little as one day. Request an estimate.`, [
  C.carousel([
    { img: 'hero-bath-1', alt: 'Newly remodeled bathroom with soaking tub', eyebrow: 'Transform Your Bathroom', title: 'A New Bath in <strong>As Little As One Day</strong>', text: 'Custom showers, tubs, and wall systems installed by our own crews.', cta: 'Request an Estimate', href: '/contact/' },
    { img: 'hero-kitchen-1', alt: 'Bright modern kitchen', eyebrow: 'Now Remodeling Kitchens', title: 'The Kitchen <strong>You\'ve Been Waiting For</strong>', text: 'Cabinets, countertops, backsplash, and fixtures — designed and installed by one team.', cta: 'Explore Kitchens', href: '/kitchens/' },
    { img: 'hero-bath-2', alt: 'Bathroom with patterned tile walls', eyebrow: 'Limited-Time Offer', title: 'Save <strong>$1,250</strong> on Your Remodel', text: 'Plus free financing for 24 months on approved credit.*', cta: 'Claim Discount Now', href: '/current-promos/' },
    { img: 'hero-kitchen-2', alt: 'Kitchen with island and pendant lights', eyebrow: 'See It Before You Build It', title: '<strong>3D Design</strong> &amp; In-Home Consultation', text: 'Choose every finish and see your new room before work begins.', cta: 'Design Your Space', href: '/design-your-space/' },
    { img: 'hero-bath-3', alt: 'Bathroom with tile walls and vanity', eyebrow: 'Built to Last', title: 'Quality You Can <strong>Count On</strong>', text: `Proudly serving ${SITE.serviceArea} for over ${SITE.years} years.`, cta: 'Book a Design Consultation', href: '/contact/' },
  ]),
  C.callout(`${SITE.name} — <strong>Beautiful Remodels Since ${SITE.founded}</strong>`),
  C.offerCards({ title: 'Current <strong>Promos</strong>', offers: [promos.dollarsOff, promos.financing, promos.senior] }),
  designStudio(),
  exploreBath(),
  bulldogDifference(),
  processSteps(),
  C.banner({
    title: 'A Brand-New Bath in <strong>As Little As One Day</strong>', img: 'bath-24', alt: 'Finished bathroom remodel', badge: '1-DAY',
    text: 'Turn your bathroom into a spa-like retreat with minimal disruption to your home. Our crews prep, install, and clean up — often in a single visit.',
    buttons: [['Schedule an Estimate', '/contact/']],
  }),
  C.sideBySide({
    title: 'Discover What <strong>Bulldog Can Do</strong>', media: C.brochureCover('bath-25'), reverse: true,
    text: '<p>Download our lookbook to explore real before-and-after transformations and our full range of tile looks, accessories, cabinets, countertops, and fixtures.</p>',
    buttons: [['Get Free Brochure', '/download-brochure/']],
  }),
  C.sideBySide({
    title: 'Quality Products for <strong>Your Home</strong>', img: 'kitchen-18', alt: 'Remodeled kitchen',
    text: '<p>Outdated kitchens and bathrooms can feel cramped, hard to clean, and inefficient. We fix that with durable, low-maintenance products, smart layouts, and an installation process built around your schedule — so you can enjoy your home again.</p>',
    buttons: [['About Bulldog', '/about/']],
  }),
].join('\n'));

// ---------- Product option sections ----------
const optionSections = {
  'shower-enclosures': [
    C.swatches({ title: 'Doors &amp; Rods – Finishes', items: options.finishes, flush: true,
      lead: 'You want options when creating your look, so our shower doors, enclosures, and curtain rods all come in a choice of finishes that coordinate with your faucets and accessories, including:' }),
    C.swatches({ title: 'Glass Options', intro: 'Size and glass finish options vary by model: 1/4″, 5/16″, and 3/8″.', items: options.glass, wide: true, flush: true }),
    C.swatches({ title: 'V-Groove Glass', intro: 'Etched V-groove patterns are available on most shower doors in 1/4″ and 5/16″ glass, depending on the model.', items: options.vGroove }),
  ],
  'colors-patterns': [
    C.swatches({ title: 'Colors', intro: 'Color availability varies by product. See real samples during your design consultation.', items: options.colors, flush: true }),
    C.swatches({ title: 'Patterns', items: options.patterns }),
    C.sideBySide({ title: '<strong>Grout-Free</strong> Tile Looks', img: 'pattern-3x6-subway', alt: 'Subway tile-look wall pattern',
      text: '<p>Our tile-look wall patterns have realistic grout lines without the porous grout. They\'re made from the same durable, non-porous material as our standard wall systems, so cleanup is just as easy — no scrubbing, sealing, or regrouting.</p>' }),
    C.ctaBlock({ title: 'Discover <strong>Quality Customization</strong>',
      text: `To learn more about colors, patterns, and finishes for your new bathroom, request an estimate or call ${SITE.phone} to speak with a design consultant.`,
      buttons: [['Request an Estimate', '/contact/']] }),
  ],
};

// ---------- Product page template ----------
function productPage(p, base) {
  const title = p.plainTitle || p.title;
  // Multi-word titles get a bold last word, e.g. "Shower <strong>Enclosures</strong>"
  const heroTitle = p.title.replace(/ (\S+)$/, ' <strong>$1</strong>');
  const x = extras[p.slug] || {};
  const benefits = x.benefits ? C.benefitList(x.benefits) : '';
  // Like Bath Concepts: no gallery on Accessories or Colors & Patterns; on Shower Enclosures it sits right under the header
  const showGallery = !p.swatches && !x.accessories;
  const gallery = showGallery ? C.imageGallery({ images: p.gallery, alt: title, wide: ['shower-enclosures', 'bathtubs'].includes(p.slug) }) : '';
  const galleryFirst = p.slug === 'shower-enclosures';
  const body = [
    C.hero({ img: p.hero, alt: title, title: heroTitle, lead: p.lead }),
    galleryFirst ? gallery : '',
    C.sideBySide({ ...p.intro, alt: title }),
    galleryFirst ? '' : gallery,
    ...(optionSections[p.slug] || []),
    x.accessories ? C.productGrid({ title: 'Shop <strong>Accessories</strong>', ...x.accessories }) : '',
    C.sideBySide({ ...p.feature, text: p.feature.text + benefits, alt: title, reverse: true, buttons: [['Request an Estimate', '/contact/']] }),
    learnMore(x.learn),
    bulldogDifference(),
  ].join('\n');
  page(`${base}${p.slug}/`, title, `${title} from ${SITE.name}. ${p.lead}`, body);
}
bath.forEach((p) => productPage(p, '/products/'));
kitchen.forEach((p) => productPage(p, '/kitchens/'));

// ---------- Products overview ----------
page('/products/', 'Bath Products', `Explore showers, bathtubs, walk-in tubs, accessibility products, enclosures, and accessories from ${SITE.name}.`, [
  C.hero({ img: 'bath-26', alt: 'Remodeled bathroom', title: 'Our <strong>Products</strong>', lead: 'Durable, beautiful, low-maintenance bath products — custom-fit and installed by our own team.' }),
  C.sideBySide({ title: 'Beautiful, <strong>Durable Products</strong>', img: 'bath-27', alt: 'Bathroom with glass shower',
    text: '<p>Every product we install is chosen to look great on day one and stay that way for years. Non-porous surfaces resist mold and mildew, colors won\'t fade, and there\'s no grout to scrub.</p>',
    bullets: ['Custom measured for your space', 'Mold- and mildew-resistant surfaces', 'Backed by our lifetime warranty*'] }),
  C.tiles({ tall: true,
    items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/products/${b.slug}/`, img: b.card })),
      { title: 'Kitchens', href: '/kitchens/', img: 'kitchen-19' }] }),
  learnMore(),
  bulldogDifference(),
].join('\n'));

// ---------- Kitchens overview ----------
page('/kitchens/', 'Kitchen Remodeling', `Kitchen remodeling by ${SITE.name}: cabinets, countertops, backsplash, sinks, and faucets — designed and installed by one team.`, [
  C.hero({ img: 'kitchen-20', alt: 'Remodeled kitchen', title: 'Kitchen <strong>Remodeling</strong>', lead: 'From a quick refresh to a full transformation, we design and install kitchens that fit the way you cook and gather.' }),
  C.sideBySide({ title: 'One Team, <strong>Start to Finish</strong>', img: 'kitchen-21', alt: 'Kitchen with island',
    text: '<p>Juggling separate cabinet, countertop, and plumbing contractors is stressful. With Bulldog, one design consultant and one installation crew handle your entire kitchen — on one schedule and one warranty.</p>',
    bullets: ['In-home design consultation', 'Cabinet replacement or refacing', 'Countertops fabricated to fit', 'Backsplash, sinks, faucets, and lighting'] }),
  C.tiles({ title: 'Explore <strong>Kitchen Products</strong>', tall: true,
    items: kitchen.map((k) => ({ title: k.plainTitle || k.title, href: `/kitchens/${k.slug}/`, img: k.card })) }),
  C.gallery({ title: 'Kitchen <strong>Gallery</strong>', images: ['kitchen-22', 'kitchen-23', 'kitchen-24', 'kitchen-25', 'kitchen-26', 'kitchen-27', 'kitchen-28', 'kitchen-29'] }),
  processSteps(),
  learnMore(),
].join('\n'));

// ---------- Design your space ----------
page('/design-your-space/', 'Design Your Space', `Design your new kitchen or bathroom with ${SITE.name}'s design studio and 3D renderings.`, [
  C.sideBySide({ titleTag: 'h1', title: 'Plan Your Dream Space <strong>With Our Design Studio</strong>',
    text: '<p>Choose your layout, wall pattern, colors, fixtures, cabinets, and trim. A Bulldog designer will turn your choices into a 3D rendering so you can see your new room before work begins.</p>',
    bullets: ['3D design preview', 'Hundreds of color and pattern combinations', 'Virtual or in-home consultation'],
    img: 'design-3', alt: 'Designer reviewing finish samples', buttons: [['Get Started', '/contact/']], reverse: true, navy: true }),
  C.cards({ title: 'Design <strong>Spotlight</strong>', grey: true, perRow: 3, link: 'View Style',
    items: [
      { title: 'Traditional with an Industrial Edge', img: 'bath-28', href: '/inspiration-design-spotlight/', text: 'Warm stone walls, matte black fixtures, and a clean-lined glass door.' },
      { title: 'Soft, Elegant Neutrals', img: 'bath-29', href: '/inspiration-design-spotlight/', text: 'Creamy marble looks with brushed gold accents.' },
      { title: 'Bright Modern Kitchen', img: 'kitchen-30', href: '/inspiration-design-spotlight/', text: 'White shaker cabinets, quartz counters, and a bold backsplash.' },
    ] }),
  C.swatches({ title: 'Colors', intro: 'A preview of our wall colors. See every option on our <a href="/products/colors-patterns/">Colors &amp; Patterns</a> page.', items: options.colors.slice(0, 12), flush: true }),
  C.swatches({ title: 'Patterns', items: options.patterns.slice(0, 12) }),
].join('\n'));

// ---------- Inspiration ----------
const styles = [
  ['Riverstone with Classic Tile Pattern', 'bath-1'], ['Tundra Solid Stone', 'bath-2'], ['Concrete with Block Pattern', 'bath-5'],
  ['Tuscan Warmth', 'bath-7'], ['Travertine Classic', 'bath-9'], ['Calacatta-Style Marble', 'bath-11'],
  ['White Shaker Kitchen', 'kitchen-2'], ['Two-Tone Modern Kitchen', 'kitchen-6'], ['Warm Wood Kitchen', 'kitchen-10'],
];
page('/inspiration-shop-the-room/', 'Shop the Room', `Browse kitchen and bathroom styles from ${SITE.name} and get the look for your home.`, [
  C.hero({ img: 'bath-30', alt: 'Styled bathroom', title: 'Shop <strong>The Room</strong>', lead: 'Find a look you love, then request an estimate to bring it home.' }),
  C.cards({ title: 'Get <strong>The Look</strong>', perRow: 3, link: 'Get This Look',
    items: styles.map(([t, im]) => ({ title: t, img: im, href: '/contact/' })) }),
  designStudio(),
  exploreBath(),
].join('\n'));

const spotlights = [
  { title: 'Peaceful <strong>Sanctuary</strong> Style', sub: 'Travertine-look walls with brushed nickel', text: 'Soft, warm stone tones and a frameless-style glass door create a calm, spa-like retreat. A built-in niche and corner bench keep the space uncluttered.', imgs: ['bath-3', 'bath-4', 'bath-6', 'bath-8', 'bath-10'] },
  { title: 'Warm and Earthy <strong>Attic</strong> Style', sub: 'Stone walls under a sloped ceiling', text: 'Smart planning turned an awkward attic bath into a cozy, functional room. Earthy finishes and wood accents tie it to the rest of the home.', imgs: ['bath-12', 'bath-13', 'bath-14', 'bath-15'] },
  { title: 'Traditional Style with <strong>Industrial Edge</strong>', sub: 'Concrete-look panels and matte black hardware', text: 'Cool gray walls, bold black fixtures, and clean lines give a classic layout a fresh, modern attitude.', imgs: ['bath-16', 'bath-17', 'bath-18', 'bath-19'] },
  { title: 'Bright <strong>Family Kitchen</strong>', sub: 'White shaker cabinets with quartz counters', text: 'An open layout, an oversized island, and durable, easy-clean surfaces make this kitchen the hub of a busy household.', imgs: ['kitchen-3', 'kitchen-4', 'kitchen-5', 'kitchen-7', 'kitchen-8'] },
];
page('/inspiration-design-spotlight/', 'Design Spotlight', `Real kitchen and bathroom design ideas from ${SITE.name}.`, [
  C.hero({ img: 'bath-20', alt: 'Featured bathroom design', title: 'Design <strong>Spotlight</strong>', lead: 'A closer look at finished spaces and the details that make them work.' }),
  ...spotlights.map((s, i) => C.sideBySide({ title: s.title.replace(/<\/?strong>/g, ''), img: s.imgs[0], alt: s.sub, reverse: i % 2 === 1, spot: true,
    text: `<h3>${s.sub}</h3><p>${s.text}</p>`, buttons: [['Get This Look', '/contact/']] })
    + C.gallery({ images: s.imgs.slice(1), spot: true })),
].join('\n'));

// ---------- One day remodel ----------
page('/one-day-bathroom-remodel/', 'One Day Bathroom Remodel', `Get a beautiful new bathroom in as little as one day with ${SITE.name}.`, [
  C.banner({ titleTag: 'h1', bold: true, title: 'A Brand-New Bath in As Little As One Day', img: 'bath-24', alt: 'Finished one-day bathroom remodel',
    text: 'Most bathroom remodels drag on for weeks. Ours don\'t. Because every product is custom-measured and prepared before install day, our crew can remove your old tub or shower and install your new one — often in a single visit.',
    buttons: [['Schedule an Estimate', '/contact/']] }),
  C.steps({ title: 'How It <strong>Works</strong>', items: [
    { title: 'Consultation', text: 'We measure your space and help you choose products and finishes.' },
    { title: 'Custom Fabrication', text: 'Your base, walls, and trim are prepared to your exact measurements.' },
    { title: 'Install Day', text: 'Our crew removes the old and installs the new — usually in one day.' },
    { title: 'Enjoy', text: 'We clean up, walk you through care, and register your warranty.' },
  ] }),
  C.sideBySide({ title: 'Discover What <strong>Bulldog Can Do</strong>', media: C.brochureCover('bath-25'), reverse: true,
    text: '<p>See before-and-after transformations and every option available in our free lookbook.</p>', buttons: [['Get Free Brochure', '/download-brochure/']] }),
  C.sideBySide({ title: 'Quality Products for Your <strong>One Day Remodel</strong>', img: 'bath-21', alt: 'Bathroom remodel',
    text: '<p>Fast doesn\'t mean cutting corners. Our tubs, showers, and wall systems are built from durable, non-porous materials that resist mold, mildew, and stains — and they\'re backed by our lifetime warranty.*</p>',
    buttons: [['View Bath Products', '/products/']] }),
].join('\n'));

// ---------- Promos & forms ----------
page('/current-promos/', 'Current Promos', `Current offers and discounts from ${SITE.name}.`, [
  C.offerCards({ title: 'Current <strong>Promos</strong>', titleTag: 'h1', allLink: false, offers: [promos.dollarsOff, promos.financing, promos.design, promos.senior, promos.military, promos.sixty] }),
  bulldogDifference(),
].join('\n'));

page('/financing/', 'Financing', `Flexible financing for your kitchen or bathroom remodel from ${SITE.name}.`, [
  C.photoStrip('bath-21', 'Remodeled bathroom'),
  C.formPage({ bold: true, title: 'Up to 60-Month Financing Available – Get $1,250 OFF',
    text: 'and transform your kitchen or bathroom with low monthly payments.* Financing subject to credit approval; terms vary.',
    form: C.estimateForm({ id: 'fin', promo: true, bare: true }) }),
].join('\n'));

page('/download-brochure/', 'Free Brochure', `Download the free ${SITE.name} lookbook.`, [
  C.formPage({ title: 'Download <strong>Free Brochure</strong>',
    text: 'Fill out your contact info below to get our lookbook. Inside you\'ll explore real before-and-after transformations and every finish, fixture, and layout option we offer.',
    media: C.brochureCover('bath-23'),
    form: C.estimateForm({ id: 'brochure', bare: true, button: 'Submit' }) }),
].join('\n'));

page('/contact/', 'Contact Us', `Contact ${SITE.name} for a kitchen or bathroom remodeling estimate.`, [
  C.banner({ titleTag: 'h1', bold: true, title: 'Contact Us', img: 'contact-1', alt: 'Remodeled bathroom',
    text: `Reach out to ${SITE.name} today! Our team is here to answer your questions and help you create the kitchen or bathroom you've been wanting.`,
    buttons: [[SITE.phone, `tel:${SITE.phoneHref}`]] }),
  C.sideBySide({ title: 'Get in <strong>Touch</strong>',
    text: `<p>Ready to start, or just have a question? Reach out and a Bulldog design consultant will get back to you quickly.</p>
<ul class="contact-list">
  <li>${C.icon.phone}<div><strong>Call</strong><br><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></div></li>
  <li>${C.icon.mail}<div><strong>Email</strong><br><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
  <li>${C.icon.pin}<div><strong>Showroom</strong><br>${SITE.address}</div></li>
  <li>${C.icon.clock}<div><strong>Hours</strong><br>${SITE.hours}</div></li>
</ul>`,
    media: C.estimateForm({ id: 'contact', heading: 'Request <strong>an Estimate</strong>', message: true }), reverse: true }),
].join('\n'));

// ---------- About ----------
page('/about/', 'About Us', `Learn about ${SITE.name}, your local kitchen and bathroom remodeling team.`, [
  C.hero({ img: 'kitchen-1', alt: 'Kitchen remodel', title: 'About <strong>Bulldog</strong>', lead: 'Tough on quality. Easy to work with.' }),
  C.sideBySide({ title: 'Who <strong>We Are</strong>', img: 'crew-1', alt: 'Bulldog installation crew',
    text: `<h3>We design and install high-quality showers, tubs, wall systems, cabinets, and countertops — with many bath remodels finished in as little as one day.</h3><p>${SITE.name} was built on a simple idea: remodeling should be stress-free. Since ${SITE.founded} we've helped homeowners in ${SITE.serviceArea} update their kitchens and baths with durable products, honest pricing, and crews who treat your home like their own.</p>` }),
  C.sideBySide({ title: 'Our <strong>Promise</strong>', img: 'family-1', alt: 'Happy family at home', reverse: true, grey: true,
    text: '<p>Every project comes with a design consultation, clear written pricing, a dedicated project coordinator, and a lifetime warranty on our products and workmanship.* If something isn\'t right, we make it right.</p>',
    bullets: ['Licensed and insured', 'Background-checked installers', 'Clear, upfront pricing', 'Lifetime warranty*'] }),
  bulldogDifference(),
  processSteps(),
  `<section class="section"><div class="container">
  <header class="section-head section-head--center"><h2>Our <strong>Team</strong></h2></header>
  <div class="team-grid">
    ${[['Owner Name', 'Founder &amp; Owner'], ['Team Member', 'Lead Designer'], ['Team Member', 'Installation Manager'], ['Team Member', 'Customer Care']].map(([n, r]) => `<div class="team-card"><div class="team-card__avatar">${n.split(' ').map((w) => w[0]).join('')}</div><h3>${n}</h3><p>${r}</p></div>`).join('')}
  </div>
  <p style="text-align:center;margin-top:2rem;color:var(--text-muted);font-size:.9rem">Team photos and bios coming soon.</p>
</div></section>`,
  learnMore(),
].join('\n'));

// ---------- FAQ ----------
page('/faqs/', 'Frequently Asked Questions', `Answers to common questions about kitchen and bathroom remodeling with ${SITE.name}.`, [
  C.hero({ img: 'bath-19', alt: 'Bathroom', title: 'Frequently Asked <strong>Questions</strong>', lead: 'Everything you need to know about remodeling with Bulldog.' }),
  C.faqGroups(faqs, `At ${SITE.name}, we work hard to make remodeling simple. Here are answers to common questions. To learn more, give us a call and speak with a knowledgeable design consultant.`),
].join('\n'));

// ---------- Warranty ----------
page('/warranty/', 'Warranty', `${SITE.name} lifetime warranty information.`, [
  C.hero({ img: 'family-2', alt: 'Family at home', title: '<strong>Warranty</strong>', lead: 'We stand behind every product we install and every job we complete.' }),
  `<section class="section"><div class="container prose">
  <div class="notice">Placeholder warranty summary — replace with your official warranty terms before launch.</div>
  <h2>Lifetime Limited Warranty</h2>
  <p>Bath products installed by ${SITE.name} — including shower bases, bathtubs, and wall systems — are covered against defects in materials and workmanship for as long as you own your home.</p>
  <h2>Workmanship Guarantee</h2>
  <p>Our installation is guaranteed. If a problem is caused by our workmanship, we'll return and fix it at no charge.</p>
  <h2>Kitchen Products</h2>
  <p>Cabinets, countertops, sinks, and faucets carry the manufacturer's warranty, plus our own workmanship guarantee on installation.</p>
  <h2>What's Not Covered</h2>
  <ul><li>Damage from misuse, abuse, or harsh/abrasive cleaners</li><li>Normal wear, fading from direct sunlight, or minor color variation</li><li>Modifications or repairs made by others</li><li>Pre-existing structural, plumbing, or electrical issues outside our scope of work</li></ul>
  <h2>Making a Claim</h2>
  <p>Call us at <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> or email <a href="mailto:${SITE.email}">${SITE.email}</a> with your name, address, and a description or photo of the issue.</p>
</div></section>`,
].join('\n'));

// ---------- Blog ----------
page('/blog/', 'Blog', `Remodeling tips, ideas, and guides from ${SITE.name}.`, [
  C.pageBand({ title: 'The Bulldog <strong>Blog</strong>', lead: 'Ideas, tips, and guides for your next kitchen or bathroom project.' }),
  C.cards({ perRow: 3, link: 'Read More', items: posts.map((p) => ({ title: p.title, img: p.img, href: `/blog/${p.slug}/`, text: p.excerpt, meta: p.date })) }),
].join('\n'));
posts.forEach((p) => page(`/blog/${p.slug}/`, p.title, p.excerpt, [
  C.pageBand({ title: p.title, extra: `<p class="post-meta">${p.date} · ${SITE.name}</p>` }),
  `<section class="section"><div class="container prose">${C.picture(p.img, p.title)}${p.body}
  <p><a class="button" href="/contact/">Request an Estimate</a></p>
  <p><a class="link-arrow" href="/blog/">&larr; Back to the blog</a></p></div></section>`,
].join('\n')));

// ---------- Legal ----------
for (const [slug, l] of Object.entries(legal)) {
  page(`/${slug}/`, l.title, `${l.title} for ${SITE.domain}.`, [
    C.pageBand({ title: l.title }),
    `<section class="section"><div class="container prose"><div class="notice">Placeholder legal text — have this reviewed by your attorney before launch.</div>${l.body}</div></section>`,
  ].join('\n'));
}

// ---------- 404 ----------
page('/404', 'Page Not Found', 'The page you were looking for could not be found.', [
  C.pageBand({ title: 'Page <strong>Not Found</strong>', lead: 'Sorry, we couldn\'t find that page.', extra: '<p style="margin-top:1.5rem"><a class="button button--white" href="/">Back to Home</a></p>' }),
  exploreBath(),
].join('\n'));

// ---------- Write ----------
for (const p of pages) {
  const file = p.path === '/404' ? path.join(OUT, '404.html') : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, C.layout(p));
}
const urls = pages.filter((p) => p.path !== '/404').map((p) => `  <url><loc>https://${SITE.domain}${p.path}</loc></url>`).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${SITE.domain}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages into ${OUT}`);
