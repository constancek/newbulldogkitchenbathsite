// Static site generator: node src/build.js  ->  writes HTML into /public
const fs = require('fs');
const path = require('path');
const SITE = require('./site');
const C = require('./components');
const { bath, kitchen, colorsPatterns } = require('./content/products');
const options = require('./content/options');
const extras = require('./content/product-extras');
const { pageFaqs } = require('./content/page-faqs');
const blog = require('./content/blog');
const { syncImages, imgUrl, hasPhoto } = require('./images');

// New or replaced photos in images/ become WebP files in public/assets/img
syncImages();

// Blog posts are Markdown files in src/content/blog/ (see that folder's README.md)
blog.configure({ imgUrl });
const posts = blog.loadPosts().map((p) => ({ ...p, img: p.img && hasPhoto(p.img) ? p.img : 'blog-placeholder' }));

const OUT = path.join(__dirname, '..', 'public');
const pages = [];
const page = (p, title, description, body) => pages.push({ path: p, title, description, body });

// ---------- Shared blocks ----------
const promos = {
  dollarsOff: { title: 'Get $1,250 OFF', text: 'Your full kitchen or bathroom remodel, and a new bath in as little as one day.*', img: 'promos-dollars-off', alt: 'Bathroom with white subway tile, a red tile stripe and a sliding glass shower door', icon: 'tag' },
  financing: { title: 'FREE Financing', text: 'No interest for 24 months on approved credit.*', img: 'promos-financing', alt: 'Couple planning a remodel budget', icon: 'percent' },
  senior: { title: 'Senior Discounts', text: 'Special savings for homeowners 65 and up. See a design consultant for details.*', img: 'promos-senior', alt: 'Senior couple smiling over paperwork', icon: 'heart' },
  military: { title: 'Military Discounts', text: 'Thank you for your service. Extra savings for active-duty military and veterans.*', img: 'promos-military', alt: 'Military service member', icon: 'flag' },
  sixty: { title: 'Up to 60-Month Financing', text: 'Low monthly payments with flexible terms on approved credit.*', img: 'promos-planning', alt: 'Couple planning on a laptop in their kitchen', icon: 'calendar', href: '/financing/' },
  design: { title: '3D Design Preview', text: 'See your new kitchen or bath in 3D before you commit.', img: 'promos-design', alt: 'Designer reviewing samples', icon: 'pencil' },
};

