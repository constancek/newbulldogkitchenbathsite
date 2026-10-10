// Product option swatches. Sample photos come from bathconcepts.com.

const finishes = [
  { name: 'Matte Black', img: 'option-finish-matte-black' },
  { name: 'Brushed Nickel', img: 'option-finish-brushed-nickel' },
  { name: 'Oil Rubbed Bronze', img: 'option-finish-oil-rubbed-bronze' },
  { name: 'Chrome', img: 'option-finish-chrome' },
];

const glass = [
  { name: 'Clear', img: 'shower-enclosures-glass-clear' },
  { name: 'Rain', img: 'shower-enclosures-glass-rain' },
  { name: 'Frosted', img: 'shower-enclosures-glass-frosted' },
  { name: 'Corrugated', img: 'shower-enclosures-glass-corrugated' },
];

const vGroove = [
  { name: 'Arrow', img: 'shower-enclosures-vgroove-arrow' },
  { name: 'Hopscotch', img: 'shower-enclosures-vgroove-hopscotch' },
  { name: 'Roman Block', img: 'shower-enclosures-vgroove-roman-block' },
  { name: 'Vertical Block', img: 'shower-enclosures-vgroove-vertical-block' },
];

// Wall colors (stone looks and solids)
const colors = [
  { name: 'Brecchia/Sierra Sand', img: 'colors-patterns-color-brecchia-sierra-sand' },
  { name: 'Madeira/Santa Cruz Granite', img: 'colors-patterns-color-madeira-santa-cruz-granite' },
  { name: 'River Rock/Canyon Rock', img: 'colors-patterns-color-river-rock-canyon-rock' },
  { name: 'Travertine', img: 'colors-patterns-color-travertine' },
  { name: 'Lightning', img: 'colors-patterns-color-lightning' },
  { name: 'Quartz', img: 'colors-patterns-color-quartz' },
  { name: 'Silver White', img: 'colors-patterns-color-silver-white' },
  { name: 'Gray', img: 'colors-patterns-color-gray' },
  { name: 'Almond', img: 'colors-patterns-color-almond' },
  { name: 'Biscuit', img: 'colors-patterns-color-biscuit' },
  { name: 'Sandbar', img: 'colors-patterns-color-sandbar' },
  { name: 'White (Matte or Glossy)', img: 'colors-patterns-color-white-matte-or-glossy' },
  { name: 'Arctic Ice', img: 'colors-patterns-color-arctic-ice' },
  { name: 'Bianco Travertine', img: 'colors-patterns-color-bianco-travertine' },
  { name: 'Calcutta Marble', img: 'colors-patterns-color-calcutta-marble' },
  { name: 'Carbon Ash Classic Concrete', img: 'colors-patterns-color-carbon-ash-classic-concrete' },
  { name: 'Evo', img: 'colors-patterns-color-evo' },
  { name: 'Galena', img: 'colors-patterns-color-galena' },
  { name: 'Glacier Ice', img: 'colors-patterns-color-glacier-ice' },
  { name: 'Horizon Beige', img: 'colors-patterns-color-horizon-beige' },
  { name: 'Metapeake', img: 'colors-patterns-color-metapeake' },
  { name: 'Napoli Marble/Pompeii Marble', img: 'colors-patterns-color-napoli-marble-pompeii-marble' },
  { name: 'San Michele', img: 'colors-patterns-color-san-michele' },
  { name: 'Sandalwood', img: 'colors-patterns-color-sandalwood' },
  { name: 'Santorini White Marble', img: 'colors-patterns-color-santorini-white-marble' },
  { name: 'Tuscany', img: 'colors-patterns-color-tuscany' },
  { name: 'Versailles', img: 'colors-patterns-color-versailles' },
  { name: 'Grayline', img: 'colors-patterns-color-grayline' },
  { name: 'London Fog', img: 'colors-patterns-color-london-fog' },
  { name: 'Othello', img: 'colors-patterns-color-othello' },
];

