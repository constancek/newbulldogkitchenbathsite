// Global site settings. PLACEHOLDER values are marked; replace before launch.
module.exports = {
  name: 'Bulldog Kitchen & Bath',
  short: 'Bulldog',
  legalName: 'Bulldog Kitchen & Bath',
  domain: 'bulldogkitchenbath.com',
  phone: '(513) 657-3750',
  phoneHref: '+15136573750',
  email: 'info@bulldogkitchenbath.com', // PLACEHOLDER
  address: '1776 Mentor Ave Ste 315, Cincinnati, OH 45212',
  hours: 'Mon–Sun, 8am–8pm',
  serviceArea: 'Cincinnati, Ohio and the surrounding Ohio, KY & IN tri-state area',
  founded: 1993,
  years: new Date().getFullYear() - 1993, // recalculated on every build
  social: { facebook: '#', instagram: '#', youtube: '#' }, // PLACEHOLDER

  promoBar: { text: 'Get $1,250 OFF your new kitchen or bathroom*', link: 'View Promo', href: '/current-promos/' },

  nav: [
    {
      label: 'Bath', href: '/bathrooms/', all: 'All Bath Services',
      children: [
        { label: 'Showers & Enclosures', href: '/bathrooms/showers/' },
        { label: 'Bathtubs', href: '/bathrooms/bathtubs/' },
        { label: 'Tub-to-Shower Conversions', href: '/bathrooms/tub-to-shower-conversions/' },
        { label: 'Walk-In Tubs & Accessibility', href: '/bathrooms/walk-in-tubs/' },
        { label: 'Vanities', href: '/bathrooms/vanities/' },
      ],
    },
    {
      label: 'Kitchen', href: '/kitchens/', all: 'All Kitchen Services',
      children: [
        { label: 'Cabinets & Organizers', href: '/kitchens/cabinets/' },
        { label: 'Countertops & Backsplash', href: '/kitchens/countertops/' },
      ],
    },
    {
      label: 'Inspiration',
      children: [
        { label: 'Shop the Room', href: '/inspiration-shop-the-room/' },
        { label: 'Design Spotlight', href: '/inspiration-design-spotlight/' },
        { label: 'Colors & Patterns', href: '/inspiration-colors-patterns/' },
      ],
    },
    { label: 'One Day Remodel', href: '/one-day-bathroom-remodel/' },
    {
      label: 'More',
      children: [
        { label: 'About Us', href: '/about/' },
        { label: 'Blog', href: '/blog/' },
      ],
    },
  ],

  footerLinks: [
    ['About Us', '/about/'],
    ['Contact Us', '/about/#contact'],
    ['Blog', '/blog/'],
    ['Bath Services', '/bathrooms/'],
    ['Kitchen Remodeling', '/kitchens/'],
    ['Current Promos', '/current-promos/'],
    ['Financing', '/financing/'],
  ],
  disclaimer:
    '*Promotions apply to qualifying full remodel projects, cannot be combined with other offers, and must be presented at time of estimate. Financing subject to credit approval. See a ' +
    'Bulldog Kitchen &amp; Bath representative for complete details.',
};
