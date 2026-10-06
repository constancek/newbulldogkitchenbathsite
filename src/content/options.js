// Product option swatches drawn with CSS/SVG, so no photos are needed.
// Replace with real product samples when available.

// Wraps SVG markup as a CSS background image
const svg = (w, h, body, bg) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`)}") 0 0 / ${w}px ${h}px, ${bg}`;

const finishes = [
  { name: 'Matte Black', bg: 'linear-gradient(160deg, #222 0%, #101010 55%, #1b1b1b 100%)' },
  { name: 'Brushed Nickel', bg: 'repeating-linear-gradient(90deg, rgba(255,255,255,.1) 0 1px, transparent 1px 3px), linear-gradient(170deg, #d2d1cc 0%, #a9a8a3 50%, #c4c3be 100%)' },
  { name: 'Oil Rubbed Bronze', bg: 'linear-gradient(165deg, #55504a 0%, #3a3531 55%, #48433e 100%)' },
  { name: 'Chrome', bg: 'linear-gradient(135deg, #8f8f8f 0%, #f5f5f5 30%, #cdcdcd 46%, #fff 60%, #8a8a8a 100%)' },
];

const glass = [
  { name: 'Clear', bg: 'linear-gradient(180deg, #b6c3c1 0%, #dfe6df 60%, #f1f3ea 100%)' },
  { name: 'Rain', bg: svg(36, 60, "<path d='M6 0c4 10-3 20 1 30s-3 20 1 30M20 0c-3 12 4 18 0 30s3 18 0 30M31 0c4 9-2 21 2 30s-3 21 1 30' fill='none' stroke='#fff' stroke-opacity='.75' stroke-width='3'/>", 'linear-gradient(180deg, #c3cfca, #e4ebe6)') },
  { name: 'Frosted', bg: 'radial-gradient(circle at 82% 68%, #cfd4da 0, transparent 38%), linear-gradient(180deg, #eef1f2, #f4f6f5)' },
  { name: 'Reeded', bg: 'repeating-linear-gradient(90deg, #a6aba2 0 3px, #cfd3ca 3px 7px, #b8bdb4 7px 9px)' },
];

// V-groove etched patterns on frosted glass
const etchBg = 'linear-gradient(180deg, #e6ecee, #f2f5f5)';
const etch = "fill='none' stroke='#9fb0b6' stroke-width='2'";
const vGroove = [
  { name: 'Arrow', bg: svg(40, 40, `<path d='M0 30 20 10 40 30' ${etch}/>`, etchBg) },
  { name: 'Hopscotch', bg: svg(60, 60, `<path d='M0 0h40v40H0zM40 40h20v20H40zM40 0v40M0 40v20' ${etch}/>`, etchBg) },
  { name: 'Roman Block', bg: svg(90, 60, `<path d='M0 0h90M0 30h90M0 60h90M30 0v30M75 0v30M15 30v30M60 30v30' ${etch}/>`, etchBg) },
  { name: 'Vertical Block', bg: svg(30, 90, `<path d='M0 0v90M0 0h30' ${etch}/>`, etchBg) },
];

// Tile-look wall layouts
const tileBg = '#f3f2ee';
const grout = "fill='none' stroke='#a9a7a0' stroke-width='1.5'";
const patterns = [
  { name: '3x6 Subway', bg: svg(60, 40, `<path d='M0 .75h60M0 20.75h60M.75 0v20M30.75 20v20' ${grout}/>`, tileBg) },
  { name: '4x12 Subway', bg: svg(120, 40, `<path d='M0 .75h120M0 20.75h120M.75 0v20M60.75 20v20' ${grout}/>`, tileBg) },
  { name: '12x12 Square', bg: svg(60, 60, `<path d='M0 .75h60M.75 0v60' ${grout}/>`, tileBg) },
  { name: 'Vertical Stack', bg: svg(24, 72, `<path d='M0 .75h24M.75 0v72' ${grout}/>`, tileBg) },
  { name: 'Herringbone', bg: svg(40, 40, `<path d='M0 0l20 20M20 20l20-20M0 20l20 20M20 40l20-20M20 20v20M0 0v20M40 0v20' ${grout}/>`, tileBg) },
  { name: 'Chevron', bg: svg(40, 24, `<path d='M0 12 20 0 40 12M0 24 20 12 40 24' ${grout}/>`, tileBg) },
  { name: 'Hexagon', bg: svg(42, 72, `<path d='M21 0 42 12v24L21 48 0 36V12zM21 48v24M0 36v36M42 36v36' ${grout}/>`, tileBg) },
  { name: 'Hopscotch', bg: svg(60, 60, `<path d='M0 .75h40M.75 0v40M0 40.75h60M40.75 0v60M40 20.75h20' ${grout}/>`, tileBg) },
];

module.exports = { finishes, glass, vGroove, patterns };
