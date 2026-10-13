// Product category pages (bath + kitchen). Each entry renders with the product page template.
const bath = [
  {
    slug: 'showers', title: 'Showers &amp; Enclosures', plainTitle: 'Showers & Enclosures', card: 'showers-card',
    hero: 'showers-header', lead: 'Low-maintenance, custom-fit showers designed around the way you live, installed fast by our own crews.',
    intro: { title: 'A Shower for <strong>Every Lifestyle</strong>', img: 'blog-tub-to-shower',
      text: '<p>Whether you want a sleek walk-in, a tub-to-shower conversion, or a safer low-threshold base, we build a cost-effective shower that fits your space and your routine. Our solid-surface wall systems go up over a properly prepared substrate with no grout lines to scrub.</p><p>Every base and wall panel is custom-measured for your space, and we can add built-in seats, niches, and shelving, plus a slip-resistant textured floor for safer footing. It all adds up to a convenient, affordable upgrade with long-term value.</p>' },
    // 4 from Showers + 4 from the folded-in Shower Enclosures page
    gallery: ['showers-gallery-1', 'shower-enclosures-header', 'shower-enclosures-intro', 'shower-enclosures-card',
      'shower-enclosures-gallery-1', 'shower-enclosures-gallery-2', 'shower-enclosures-gallery-3', 'shower-enclosures-gallery-4'],
    feature: { title: 'Stunning, <strong>Space-Saving Showers</strong>', img: 'showers-feature',
      text: '<p>Small bathroom? A frameless glass door and a low-profile base can make the room feel twice as big. We help you pick the layout, trim, and fixtures that open up the space without sacrificing storage.</p>' },
  },
  {
    slug: 'bathtubs', title: 'Bathtubs', card: 'bathtubs-card',
    hero: 'bathtubs-header', lead: 'Replace a worn, dated tub with a durable, easy-clean bath and a matching wall surround, often in a single day.',
    intro: { title: 'A Bath Built for <strong>Relaxing</strong>', img: 'bathtubs-intro',
      text: '<p>From classic alcove tubs to deep soakers, our budget-friendly bathtubs are built to resist chips, stains, and fading. Pair one with a seamless wall system and you get a finished, spa-like look with almost no upkeep.</p><p>Choose a soaking or standard-depth tub, convert an existing shower back to a tub, and finish the space with a matching wall surround and trim.</p>' },
    gallery: ['bathtubs-gallery-1', 'bathtubs-gallery-13', 'bathtubs-header', 'bathtubs-gallery-2'],
    feature: { title: 'Family-Friendly <strong>Tub &amp; Shower Combos</strong>', img: 'bathtubs-feature',
      text: '<p>A tub-and-shower combo is still the most practical choice for many homes. We pair a comfortable tub with a full wall system, grab bars, and storage so the whole family can use it every day, all at an affordable price.</p>' },
  },
  {
    slug: 'tub-to-shower-conversions', title: 'Tub-to-Shower Conversions', card: 'tub-to-shower-card',
    hero: 'tub-to-shower-header', lead: 'Swap a hard-to-step-over tub for a roomy, easy-entry walk-in shower, often in as little as one day.',
    intro: { title: 'From Tub to <strong>Walk-In Shower</strong>', img: 'tub-to-shower-intro',
      text: '<p>If you rarely take baths, that old tub is just a high wall you climb over every day. We remove it and install a custom-fit shower base and a solid-surface wall system in the same space, with no grout lines to scrub.</p><p>Choose a low-threshold or standard base and a glass door or curtain rod, then add a built-in seat, grab bars, shelves, and a handheld shower. Most conversions use the existing plumbing, which keeps the job fast and affordable.</p>' },
    gallery: ['tub-to-shower-gallery-1', 'tub-to-shower-card', 'tub-to-shower-gallery-2', 'tub-to-shower-gallery-3'],
    feature: { title: 'Safer, <strong>Easier Showers</strong>', img: 'tub-to-shower-feature',
      text: '<p>A low step-in base, a slip-resistant floor, and well-placed grab bars make a converted shower safer for everyone, and a smart choice if you plan to stay in your home for years.</p>' },
  },
  {
    slug: 'walk-in-tubs', title: 'Walk-In Tubs &amp; Accessibility', plainTitle: 'Walk-In Tubs & Accessibility', card: 'walk-in-tubs-card',
    hero: 'walk-in-tubs-header', lead: 'Bathe safely and comfortably with a low-entry walk-in tub, and make the whole bathroom safer with grab bars, seats, and easy-entry showers.',
    intro: { title: 'Safety and Comfort, <strong>Every Day</strong>', img: 'promos-senior',
      text: '<p>A walk-in tub lets you step in instead of climbing over a high wall. Built-in seating, a leak-proof door, and grab bars help you stay independent at home longer.</p><p>Features include a low step-in threshold, an ADA-height seat, a leak-tight door seal, a handheld shower wand so you can rinse off before you open the door, and a door that swings inward or outward on whichever side fits your bathroom.</p>' },
    // 4 from Walk-In Tubs + 4 from the folded-in Accessibility page
    gallery: ['walk-in-tubs-card', 'accessibility-intro', 'blog-aging-in-place', 'bathtubs-gallery-2',
      'accessibility-card', 'accessibility-gallery-1', 'accessibility-gallery-2', 'accessibility-gallery-3'],
    feature: { title: 'Affordable <strong>Walk-In Tubs</strong>', img: 'walk-in-tubs-feature',
      text: '<p>Choose a simple soaker with deep, warm water, or add a therapy package: water jets that target your back, legs, and feet, air jets that massage your whole body with gentle bubbles, or a combination of both for the full spa experience.</p><p>Heated seats and backrests keep you warm while the tub fills, and fast-drain valves mean less waiting before you step out. Together they turn your daily bath into a soothing routine that can ease sore muscles and joints. With minimal disruption and no major remodeling, installation often takes as little as one day, making a walk-in tub a smart, affordable investment.</p>' },
  },
  {
    slug: 'vanities', title: 'Bathroom Vanities', card: 'vanities-card',
    hero: 'vanities-header', lead: 'A new vanity, top, sink, and faucet that add storage and finish your bathroom, usually installed in a single day.',
    intro: { title: 'Storage and Style <strong>in One Piece</strong>', img: 'vanities-intro',
      text: '<p>Your vanity works harder than any other piece in the bathroom. We replace worn, cramped cabinets with sturdy vanities in single and double sizes, built to fit your space and your routine.</p><p>Pick a cabinet color and door style, a quartz, granite, or solid-surface top, and an undermount or vessel sink, then finish it with a faucet, mirror, and lighting that match.</p>' },
    gallery: ['vanities-card', 'vanities-gallery-1', 'vanities-gallery-2', 'vanities-gallery-3'],
    feature: { title: 'Single or <strong>Double Vanities</strong>', img: 'vanities-feature',
      text: '<p>Share a bathroom? A double vanity gives everyone their own sink and drawer space. Short on room? A compact single vanity with smart drawers keeps the counter clear.</p>' },
  },
];