// Tile-look wall patterns
const patterns = [
  { name: '3x6 Subway', img: 'colors-patterns-pattern-3x6-subway' },
  { name: '4x12 Subway', img: 'colors-patterns-pattern-4x12-subway' },
  { name: '8x10', img: 'colors-patterns-pattern-8x10' },
  { name: '9x15 Monument', img: 'colors-patterns-pattern-9x15-monument' },
  { name: '12x12 Marazzi', img: 'colors-patterns-pattern-12x12-marazzi' },
  { name: 'Bayview', img: 'colors-patterns-pattern-bayview' },
  { name: 'Chevron', img: 'colors-patterns-pattern-chevron' },
  { name: 'Cobblestone', img: 'colors-patterns-pattern-cobblestone' },
  { name: 'Fairfield', img: 'colors-patterns-pattern-fairfield' },
  { name: 'Flagstone', img: 'colors-patterns-pattern-flagstone' },
  { name: 'Herringbone', img: 'colors-patterns-pattern-herringbone' },
  { name: 'Hexagonal', img: 'colors-patterns-pattern-hexagonal' },
  { name: 'Hopscotch', img: 'colors-patterns-pattern-hopscotch' },
  { name: 'Milano', img: 'colors-patterns-pattern-milano' },
  { name: 'Panorama', img: 'colors-patterns-pattern-panorama' },
  { name: 'Picket', img: 'colors-patterns-pattern-picket' },
  { name: 'Roman Block', img: 'colors-patterns-pattern-roman-block' },
];

// Photo cards (img + short description) and extra swatches for the other product pages.
// Photos are free Pexels stock or this site's own product photos; names are generic.
const pick = (list, names) => names.map((n) => list.find((x) => x.name === n));

const showerBases = [
  { name: 'Standard Base', img: 'blog-tub-to-shower', text: 'A classic curbed base that keeps water in and fits most alcoves.' },
  { name: 'Low-Threshold Base', img: 'showers-card', text: 'A lower curb that makes stepping in and out easier.' },
  { name: 'Built-In Seat', img: 'tub-to-shower-intro', text: 'A molded bench for resting or shaving while you shower.' },
  { name: 'Neo-Angle Corner', img: 'showers-gallery-1', text: 'A space-saving corner shower for smaller bathrooms.' },
];

// A few popular wall colors and tile looks from Colors & Patterns
const wallStyles = [...pick(colors, ['Calcutta Marble', 'Travertine', 'Arctic Ice', 'Gray']), ...pick(patterns, ['3x6 Subway', 'Hexagonal'])];

const tubStyles = [
  { name: 'Standard Tub', img: 'home-slide-new-bath', text: 'A classic alcove tub with a matching wall surround, made for tub and shower combos.' },
  { name: 'Deep Soaker', img: 'bathtubs-card', text: 'Extra depth for a full, relaxing soak.' },
  { name: 'Whirlpool', img: 'walk-in-tubs-card', text: 'Water jets that massage tired muscles.' },
  { name: 'Air Bath', img: 'bathtubs-header', text: 'Gentle air bubbles for a soothing, spa-like soak.' },
];

const showerDoors = [
  { name: 'Sliding Glass Door', img: 'shower-enclosures-gallery-1', text: 'Bypass panels that slide open, great for wider openings.' },
  { name: 'Hinged Glass Door', img: 'shower-enclosures-gallery-4', text: 'Swings open for a wide, easy entry.' },
  { name: 'Frameless Glass', img: 'shower-enclosures-gallery-2', text: 'Heavy glass with minimal hardware for a clean look.' },
  { name: 'Curtain Rod', img: 'bath-accessories-shop-shower-curtain-rod', text: 'A straight or curved rod for a simple, budget-friendly finish.' },
];

const safetyAddOns = [
  { name: 'Grab Bars', img: 'bath-accessories-shop-grab-bar', text: 'Sturdy bars placed exactly where you need support.' },
  { name: 'Shower Seat', img: 'bath-accessories-shop-shower-seat', text: 'A built-in or fold-down seat for sitting while you shower.' },
  { name: 'Handheld Shower', img: 'bath-accessories-shop-handheld-shower', text: 'A slide-bar handheld you can raise, lower, or hold.' },
  { name: 'Slip-Resistant Floor', img: 'tub-to-shower-gallery-1', text: 'A textured base floor for steadier footing.' },
];

