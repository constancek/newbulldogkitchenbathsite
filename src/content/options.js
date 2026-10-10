// Product option swatches. Sample photos come from bathconcepts.com.

const finishes = [
  { name: 'Matte Black', img: 'finish-matte-black' },
  { name: 'Brushed Nickel', img: 'finish-brushed-nickel' },
  { name: 'Oil Rubbed Bronze', img: 'finish-oil-rubbed-bronze' },
  { name: 'Chrome', img: 'finish-chrome' },
];

const glass = [
  { name: 'Clear', img: 'glass-clear' },
  { name: 'Rain', img: 'glass-rain' },
  { name: 'Frosted', img: 'glass-frosted' },
  { name: 'Corrugated', img: 'glass-corrugated' },
];

const vGroove = [
  { name: 'Arrow', img: 'vgroove-arrow' },
  { name: 'Hopscotch', img: 'vgroove-hopscotch' },
  { name: 'Roman Block', img: 'vgroove-roman-block' },
  { name: 'Vertical Block', img: 'vgroove-vertical-block' },
];

// Wall colors (stone looks and solids)
const colors = [
  { name: 'Brecchia/Sierra Sand', img: 'color-brecchia-sierra-sand' },
  { name: 'Madeira/Santa Cruz Granite', img: 'color-madeira-santa-cruz-granite' },
  { name: 'River Rock/Canyon Rock', img: 'color-river-rock-canyon-rock' },
  { name: 'Travertine', img: 'color-travertine' },
  { name: 'Lightning', img: 'color-lightning' },
  { name: 'Quartz', img: 'color-quartz' },
  { name: 'Silver White', img: 'color-silver-white' },
  { name: 'Gray', img: 'color-gray' },
  { name: 'Almond', img: 'color-almond' },
  { name: 'Biscuit', img: 'color-biscuit' },
  { name: 'Sandbar', img: 'color-sandbar' },
  { name: 'White (Matte or Glossy)', img: 'color-white-matte-or-glossy' },
  { name: 'Arctic Ice', img: 'color-arctic-ice' },
  { name: 'Bianco Travertine', img: 'color-bianco-travertine' },
  { name: 'Calcutta Marble', img: 'color-calcutta-marble' },
  { name: 'Carbon Ash Classic Concrete', img: 'color-carbon-ash-classic-concrete' },
  { name: 'Evo', img: 'color-evo' },
  { name: 'Galena', img: 'color-galena' },
  { name: 'Glacier Ice', img: 'color-glacier-ice' },
  { name: 'Horizon Beige', img: 'color-horizon-beige' },
  { name: 'Metapeake', img: 'color-metapeake' },
  { name: 'Napoli Marble/Pompeii Marble', img: 'color-napoli-marble-pompeii-marble' },
  { name: 'San Michele', img: 'color-san-michele' },
  { name: 'Sandalwood', img: 'color-sandalwood' },
  { name: 'Santorini White Marble', img: 'color-santorini-white-marble' },
  { name: 'Tuscany', img: 'color-tuscany' },
  { name: 'Versailles', img: 'color-versailles' },
  { name: 'Grayline', img: 'color-grayline' },
  { name: 'London Fog', img: 'color-london-fog' },
  { name: 'Othello', img: 'color-othello' },
];

// Tile-look wall patterns
const patterns = [
  { name: '3x6 Subway', img: 'pattern-3x6-subway' },
  { name: '4x12 Subway', img: 'pattern-4x12-subway' },
  { name: '8x10', img: 'pattern-8x10' },
  { name: '9x15 Monument', img: 'pattern-9x15-monument' },
  { name: '12x12 Marazzi', img: 'pattern-12x12-marazzi' },
  { name: 'Bayview', img: 'pattern-bayview' },
  { name: 'Chevron', img: 'pattern-chevron' },
  { name: 'Cobblestone', img: 'pattern-cobblestone' },
  { name: 'Fairfield', img: 'pattern-fairfield' },
  { name: 'Flagstone', img: 'pattern-flagstone' },
  { name: 'Herringbone', img: 'pattern-herringbone' },
  { name: 'Hexagonal', img: 'pattern-hexagonal' },
  { name: 'Hopscotch', img: 'pattern-hopscotch' },
  { name: 'Milano', img: 'pattern-milano' },
  { name: 'Panorama', img: 'pattern-panorama' },
  { name: 'Picket', img: 'pattern-picket' },
  { name: 'Roman Block', img: 'pattern-roman-block' },
];

// Photo cards (img + short description) and extra swatches for the other product pages.
// Photos are free Pexels stock or this site's own product photos; names are generic.
const pick = (list, names) => names.map((n) => list.find((x) => x.name === n));

const showerBases = [
  { name: 'Standard Base', img: 'shower-2', text: 'A classic curbed base that keeps water in and fits most alcoves.' },
  { name: 'Low-Threshold Base', img: 'shower-8', text: 'A lower curb that makes stepping in and out easier.' },
  { name: 'Built-In Seat', img: 'tts-2', text: 'A molded bench for resting or shaving while you shower.' },
  { name: 'Neo-Angle Corner', img: 'shower-3', text: 'A space-saving corner shower for smaller bathrooms.' },
];