const exploreBath = (grey = false) => C.tiles({
  title: 'Explore Our <strong>Services</strong>', grey,
  items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/bathrooms/${b.slug}/`, img: b.card })), { title: 'Kitchens', href: '/kitchens/', img: 'products-card-kitchens' }],
});

const learnMore = (custom = {}) => C.banner({
  title: custom.title || 'Learn More About <strong>Bulldog Kitchen &amp; Bath Products</strong>', img: 'colors-patterns-card', alt: 'Stone and tile finish samples',
  text: custom.text || 'Explore every finish, fixture, and layout option we offer for kitchens and baths. Bulldog Kitchen &amp; Bath stands out as the affordable choice for lasting quality and style.',
  buttons: [['Schedule an Estimate', '/about/#contact']],
});

// Pass title/tagline/items to tailor the section to a page (One Day Remodel)
const bulldogDifference = (custom = {}) => C.difference({
  title: custom.title || '<strong>The Bulldog Difference</strong>',
  tagline: custom.tagline || 'Leave the Worry to Us',
  img: 'difference-background',
  items: custom.items || [
    { icon: 'sparkles', title: 'Designed Around Your Life', text: 'Every detail is thoughtfully managed to simplify decisions, reduce disruption, and respect everyday life.' },
    { icon: 'homeShield', title: 'Built on Certainty', text: 'Careful planning, guaranteed commitments, and clear communication help homeowners know what to expect.' },
    { icon: 'calendarCheck', title: 'Done In Days, Not Months', text: 'Efficient systems and dedicated project focus help reduce time spent living through construction.' },
    { icon: 'diamond', title: 'Custom Without Compromise', text: 'Thoughtful design and quality craftsmanship are delivered without sacrificing personalization or attention to detail.' },
  ],
});

// Pass title/text/items to tailor the steps to a page (One Day Remodel)
const processSteps = (custom = {}) => C.processSteps({
  title: custom.title || 'A Thoughtfully Managed Experience <strong>From Start to Finish</strong>',
  text: custom.text || 'From your first consultation to the final walkthrough, every step is planned with care to keep your renovation organized, efficient, and designed around your life.',
  items: custom.items || [
    { title: 'Discover', text: 'We learn about your home, goals, priorities, and vision.' },
    { title: 'Design', text: 'We guide the layout, selections, investment, and project plan.' },
    { title: 'Build', text: 'Your dedicated team coordinates and manages the renovation with clear communication and minimal disruption.' },
    { title: 'Enjoy', text: 'Return to everyday life in a space thoughtfully designed for you.' },
  ],
});

// Bath reviews (One Day Remodel, Bath Products and every bath product page)
const bathReviewItems = [
  { img: 'home-review-1', alt: 'Bathroom with a marble-look walk-in shower and a navy double vanity', side: 'right', pos: 'center', name: 'Sarah Miller',
    quote: 'Fantastic job! Our bathroom turned out absolutely <strong>beautiful</strong>, and we couldn\'t be thrilled with the final result.' },
  { img: 'home-review-2', alt: 'Bathroom with a sliding glass shower door and a built-in seat', side: 'left', pos: 'center 40%', name: 'Emily Johnson',
    quote: 'I was truly <strong>speechless</strong> when I walked through the door and saw how incredible everything looked.' },
  { img: 'home-review-3', alt: 'Glass walk-in shower with patterned tile and a floating vanity', side: 'left', pos: 'center', name: 'Jennifer Smith',
    quote: 'Top-quality materials paired with <strong>outstanding craftsmanship</strong> guarantee an exceptional outcome every single time.' },
];

// Kitchen reviews (Kitchens overview and every kitchen product page)
const kitchenReviewItems = [
  { img: 'kitchens-gallery-8', alt: 'Modern kitchen with wood-look cabinets, a white island and a dark wood breakfast bar', side: 'right', pos: 'center', name: 'Michael Anderson',
    quote: 'The crew offered <strong>inventive ideas</strong> from start to finish, and our kitchen has a fresh new look!' },
  { img: 'kitchen-cabinets-gallery-2', alt: 'White raised-panel kitchen cabinets with glass-front uppers and dark countertops', side: 'left', pos: 'center', name: 'Jennifer Thompson',
    quote: 'We\'re <strong>absolutely delighted</strong> with our cabinet installation, and we\'d gladly hire them again.' },
  { img: 'countertops-gallery-1', alt: 'Marble-look kitchen island with an undermount sink and a chrome faucet', side: 'right', pos: 'center', name: 'David Miller',
    quote: 'They refinished my cabinets and replaced my countertops. <strong>Great quality</strong> and great service.' },
  { img: 'kitchens-gallery-2', alt: 'Kitchen with teal shaker cabinets, a wood-top island and carved wood pantry doors', side: 'left', pos: 'center', name: 'Sarah Johnson',
    quote: 'Simple, rewarding, and <strong>outstanding work</strong>. I\'m overjoyed with my "new" kitchen. Thank you!' },
  { img: 'kitchens-gallery-4', alt: 'Glossy cream and taupe kitchen cabinets with a mosaic tile backsplash and built-in ovens', side: 'left', pos: 'center', name: 'Emily Wilson',
    quote: 'They kept us <strong>within our budget</strong> and never pressured us to spend more. Highly recommend!' },
];
const bathReviews = () => C.reviews(bathReviewItems);
const kitchenReviews = () => C.reviews(kitchenReviewItems);
// Home: one slideshow with bath and kitchen reviews taking turns
const homeReviews = () => C.reviews([0, 1, 2, 3, 4].flatMap((i) => [bathReviewItems[i], kitchenReviewItems[i]]).filter(Boolean));

// ---------- Home ----------
page('/', 'Kitchen & Bathroom Remodeling', `${SITE.name} designs and installs beautiful, affordable kitchens and bathrooms, with many bath remodels in as little as one day. Request an estimate.`, [
  C.carousel([
    { img: 'home-slide-new-bath', alt: 'Glass corner shower with beige tile, a built-in niche and black fixtures, beside a dark wood vanity', pos: 'center 40%', eyebrow: 'Transform Your Bathroom', title: 'A New Bath in <strong>As Little As One Day</strong>', text: 'Custom showers, tubs, and wall systems installed by our own crews.', cta: 'Request an Estimate', href: '/about/#contact' },
    { img: 'home-slide-kitchen', alt: 'White kitchen with an island, pendant lights and a breakfast table', eyebrow: 'Now Remodeling Kitchens', title: 'The Kitchen <strong>You\'ve Been Waiting For</strong>', text: 'Cabinets, countertops, backsplash, and fixtures, designed and installed by one team.', cta: 'Explore Kitchens', href: '/kitchens/' },
    { img: 'home-slide-promo', alt: 'Glass walk-in shower with marble-look wall panels, a built-in niche and a white base', pos: 'center 35%', eyebrow: 'Limited-Time Offer', title: 'Save <strong>$1,250</strong> on Your Remodel', text: 'Plus free financing for 24 months on approved credit.*', cta: 'Claim Discount Now', href: '/current-promos/' },
    { img: 'home-slide-quality', alt: 'Bathroom with a gray vanity, tiled glass shower and wood-look floor', eyebrow: 'Built to Last', title: 'Affordable Remodels, <strong>Quality You Can Count On</strong>', text: `Proudly serving ${SITE.serviceArea} for over ${SITE.years} years.`, cta: 'Book a Design Consultation', href: '/about/#contact' },
  ]),
  C.callout(`${SITE.name}: <strong>Beautiful Remodels Since ${SITE.founded}</strong>`),
  C.offerCards({ title: 'Current <strong>Promos</strong>', slider: true, offers: [promos.dollarsOff, promos.financing, promos.senior] }),
  C.banner({
    title: 'A Brand-New Bath in <strong>As Little As One Day</strong>', img: 'home-one-day-banner', alt: 'Walk-in shower with marble-look wall panels, a grab bar and a glass panel', badge: '1-DAY',
    text: 'Turn your bathroom into a spa-like retreat with minimal disruption to your home. Our crews prep, install, and clean up, often in a single visit.',
    buttons: [['Schedule an Estimate', '/about/#contact']],
  }),
  bulldogDifference(),
  processSteps(),
  exploreBath(),
  C.anatomy(extras.cabinets.anatomy),
  C.beforeAfter({ title: 'What your space could look like', text: 'Done in as little as 1 day', items: [
    { img: 'home-before', alt: 'Before: an outdated bathroom', label: 'Before' },
    { img: 'home-after', alt: 'After: a remodeled bathroom', label: 'After' },
  ] }),
  homeReviews(),
  C.sideBySide({
    title: 'Quality Products for <strong>Your Home</strong>', img: 'home-quality-products', alt: 'Remodeled kitchen',
    text: '<p>Outdated kitchens and bathrooms can feel cramped, hard to clean, and inefficient. We fix that with durable, low-maintenance products, smart layouts, and an installation process built around your schedule, so you can enjoy your home again.</p>',
    buttons: [['About Bulldog Kitchen &amp; Bath', '/about/']],
  }),
].join('\n'));

const sinceLine = (rest) => `Since ${SITE.founded}, <strong>${SITE.name}</strong> ${rest}`;

// ---------- Product option sections ----------
const colorsLink = 'A few popular colors and tile looks. See every option in our <a class="link-arrow" href="/inspiration-colors-patterns/">Colors &amp; Patterns</a> guide.';
const optionSections = {
  'colors-patterns': [
    C.swatches({ title: 'Colors', intro: 'Color availability varies by product. See real samples during your design consultation.', items: options.colors, flush: true }),
    C.swatches({ title: 'Patterns', items: options.patterns }),
    C.sideBySide({ title: '<strong>Grout-Free</strong> Tile Looks', img: 'colors-patterns-pattern-3x6-subway', alt: 'Subway tile-look wall pattern',
      text: '<p>Our tile-look wall patterns have realistic grout lines without the porous grout. They\'re made from the same durable, non-porous material as our standard wall systems, so cleanup is just as easy: no scrubbing, sealing, or regrouting.</p>' }),
  ],
  // Showers also covers glass doors and enclosures (was Shower Enclosures) and shower add-ons (was Accessories)
  showers: [
    C.swatches({ title: 'Shower Base Styles', intro: 'Every base is custom-measured to fit your space.', items: options.showerBases, cards: true, flush: true }),
    C.swatches({ title: 'Wall Styles', intro: colorsLink, items: options.wallStyles }),
    C.sideBySide({ title: 'Glass Doors <strong>&amp; Enclosures</strong>', img: 'shower-enclosures-intro', alt: 'Glass shower enclosure', reverse: true,
      text: '<p>The right glass door or curtain rod frames your new walls, keeps water where it belongs, and makes the whole bathroom feel brighter and more open. We measure every opening so your enclosure fits precisely and seals properly.</p><p>Choose clear glass to show off your walls, or rain, frosted, or corrugated glass for more privacy. Sliding and bypass doors save space on wide showers, and pivot and hinged doors give a clean, frameless-style look. A protective coating helps water bead off so cleanup stays quick.</p>' }),
    C.swatches({ title: 'Doors &amp; Curtain Rods', intro: 'Choose glass or a rod, in the finish that matches your fixtures.', items: options.showerDoors, cards: true, flush: true }),
    C.swatches({ title: 'Doors &amp; Rods – Finishes', items: options.finishes, flush: true,
      lead: 'Our shower doors, enclosures, and curtain rods all come in finishes that coordinate with your faucets and accessories, including:' }),
    C.swatches({ title: 'Glass Options', intro: 'Size and glass finish options vary by model: 1/4″, 5/16″, and 3/8″.', items: options.glass, wide: true, flush: true }),
    C.swatches({ title: 'V-Groove Glass', intro: 'Etched V-groove patterns are available on most shower doors in 1/4″ and 5/16″ glass, depending on the model.', items: options.vGroove }),
  ],
  bathtubs: [
    C.swatches({ title: 'Tub Styles', intro: 'Pick the tub that fits how you like to bathe.', items: options.tubStyles, cards: true, flush: true }),
    C.swatches({ title: 'Wall Surround Styles', intro: colorsLink, items: options.wallStyles }),
    C.swatches({ title: 'Tub Add-Ons', intro: 'Finishing pieces in the same finish as your faucet and shower head.', items: options.tubAddOns, cards: true }),
  ],
  'tub-to-shower-conversions': [
    C.swatches({ title: 'Shower Base Styles', intro: 'Every base is custom-measured to fit the space your old tub leaves behind.', items: options.showerBases, cards: true, flush: true }),
    C.swatches({ title: 'Doors &amp; Curtain Rods', intro: 'Choose glass or a rod, in the finish that matches your fixtures.', items: options.showerDoors, cards: true, flush: true }),
    C.swatches({ title: 'Safety Add-Ons', intro: 'Small upgrades that make your new shower safer for everyone.', items: options.safetyAddOns, cards: true }),
  ],
  // Walk-In Tubs also covers aging-in-place safety (was Accessibility, plus the safety items from Accessories)
  'walk-in-tubs': [
    C.sideBySide({ title: 'Safer Bathrooms, <strong>Beautiful Design</strong>', img: 'accessibility-intro', alt: 'Accessible bathroom', reverse: true,
      text: '<p>We design accessible bathrooms that look like any other upscale remodel. Barrier-free bases, fold-down seats, and well-placed grab bars reduce fall risk for seniors, people with limited mobility, and growing families.</p><p>We also add handheld showers and easy-reach controls, and every grab bar comes in a decorative finish that matches the rest of your fixtures. Our consultants walk through your daily routine and recommend the right mix of safety features so your bathroom keeps working for you for years to come.</p>' + C.benefitList(extras.accessibility.benefits) }),
    C.swatches({ title: 'Accessibility Products', intro: 'Mix and match the safety features your household needs.', items: options.accessibilityProducts, cards: true }),
  ],
  vanities: [
    C.swatches({ title: 'Vanity Styles', intro: 'Sized and measured for your bathroom.', items: options.vanityStyles, cards: true, flush: true }),
    C.swatches({ title: 'Cabinet Colors', intro: 'The same finishes we offer for kitchen cabinets.', items: options.cabinetFinishes, flush: true }),
    C.swatches({ title: 'Vanity Tops', intro: 'Durable tops that resist water, stains, and scratches.', items: options.vanityTops, flush: true }),
    C.swatches({ title: 'Sink Styles', items: options.vanitySinks, cards: true }),
  ],
  // Cabinets also covers organizers (was Organizers & Accessories)
  cabinets: [
    C.swatches({ title: 'Door Styles', intro: 'Choose a door style for new cabinets or refacing.', items: options.doorStyles, cards: true, flush: true }),
    C.swatches({ title: 'Finishes', intro: 'Painted and wood finishes. See real samples during your design consultation.', items: options.cabinetFinishes }),
    C.sideBySide({ title: 'A Place for <strong>Everything</strong>', img: 'kitchen-organizers-intro', alt: 'Organized kitchen cabinet', reverse: true,
      text: '<p>Most kitchens don\'t need more cabinets, they need smarter ones. We fit your new or existing cabinets with organizers that make every inch easy to reach, from deep base cabinets to awkward corners, often added in hours, not weeks.</p>' + C.benefitList(extras['organizers-accessories'].benefits) }),
    C.swatches({ title: 'Organizer Options', intro: 'Fit new or existing cabinets with storage that works the way you cook.', items: options.organizerTypes, cards: true, flush: true }),
    C.swatches({ title: 'Hardware Finishes', intro: 'Pulls and knobs in finishes that match your faucet and lighting.', items: options.finishes }),
  ],
  // Countertops also covers backsplash and sinks & faucets (were their own pages)
  countertops: [
    C.swatches({ title: 'Countertop Materials', intro: 'Every top is measured and fabricated to fit your kitchen.', items: options.counterMaterials, cards: true, flush: true }),
    C.swatches({ title: 'Popular Colors', intro: 'A few favorites. Color choices vary by material, so see real samples during your design consultation.', items: options.counterColors }),
    C.sideBySide({ title: 'A Backsplash That <strong>Adds Personality</strong>', img: 'backsplash-intro', alt: 'Kitchen backsplash', reverse: true,
      text: '<p>Subway tile, mosaics, natural stone, or large-format panels: your backsplash protects your walls and sets the tone for the whole room. We coordinate it with your countertops, or add it on its own as one of the fastest ways to transform your kitchen.</p><p>Prefer less cleaning? Our grout-free backsplash panels give you the look of tile with a smooth surface that wipes clean in seconds.</p>' }),
    C.swatches({ title: 'Backsplash Patterns', intro: 'Popular layouts for a backsplash that pulls the room together.', items: options.backsplashPatterns, flush: true }),
    C.swatches({ title: 'Backsplash Materials', items: options.backsplashMaterials, cards: true }),
    C.sideBySide({ title: 'Sinks &amp; Faucets <strong>to Match</strong>', img: 'sinks-faucets-intro', alt: 'Kitchen sink and faucet',
      text: '<p>From deep single-bowl stainless sinks to farmhouse apron-front styles, we match your sink to your counters and cooking habits, then add a faucet that fits your workflow.</p><p>Choose an undermount, drop-in, or farmhouse sink and a pull-down or touchless faucet, then add filtered water, a pot filler, a garbage disposal, or a soap dispenser.</p>' }),
    C.swatches({ title: 'Sink Styles', intro: 'Matched to your countertop and the way you cook and clean.', items: options.kitchenSinks, cards: true, flush: true }),
    C.swatches({ title: 'Faucet Styles', items: options.faucetTypes, cards: true, flush: true }),
    C.swatches({ title: 'Faucet Finishes', intro: 'Coordinate your faucet with cabinet pulls and lighting.', items: options.kitchenFinishes }),
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
  // Like Bath Concepts: no gallery on Colors & Patterns
  // Merged pages list 4 photos per page they took in, so the whole list shows
  const gallery = p.swatches ? '' : C.imageGallery({ images: p.gallery, alt: title, wide: p.slug === 'bathtubs', max: p.gallery.length });
  const feature = C.sideBySide({ ...p.feature, text: p.feature.text + benefits, alt: title, reverse: true, buttons: [['Request an Estimate', '/about/#contact']] });
  // On Colors & Patterns, "See It Before You Buy" comes right after The Bulldog Difference
  const featureFirst = p.slug === 'colors-patterns';
  const body = [
    C.hero({ img: p.hero, alt: title, title: heroTitle, lead: p.lead, kitchen: base === '/kitchens/', product: p.slug }),
    C.sideBySide({ ...p.intro, text: introText, alt: title }),
    // Every kitchen page shows What's Inside Every Cabinet (content lives with Cabinets)
    x.anatomy || base === '/kitchens/' ? C.anatomy(x.anatomy || extras.cabinets.anatomy) : '',
    x.solutions ? C.solutions(x.solutions) : '',
    bulldogDifference(),
    featureFirst ? feature : '',
    gallery,
    base === '/kitchens/' ? kitchenReviews() : bathReviews(),
    processSteps(),
    ...(optionSections[p.slug] || []),
    featureFirst ? '' : feature,
    x.accessories ? C.productGrid({ title: 'Shower <strong>Add-Ons &amp; Accessories</strong>', ...x.accessories }) : '',
    learnMore(x.learn),
  ].join('\n');
  page(`${base}${p.slug}/`, title, `${title} from ${SITE.name}. ${p.lead}`, body);
}
bath.forEach((p) => productPage(p, '/bathrooms/'));
kitchen.forEach((p) => productPage(p, '/kitchens/'));
// Colors & Patterns is a design guide under Inspiration: /inspiration-colors-patterns/
productPage(colorsPatterns, '/inspiration-');

// ---------- Products overview ----------
page('/bathrooms/', 'Bath Products', `Explore showers and glass enclosures, tub-to-shower conversions, bathtubs, walk-in tubs and accessibility products, and vanities from ${SITE.name}.`, [
  C.hero({ img: 'products-header', alt: 'Remodeled bathroom', title: 'Our <strong>Products</strong>', lead: 'Durable, beautiful, low-maintenance bath products, custom-fit and installed by our own team.' }),
  C.sideBySide({ title: 'Beautiful, <strong>Durable Products</strong>', img: 'products-feature', alt: 'Bathroom with glass shower',
    text: '<p>Every product we install is chosen to look great on day one and stay that way for years. Non-porous surfaces resist mold and mildew, colors won\'t fade, and there\'s no grout to scrub. ' + sinceLine('has been installing durable, low-maintenance bath products for homeowners across the area.') + '</p><p>Every product is custom-measured for your space and backed by our lifetime warranty.</p>' }),
  bulldogDifference(),
  C.tiles({ tall: true,
    items: [...bath.map((b) => ({ title: b.plainTitle || b.title, href: `/bathrooms/${b.slug}/`, img: b.card })),
      { title: 'Kitchens', href: '/kitchens/', img: 'products-card' }] }),
  bathReviews(),
  processSteps(),
  learnMore(),
].join('\n'));

// ---------- Kitchens overview ----------
page('/kitchens/', 'Kitchen Remodeling', `Kitchen remodeling by ${SITE.name}: cabinets, countertops, backsplash, sinks, and faucets, designed and installed by one team.`, [
  C.hero({ img: 'kitchens-header', alt: 'Remodeled kitchen', kitchen: true, title: 'Kitchen <strong>Remodeling</strong>', lead: 'From a quick refresh to a full transformation, we design and install kitchens that fit the way you cook and gather.' }),
  C.sideBySide({ title: 'One Team, <strong>Start to Finish</strong>', img: 'kitchens-intro', alt: 'Kitchen with island',
    text: '<p>Juggling separate cabinet, countertop, and plumbing contractors is stressful. With Bulldog Kitchen &amp; Bath, one design consultant and one installation crew handle your entire kitchen, on one schedule and one warranty. ' + sinceLine('has been designing and installing kitchens that fit the way families cook and gather.') + '</p><p>It starts with an in-home design consultation. From there we handle cabinet replacement or refacing, countertops fabricated to fit, and the backsplash, sinks, faucets, and lighting.</p>' }),
  C.anatomy(extras.cabinets.anatomy),
  C.featureImage({ title: 'Cabinet Styles <strong>&amp; Finishes</strong>', lead: 'Mix and match door styles and finishes to create a kitchen that is all your own.', img: 'kitchens-cabinet-styles',
    alt: 'Kitchen showing cabinet finishes: Graphite Shaker, White Shaker, Light Sage, White Oak, and Sierra Cherry' }),
  C.materials({ title: 'What Our Cabinets <strong>Are Made Of</strong>', lead: 'Quality you can see, built from materials that last.', items: [
    { title: 'Solid Wood', img: 'kitchens-material-solid-wood', alt: 'Stacked solid wood boards', text: 'We offer solid wood cabinet doors in a variety of hardwoods, from birch to oak.' },
    { title: 'Plywood', img: 'kitchens-material-plywood', alt: 'Layered plywood edges', text: 'Our cabinet boxes are built from plywood for long-lasting strength and durability.' },
    { title: 'MDF / HDF', img: 'kitchens-material-mdf', alt: 'Stack of fiberboard panels', text: 'Engineered from compressed wood fibers, it resists water, warping, and cracking.' },
    { title: 'Particle Board', no: true, img: 'kitchens-material-particle-board', alt: 'Close-up of particle board', text: 'It soaks up water, cracks easily, and wears out sooner, so we don\'t use it.' },
  ] }),
  C.tiles({ title: 'Explore <strong>Kitchen Services</strong>', tall: true,
    items: kitchen.map((k) => ({ title: k.plainTitle || k.title, href: `/kitchens/${k.slug}/`, img: k.card })) }),
  C.gallery({ title: 'Kitchen <strong>Gallery</strong>', images: ['kitchens-gallery-1', 'kitchens-gallery-2', 'kitchens-gallery-3', 'kitchens-gallery-4', 'kitchens-gallery-8'] }),
  kitchenReviews(),
  processSteps(),
  learnMore(),
].join('\n'));

// ---------- Inspiration ----------
const styles = [
  ['Riverstone with Classic Tile Pattern', 'shop-the-room-riverstone'], ['Tundra Solid Stone', 'shop-the-room-tundra'], ['Concrete with Block Pattern', 'shop-the-room-concrete'],
  ['Tuscan Warmth', 'shop-the-room-tuscan'], ['Travertine Classic', 'shop-the-room-travertine'], ['Calacatta-Style Marble', 'shop-the-room-calacatta'],
  ['White Shaker Kitchen', 'shop-the-room-white-shaker'], ['Two-Tone Modern Kitchen', 'shop-the-room-two-tone'], ['Warm Wood Kitchen', 'shop-the-room-warm-wood'],
];
page('/inspiration-shop-the-room/', 'Shop the Room', `Browse kitchen and bathroom styles from ${SITE.name} and get the look for your home.`, [
  C.hero({ img: 'shop-the-room-header', alt: 'Styled bathroom', title: 'Shop <strong>The Room</strong>', lead: 'Find a look you love, then request an estimate to bring it home.' }),
  C.cards({ title: 'Get <strong>The Look</strong>', perRow: 3, link: 'Get This Look',
    items: styles.map(([t, im]) => ({ title: t, img: im, href: '/about/#contact' })) }),
  exploreBath(),
].join('\n'));

const spotlights = [
  { title: 'Peaceful <strong>Sanctuary</strong> Style', sub: 'Travertine-look walls with brushed nickel', text: 'Soft, warm stone tones and a frameless-style glass door create a calm, spa-like retreat. A built-in niche and corner bench keep the space uncluttered.', imgs: ['showers-feature', 'design-spotlight-sanctuary-1', 'bathtubs-feature', 'design-spotlight-sanctuary-2', 'design-spotlight-sanctuary-3'] },
  { title: 'Warm and Earthy <strong>Attic</strong> Style', sub: 'Stone walls under a sloped ceiling', text: 'Smart planning turned an awkward attic bath into a cozy, functional room. Earthy finishes and wood accents tie it to the rest of the home.', imgs: ['design-spotlight-attic-1', 'design-spotlight-attic-2', 'design-spotlight-attic-3', 'shower-enclosures-feature'] },
  { title: 'Traditional Style with <strong>Industrial Edge</strong>', sub: 'Concrete-look panels and matte black hardware', text: 'Cool gray walls, bold black fixtures, and clean lines give a classic layout a fresh, modern attitude.', imgs: ['bath-accessories-header', 'design-spotlight-industrial-1', 'design-spotlight-industrial-2', 'design-spotlight-industrial-3'] },
  { title: 'Bright <strong>Family Kitchen</strong>', sub: 'White shaker cabinets with quartz counters', text: 'An open layout, an oversized island, and durable, easy-clean surfaces make this kitchen the hub of a busy household.', imgs: ['design-spotlight-family-kitchen-1', 'kitchen-cabinets-feature', 'countertops-gallery-4', 'design-spotlight-family-kitchen-2', 'countertops-feature'] },
];
page('/inspiration-design-spotlight/', 'Design Spotlight', `Real kitchen and bathroom design ideas from ${SITE.name}.`, [
  C.hero({ img: 'design-spotlight-header', alt: 'Featured bathroom design', title: 'Design <strong>Spotlight</strong>', lead: 'A closer look at finished spaces and the details that make them work.' }),
  ...spotlights.map((s, i) => C.sideBySide({ title: s.title.replace(/<\/?strong>/g, ''), img: s.imgs[0], alt: s.sub, reverse: i % 2 === 1, spot: true,
    text: `<h3>${s.sub}</h3><p>${s.text}</p>`, buttons: [['Get This Look', '/about/#contact']] })
    + C.gallery({ images: s.imgs.slice(1), spot: true })),
].join('\n'));

// ---------- One day remodel ----------
page('/one-day-bathroom-remodel/', 'One Day Bathroom Remodel', `Get a beautiful new bathroom in as little as one day with ${SITE.name}.`, [
  C.banner({ titleTag: 'h1', bold: true, title: 'A Brand-New Bath in As Little As One Day', img: 'home-one-day-banner', alt: 'Walk-in shower with marble-look wall panels, a grab bar and a glass panel',
    text: 'Most bathroom remodels drag on for weeks. Ours don\'t. Because every product is custom-measured and prepared before install day, our crew can remove your old tub or shower and install your new one, often in a single visit.',
    buttons: [['Schedule an Estimate', '/about/#contact']] }),
  bulldogDifference({
    title: '<strong>The Bulldog Difference in Just One Day</strong>',
    tagline: 'A New Bath Without the Wait',
    items: [
      { icon: 'sparkles', title: 'Little Disruption', text: 'No weeks of torn-up rooms. Your bathroom is out of service for as little as one day, and we clean up before we leave.' },
      { icon: 'homeShield', title: 'Measured Before Install Day', text: 'Your base, walls, and trim are custom-measured and prepared ahead of time, so install day goes to plan.' },
      { icon: 'calendarCheck', title: 'Done in As Little As One Day', text: 'Our own crew removes your old tub or shower and installs the new one, often in a single visit.' },
      { icon: 'diamond', title: 'Quality That Lasts', text: 'Durable, non-porous products resist mold, mildew, and stains, and they are backed by our lifetime warranty.' },
    ],
  }),
  processSteps({
    title: 'Your New Bath <strong>in Four Simple Steps</strong>',
    text: 'Most of the work happens before install day, so the part you live through is short.',
    items: [
      { title: 'Consultation', text: 'We measure your bathroom and help you choose your tub or shower, walls, and finishes.' },
      { title: 'Custom Prep', text: 'Your base, walls, and trim are made to your exact measurements before we arrive.' },
      { title: 'Install Day', text: 'Our crew removes the old tub or shower and installs the new one, usually in one day.' },
      { title: 'Enjoy', text: 'We clean up, show you how to care for your new bath, and register your warranty.' },
    ],
  }),
  C.sideBySide({ title: 'Quality Products for Your <strong>One Day Remodel</strong>', img: 'financing-header', alt: 'Bathroom remodel',
    text: '<p>Fast doesn\'t mean cutting corners. Our tubs, showers, and wall systems are built from durable, non-porous materials that resist mold, mildew, and stains, and they\'re backed by our lifetime warranty.</p>',
    buttons: [['View Bath Products', '/bathrooms/']] }),
  bathReviews(),
].join('\n'));

// ---------- Promos & forms ----------
page('/current-promos/', 'Current Promos', `Current offers and discounts from ${SITE.name}.`, [
  C.offerCards({ title: 'Current <strong>Promos</strong>', titleTag: 'h1', allLink: false, offers: [promos.dollarsOff, promos.financing, promos.design, promos.senior, promos.military, promos.sixty] }),
  bulldogDifference(),
].join('\n'));

page('/financing/', 'Financing', `Flexible financing for your kitchen or bathroom remodel from ${SITE.name}.`, [
  C.photoStrip('financing-header', 'Remodeled bathroom'),
  C.formPage({ bold: true, title: 'Up to 60-Month Financing Available – Get $1,250 OFF',
    text: 'and transform your kitchen or bathroom with low monthly payments.* Financing subject to credit approval; terms vary.',
    form: C.estimateForm({ id: 'fin', promo: true, bare: true }) }),
].join('\n'));

// ---------- About ----------
page('/about/', 'About Us', `Learn about ${SITE.name}, your local kitchen and bathroom remodeling team, and how to reach us for an estimate.`, [
  C.hero({ img: 'about-header', alt: 'Walk-in shower with stone-look walls, a window and a black-framed sliding glass door', title: 'About <strong>Bulldog Kitchen &amp; Bath</strong>', lead: 'Tough on quality. Easy to work with.' }),
  C.sideBySide({ title: 'Who <strong>We Are</strong>', img: 'about-installer', alt: 'Finished walk-in shower with marble-look walls and a sliding glass door',
    text: `<p>We design and install high-quality, affordable showers, tubs, wall systems, cabinets, and countertops, with many bath remodels finished in as little as one day.</p><p>${SITE.name} was built on a simple idea: remodeling should be stress-free. Since ${SITE.founded} we've helped homeowners in ${SITE.serviceArea} update their kitchens and baths with durable products, honest pricing, and crews who treat your home like their own.</p>` }),
  bulldogDifference(),
  C.sideBySide({ title: 'Our <strong>Promise</strong>', img: 'about-family', alt: 'Family preparing food at a granite kitchen island', reverse: true, grey: true,
    text: '<p>Every project comes with a design consultation, clear written pricing, a dedicated project coordinator, and a lifetime warranty on our products and workmanship. If something isn\'t right, we make it right. Great craftsmanship should be affordable, and every project is built to deliver exceptional value.</p><p>We\'re licensed and insured, every installer is background-checked, and our pricing is clear and upfront.</p>' }),
  processSteps(),
  // Service area: map centered on the showroom, zoomed out to show the tri-state area (keyless Google Maps embed)
  C.sideBySide({ title: 'Our <strong>Service Area</strong>', grey: true,
    media: `<iframe class="map-embed" title="Map of the ${SITE.name} service area around Cincinnati" src="https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&amp;z=9&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`,
    text: `<p>${SITE.name} serves ${SITE.serviceArea}. Our showroom is at ${SITE.address}, and our own crews come to your home for the consultation and the install.</p><p>Not sure if we cover your address? Call us or request an estimate and we will confirm.</p>`,
    buttons: [['Request an Estimate', '#contact'], [SITE.phone, `tel:${SITE.phoneHref}`, 'button--outline']] }),
  // Contact details and estimate form (the old Contact page); menu and buttons link here as /about/#contact
  C.sideBySide({ id: 'contact', title: 'Get in <strong>Touch</strong>',
    text: `<p>Ready to start, or just have a question? Reach out and a ${SITE.name} design consultant will get back to you quickly.</p>
<ul class="contact-list">
  <li>${C.icon.phone}<div><strong>Call</strong><br><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></div></li>
  <li>${C.icon.mail}<div><strong>Email</strong><br><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
  <li>${C.icon.pin}<div><strong>Showroom</strong><br>${SITE.address}</div></li>
  <li>${C.icon.clock}<div><strong>Hours</strong><br>${SITE.hours}</div></li>
</ul>`,
    media: C.estimateForm({ id: 'contact', heading: 'Request <strong>an Estimate</strong>', message: true }), reverse: true, grey: true }),
  learnMore(),
].join('\n'));