const accessibilityProducts = [
  { name: 'Low-Threshold Base', img: 'showers-card', text: 'An easy step-in shower base with a low curb.' },
  { name: 'Grab Bars', img: 'bath-accessories-shop-grab-bar', text: 'Decorative bars that add support without looking clinical.' },
  { name: 'Shower Seat', img: 'bath-accessories-shop-shower-seat', text: 'Built-in and fold-down seating that blends into your walls.' },
  { name: 'Handheld Shower', img: 'bath-accessories-shop-handheld-shower', text: 'An adjustable slide bar for seated or standing use.' },
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
  { name: 'Single Vanity', img: 'vanities-option-single-vanity', text: 'One sink with drawers and doors, sized for smaller bathrooms.' },
  { name: 'Double Vanity', img: 'vanities-card', text: 'Two sinks and more storage for shared bathrooms.' },
  { name: 'Floating Vanity', img: 'vanities-option-floating-vanity', text: 'Wall-mounted for an open, easy-to-clean floor.' },
];

// Cabinet and vanity finishes: painted colors drawn as swatches, wood finishes as grain photos
const cabinetFinishes = [
  { name: 'White Shaker', color: '#f3f1ec' },
  { name: 'Graphite Shaker', color: '#4a4f56' },
  { name: 'Light Sage', color: '#b5c3b1' },
  { name: 'White Oak', img: 'option-cabinet-finish-white-oak' },
  { name: 'Sierra Cherry', img: 'option-cabinet-finish-sierra-cherry' },
];

const vanityTops = [
  { name: 'White Quartz', img: 'vanities-option-top-white-quartz' },
  { name: 'Marble-Look Quartz', img: 'vanities-option-top-marble-look-quartz' },
  { name: 'Salt & Pepper Granite', img: 'vanities-option-top-salt-and-pepper-granite' },
  { name: 'Cream Granite', img: 'vanities-option-top-cream-granite' },
];

const vanitySinks = [
  { name: 'Undermount', img: 'vanities-gallery-4', text: 'Mounted under the top for an easy wipe-down edge.' },
  { name: 'Vessel', img: 'vanities-option-sink-vessel', text: 'A bowl that sits on top of the counter for a standout look.' },
  { name: 'Integrated', img: 'vanities-option-sink-integrated', text: 'Sink and top in one seamless piece with no seams to clean.' },
];

const doorStyles = [
  { name: 'Shaker', img: 'blog-cabinet-refacing', text: 'A simple recessed panel that suits almost any kitchen.' },
  { name: 'Raised Panel', img: 'kitchen-cabinets-card', text: 'A traditional look with a raised center panel.' },
  { name: 'Flat Panel', img: 'kitchen-cabinets-intro', text: 'Smooth slab doors for a clean, modern kitchen.' },
  { name: 'Glass-Front', img: 'kitchen-cabinets-gallery-2', text: 'Glass inserts that show off dishes and brighten uppers.' },
];

const counterMaterials = [
  { name: 'Quartz', img: 'countertops-option-quartz', text: 'Non-porous and stain resistant, with no sealing needed.' },
  { name: 'Granite', img: 'countertops-option-granite', text: 'Natural stone with one-of-a-kind patterns and great heat resistance.' },
  { name: 'Solid Surface', img: 'countertops-option-solid-surface', text: 'Seamless tops with integrated sinks and repairable scratches.' },
  { name: 'Laminate', img: 'countertops-option-laminate', text: 'The most budget-friendly option, in stone and wood looks.' },
  { name: 'Butcher Block', img: 'countertops-option-butcher-block', text: 'Warm wood surfaces, great for islands and prep areas.' },
];

