# Publishing: how a post gets from this agent onto the site

The site is a static build. Posts are Markdown files; a GitHub Action renders them and converts photos; Vercel serves the result. A post goes live only when a human merges it with `draft: false`.

## Where things live in the repo

| Path | What |
|---|---|
| `src/content/blog/<slug>.md` | One file per post. The file name is the URL (`/blog/<slug>/`). |
| `images/blog/blog-<slug>.jpg` (or .png/.webp) | The post's photo. The assistant uploads it; the Action converts it. |
| `blog-planning/content-calendar.md` | Every post planned, drafted or published, with its stage. Read it before choosing a topic. Append to it when you draft. |
| `blog-planning/bulldog-avatar.md` | The avatar and the owner's discovery answers. |
| `BLOG-REVIEW.md` | The assistant's instructions. Don't edit it in a post PR. |

## The post file

```
---
title: Why your shower grout turns gray again a year after you clean it
date: 2026-10-20
excerpt: One or two sentences for the blog index card. Under 160 characters.
description: Meta description for search. Under 155 characters. Different from the excerpt.
img: blog-shower-grout-gray
draft: true
---
Body in Markdown. H2s with "##". Short paragraphs. One table at most, in pipe syntax.
Inline photos as ![alt text](blog-shower-grout-gray-2) using a photo name, no extension.
```

Rules:
- Slug: lowercase words joined by hyphens, 3 to 8 words, built from the title. No dates, no stop words at the start.
- `date`: the planned publish date, YYYY-MM-DD. Posts sort newest first, so use the next open slot on the calendar, not today.
- `img`: always `blog-<slug>`. The build shows a placeholder until the photo exists, so the preview works without it.
- `draft: true` always. The agent never publishes. The assistant flips it.
- Markdown subset the build understands: `##`/`###` headings, paragraphs, `-` and `1.` lists, `**bold**`, `*italic*`, `[links](url)`, `![images](photo-name)`, pipe tables, `>` quotes, `---` rules. No raw HTML, no footnotes, no nested lists.
- Links to site pages are root-relative: `/one-day-bathroom-remodel/`, `/inspiration-colors-patterns/`, `/financing/`, `/current-promos/`, `/about/#contact`, `/blog/<other-slug>/`.

## The header block goes in the PR, not the file

The deliverable block from `post-templates.md` (target phrase, stage, CTA, image suggestions, confirm-with-owner items, stop-slop score) goes in the pull request description. The `.md` file holds only front matter and the post. The assistant reads the PR description to know what photos to shoot and what to check.

## Opening the PR (scheduled runs and Claude Code sessions)

1. `git checkout -b blog/<slug>` from `main`.
2. Write `src/content/blog/<slug>.md`.
3. Append a row to `blog-planning/content-calendar.md` with status `drafted` and the planned date.
4. Run `node src/build.js` once to be sure the file parses (it throws on a bad front matter). Don't commit `public/`; the Action does that.
5. Commit the `.md` and the calendar. Push the branch. Open a PR against `main` titled with the post title, body = the header block, and request a review from `markx645-cell`. Add the label `blog` if it exists.
6. Reply in the session with the PR link and one line on what the post does.

If `gh` is available: `gh pr create --base main --title "<title>" --body-file <file> --reviewer markx645-cell --label blog`. Otherwise push and give the owner the compare URL.

## What the Action does after the push

Within a few minutes: installs ffmpeg, runs the build with drafts included (because the branch isn't `main`), commits `public/` to the branch. Vercel then builds a preview of the branch, and the PR shows the preview link. The assistant reviews there.

## One post per run

A scheduled run writes exactly one post. If an open `blog/*` PR already exists with no review activity for 7 days, the run writes nothing and instead posts a comment on that PR asking for a review, then stops. Unreviewed drafts should not pile up.