// ---------- Blog ----------
page('/blog/', 'Blog', `Remodeling tips, ideas, and guides from ${SITE.name}.`, [
  C.pageBand({ title: 'The Bulldog Kitchen &amp; Bath <strong>Blog</strong>', lead: 'Ideas, tips, and guides for your next kitchen or bathroom project.' }),
  C.cards({ perRow: 3, link: 'Read More', items: posts.map((p) => ({ title: p.title, img: p.img, href: `/blog/${p.slug}/`, text: p.excerpt, meta: p.date })) }),
].join('\n'));
posts.forEach((p) => page(`/blog/${p.slug}/`, p.title, p.description || p.excerpt, [
  C.pageBand({ title: p.title, extra: `<p class="post-meta">${p.date} · ${SITE.name}${p.draft ? ' · <strong>DRAFT, not on the live site</strong>' : ''}</p>` }),
  `<section class="section"><div class="container prose">${C.picture(p.img, p.title)}${p.body}
  <p><a class="button" href="/about/#contact">Request an Estimate</a></p>
  <p><a class="link-arrow" href="/blog/">&larr; Back to the blog</a></p></div></section>`,
].join('\n')));

// ---------- 404 ----------
page('/404', 'Page Not Found', 'The page you were looking for could not be found.', [
  C.pageBand({ title: 'Page <strong>Not Found</strong>', lead: 'Sorry, we couldn\'t find that page.', extra: '<p style="margin-top:1.5rem"><a class="button" href="/">Back to Home</a></p>' }),
  exploreBath(),
].join('\n'));

