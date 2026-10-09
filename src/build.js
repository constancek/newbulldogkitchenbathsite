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

const OUT = path.join(__dirname, '..', 'public');
const pages = [];
const page = (p, title, description, body) => pages.push({ path: p, title, description, body });

// ---------- Shared blocks ----------
const promos = {
  dollarsOff: { title: 'Get $1,250 OFF', text: 'Your full kitchen or bathroom remodel, and a new bath in as little as one day.*', img: 'bath-22', alt: 'Remodeled bathroom', icon: 'tag' },
  financing: { title: 'FREE Financing', text: 'No interest for 24 months on approved credit.*', img: 'planning-1', alt: 'Couple planning a remodel budget', icon: 'percent' },
  senior: { title: 'Senior Discounts', text: 'Special savings for homeowners 65 and up. See a design consultant for details.*', img: 'senior-1', alt: 'Senior couple smiling over paperwork in their kitchen', icon: 'heart' },
  military: { title: 'Military Discounts', text: 'Thank you for your service. Extra savings for active-duty military and veterans.*', img: 'military-1', alt: 'Military service member', icon: 'flag' },
  sixty: { title: 'Up to 60-Month Financing', text: 'Low monthly payments with flexible terms on approved credit.*', img: 'planning-2', alt: 'Couple planning on a laptop in their kitchen', icon: 'calendar', href: '/financing/' },
  design: { title: '3D Design Preview', text: 'See your new kitchen or bath in 3D before you commit.', img: 'design-2', alt: 'Designer reviewing samples', icon: 'pencil' },
};

