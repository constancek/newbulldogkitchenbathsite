// Global site settings. PLACEHOLDER values are marked; replace before launch.
module.exports = {
  name: 'Bulldog Kitchen & Bath',
  short: 'Bulldog',
  legalName: 'Bulldog Kitchen & Bath',
  domain: 'bulldogkitchenbath.com',
  phone: '(555) 010-0199', // PLACEHOLDER
  phoneHref: '+15550100199', // PLACEHOLDER
  email: 'info@bulldogkitchenbath.com', // PLACEHOLDER
  address: '123 Placeholder Ave, Your City, ST 00000', // PLACEHOLDER
  hours: 'Mon–Sun, 8am–8pm',
  serviceArea: '[Your City] and surrounding areas', // PLACEHOLDER
  founded: 1993,
  years: new Date().getFullYear() - 1993, // recalculated on every build
  social: { facebook: '#', instagram: '#', youtube: '#' }, // PLACEHOLDER

  promoBar: { text: 'Get $1,250 OFF your new kitchen or bathroom*', link: 'View Promo', href: '/current-promos/' },

  nav: [
    {
      label: 'Bath', href: '/products/',
      children: [
        { label: 'Showers', href: '/products/showers/' },
        { label: 'Bathtubs', href: '/products/bathtubs/' },
        { label: 'Walk-In Tubs', href: '/products/walk-in-tubs/' },
        { label: 'Accessibility', href: '/products/accessibility/' },
        { label: 'Shower Enclosures', href: '/products/shower-enclosures/' },
        { label: 'Accessories', href: '/products/accessories/' },
        { label: 'Colors & Patterns', href: '/products/colors-patterns/' },
      ],
    },
    {
      label: 'Kitchen', href: '/kitchens/',
      children: [
        { label: 'Cabinets', href: '/kitchens/cabinets/' },
        { label: 'Countertops', href: '/kitchens/countertops/' },
        { label: 'Backsplash', href: '/kitchens/backsplash/' },
        { label: 'Sinks & Faucets', href: '/kitchens/sinks-faucets/' },
      ],
    },
    { label: 'Design Your Space', href: '/design-your-space/' },
    {
      label: 'Inspiration',
      children: [
        { label: 'Shop the Room', href: '/inspiration-shop-the-room/' },
        { label: 'Design Spotlight', href: '/inspiration-design-spotlight/' },
      ],
    },
    { label: 'One Day Remodel', href: '/one-day-bathroom-remodel/' },
    {
      label: 'About', href: '/about/',
      children: [
        { label: 'Blog', href: '/blog/' },
        { label: 'FAQ', href: '/faqs/' },
        { label: 'Warranty', href: '/warranty/' },
        { label: 'Contact Us', href: '/contact/' },
      ],
    },
  ],

  footerLinks: [
    ['About Us', '/about/'],
    ['Contact Us', '/contact/'],
    ['FAQ', '/faqs/'],
    ['Blog', '/blog/'],
    ['Warranty Info', '/warranty/'],
    ['Bath Products', '/products/'],
    ['Kitchen Remodeling', '/kitchens/'],
    ['Current Promos', '/current-promos/'],
    ['Financing', '/financing/'],
  ],
  utilityLinks: [
    ['Terms & Conditions', '/terms-and-conditions/'],
    ['Privacy Statement', '/privacy-policy/'],
    ['Website Accessibility', '/accessibility-statement/'],
  ],
  disclaimer:
    '*Offers shown are placeholders. Promotions apply to qualifying full remodel projects, cannot be combined with other offers, and must be presented at time of estimate. Financing subject to credit approval. See a ' +
    'Bulldog Kitchen &amp; Bath representative for complete details.',
};
