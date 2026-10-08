// Extra product-page content keyed by product slug:
//   since:   ending of the "Since <year>, Bulldog Kitchen & Bath ..." sentence in the intro
//   benefits: labelled points shown in the feature section
//   learn:   closing "Learn More" banner text for that product
//   accessories: named accessory grid with category filters (accessories page)
//   anatomy: cabinet photo with labeled construction details, shown right after the intro
//   solutions: sideways slider of photo cards, shown after the anatomy section

const standard = (thing) => [
  ['Easy Maintenance', `Non-porous surfaces resist mold and mildew, so keeping your new ${thing} clean takes a quick wipe instead of a scrub brush.`],
  ['Customizable Style', 'Choose from stone looks, tile patterns, solid colors, trim, and fixtures to match any bathroom.'],
  ['Exceptional Durability', 'Scratch-, chip-, stain-, and fade-resistant materials keep looking new for years.'],
  ['Fast Installation', 'Every piece is custom-measured before install day, so our own crews can often finish in a single day.'],
  ['Lifetime Warranty', 'Products and workmanship are backed for as long as you own your home.*'],
];

module.exports = {
  showers: {
    since: 'has been helping homeowners replace worn-out tubs and showers with durable, easy-care shower systems built to last.',
    benefits: standard('shower'),
    learn: { title: 'Learn More About <strong>Bulldog Showers</strong>',
      text: 'Whether you\'re replacing an old shower or converting a tub, Bulldog builds showers that combine solid craftsmanship with thoughtful design, so you can count on dependable quality and lasting value. Request an estimate or call us to talk through your options.' },
  },
  bathtubs: {
    since: 'has been installing bathtubs that stand up to everyday family life while staying easy to clean.',
    benefits: standard('tub'),
    learn: { title: 'Learn More About <strong>Bulldog Bathtubs</strong>',
      text: 'A new tub and matching wall surround is one of the fastest ways to transform a bathroom, and Bulldog is the affordable choice for lasting quality and style. Request an estimate or call us to see which tub fits your space.' },
  },
  'walk-in-tubs': {
    since: 'has been committed to providing secure, top-quality walk-in tubs designed for safety and comfort.',
    benefits: [
      ['Hydromassage', 'Water jets target sore muscles and joints for soothing relief.'],
      ['Air Massage', 'Gentle air bubbles relax the whole body without strong pressure points.'],
      ['Chromatherapy', 'Soft colored lighting sets a calm, spa-like mood.'],
      ['Heated Backrest', 'Stay warm and comfortable while the tub fills and drains.'],
      ['Quick Drain', 'Faster draining means less time waiting before you step out.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Walk-In Tubs</strong>',
      text: 'Enjoy bathing again with a safe, comfortable walk-in tub that fits your existing space. Call us or request an estimate to learn about affordable accessibility options.' },
  },
  accessibility: {
    since: 'has been designing accessible bathrooms that help seniors and people with limited mobility bathe safely at home.',
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
    since: 'has been finishing showers with glass doors and enclosures that are measured, fitted, and sealed by our own crews.',
    benefits: [
      ['Sliding & Bypass Doors', 'Space-saving doors that glide open, ideal for tubs and wide showers.'],
      ['Pivot & Hinged Doors', 'A clean, frameless-style look for walk-in showers.'],
      ['Curtain Rods', 'Straight and curved rods in the same four finishes as our doors.'],
      ['Protective Glass Coating', 'Helps water bead off so spots and soap scum wipe away.'],
      ['Custom-Measured', 'Every enclosure is sized to your opening for a precise, watertight fit.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Shower Enclosures</strong>',
      text: 'The right door finishes your new shower and keeps water where it belongs, and Bulldog is the affordable choice for lasting quality and style. Request an estimate or call us to see glass and finish samples.' },
  },
  accessories: {
    since: 'has been helping homeowners add the storage, safety, and finishing touches that make a bathroom work every day.',
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
    since: 'has been helping homeowners choose colors and patterns that make a new bathroom feel like their own.',
    benefits: [
      ['Stone Looks', 'Marble, granite, and travertine looks without the sealing and upkeep of real stone.'],
      ['Solid Colors', 'Classic whites, almonds, and grays in matte or gloss.'],
      ['Tile Patterns', 'Subway, hexagon, herringbone, and more, with no grout to clean.'],
      ['Trim & Accents', 'Matching or contrasting trim, borders, and accessories.'],
    ],
    learn: { title: 'Learn More About <strong>Bulldog Colors &amp; Patterns</strong>',
      text: 'See real samples in your own lighting during your design consultation. With so many options, Bulldog is the affordable choice for lasting quality and style. Request an estimate or call us to get started.' },
  },
  cabinets: {
    since: 'has been installing and refacing kitchen cabinets built for the way families actually cook and live.',
    anatomy: { title: 'What\'s Inside <strong>Every Cabinet</strong>', lead: 'Solid wood doors, plywood boxes, and soft-close hardware, built to hold up to everyday use.',
      img: 'cab-unit', alt: 'Shaker base cabinet with the door and drawer open', tagline: 'Crafted With Precision, <strong>Designed for Durability</strong>',
      items: [
        { img: 'cab-feat-1', title: 'Solid Wood Door & Frame', text: '3/4" solid wood door with a 12mm MDF center panel, on a 3/4" solid hardwood face frame.' },
        { img: 'cab-feat-8', title: 'All-Plywood Box', text: '1/2" plywood box and toe kick with 3/4" adjustable shelves, UV coated, outside finished to match the door.' },
        { img: 'cab-feat-3', title: 'Dovetail Drawers', text: '5/8" solid finger-jointed rubberwood in a natural finish.' },
        { img: 'cab-feat-2', title: 'Soft-Close Hinges', text: 'DTC concealed hinges, adjustable six ways, with door and drawer bumpers for quiet closing.' },
        { img: 'cab-feat-4', title: 'Soft-Close Drawer Slides', text: 'DTC heavy-duty undermount, full extension, concealed.' },
        { img: 'cab-feat-7', title: 'Metal Corner Brackets', text: '90 degree brackets keep the box square and strong.' },
      ] },
    solutions: { title: 'Cabinet Solutions for <strong>Every Project</strong>', items: [
      { img: 'cabinets-1', title: 'Kitchen Cabinets', alt: 'Kitchen with new cabinets' },
      { img: 'sol-bath-vanity', title: 'Bathroom Vanity Cabinets', alt: 'White shaker double bathroom vanity' },
      { img: 'sol-closet', title: 'Closet Storage Systems', alt: 'Walk-in closet with wood cabinets and drawers' },
      { img: 'sol-entryway', title: 'Entryway Cabinets', alt: 'Low cabinet in an entry hallway' },
      { img: 'sol-vanity-table', title: 'Vanity Tables', alt: 'White vanity table with a lighted mirror' },
      { img: 'sol-tv', title: 'TV Cabinets', alt: 'White TV cabinet in a living room' },
    ] },
  },
  countertops: {
    since: 'has been fabricating and installing countertops that stand up to busy kitchens.',
  },
  backsplash: {
    since: 'has been installing backsplashes that protect kitchen walls and pull the whole room together.',
  },
  'sinks-faucets': {
    since: 'has been matching sinks and faucets to the way homeowners cook, clean, and entertain.',
  },
};
