# Reviewing and publishing a blog post

Claude writes a draft post and opens a pull request. Nothing goes on the website until you merge it. Everything happens on github.com; you don't need to install anything.

## When a new draft arrives

A message appears in the **#bath-blog** Discord channel with the post title and a link to its pull request. (You'll also get a GitHub email requesting your review. Or go to the repo → **Pull requests** → anything starting with `blog/`.) When you merge, a second Discord message posts the live address.

The pull request description lists:
- what the post is for and who it's written to,
- the **photo** line: the search phrase the stock photo was picked with, and a one-line description of a real Bulldog photo that could replace it,
- anything marked **Confirm with owner** (a fact Claude wasn't sure of). Check those with Constance before publishing.

## 1. Read it on the preview

A few minutes after the pull request opens, Vercel adds a comment with a **Preview** link. Click it, go to `/blog/`, and open the post. It will show a "DRAFT" note until you publish (step 4). That's expected. The photo appears on its own a few minutes after the pull request opens (see step 3).

Read the whole post as if you were a 60-year-old homeowner in Anderson Township. If a sentence sounds like an ad or like a robot, fix it (step 2) or leave a comment on the pull request asking Claude to rewrite it.

## 2. Edit the words

In the pull request, click **Files changed**. The post is the file ending in `.md` under `src/content/blog/`. Click the **three dots** on that file → **Edit file**.

The file has two parts:

```
---
title: ...
date: 2026-10-20          ← the day it should appear. Change if needed.
excerpt: ...              ← the short text on the blog index page
description: ...          ← what Google shows under the title
img: blog-the-post-name   ← the photo name (see step 3). Leave as is.
photo: ...                ← the words the stock photo was searched with (see step 3)
photoCredit: ...          ← who took the stock photo; filled in automatically, leave it
draft: true               ← change to false when it's ready to go live
---
The post, in plain text. Headings start with ##. Lists start with -.
```

Edit anything you like in the text. Keep the `---` lines and the `name: value` lines at the top intact. When done, click **Commit changes** (keep "Commit directly to the blog/... branch" selected).

## 3. Check the photo

Each post has exactly one photo, the big one at the top. You don't need to find it: when the pull request opens, the site picks a stock photo from Pexels using the `photo:` words at the top of the post file, saves it as `images/blog/blog-the-post-name.jpg`, and the preview shows it a few minutes later. (This needs the `PEXELS_API_KEY` secret in the repo settings; if the preview keeps the gray placeholder, that's the first thing to check.)

If the photo doesn't fit the post:

- **Different stock photo:** edit the `.md` file, change the `photo:` words to describe the picture you want ("older couple looking at tile samples"), then open the branch's `images/blog` folder, click the `.jpg`, and delete it (the trash icon → **Commit changes**). A new one is fetched on the next build.
- **A real Bulldog photo:** open the branch's `images/blog` folder, delete the `.jpg`, then **Add file** → **Upload files** and drag yours in, named exactly `blog-the-post-name.jpg` (landscape, at least 1200 pixels wide; a phone photo is fine). Commit.

Don't add a second photo inside the post text; posts carry one image.

## 4. Publish

1. Edit the `.md` file once more and change `draft: true` to `draft: false`. Commit.
2. Wait for the two checks at the bottom of the pull request to turn green (the build, and Vercel).
3. Click **Merge pull request** → **Confirm merge**.

The live site updates within a few minutes. The post appears at `bulldogkitchenbath.com/blog/<post-name>/`.

## 5. Mark it done

Open `blog-planning/content-calendar.md` on the `main` branch, edit the post's row: Status → `published`, PR/URL → the post's address. Commit.

## If something looks wrong

- **Preview shows no new post:** the branch build may still be running. Check the **Actions** tab; a red X means the post file has a typo in the top section (a missing `---` line, or a date not written as 2026-10-20). Open the failed run to see the message, fix the file, commit.
- **Photo doesn't show:** check the Actions tab for the `Fetch blog photos from Pexels` step (a missing `PEXELS_API_KEY` secret means the placeholder stays). If you uploaded your own, check the file name matches `img:` exactly, lowercase, no spaces, and that it's in `images/blog/`, not somewhere else.
- **You want Claude to change something:** leave a comment on the pull request saying what. Constance can run Claude on it, or Claude Code can pick it up.
- **You merged by mistake with `draft: true`:** nothing is on the live site; drafts never build on `main`. Open a new pull request from `main`, change `draft` to `false`, merge again.
