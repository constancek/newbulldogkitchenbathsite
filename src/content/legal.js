// Placeholder legal pages — have these reviewed by counsel before launch.
const SITE = require('../site');

module.exports = {
  'privacy-policy': {
    title: 'Privacy Statement',
    body: `<p>This Privacy Statement explains how ${SITE.name} ("we," "us") collects, uses, and protects information when you visit ${SITE.domain} or contact us.</p>
<h2>Information We Collect</h2>
<p>We collect information you provide through our forms, such as your name, phone number, email address, ZIP code, and project details. We may also collect basic usage data such as pages visited and browser type.</p>
<h2>How We Use Information</h2>
<ul><li>To respond to your requests and schedule consultations</li><li>To send offers and updates you have agreed to receive</li><li>To improve our website and services</li></ul>
<h2>Sharing</h2>
<p>We do not sell your personal information. We may share it with service providers (such as financing partners or scheduling tools) only as needed to serve you.</p>
<h2>Your Choices</h2>
<p>You may opt out of marketing messages at any time by replying STOP to texts, using the unsubscribe link in emails, or contacting us.</p>
<h2>Contact</h2>
<p>Questions? Email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`,
  },
  'terms-and-conditions': {
    title: 'Terms &amp; Conditions',
    body: `<p>By using ${SITE.domain}, you agree to these terms.</p>
<h2>Website Content</h2>
<p>Content on this site is for general information only. Product images may vary from installed products. Prices, promotions, and availability are subject to change without notice.</p>
<h2>Promotions</h2>
<p>Promotional offers apply to qualifying projects, cannot be combined unless stated, and must be presented at the time of estimate. Financing is subject to credit approval.</p>
<h2>Limitation of Liability</h2>
<p>${SITE.name} is not liable for damages arising from use of this website.</p>
<h2>Changes</h2>
<p>We may update these terms at any time. Continued use of the site means you accept the updated terms.</p>`,
  },
  'accessibility-statement': {
    title: 'Website Accessibility',
    body: `<p>${SITE.name} is committed to making our website accessible to everyone, including people with disabilities.</p>
<h2>Our Efforts</h2>
<p>We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, including keyboard navigation, text alternatives for images, and sufficient color contrast.</p>
<h2>Need Help?</h2>
<p>If you have difficulty using any part of this site, please call <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> or email <a href="mailto:${SITE.email}">${SITE.email}</a> and we'll be happy to assist.</p>`,
  },
};
