# Publishing a blog post

Claude writes a post and opens a pull request. **Merging the pull request is what publishes it.** Nothing else to flip, no file to edit, no photo to upload.

## When a new post arrives

A message appears in the **#bath-blog** Discord channel with the post title and a link to its pull request. (You'll also get a GitHub email asking for your review.)

## 1. Look at it

Open the link. Scroll down the pull request to the **vercel** comment and click **Preview** to see the post exactly as it will look on the site, photo included. (The "Preview, not on the live site yet" note disappears once it's live.) If the preview link isn't there yet, give it two or three minutes.

Read it as if you were a 60-year-old homeowner in Anderson Township. If a sentence sounds like an ad or a robot, see step 2. If it reads fine, go to step 3.

## 2. Fix anything (optional)

**Words:** in the pull request click **Files changed**, find the file ending in `.md`, click the **three dots (⋯)** on it → **Edit file**. Edit the text, keep the `---` lines and the `name: value` lines at the top as they are, then **Commit changes** (keep "Commit directly to the blog/… branch" selected). The preview updates in a couple of minutes.

**Photo:** the post has one photo, picked from Pexels with the `photo:` words at the top of the file. To get a different one, edit those words to describe the picture you want ("older couple looking at tile samples"), then open the branch's `images/blog` folder, click the `.jpg`, delete it (trash icon → **Commit changes**). A new photo is fetched in a few minutes. To use a real Bulldog photo instead, delete the `.jpg` the same way, then **Add file** → **Upload files** with yours, named exactly like the one you deleted.

**Bigger changes:** leave a comment on the pull request saying what you want. Constance can run Claude on it.

## 3. Publish

Scroll to the bottom of the pull request's **Conversation** tab and click the green **Merge pull request** button, then **Confirm merge**. That's it.

The site rebuilds itself, the post is dated the day you merged it, and it is live at `bulldogkitchenbath.com/blog/<post-name>/` within a few minutes. A second Discord message posts the live address.

If the merge button is gray and says the checks haven't finished, wait a minute and refresh. If it says there is a conflict, don't try to resolve it; leave a comment on the pull request and Claude will sort it out.

## Not publishing a post

Just don't merge it. To drop it for good, click **Close pull request** at the bottom.

## If something looks wrong

- **Preview still shows the gray placeholder photo:** check the **Actions** tab for the `Fetch blog photos from Pexels` step; a missing `PEXELS_API_KEY` secret keeps the placeholder.
- **Preview doesn't show the post at all:** the build may still be running. A red X in the **Actions** tab means a typo at the top of the post file (a missing `---` line, or a date not written as 2026-10-20). Open the failed run to see the message, fix the file, commit.
- **Merged, but not on the live site after ten minutes:** check the **Actions** tab on `main` for a red X, and tell Constance.
