# Bulldog Blog Agent

A Claude skill that writes blog posts for Bulldog Kitchen & Bath. It builds and keeps a customer avatar, runs discovery, assigns every post to a funnel stage, answers the real objections, and removes AI writing patterns with the bundled stop-slop rules.

## Files

```
bulldog-blog-agent/
  SKILL.md                      the agent: workflow, rules, phases
  README.md                     this file
  references/
    brand-and-product.md        verified facts, owner claims, claims to avoid
    avatar.md                   draft avatar (Linda & Tom) + two variants
    discovery.md                owner interview + per-post discovery
    funnel-stages.md            four stages, mix rule, 37-topic bank, CTA ladder
    objections.md               the concerns and the installer's answers
    post-templates.md           structures by stage, SEO, formatting for 50+ readers
    voice.md                    Bulldog voice rules on top of stop-slop
    stop-slop/                  Hardik Pandya's stop-slop skill, MIT, bundled unchanged
  templates/
    content-brief.md            fill before each post
    avatar-template.md          fill during discovery; save as bulldog-avatar.md
  examples/
    sample-post-grout.md        a finished awareness post produced with this skill
```

## Install

**Claude.ai / Claude desktop:** zip the `bulldog-blog-agent` folder and upload it as a custom skill in Settings (Capabilities → Skills). Then in any chat: "Use the bulldog-blog-agent skill. Run discovery." Check https://support.claude.com for the current upload path.

**Claude Code:** copy the folder to `~/.claude/skills/bulldog-blog-agent/` (all projects) or `.claude/skills/bulldog-blog-agent/` (one project). Invoke with `/bulldog-blog-agent`.

**Any other Claude surface (API, Projects):** paste `SKILL.md` as the system prompt and attach the `references/` and `templates/` files as project knowledge.

## First run

1. "Run discovery." Claude shows the draft avatar and asks 8–12 questions. Answer in your own words; the actual phrases customers use are the most valuable thing you can give it.
2. Claude rewrites the avatar and saves `bulldog-avatar.md`. Keep that file with the skill (or in Notion/Drive) and tell Claude where it is next time.
3. Claude proposes a 12-post calendar balanced across awareness, consideration, decision and post-purchase. Edit it.
4. "Write post 1." Claude fills a two-line brief, researches anything it needs a source for, drafts, runs the stop-slop pass, scores it, and delivers a doc with a header block listing anything marked `[CONFIRM WITH OWNER]`.

## Every later run

- "Write about [topic]" → Claude picks the stage, briefs, drafts, scores.
- "This sounds like AI" → Claude reruns the stop-slop pass at 45/50 and rewrites sentence by sentence.
- "What should the next post be?" → Claude checks the stage mix and proposes from the topic bank.
- "Score this post" (paste any post) → Claude scores it on the five stop-slop dimensions and lists fixes.

## Things to confirm before the first post goes live

See the "Not verified" list in `references/brand-and-product.md`. The most important: what the surround is made of in your words, whether there is caulk anywhere, what "one day" includes, warranty transfer, financing terms, and which projects and reviews you have permission to describe.

## Credits

Anti-AI-voice rules: [stop-slop](https://github.com/hardikpandya/stop-slop) by Hardik Pandya, MIT License, bundled in `references/stop-slop/` with its license file.
