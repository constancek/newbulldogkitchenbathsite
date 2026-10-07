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

module.exports = { finishes, glass, vGroove, colors, patterns };
