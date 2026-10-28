# Post structures, SEO and formatting

## Titles

- Plain and specific. The reader's problem or question, in words they'd type, with a hint of the answer. "Why your shower grout turns gray again a year after you clean it" beats "The Ultimate Guide to Grout Maintenance."
- Under 60 characters where possible; if the title runs longer, add a seoTitle: under 60 (see publishing.md). Cincinnati or a suburb in the title when the post is local ("What a one-day bathroom conversion costs in Cincinnati").
- No colons-plus-subtitle unless the subtitle carries the specific ("Tile vs. surround: what each one asks of you over 20 years").
- No "Ultimate," "Complete Guide," "Everything You Need to Know," "Top 10," "Secrets," "Transform," "Dream."
- One question in a title is fine. Questions in every H2 beneath it are not.

## Meta description

Under 155 characters. The question and the gist of the answer. Include the search phrase once. No "Learn more" or "Discover."

## Opening

First paragraph puts the reader in their bathroom, with a specific detail, and promises the one answer the post delivers. Two to four sentences. No "In this post, we'll..." No rhetorical question. No dictionary definition.

Good: "You regrouted the master shower in the spring. By October the lines along the bottom row are gray again and there's a pink stripe where the tub meets the wall. Here is what's going on behind the tile, in the order it happens."

(Note: the stop-slop rule bans "here's what" throat-clearing. "Here is what's going on behind the tile" survives because it names the specific thing and is the post's promise. If in doubt, cut it: "The gray comes back for three reasons, in this order.")

## Structures by stage

### Awareness

1. The symptom, as the reader sees it (opening).
2. What is happening underneath (the mechanism, in plain words, one H2 per cause).
3. What the reader can do now, cheaply, this weekend. (Give real advice even when it delays a sale. That paragraph is what earns the trust.)
4. When the fix stops being worth it (the honest line where replacement makes sense).
5. One paragraph on how a grout-free shower sidesteps the problem, as one option among others.
6. CTA: related post or pricing guide.

### Consideration (comparison)

1. The decision the reader is facing, in their words.
2. A fair description of option A (usually tile): what it is, what it costs here, what it asks of the owner over 20 years, who should pick it.
3. The same for option B (the surround).
4. A side-by-side table: install time, grout, cleaning, warranty, what's included when the wall is open, best for. No price row; for the surround, the row may read "as low as $150/mo with promotional financing, qualified buyers." Tables render well on phones if they have five rows or fewer per column; keep it tight.
5. "If you are..." paragraphs that let the reader place themselves. Two or three. No more.
6. The concern they are most likely to still have (from `objections.md`), answered.
7. CTA: pricing guide or gallery.

### Consideration (cost)

1. Second paragraph: Bulldog doesn't post job prices; the price comes from measuring your bathroom, and the quote is written and free. Say it once, plainly, and move on.
2. What sets the price, one H2 per factor (footprint, base type, door, fixtures, what's under the old tub).
3. What's hiding in a low quote from someone else (subfloor, plumbing, remediation, demo and haul-away, permits).
4. How to compare two quotes line by line.
5. The money line as its own short section: as low as $150 a month with promotional financing, or 12 months no interest, for qualified buyers on approved credit. "Get your new shower now and pay later." Live promos with a date check.
6. CTA: schedule the estimate.

### Decision (process)

1. The day or the step, from the reader's chair ("The truck pulls up at 7:45").
2. Chronological H2s. Each one says what the crew does, what the reader will see and hear, and what the reader needs to do (usually nothing).
3. What could go differently and how the crew handles it (something under the tub; the valve is older than expected).
4. 5pm: what the bathroom and the hallway look like.
5. The next three days (cure, caulk, first shower, PM check-in). Confirm with owner.
6. CTA: book the estimate.

### Post-purchase

1. Congratulations in one sentence, not a paragraph.
2. The practical content (care steps, the next room, how to refer).
3. CTA: review or referral.

## Formatting for a 50+ reader on a phone

- Paragraphs of two to four sentences. One idea each.
- H2 every 200–300 words. H2s are statements or short noun phrases, not questions, and each one names its topic in words a searcher would use ("Price factor 2: the shower base you choose", "Hard water spots on a grout-free shower"). No bare labels like "The money part", "Side by side", "The door" or "Tell your sister": search engines and AI answers lean on H2s to know what each section answers. A quoted line as an H2 is fine when a colon adds the topic ("The tub is fine": how high your tub wall really is).
- Bulleted lists only for actual lists (steps, items to check). Never for prose dressed as bullets. No list longer than six items.
- Bold sparingly: the one number or the one sentence per section that the reader would highlight. Never bold a whole sentence of marketing.
- No italics for emphasis. No emoji. No exclamation points.
- One table maximum per post.
- One or two tip boxes per post, for the single takeaway a reader should not miss in that section. Write them as a Markdown quote starting with a bold label, and the site shows them as a red-edged box: `> **Tip:** Run your hand along the bottom row of grout. If it flexes, the board behind it is wet.` Labels: **Tip:**, **Worth knowing:** or **Before you sign:**. Never more than two, never back to back.
- Define the first use of any trade term in the same sentence: "backerboard, the waterproof panel that goes behind the wall surface."
- Numbers as numerals ($150 not one hundred fifty dollars). The only dollar figures that appear in posts are the financing line and the promo amount.
- One photo per post, the header photo, and none inside the body. It comes from Pexels via the `photo:` search phrase in the front matter (see `publishing.md`), so write a phrase that describes a picture, not a topic: "older couple looking at bathroom tile samples", not "bathroom remodel cost". Also describe, in one line, the real Bulldog photo the owner could swap in later (a finished job in an ordinary house, or a mid-install shot). Never generate or fabricate images.

## SEO, enough and no more

- One target phrase per post, used in the title, the first 100 words, one H2, and the meta description. That's it. Do not repeat it elsewhere on purpose.
- Local phrase variants when the post is local: "Cincinnati," "Northern Kentucky," one or two suburb names in the body.
- Two internal links to other posts or site pages, with descriptive anchor text ("our walk-in shower packages" not "click here").
- One or two external links to cited sources, opened in the same sentence that uses the fact.
- The photo's alt text is the post title (the build sets it), so no alt text to write.
- Schema and technical SEO are the site builder's job; do not add JSON-LD to a post. The build already adds article and breadcrumb schema, the share image, reading time, an author box, a closing estimate section and three related posts, so do not write a sign-off, an author line, a "related reading" list or a closing call-to-action button into the body.

## The deliverable block (top of every post, for the owner to delete)

```
Title:
Meta description:
Target phrase:
Stage:            awareness | consideration | decision | post-purchase
Avatar variant:
Primary CTA:
Internal links:   1) ... 2) ...
Sources cited:
Photo:            Pexels phrase "..." / real photo to swap in later: ...
Confirm with owner:
  - ...
Stop-slop score:  xx/50 (Directness x, Rhythm x, Trust x, Authenticity x, Density x)
```

Then the post, starting with the H1.