const counterColors = [
  { name: 'White Marble-Look', img: 'vanities-option-top-marble-look-quartz' },
  { name: 'Pure White', img: 'vanities-option-top-white-quartz' },
  { name: 'Cream', img: 'vanities-option-top-cream-granite' },
  { name: 'White Speckled Granite', img: 'countertops-option-color-white-speckled-granite' },
  { name: 'Salt & Pepper Granite', img: 'vanities-option-top-salt-and-pepper-granite' },
  { name: 'Black Veined', img: 'countertops-option-color-black-veined' },
];

// Tile layouts, shown with the wall pattern samples
const backsplashPatterns = pick(patterns, ['3x6 Subway', '4x12 Subway', 'Herringbone', 'Hexagonal', 'Picket', 'Chevron']);

const backsplashMaterials = [
  { name: 'Ceramic', img: 'backsplash-intro', text: 'Affordable, easy to clean, and available in every color.' },
  { name: 'Glass', img: 'backsplash-gallery-2', text: 'Reflects light and wipes clean in seconds.' },
  { name: 'Natural Stone', img: 'backsplash-gallery-1', text: 'Travertine, marble, and slate for a warm, textured look.' },
  { name: 'Mosaic', img: 'backsplash-header', text: 'Small tiles in patterns and colors that make a statement.' },
];

const kitchenSinks = [
  { name: 'Undermount', img: 'countertops-gallery-3', text: 'Mounted below the counter so crumbs wipe straight in.' },
  { name: 'Farmhouse', img: 'sinks-faucets-option-sink-farmhouse', text: 'A deep apron-front sink with a classic look.' },
  { name: 'Drop-In', img: 'sinks-faucets-gallery-3', text: 'Sits on top of the counter for an easy, affordable swap.' },
  { name: 'Double Bowl', img: 'sinks-faucets-gallery-1', text: 'Two basins for washing and rinsing at the same time.' },
];

const faucetTypes = [
  { name: 'Pull-Down', img: 'sinks-faucets-gallery-2', text: 'A spray head that pulls down into the sink.' },
  { name: 'Single-Handle', img: 'sinks-faucets-card', text: 'One lever controls temperature and flow.' },
  { name: 'Two-Handle', img: 'sinks-faucets-intro', text: 'Separate hot and cold handles for a classic look.' },
  { name: 'Touchless', img: 'sinks-faucets-option-faucet-touchless', text: 'Turns on with a wave when your hands are full.' },
];

const kitchenFinishes = [...finishes, { name: 'Stainless Steel', bg: 'linear-gradient(135deg, #d9dcdf, #b7bcc1 45%, #e6e8ea 60%, #a9aeb3)' }];

const organizerTypes = [
  { name: 'Spice Pull-Outs', img: 'kitchen-organizers-card', text: 'Slim pull-outs that keep spices and oils in reach.' },
  { name: 'Drawer Inserts', img: 'kitchen-organizers-gallery-1', text: 'Dividers for utensils, tools, and cutlery.' },
  { name: 'Trash & Recycling', img: 'kitchen-organizers-option-trash-and-recycling', text: 'Bins that pull out from a cabinet next to the sink.' },
  { name: 'Corner Pull-Outs', img: 'kitchen-organizers-option-corner-pull-outs', text: 'Swing-out baskets that use every inch of corner cabinets.' },
  { name: 'Plate Racks', img: 'kitchen-organizers-gallery-4', text: 'Upright storage that keeps plates easy to grab.' },
  { name: 'Deep Drawer Organizers', img: 'kitchen-organizers-gallery-3', text: 'Inserts that keep deep drawers neat and easy to sort.' },
];

module.exports = {
  finishes, glass, vGroove, colors, patterns,
  showerBases, wallStyles, tubStyles, showerDoors, safetyAddOns, accessibilityProducts, walkInTherapy, walkInComfort,
  vanityStyles, cabinetFinishes, vanityTops, vanitySinks, doorStyles, counterMaterials, counterColors,
  backsplashPatterns, backsplashMaterials, kitchenSinks, faucetTypes, kitchenFinishes, organizerTypes,
};