const exploreBath = (grey = false) => C.tiles({
  title: 'Explore Our <strong>Products</strong>', grey,
  items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/products/${b.slug}/`, img: b.card })), { title: 'Kitchens', href: '/kitchens/', img: 'kitchen-17' }],
});

const learnMore = (custom = {}) => C.banner({
  title: custom.title || 'Learn More About <strong>Bulldog Kitchen &amp; Bath Products</strong>', img: 'texture-13', alt: 'Stone and tile finish samples',
  text: custom.text || 'Explore every finish, fixture, and layout option we offer for kitchens and baths. Bulldog stands out as the affordable choice for lasting quality and style.',
  buttons: [['Schedule an Estimate', '/contact/']],
});

const bulldogDifference = () => C.difference({
  title: '<strong>The Bulldog Difference</strong>',
  tagline: 'Leave the Worry to Us',
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
page('/', 'Kitchen & Bathroom Remodeling', `${SITE.name} designs and installs beautiful, affordable kitchens and bathrooms, with many bath remodels in as little as one day. Request an estimate.`, [
  C.carousel([
    { img: 'hero-bath-1', alt: 'Bathtub with a marble-look wall surround and a window', eyebrow: 'Transform Your Bathroom', title: 'A New Bath in <strong>As Little As One Day</strong>', text: 'Custom showers, tubs, and wall systems installed by our own crews.', cta: 'Request an Estimate', href: '/contact/' },
    { img: 'hero-kitchen-1', alt: 'White kitchen with an island, pendant lights and a breakfast table', eyebrow: 'Now Remodeling Kitchens', title: 'The Kitchen <strong>You\'ve Been Waiting For</strong>', text: 'Cabinets, countertops, backsplash, and fixtures, designed and installed by one team.', cta: 'Explore Kitchens', href: '/kitchens/' },
    { img: 'hero-bath-2', alt: 'Bathroom with a tub and shower, granite vanity and shower curtain', eyebrow: 'Limited-Time Offer', title: 'Save <strong>$1,250</strong> on Your Remodel', text: 'Plus free financing for 24 months on approved credit.*', cta: 'Claim Discount Now', href: '/current-promos/' },
    { img: 'hero-bath-3', alt: 'Bathroom with a gray vanity, tiled glass shower and wood-look floor', eyebrow: 'Built to Last', title: 'Affordable Remodels, <strong>Quality You Can Count On</strong>', text: `Proudly serving ${SITE.serviceArea} for over ${SITE.years} years.`, cta: 'Book a Design Consultation', href: '/contact/' },
  ]),
  C.callout(`${SITE.name}: <strong>Beautiful Remodels Since ${SITE.founded}</strong>`),
  C.banner({
    title: 'A Brand-New Bath in <strong>As Little As One Day</strong>', img: 'bath-24', alt: 'Finished bathroom remodel', badge: '1-DAY',
    text: 'Turn your bathroom into a spa-like retreat with minimal disruption to your home. Our crews prep, install, and clean up, often in a single visit.',
    buttons: [['Schedule an Estimate', '/contact/']],
  }),
  C.offerCards({ title: 'Current <strong>Promos</strong>', slider: true, offers: [promos.dollarsOff, promos.financing, promos.senior] }),
  bulldogDifference(),
  processSteps(),
  exploreBath(),
  C.anatomy(extras.cabinets.anatomy),
  C.beforeAfter({ title: 'What your space could look like', text: 'Done in as little as 1 day', items: [
    { img: 'before-after-before', alt: 'Before: an outdated bathroom', label: 'Before' },
    { img: 'before-after-after', alt: 'After: a remodeled bathroom', label: 'After' },
  ] }),
  C.sideBySide({
    title: 'Quality Products for <strong>Your Home</strong>', img: 'kitchen-18', alt: 'Remodeled kitchen',
    text: '<p>Outdated kitchens and bathrooms can feel cramped, hard to clean, and inefficient. We fix that with durable, low-maintenance products, smart layouts, and an installation process built around your schedule, so you can enjoy your home again.</p>',
    buttons: [['About Bulldog', '/about/']],
  }),
].join('\n'));

const sinceLine = (rest) => `Since ${SITE.founded}, <strong>${SITE.name}</strong> ${rest}`;

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
      text: '<p>Our tile-look wall patterns have realistic grout lines without the porous grout. They\'re made from the same durable, non-porous material as our standard wall systems, so cleanup is just as easy: no scrubbing, sealing, or regrouting.</p>' }),
  ],
  showers: [
    C.swatches({ title: 'Shower Base Styles', intro: 'Every base is custom-measured to fit your space.', items: options.showerBases, cards: true, flush: true }),
    C.swatches({ title: 'Wall Styles', intro: 'A few popular colors and tile looks. See every option on <a class="link-arrow" href="/products/colors-patterns/">Colors &amp; Patterns</a>.', items: options.wallStyles }),
  ],
  bathtubs: [
    C.swatches({ title: 'Tub Styles', intro: 'Pick the tub that fits how you like to bathe.', items: options.tubStyles, cards: true, flush: true }),
    C.swatches({ title: 'Wall Surround Styles', intro: 'A few popular colors and tile looks. See every option on <a class="link-arrow" href="/products/colors-patterns/">Colors &amp; Patterns</a>.', items: options.wallStyles }),
  ],
  'tub-to-shower-conversions': [
    C.swatches({ title: 'Shower Base Styles', intro: 'Every base is custom-measured to fit the space your old tub leaves behind.', items: options.showerBases, cards: true, flush: true }),
    C.swatches({ title: 'Doors &amp; Curtain Rods', intro: 'Choose glass or a rod, in the finish that matches your fixtures.', items: options.showerDoors, cards: true, flush: true }),
    C.swatches({ title: 'Safety Add-Ons', intro: 'Small upgrades that make your new shower safer for everyone.', items: options.safetyAddOns, cards: true }),
  ],
  'walk-in-tubs': [
    C.columns({ title: 'Therapy <strong>Packages</strong>', items: options.walkInTherapy, grey: false }),
    C.columns({ title: 'Comfort <strong>Add-Ons</strong>', items: options.walkInComfort }),
  ],
  accessibility: [
    C.swatches({ title: 'Accessibility Products', intro: 'Mix and match the safety features your household needs.', items: options.accessibilityProducts, cards: true }),
  ],
  vanities: [
    C.swatches({ title: 'Vanity Styles', intro: 'Sized and measured for your bathroom.', items: options.vanityStyles, cards: true, flush: true }),
    C.swatches({ title: 'Cabinet Colors', intro: 'The same finishes we offer for kitchen cabinets.', items: options.cabinetFinishes, flush: true }),
    C.swatches({ title: 'Vanity Tops', intro: 'Durable tops that resist water, stains, and scratches.', items: options.vanityTops, flush: true }),
    C.swatches({ title: 'Sink Styles', items: options.vanitySinks, cards: true }),
  ],
  accessories: [
    C.swatches({ title: 'Fixture Finishes', intro: 'Every accessory comes in finishes that match your faucets and shower heads.', items: options.finishes }),
  ],
  cabinets: [
    C.swatches({ title: 'Door Styles', intro: 'Choose a door style for new cabinets or refacing.', items: options.doorStyles, cards: true, flush: true }),
    C.swatches({ title: 'Finishes', intro: 'Painted and wood finishes. See real samples during your design consultation.', items: options.cabinetFinishes }),
  ],
  countertops: [
    C.swatches({ title: 'Countertop Materials', intro: 'Every top is measured and fabricated to fit your kitchen.', items: options.counterMaterials, cards: true, flush: true }),
    C.swatches({ title: 'Popular Colors', intro: 'A few favorites. Color choices vary by material, so see real samples during your design consultation.', items: options.counterColors }),
  ],
  backsplash: [
    C.swatches({ title: 'Tile Patterns', intro: 'Popular layouts for a backsplash that pulls the room together.', items: options.backsplashPatterns, flush: true }),
    C.swatches({ title: 'Tile Materials', items: options.backsplashMaterials, cards: true }),
  ],
  'sinks-faucets': [
    C.swatches({ title: 'Sink Styles', intro: 'Matched to your countertop and the way you cook and clean.', items: options.kitchenSinks, cards: true, flush: true }),
    C.swatches({ title: 'Faucet Styles', items: options.faucetTypes, cards: true, flush: true }),
    C.swatches({ title: 'Finishes', intro: 'Coordinate your faucet with cabinet pulls and lighting.', items: options.kitchenFinishes }),
  ],
  'organizers-accessories': [
    C.swatches({ title: 'Organizer Options', intro: 'Fit new or existing cabinets with storage that works the way you cook.', items: options.organizerTypes, cards: true, flush: true }),
    C.swatches({ title: 'Hardware Finishes', intro: 'Pulls and knobs in finishes that match your faucet and lighting.', items: options.finishes }),
  ],
};

// ---------- Product page template ----------
function productPage(p, base) {
  const title = p.plainTitle || p.title;
  // Multi-word titles get a bold last word, e.g. "Shower <strong>Enclosures</strong>"
  const heroTitle = p.title.replace(/ (\S+)$/, ' <strong>$1</strong>');
  const x = extras[p.slug] || {};
  // Close the first intro paragraph with "Since <year>, Bulldog Kitchen & Bath ..." like Bath Concepts
  const introText = x.since ? p.intro.text.replace('</p>', ` ${sinceLine(x.since)}</p>`) : p.intro.text;
  const benefits = x.benefits ? C.benefitList(x.benefits) : '';
  // Like Bath Concepts: no gallery on Accessories or Colors & Patterns; on Shower Enclosures it sits right under the header
  const showGallery = !p.swatches && !x.accessories;
  const gallery = showGallery ? C.imageGallery({ images: p.gallery, alt: title, wide: ['shower-enclosures', 'bathtubs'].includes(p.slug) }) : '';
  const galleryFirst = p.slug === 'shower-enclosures';
  const feature = C.sideBySide({ ...p.feature, text: p.feature.text + benefits, alt: title, reverse: true, buttons: [['Request an Estimate', '/contact/']] });
  // On Colors & Patterns, "See It Before You Buy" comes right after The Bulldog Difference
  const featureFirst = p.slug === 'colors-patterns';
  const body = [
    C.hero({ img: p.hero, alt: title, title: heroTitle, lead: p.lead, kitchen: base === '/kitchens/', product: p.slug }),
    galleryFirst ? gallery : '',
    C.sideBySide({ ...p.intro, text: introText, alt: title }),
    x.anatomy ? C.anatomy(x.anatomy) : '',
    x.solutions ? C.solutions(x.solutions) : '',
    bulldogDifference(),
    featureFirst ? feature : '',
    galleryFirst ? '' : gallery,
    ...(optionSections[p.slug] || []),
    featureFirst ? '' : feature,
    processSteps(),
    x.accessories ? C.productGrid({ title: 'Shop <strong>Accessories</strong>', ...x.accessories }) : '',
    learnMore(x.learn),
  ].join('\n');
  page(`${base}${p.slug}/`, title, `${title} from ${SITE.name}. ${p.lead}`, body);
}
bath.forEach((p) => productPage(p, '/products/'));
kitchen.forEach((p) => productPage(p, '/kitchens/'));

// ---------- Products overview ----------
page('/products/', 'Bath Products', `Explore showers, tub-to-shower conversions, bathtubs, walk-in tubs, accessibility products, enclosures, vanities, and accessories from ${SITE.name}.`, [
  C.hero({ img: 'bath-26', alt: 'Remodeled bathroom', title: 'Our <strong>Products</strong>', lead: 'Durable, beautiful, low-maintenance bath products, custom-fit and installed by our own team.' }),
  C.sideBySide({ title: 'Beautiful, <strong>Durable Products</strong>', img: 'bath-27', alt: 'Bathroom with glass shower',
    text: '<p>Every product we install is chosen to look great on day one and stay that way for years. Non-porous surfaces resist mold and mildew, colors won\'t fade, and there\'s no grout to scrub. ' + sinceLine('has been installing durable, low-maintenance bath products for homeowners across the area.') + '</p><p>Every product is custom-measured for your space and backed by our lifetime warranty.*</p>' }),
  bulldogDifference(),
  C.tiles({ tall: true,
    items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/products/${b.slug}/`, img: b.card })),
      { title: 'Kitchens', href: '/kitchens/', img: 'kitchen-19' }] }),
  processSteps(),
  learnMore(),
].join('\n'));