// A few popular wall colors and tile looks from Colors & Patterns
const wallStyles = [...pick(colors, ['Calcutta Marble', 'Travertine', 'Arctic Ice', 'Gray']), ...pick(patterns, ['3x6 Subway', 'Hexagonal'])];

const tubStyles = [
  { name: 'Standard Tub', img: 'hero-bath-1', text: 'A classic alcove tub with a matching wall surround, made for tub and shower combos.' },
  { name: 'Deep Soaker', img: 'tub-8', text: 'Extra depth for a full, relaxing soak.' },
  { name: 'Whirlpool', img: 'tub-5', text: 'Water jets that massage tired muscles.' },
  { name: 'Air Bath', img: 'tub-1', text: 'Gentle air bubbles for a soothing, spa-like soak.' },
];

const showerDoors = [
  { name: 'Sliding Glass Door', img: 'gallery-enc-1', text: 'Bypass panels that slide open, great for wider openings.' },
  { name: 'Hinged Glass Door', img: 'gallery-enc-4', text: 'Swings open for a wide, easy entry.' },
  { name: 'Frameless Glass', img: 'gallery-enc-2', text: 'Heavy glass with minimal hardware for a clean look.' },
  { name: 'Curtain Rod', img: 'acc-curtain-rod', text: 'A straight or curved rod for a simple, budget-friendly finish.' },
];

const safetyAddOns = [
  { name: 'Grab Bars', img: 'acc-grab-bar', text: 'Sturdy bars placed exactly where you need support.' },
  { name: 'Shower Seat', img: 'acc-seat', text: 'A built-in or fold-down seat for sitting while you shower.' },
  { name: 'Handheld Shower', img: 'acc-handheld', text: 'A slide-bar handheld you can raise, lower, or hold.' },
  { name: 'Slip-Resistant Floor', img: 'tts-4', text: 'A textured base floor for steadier footing.' },
];

const accessibilityProducts = [
  { name: 'Low-Threshold Base', img: 'shower-8', text: 'An easy step-in shower base with a low curb.' },
  { name: 'Grab Bars', img: 'acc-grab-bar', text: 'Decorative bars that add support without looking clinical.' },
  { name: 'Shower Seat', img: 'acc-seat', text: 'Built-in and fold-down seating that blends into your walls.' },
  { name: 'Handheld Shower', img: 'acc-handheld', text: 'An adjustable slide bar for seated or standing use.' },
];

// Walk-in tub feature cards (icon names from icons.js)
const walkInTherapy = [
  { icon: 'droplet', title: 'Soaker', text: 'Deep, warm water and a contoured seat for a simple, relaxing soak.' },
  { icon: 'sparkles', title: 'Hydrotherapy Jets', text: 'Water jets that target your back, legs, and feet.' },
  { icon: 'sparkle', title: 'Air Jets', text: 'Gentle air bubbles that massage your whole body.' },
  { icon: 'star', title: 'Combination', text: 'Water and air jets together for the full spa experience.' },
];
const walkInComfort = [
  { icon: 'heart', title: 'Heated Seat', text: 'Stays warm while the tub fills and drains.' },
  { icon: 'clock', title: 'Fast Drain', text: 'Empties quickly, so you are not waiting to step out.' },
  { icon: 'droplet', title: 'Handheld Shower', text: 'Rinse off before you open the door.' },
  { icon: 'home', title: 'Door Direction', text: 'An inward or outward swinging door on the side that fits your bathroom.' },
];

const vanityStyles = [
  { name: 'Single Vanity', img: 'opt-van-single', text: 'One sink with drawers and doors, sized for smaller bathrooms.' },
  { name: 'Double Vanity', img: 'van-4', text: 'Two sinks and more storage for shared bathrooms.' },
  { name: 'Floating Vanity', img: 'opt-van-floating', text: 'Wall-mounted for an open, easy-to-clean floor.' },
];

// Cabinet and vanity finishes: painted colors drawn as swatches, wood finishes as grain photos
const cabinetFinishes = [
  { name: 'White Shaker', color: '#f3f1ec' },
  { name: 'Graphite Shaker', color: '#4a4f56' },
  { name: 'Light Sage', color: '#b5c3b1' },
  { name: 'White Oak', img: 'opt-fin-white-oak' },
  { name: 'Sierra Cherry', img: 'opt-fin-sierra-cherry' },
];

const vanityTops = [
  { name: 'White Quartz', img: 'opt-col-pure-white' },
  { name: 'Marble-Look Quartz', img: 'opt-col-white-marble' },
  { name: 'Salt & Pepper Granite', img: 'opt-col-salt-pepper' },
  { name: 'Cream Granite', img: 'opt-col-cream' },
];

const vanitySinks = [
  { name: 'Undermount', img: 'van-8', text: 'Mounted under the top for an easy wipe-down edge.' },
  { name: 'Vessel', img: 'opt-van-vessel', text: 'A bowl that sits on top of the counter for a standout look.' },
  { name: 'Integrated', img: 'opt-van-integrated', text: 'Sink and top in one seamless piece with no seams to clean.' },
];