// ---------- Write ----------
// Blog pages are regenerated from scratch so a post that is no longer in this build (a draft
// built on a preview branch, a renamed slug, a deleted post) does not linger as a stale page.
fs.rmSync(path.join(OUT, 'blog'), { recursive: true, force: true });
for (const p of pages) {
  const file = p.path === '/404' ? path.join(OUT, '404.html') : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  // Every page with FAQs gets them as its last section
  const faqs = pageFaqs[p.path];
  fs.writeFileSync(file, C.layout(faqs ? { ...p, body: p.body + '\n' + C.faqSection(faqs) } : p));
}
const urls = pages.filter((p) => p.path !== '/404').map((p) => `  <url><loc>https://${SITE.domain}${p.path}</loc></url>`).join('\n');
// Retired pages forward old links: Contact moved onto About, FAQs moved onto each page, Warranty removed, bath pages moved
const redirect = (from, to, title) => {
  fs.mkdirSync(path.join(OUT, from), { recursive: true });
  fs.writeFileSync(path.join(OUT, from, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title} | ${SITE.name}</title><link rel="canonical" href="https://${SITE.domain}${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace('${to}')</script></head><body><p><a href="${to}">${title}</a></p></body></html>\n`);
};
redirect('contact', '/about/#contact', 'Contact Us');
redirect('faqs', '/', 'Frequently Asked Questions');
redirect('warranty', '/', 'Warranty');
// Bath pages moved from /products/ to /bathrooms/ to match /kitchens/
redirect('products', '/bathrooms/', 'Bath Products');
bath.forEach((p) => redirect(path.join('products', p.slug), `/bathrooms/${p.slug}/`, p.plainTitle || p.title));
// Pages folded into others: their old addresses forward to the page that took in their content
const folded = [
  ['bathrooms/accessibility', '/bathrooms/walk-in-tubs/', 'Accessibility'],
  ['bathrooms/shower-enclosures', '/bathrooms/showers/', 'Shower Enclosures'],
  ['bathrooms/accessories', '/bathrooms/showers/', 'Accessories'],
  ['bathrooms/colors-patterns', '/inspiration-colors-patterns/', 'Colors & Patterns'],
  ['kitchens/backsplash', '/kitchens/countertops/', 'Backsplash'],
  ['kitchens/sinks-faucets', '/kitchens/countertops/', 'Sinks & Faucets'],
  ['kitchens/organizers-accessories', '/kitchens/cabinets/', 'Organizers & Accessories'],
];
folded.forEach(([from, to, title]) => {
  redirect(from, to, title);
  if (from.startsWith('bathrooms/')) redirect(path.join('products', from.slice('bathrooms/'.length)), to, title);
});
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${SITE.domain}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages into ${OUT}`);