// ---------- Kitchens overview ----------
page('/kitchens/', 'Kitchen Remodeling', `Kitchen remodeling by ${SITE.name}: cabinets, countertops, backsplash, sinks, and faucets, designed and installed by one team.`, [
  C.hero({ img: 'kitchen-20', alt: 'Remodeled kitchen', kitchen: true, title: 'Kitchen <strong>Remodeling</strong>', lead: 'From a quick refresh to a full transformation, we design and install kitchens that fit the way you cook and gather.' }),
  C.sideBySide({ title: 'One Team, <strong>Start to Finish</strong>', img: 'kitchen-21', alt: 'Kitchen with island',
    text: '<p>Juggling separate cabinet, countertop, and plumbing contractors is stressful. With Bulldog, one design consultant and one installation crew handle your entire kitchen, on one schedule and one warranty. ' + sinceLine('has been designing and installing kitchens that fit the way families cook and gather.') + '</p><p>It starts with an in-home design consultation. From there we handle cabinet replacement or refacing, countertops fabricated to fit, and the backsplash, sinks, faucets, and lighting.</p>' }),
  C.featureImage({ title: 'Cabinet Styles <strong>&amp; Finishes</strong>', lead: 'Mix and match door styles and finishes to create a kitchen that is all your own.', img: 'kitchen-cabinet-styles',
    alt: 'Kitchen showing cabinet finishes: Graphite Shaker, White Shaker, Light Sage, White Oak, and Sierra Cherry' }),
  C.materials({ title: 'What Our Cabinets <strong>Are Made Of</strong>', lead: 'Quality you can see, built from materials that last.', items: [
    { title: 'Solid Wood', img: 'mat-solid-wood', alt: 'Stacked solid wood boards', text: 'We offer solid wood cabinet doors in a variety of hardwoods, from birch to oak.' },
    { title: 'Plywood', img: 'mat-plywood', alt: 'Layered plywood edges', text: 'Our cabinet boxes are built from plywood for long-lasting strength and durability.' },
    { title: 'MDF / HDF', img: 'mat-mdf', alt: 'Stack of fiberboard panels', text: 'Engineered from compressed wood fibers, it resists water, warping, and cracking.' },
    { title: 'Particle Board', no: true, img: 'mat-particle-board', alt: 'Close-up of particle board', text: 'It soaks up water, cracks easily, and wears out sooner, so we don\'t use it.' },
  ] }),
  C.tiles({ title: 'Explore <strong>Kitchen Products</strong>', tall: true,
    items: kitchen.map((k) => ({ title: k.plainTitle || k.title, href: `/kitchens/${k.slug}/`, img: k.card })) }),
  C.gallery({ title: 'Kitchen <strong>Gallery</strong>', images: ['kitchen-22', 'kitchen-23', 'kitchen-24', 'kitchen-25', 'kitchen-26', 'kitchen-27', 'kitchen-28', 'kitchen-29'] }),
  processSteps(),
  learnMore(),
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
    text: 'Most bathroom remodels drag on for weeks. Ours don\'t. Because every product is custom-measured and prepared before install day, our crew can remove your old tub or shower and install your new one, often in a single visit.',
    buttons: [['Schedule an Estimate', '/contact/']] }),
  C.steps({ title: 'How It <strong>Works</strong>', items: [
    { title: 'Consultation', text: 'We measure your space and help you choose products and finishes.' },
    { title: 'Custom Fabrication', text: 'Your base, walls, and trim are prepared to your exact measurements.' },
    { title: 'Install Day', text: 'Our crew removes the old and installs the new, usually in one day.' },
    { title: 'Enjoy', text: 'We clean up, walk you through care, and register your warranty.' },
  ] }),
  C.sideBySide({ title: 'Quality Products for Your <strong>One Day Remodel</strong>', img: 'bath-21', alt: 'Bathroom remodel',
    text: '<p>Fast doesn\'t mean cutting corners. Our tubs, showers, and wall systems are built from durable, non-porous materials that resist mold, mildew, and stains, and they\'re backed by our lifetime warranty.*</p>',
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
  C.sideBySide({ title: 'Who <strong>We Are</strong>', img: 'crew-1', alt: 'Installer laying tile',
    text: `<h3>We design and install high-quality, affordable showers, tubs, wall systems, cabinets, and countertops, with many bath remodels finished in as little as one day.</h3><p>${SITE.name} was built on a simple idea: remodeling should be stress-free. Since ${SITE.founded} we've helped homeowners in ${SITE.serviceArea} update their kitchens and baths with durable products, honest pricing, and crews who treat your home like their own.</p>` }),
  bulldogDifference(),
  C.sideBySide({ title: 'Our <strong>Promise</strong>', img: 'family-1', alt: 'Family cooking together in a bright kitchen', reverse: true, grey: true,
    text: '<p>Every project comes with a design consultation, clear written pricing, a dedicated project coordinator, and a lifetime warranty on our products and workmanship.* If something isn\'t right, we make it right. Great craftsmanship should be affordable, and every project is built to deliver exceptional value.</p><p>We\'re licensed and insured, every installer is background-checked, and our pricing is clear and upfront.</p>' }),
  `<section class="section"><div class="container">
  <header class="section-head section-head--center"><h2>Our <strong>Team</strong></h2></header>
  <div class="team-grid">
    ${[['Owner Name', 'Founder &amp; Owner'], ['Team Member', 'Lead Designer'], ['Team Member', 'Installation Manager'], ['Team Member', 'Customer Care']].map(([n, r]) => `<div class="team-card"><div class="team-card__avatar">${n.split(' ').map((w) => w[0]).join('')}</div><h3>${n}</h3><p>${r}</p></div>`).join('')}
  </div>
  <p style="text-align:center;margin-top:2rem;color:var(--text-muted);font-size:.9rem">Team photos and bios coming soon.</p>
</div></section>`,
  processSteps(),
  learnMore(),
].join('\n'));

