# Reviewing and publishing a blog post

Claude writes a draft post and opens a pull request. Nothing goes on the website until you merge it. Everything happens on github.com; you don't need to install anything.

## When a new draft arrives

A message appears in the **#bath-blog** Discord channel with the post title and a link to its pull request. (You'll also get a GitHub email requesting your review. Or go to the repo → **Pull requests** → anything starting with `blog/`.) When you merge, a second Discord message posts the live address.

The pull request description lists:
- what the post is for and who it's written to,
- two or three **photos to add**, each described in one line,
- anything marked **Confirm with owner** (a fact Claude wasn't sure of). Check those with Constance before publishing.

## 1. Read it on the preview

A few minutes after the pull request opens, Vercel adds a comment with a **Preview** link. Click it, go to `/blog/`, and open the post. It will show a placeholder photo and a "DRAFT" note until you finish the steps below. That's expected.

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
draft: true               ← change to false when it's ready to go live
---
The post, in plain text. Headings start with ##. Lists start with -.
```

Edit anything you like in the text. Keep the `---` lines and the `name: value` lines at the top intact. When done, click **Commit changes** (keep "Commit directly to the blog/... branch" selected).

## 3. Add the photos

Each post needs one main photo. The pull request description tells you what to shoot or pick, and the file name to use. It's always `blog-` plus the post's file name, for example `blog-shower-grout-gray`.

1. Pick or take the photo. Landscape (wider than tall), at least 1200 pixels wide. A phone photo is fine; it gets resized automatically.
2. Rename the file on your computer to the name from the description plus the ending it has, for example `blog-shower-grout-gray.jpg`.
3. In the pull request, click **Files changed** → scroll to the top → there's a link to the branch name (`blog/...`). Click it to open the branch. Then open the `images` folder → `blog`.
4. Click **Add file** → **Upload files**. Drag the photo in. Click **Commit changes**.

For a second photo inside the post, name it with `-2`, `-3` and so on (`blog-shower-grout-gray-2.jpg`), upload it the same way, and in the post text put `![describe the photo](blog-shower-grout-gray-2)` on its own line where it should appear.

A few minutes after you upload, the site rebuilds itself and the preview link shows the real photo. Refresh to check.

## 4. Publish

1. Edit the `.md` file once more and change `draft: true` to `draft: false`. Commit.
2. Wait for the two checks at the bottom of the pull request to turn green (the build, and Vercel).
3. Click **Merge pull request** → **Confirm merge**.

The live site updates within a few minutes. The post appears at `bulldogkitchenbath.com/blog/<post-name>/`.

## 5. Mark it done

Open `blog-planning/content-calendar.md` on the `main` branch, edit the post's row: Status → `published`, PR/URL → the post's address. Commit.

## If something looks wrong

- **Preview shows no new post:** the branch build may still be running. Check the **Actions** tab; a red X means the post file has a typo in the top section (a missing `---` line, or a date not written as 2026-10-20). Open the failed run to see the message, fix the file, commit.
- **Photo doesn't show:** check the file name matches `img:` exactly, lowercase, no spaces, and that it's in `images/blog/`, not somewhere else.
- **You want Claude to change something:** leave a comment on the pull request saying what. Constance can run Claude on it, or Claude Code can pick it up.
- **You merged by mistake with `draft: true`:** nothing is on the live site; drafts never build on `main`. Open a new pull request from `main`, change `draft` to `false`, merge again.