const kitchen = [
  {
    slug: 'cabinets', title: 'Cabinets &amp; Organizers', plainTitle: 'Cabinets & Organizers', card: 'kitchen-cabinets-card',
    hero: 'blog-cabinet-refacing', lead: 'New, refaced, or refinished cabinets that bring order and style to the heart of your home.',
    intro: { title: 'Cabinets Built for <strong>Real Life</strong>', img: 'kitchen-cabinets-intro',
      text: '<p>Choose from shaker, flat-panel, and raised-panel doors in painted and wood finishes. We add the organizers you\'ll actually use: pull-outs, drawer dividers, and soft-close hardware throughout.</p><p>We offer full replacement or cabinet refacing, with painted, stained, and two-tone finishes and pull-out pantry and trash organizers.</p>' },
    // 4 from Cabinets + 4 from the folded-in Organizers & Accessories page
    gallery: ['kitchen-cabinets-gallery-1', 'kitchen-cabinets-gallery-2', 'kitchen-cabinets-gallery-3', 'about-header',
      'kitchen-organizers-gallery-1', 'kitchen-organizers-gallery-2', 'kitchen-organizers-gallery-3', 'kitchen-organizers-gallery-4'],
    feature: { title: 'Refacing: <strong>New Look, Less Disruption</strong>', img: 'kitchen-cabinets-feature',
      text: '<p>If your cabinet boxes are solid, refacing replaces doors, drawer fronts, and veneers for a brand-new look at a fraction of the time and cost of a full tear-out.</p>' },
  },
  {
    slug: 'countertops', title: 'Countertops &amp; Backsplash', plainTitle: 'Countertops & Backsplash', card: 'countertops-card',
    hero: 'countertops-header', lead: 'Quartz, granite, and solid-surface countertops, plus the backsplash, sink, and faucet that finish them, installed by our team.',
    intro: { title: 'Surfaces That <strong>Work Hard</strong>', img: 'countertops-intro',
      text: '<p>Your countertop takes daily abuse. We help you choose a surface that stands up to heat, stains, and scratches while matching your cabinets and floors.</p><p>Choose quartz, granite, or solid surface, with undermount sink cutouts, islands and breakfast bars, and an edge profile that suits your style.</p>' },
    // 4 from Countertops + 2 each from the folded-in Backsplash and Sinks & Faucets pages
    gallery: ['countertops-gallery-1', 'countertops-gallery-2', 'countertops-gallery-3', 'countertops-gallery-4',
      'backsplash-gallery-1', 'backsplash-gallery-2', 'sinks-faucets-gallery-1', 'sinks-faucets-gallery-2'],
    feature: { title: 'Precise <strong>Templating &amp; Install</strong>', img: 'countertops-feature',
      text: '<p>We digitally template your existing layout for a tight, accurate fit, then install with minimal downtime so you can get back to cooking quickly.</p>' },
  },
];

// Design guide shown under Inspiration (built with the product page template)
const colorsPatterns = {
    slug: 'colors-patterns', title: 'Colors &amp; Patterns', plainTitle: 'Colors & Patterns', card: 'colors-patterns-card',
    hero: 'financing-header', lead: 'Stone-look, tile-look, and solid finishes to match any style, from classic to modern.',
    intro: { title: 'Find <strong>Your Finish</strong>', img: 'colors-patterns-intro',
      text: '<p>Our wall systems come in a wide range of marble, granite, travertine, and solid colors, with optional tile patterns like subway, hexagon, and herringbone. Bring samples home during your consultation.</p><p>Solid colors come in matte or gloss, and accent trim and borders let you finish the look your way.</p>' },
    swatches: true,
    feature: { title: 'See It <strong>Before You Buy</strong>', img: 'colors-patterns-feature',
      text: '<p>Not sure what will work? Our designers can show you a 3D rendering of your bathroom with your chosen colors and patterns before anything is ordered.</p>' },
  };

module.exports = { bath, kitchen, colorsPatterns };