// ---------- FAQ ----------
page('/faqs/', 'Frequently Asked Questions', `Answers to common questions about kitchen and bathroom remodeling with ${SITE.name}.`, [
  C.hero({ img: 'bath-19', alt: 'Bathroom', title: 'Frequently Asked <strong>Questions</strong>', lead: 'Everything you need to know about remodeling with Bulldog.' }),
  C.faqGroups(faqs, `At ${SITE.name}, we work hard to make remodeling simple. Here are answers to common questions. To learn more, give us a call and speak with a knowledgeable design consultant.`),
].join('\n'));

// ---------- Warranty ----------
page('/warranty/', 'Warranty', `${SITE.name} lifetime warranty information.`, [
  C.hero({ img: 'family-2', alt: 'Happy family in their kitchen', title: '<strong>Warranty</strong>', lead: 'We stand behind every product we install and every job we complete.' }),
  `<section class="section"><div class="container prose">
  <div class="notice">Placeholder warranty summary: replace with your official warranty terms before launch.</div>
  <h2>Lifetime Limited Warranty</h2>
  <p>Bath products installed by ${SITE.name}, including shower bases, bathtubs, and wall systems, are covered against defects in materials and workmanship for as long as you own your home.</p>
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

// ---------- 404 ----------
page('/404', 'Page Not Found', 'The page you were looking for could not be found.', [
  C.pageBand({ title: 'Page <strong>Not Found</strong>', lead: 'Sorry, we couldn\'t find that page.', extra: '<p style="margin-top:1.5rem"><a class="button" href="/">Back to Home</a></p>' }),
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