const doorStyles = [
  { name: 'Shaker', img: 'cabinets-2', text: 'A simple recessed panel that suits almost any kitchen.' },
  { name: 'Raised Panel', img: 'cabinets-1', text: 'A traditional look with a raised center panel.' },
  { name: 'Flat Panel', img: 'cabinets-3', text: 'Smooth slab doors for a clean, modern kitchen.' },
  { name: 'Glass-Front', img: 'cabinets-5', text: 'Glass inserts that show off dishes and brighten uppers.' },
];

const counterMaterials = [
  { name: 'Quartz', img: 'opt-ct-quartz', text: 'Non-porous and stain resistant, with no sealing needed.' },
  { name: 'Granite', img: 'opt-ct-granite', text: 'Natural stone with one-of-a-kind patterns and great heat resistance.' },
  { name: 'Solid Surface', img: 'opt-ct-solid', text: 'Seamless tops with integrated sinks and repairable scratches.' },
  { name: 'Laminate', img: 'opt-ct-laminate', text: 'The most budget-friendly option, in stone and wood looks.' },
  { name: 'Butcher Block', img: 'opt-ct-butcher', text: 'Warm wood surfaces, great for islands and prep areas.' },
];

const counterColors = [
  { name: 'White Marble-Look', img: 'opt-col-white-marble' },
  { name: 'Pure White', img: 'opt-col-pure-white' },
  { name: 'Cream', img: 'opt-col-cream' },
  { name: 'White Speckled Granite', img: 'opt-col-white-granite' },
  { name: 'Salt & Pepper Granite', img: 'opt-col-salt-pepper' },
  { name: 'Black Veined', img: 'opt-col-black' },
];

// Tile layouts, shown with the wall pattern samples
const backsplashPatterns = pick(patterns, ['3x6 Subway', '4x12 Subway', 'Herringbone', 'Hexagonal', 'Picket', 'Chevron']);

const backsplashMaterials = [
  { name: 'Ceramic', img: 'backsplash-3', text: 'Affordable, easy to clean, and available in every color.' },
  { name: 'Glass', img: 'backsplash-5', text: 'Reflects light and wipes clean in seconds.' },
  { name: 'Natural Stone', img: 'backsplash-4', text: 'Travertine, marble, and slate for a warm, textured look.' },
  { name: 'Mosaic', img: 'backsplash-2', text: 'Small tiles in patterns and colors that make a statement.' },
];

const kitchenSinks = [
  { name: 'Undermount', img: 'counter-6', text: 'Mounted below the counter so crumbs wipe straight in.' },
  { name: 'Farmhouse', img: 'opt-sink-farmhouse', text: 'A deep apron-front sink with a classic look.' },
  { name: 'Drop-In', img: 'faucet-6', text: 'Sits on top of the counter for an easy, affordable swap.' },
  { name: 'Double Bowl', img: 'faucet-4', text: 'Two basins for washing and rinsing at the same time.' },
];

const faucetTypes = [
  { name: 'Pull-Down', img: 'faucet-5', text: 'A spray head that pulls down into the sink.' },
  { name: 'Single-Handle', img: 'faucet-1', text: 'One lever controls temperature and flow.' },
  { name: 'Two-Handle', img: 'faucet-3', text: 'Separate hot and cold handles for a classic look.' },
  { name: 'Touchless', img: 'opt-faucet-touchless', text: 'Turns on with a wave when your hands are full.' },
];

const kitchenFinishes = [...finishes, { name: 'Stainless Steel', bg: 'linear-gradient(135deg, #d9dcdf, #b7bcc1 45%, #e6e8ea 60%, #a9aeb3)' }];

const organizerTypes = [
  { name: 'Spice Pull-Outs', img: 'org-2', text: 'Slim pull-outs that keep spices and oils in reach.' },
  { name: 'Drawer Inserts', img: 'org-5', text: 'Dividers for utensils, tools, and cutlery.' },
  { name: 'Trash & Recycling', img: 'opt-org-trash', text: 'Bins that pull out from a cabinet next to the sink.' },
  { name: 'Corner Pull-Outs', img: 'opt-org-corner', text: 'Swing-out baskets that use every inch of corner cabinets.' },
  { name: 'Plate Racks', img: 'org-8', text: 'Upright storage that keeps plates easy to grab.' },
  { name: 'Deep Drawer Organizers', img: 'org-7', text: 'Inserts that keep deep drawers neat and easy to sort.' },
];

module.exports = {
  finishes, glass, vGroove, colors, patterns,
  showerBases, wallStyles, tubStyles, showerDoors, safetyAddOns, accessibilityProducts, walkInTherapy, walkInComfort,
  vanityStyles, cabinetFinishes, vanityTops, vanitySinks, doorStyles, counterMaterials, counterColors,
  backsplashPatterns, backsplashMaterials, kitchenSinks, faucetTypes, kitchenFinishes, organizerTypes,
};
