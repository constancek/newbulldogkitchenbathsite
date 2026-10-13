// Five FAQs at the end of each page, keyed by page path: [question, answer] in plain text.
// Answers only repeat what the site already states; keep them in step with the page copy.
const SITE = require('../site');

const pageFaqs = {
  '/': [
    ["What does Bulldog Kitchen & Bath do?", "We design and install kitchen and bathroom remodels: showers, bathtubs, wall systems, vanities, cabinets, countertops, backsplashes, and sinks and faucets. Our own crews handle the installation."],
    ["Do you offer any discounts?", "Yes. We currently offer $1,250 off a full kitchen or bathroom remodel, plus special savings for homeowners 65 and up and for active-duty military and veterans. See Current Promos for details."],
    ["What areas do you serve?", `We serve ${SITE.serviceArea}. Call us at ${SITE.phone} to confirm service at your address.`],
    ["How do I get a price for my project?", "Request an estimate. A design consultant measures your space, walks you through product and finish options, and gives you a clear, written quote."],
    ["Do you offer financing?", "Yes. On approved credit, we offer terms up to 60 months and promotional plans with no interest for 24 months. Visit our Financing page for details."],
  ],
  '/bathrooms/': [
    ["What bath products do you install?", "Showers, bathtubs, tub-to-shower conversions, walk-in tubs, accessibility products, shower enclosures, vanities, and accessories, with wall systems in a wide range of colors and patterns."],
    ["Can I combine several products in one project?", "Yes. Many homeowners pair a new tub or shower with a wall system, a glass door, a vanity, and accessories. Your design consultant plans everything together so it all matches."],
    ["Which bath product is right for me?", "It depends on how you use your bathroom. A tub-to-shower conversion suits people who rarely take baths, a walk-in tub or accessibility upgrades help anyone with limited mobility, and a new tub with a matching wall surround works well for families. Your design consultant helps you decide."],
    ["How long does a bathroom remodel take?", "Many tub, shower, and wall-system replacements are done in as little as one day. Larger projects take longer, and we give you a timeline before work starts."],
    ["Are your bath products covered by a warranty?", "Yes. Bath products we install, including shower bases, bathtubs, and wall systems, carry a lifetime limited warranty for as long as you own your home, and our installation is guaranteed."],
  ],
  '/kitchens/': [
    ["What kitchen services do you offer?", "We install new, refaced, or refinished cabinets, countertops, backsplashes, sinks and faucets, and cabinet organizers, all designed and installed by one team."],
    ["How long does a kitchen remodel take?", "Many kitchen upgrades are finished in as little as three days. A full kitchen with new cabinets takes longer, and your project coordinator gives you a detailed schedule before work starts."],
    ["Should I replace or reface my cabinets?", "If your cabinet boxes are solid, refacing gives you a brand-new look in a fraction of the time and cost of a tear-out. If they are worn or damaged, we will recommend full replacement."],
    ["Can I update just one part of my kitchen?", "Yes. You can start with new countertops, a backsplash, a sink and faucet, or organizers, or plan a full remodel. Your designer helps you choose what makes the biggest difference."],
    ["Do your promotions apply to kitchens?", "Yes. Our current offer of $1,250 off applies to a full kitchen or bathroom remodel, and financing is available on approved credit. See Current Promos for details."],
  ],
  '/bathrooms/showers/': [
    ["What are your shower walls made of?", "Our solid-surface wall systems are installed over a properly prepared substrate. They are non-porous and have no grout lines to scrub."],
    ["Can I add a seat, niche, or shelves?", "Yes. We can add built-in seats, recessed niches, and shelving so everything has a place."],
    ["Should I choose a sliding or a hinged door?", "Sliding and bypass doors save space on tubs and wide showers. Pivot and hinged doors give a clean, frameless-style look. We help you pick what suits your layout."],
    ["What glass options do you offer?", "Clear glass to show off your walls, or rain, frosted, or corrugated glass for more privacy. Etched V-groove patterns are available on most doors."],
    ["How do I clean my new shower?", "Mild soap and water is usually all it needs. Avoid abrasive pads and harsh chemicals. We leave care instructions after your install."],
  ],
  '/bathrooms/bathtubs/': [
    ["What bathtub styles do you offer?", "Classic alcove tubs, standard-depth tubs, and deep soakers, plus tub-and-shower combos for everyday family use."],
    ["Can you turn my shower back into a tub?", "Yes. We can convert an existing shower back to a tub and finish it with a matching wall surround and trim."],
    ["Does a new tub come with new walls?", "You can pair your tub with a seamless wall surround in the color and pattern you choose for a finished, spa-like look."],
    ["Will my new tub chip or stain?", "Our bathtubs are built to resist chips, stains, and fading, and they clean up with mild soap and water."],
    ["How long does a tub replacement take?", "A new tub and wall surround is often installed in a single day. We confirm your timeline at the consultation."],
  ],
  '/bathrooms/tub-to-shower-conversions/': [
    ["Can you turn my bathtub into a walk-in shower?", "Yes. We remove your old tub and install a custom-fit shower base and wall system in the same space, often in as little as one day."],
    ["What shower base can I choose?", "You can choose a low-threshold base for easy entry or a standard base, both custom-measured to fit the space your tub leaves behind."],
    ["Do I get a glass door or a curtain rod?", "Either. Choose a glass door or a curtain rod in the finish that matches your fixtures."],
    ["Is a converted shower safer than a tub?", "For most people, yes. A low step-in base, a slip-resistant floor, a built-in seat, and grab bars make getting in and out much easier."],
    ["Will removing my tub hurt resale value?", "It depends on your home. We generally recommend keeping at least one tub in homes with young children, and your consultant can help you decide."],
  ],
  '/bathrooms/walk-in-tubs/': [
    ["Who is a walk-in tub right for?", "Anyone who has trouble stepping over a standard tub wall, including seniors and people with limited mobility who want to keep bathing safely at home."],
    ["Will the door leak?", "The door has a leak-tight seal designed to keep the water in, and it can swing inward or outward on whichever side fits your bathroom."],
    ["What therapy options are available?", "Choose a simple soaker, or add water jets for your back, legs, and feet, air jets that massage your whole body, or a combination of both."],
    ["Will an accessible bathroom look clinical?", "No. We design accessible bathrooms that look like any upscale remodel, and every grab bar comes in a decorative finish that matches your fixtures."],
    ["Can you add grab bars to my existing shower?", "Yes. We can add grab bars, fold-down seats, and handheld showers as part of a remodel or as safety upgrades."],
  ],
  '/bathrooms/vanities/': [
    ["What vanity sizes do you offer?", "Single and double vanities, built to fit your space. A double vanity gives everyone their own sink and drawer space."],
    ["What countertop and sink options are available?", "Choose a quartz, granite, or solid-surface top with an undermount or vessel sink."],
    ["How long does a vanity installation take?", "A new vanity, top, sink, and faucet are usually installed in a single day."],
    ["Can you match the faucet, mirror, and lighting?", "Yes. We finish your vanity with a faucet, mirror, and lighting that match the rest of your bathroom."],
    ["What if my bathroom is small?", "A compact single vanity with smart drawers adds storage and keeps the counter clear."],
  ],
  '/inspiration-colors-patterns/': [
    ["What colors and patterns are available?", "Marble, granite, travertine, and solid colors, with optional tile patterns like subway, hexagon, and herringbone, plus accent trim and borders."],
    ["Can I see samples before I decide?", "Yes. Your design consultant brings samples to your home so you can see them in your own light."],
    ["Can I see my bathroom before anything is ordered?", "Yes. Our designers can show you a 3D rendering of your bathroom with your chosen colors and patterns."],
    ["Do solid colors come in matte or gloss?", "Both. Solid colors are available in matte or gloss finishes."],
    ["Do tile-look patterns have real grout?", "No. They have realistic grout lines without porous grout, so there is no scrubbing, sealing, or regrouting."],
  ],
  '/kitchens/cabinets/': [
    ["Should I replace, reface, or refinish my cabinets?", "If your cabinet boxes are solid, refacing or refinishing gives you a new look for less time and money. If they are worn or damaged, full replacement is the better choice. We will recommend what fits your kitchen."],
    ["What door styles and finishes do you offer?", "Shaker, flat-panel, and raised-panel doors in painted, stained, and two-tone finishes."],
    ["How are your cabinets built?", "3/4\" solid wood doors and frames, all-plywood boxes, dovetail drawers, soft-close hinges and drawer slides, and metal corner brackets that keep the box square."],
    ["Can you add organizers to my existing cabinets?", "Yes. We fit new or existing cabinets with organizers that make every inch easy to reach."],
    ["What can I do with an awkward corner cabinet?", "A lazy Susan turns a hard-to-reach corner into storage you can actually use."],
  ],
  '/kitchens/countertops/': [
    ["What countertop materials do you offer?", "Quartz, granite, and solid surface, fabricated and installed by our team."],
    ["How do you make sure the countertops fit?", "We digitally template your existing layout for a tight, accurate fit before fabrication."],
    ["What backsplash materials do you offer?", "Ceramic, porcelain, and glass tile, natural stone and mosaics, and grout-free panels."],
    ["Can a backsplash be installed without replacing my countertops?", "Yes. A new backsplash can be added on its own, and it is one of the fastest ways to transform your kitchen. We coordinate it with your existing countertops and cabinets."],
    ["Can you add a pot filler, filtered water, or a disposal?", "Yes. We can add filtered water, a pot filler, a garbage disposal, or a soap dispenser."],
  ],
  '/one-day-bathroom-remodel/': [
    ["Can you really remodel a bathroom in one day?", "Many tub, shower, and wall-system replacements are finished in as little as one day. Every product is custom-measured and prepared before install day, so our crew can remove the old and install the new in a single visit."],
    ["Which projects can be done in one day?", "Tub and shower replacements, tub-to-shower conversions, and new wall systems are often finished in one day. Layout changes, plumbing moves, or full gut remodels take longer, and we tell you up front."],
    ["What happens before install day?", "We measure your bathroom at the consultation and help you choose products and finishes. Then your base, walls, and trim are made to your exact measurements before we arrive."],
    ["Do I need to be home during the installation?", "We ask that an adult be home at the start and end of install day so we can review the work with you."],
    ["Do you clean up afterwards?", "Yes. We clean up, show you how to care for your new bath, and register your warranty before we leave."],
  ],
  '/current-promos/': [
    ["How do I get $1,250 off?", "The offer applies to qualifying full kitchen or bathroom remodels. Mention it when you request your estimate, since it must be presented at the time of the estimate."],
    ["Can I combine promotions?", "Promotions cannot be combined with other offers. Your design consultant can help you choose the one that saves you the most."],
    ["Who qualifies for the senior discount?", "Homeowners 65 and up. See a design consultant for details."],
    ["Who qualifies for the military discount?", "Active-duty military and veterans. Thank you for your service."],
    ["How long are these offers available?", "These are limited-time offers and can change. Mention the offer when you request your estimate, since it must be presented at that time, and your design consultant will confirm what applies."],
  ],
  '/financing/': [
    ["What financing options do you offer?", "On approved credit, we offer terms up to 60 months and promotional plans with no interest for 24 months."],
    ["Can I finance a kitchen remodel too?", "Yes. Financing is available for kitchen and bathroom remodels."],
    ["How do I apply?", "Request an estimate using the form on this page. Your design consultant will go over the financing options with you and explain how to apply."],
    ["Are the terms the same for everyone?", "No. Financing is subject to credit approval, and terms vary."],
    ["Can I use financing with a promotional offer?", "Promotions cannot be combined with other offers, so ask your design consultant which offer or financing plan works best for your project."],
  ],
  '/about/': [
    ["How long has Bulldog Kitchen & Bath been in business?", `Since ${SITE.founded}, helping homeowners in ${SITE.serviceArea} update their kitchens and baths.`],
    ["Are you licensed and insured?", "Yes. We are licensed and insured, and every installer is background-checked."],
    ["Who installs my project?", "Our own crews. A dedicated project coordinator keeps you informed from start to finish."],
    ["Where is your showroom, and when are you open?", `Our showroom is at ${SITE.address}. We are open Monday through Sunday, 8am to 8pm.`],
    ["What comes with every project?", "A design consultation, clear written pricing, a dedicated project coordinator, and a lifetime warranty on our products and workmanship."],
  ],
  '/inspiration-shop-the-room/': [
    ["Can I get one of these looks in my home?", "Yes. Tell your design consultant which look you like, and we will recreate it with our products, sized to your space."],
    ["Can I mix and match colors and finishes?", "Yes. Wall colors, patterns, fixtures, and hardware finishes can all be combined to make the look your own."],
    ["Can I see the design before I commit?", "Yes. We can show you your new kitchen or bath in 3D before anything is ordered."],
    ["Do you offer looks for kitchens as well as bathrooms?", "Yes. You will find both kitchen and bathroom styles here, and we design and install both."],
    ["How do I get started?", "Request an estimate and mention the look you like. A design consultant will measure your space and bring samples."],
  ],
  '/inspiration-design-spotlight/': [
    ["What is the Design Spotlight?", "A closer look at bathroom and kitchen styles, from spa-like retreats to industrial edge, with the finishes that make each one work."],
    ["Can you recreate a style I see here?", "Yes. Click Get This Look or request an estimate, and your designer will adapt the style to your space and budget."],
    ["Can I see samples at home?", "Yes. Your design consultant brings samples so you can compare colors and finishes in your own light."],
    ["Will my fixtures and hardware match?", "Yes. We coordinate faucets, grab bars, and hardware in one finish for a consistent look."],
    ["Can I see my design in 3D?", "Yes. We can show you a 3D rendering of your new space before you commit."],
  ],
};

module.exports = { pageFaqs };
