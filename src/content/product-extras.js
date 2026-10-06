// Extra product-page content keyed by product slug:
//   benefits — labelled points shown in the feature section
//   learn    — closing "Learn More" banner text for that product
//   accessories — named accessory grid with category filters (accessories page)

const standard = (thing) => [
  ['Easy Care', `Non-porous surfaces resist mold and mildew, so keeping your new ${thing} clean takes a quick wipe instead of a scrub brush.`],
  ['Your Style', 'Choose from stone looks, tile patterns, solid colors, trim, and fixtures to match any bathroom.'],
  ['Built to Last', 'Scratch-, chip-, stain-, and fade-resistant materials keep looking new for years.'],
  ['Fast Installation', 'Every piece is custom-measured before install day, so our own crews can often finish in a single day.'],
  ['Lifetime Warranty', 'Products and workmanship are backed for as long as you own your home.*'],
];

module.exports = {
  showers: {
    benefits: standard('shower'),
    learn: { title: 'Learn More About <strong>Bulldog Showers</strong>',
      text: 'Whether you\'re replacing an old shower or converting a tub, Bulldog builds showers that combine solid craftsmanship with thoughtful design. Request an estimate or call us to talk through your options.' },
  },
  bathtubs: {
    benefits: standard('tub'),
    learn: { title: 'Learn More About <strong>Bulldog Bathtubs</strong>',
      text: 'A new tub and matching wall surround is one of the fastest ways to transform a bathroom. Request an estimate or call us to see which tub fits your space.' },
  },
  'walk-in-tubs': {
    benefits: [
      ['Hydromassage', 'Water jets target sore muscles and joints for soothing relief.'],
      ['Air Massage', 'Gentle air bubbles relax the whole body without strong pressure points.'],
      ['Chromatherapy', 'Soft colored lighting sets a calm, spa-like mood.'],
      ['Heated Backrest', 'Stay warm and comfortable while the tub fills and drains.'],
      ['Quick Drain', 'Faster draining means less time waiting before you step out.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Walk-In Tubs</strong>',
      text: 'Enjoy bathing again with a safe, comfortable walk-in tub that fits your existing space. Call us or request an estimate to learn about accessibility options.' },
  },
  accessibility: {
    benefits: [
      ['Walk-In Tubs', 'Step in through a sealed door instead of climbing over a high tub wall.'],
      ['Roll-In Showers', 'Barrier-free bases with no curb, so a wheelchair or walker can roll straight in.'],
      ['Low-Threshold Bases', 'A low step makes everyday showering safer without a full roll-in conversion.'],
      ['Tub-to-Shower Conversions', 'Replace a hard-to-use tub with an easy-access shower in as little as one day.'],
      ['Seats, Grab Bars & Handhelds', 'Fold-down seats, decorative grab bars, and handheld showers wherever you need them.'],
    ],
    learn: { title: 'Learn More About <strong>Accessible Bathrooms</strong>',
      text: 'Our accessible designs help you stay safe and independent at home without giving up a beautiful bathroom. Call us or request an estimate to plan your upgrade.' },
  },
  'shower-enclosures': {
    benefits: [
      ['Sliding & Bypass Doors', 'Space-saving doors that glide open, ideal for tubs and wide showers.'],
      ['Pivot & Hinged Doors', 'A clean, frameless-style look for walk-in showers.'],
      ['Curtain Rods', 'Straight and curved rods in the same four finishes as our doors.'],
      ['Protective Glass Coating', 'Helps water bead off so spots and soap scum wipe away.'],
      ['Custom-Measured', 'Every enclosure is sized to your opening for a precise, watertight fit.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Shower Enclosures</strong>',
      text: 'The right door finishes your new shower and keeps water where it belongs. Request an estimate or call us to see glass and finish samples.' },
  },
  accessories: {
    benefits: [
      ['Faucets & Spouts', 'Coordinated finishes from the tub spout to the sink.'],
      ['Shower Heads', 'Rain heads, handheld wands, and multi-setting massage heads.'],
      ['Grab Bars', 'Decorative bars that add safety without looking clinical.'],
      ['Shower Seats', 'Built-in and fold-down seating that blends into your wall system.'],
      ['Storage', 'Recessed niches, corner shelves, and caddies that keep everything in reach.'],
      ['Foot Rests & Soap Dishes', 'Small details in colors and patterns that match your walls.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Accessories</strong>',
      text: 'Make your new bath or shower fit the way your family lives. Request an estimate or call us to choose accessories during your design consultation.' },
    accessories: {
      filters: [['storage', 'Storage'], ['safety', 'Safety & Seating'], ['fixtures', 'Shower Heads & Fixtures']],
      items: [
        { name: 'Recessed Niche', img: 'acc-niche', cat: 'storage' },
        { name: 'Shower Shelf', img: 'acc-shelf', cat: 'storage' },
        { name: 'Built-In Shelving', img: 'accessory-2', cat: 'storage' },
        { name: 'Towel Bars', img: 'acc-towel-bar', cat: 'storage' },
        { name: 'Grab Bar', img: 'acc-grab-bar', cat: 'safety' },
        { name: 'Tub Grab Bar', img: 'access-3', cat: 'safety' },
        { name: 'Toilet Grab Bar', img: 'access-4', cat: 'safety' },
        { name: 'Shower Seat', img: 'acc-seat', cat: 'safety' },
        { name: 'Rain Shower Head', img: 'acc-rain-head', cat: 'fixtures' },
        { name: 'Handheld Shower', img: 'acc-handheld', cat: 'fixtures' },
        { name: 'Tub Spout', img: 'acc-tub-spout', cat: 'fixtures' },
        { name: 'Shower Curtain Rod', img: 'acc-curtain-rod', cat: 'fixtures' },
      ],
    },
  },
  'colors-patterns': {
    benefits: [
      ['Stone Looks', 'Marble, granite, and travertine looks without the sealing and upkeep of real stone.'],
      ['Solid Colors', 'Classic whites, almonds, and grays in matte or gloss.'],
      ['Tile Patterns', 'Subway, hexagon, herringbone, and more — with no grout to clean.'],
      ['Trim & Accents', 'Matching or contrasting trim, borders, and accessories.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Colors &amp; Patterns</strong>',
      text: 'See real samples in your own lighting during your design consultation. Request an estimate or call us to get started.' },
  },
};
