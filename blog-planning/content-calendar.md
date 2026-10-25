# Blog content calendar

One row per post. The agent reads this before picking a topic (stage mix: about 4 awareness, 3 consideration, 2 decision, 1 post-purchase per ten) and appends a row when it drafts. The assistant updates Status when they publish.

Status: `planned` → `drafted` (PR open) → `published` (PR merged) · `skipped`

Stage: awareness · consideration · decision · post-purchase

| # | Date | Title | Stage | Variant | Search phrase | Status | PR / URL |
|---|---|---|---|---|---|---|---|
| 0 | 2026-08-28 | 5 Bathroom Upgrades for Aging in Place | awareness | Margaret | aging in place bathroom | published (starter) | /blog/aging-in-place-bathroom-upgrades/ |
| 0 | 2026-09-15 | Cabinet Refacing vs. Replacement | consideration | (kitchen) | cabinet refacing vs replacement | published (starter) | /blog/kitchen-cabinet-refacing-vs-replacement/ |
| 0 | 2026-10-01 | Is a Tub-to-Shower Conversion Right for You? | consideration | Linda | tub to shower conversion | published (starter) | /blog/tub-to-shower-conversion-guide/ |
| 1 | 2026-10-17 | Why your shower grout turns gray again a year after you clean it | awareness | Linda | shower grout turns gray | drafted | blog/shower-grout-turns-gray |
| 2 | 2026-10-24 | What's behind the shower tile in a 1960s Cincinnati bathroom | awareness | Linda | what is behind shower tile | drafted | blog/behind-shower-tile-1960s-cincinnati-bathroom |
| 3 | 2026-10-31 | Tile vs. acrylic shower walls: what each one asks of you over 20 years | consideration | all | tile vs acrylic shower walls | drafted | blog/tile-vs-acrylic-shower-walls |
| 4 | 2026-11-07 | One-day bathroom remodel: what to expect, hour by hour | decision | all | one day bathroom remodel what to expect | drafted | blog/one-day-bathroom-remodel-what-to-expect |
| 5 | 2026-11-14 | Soft floor next to your bathtub: what it is and what waiting costs | awareness | Linda | soft floor next to bathtub | drafted | blog/soft-floor-next-to-bathtub |
| 6 | 2026-12-05 | One-day bathroom remodel cost in Cincinnati: what sets the price | consideration | Dave & Karen | one day bathroom remodel cost Cincinnati | drafted | blog/one-day-bathroom-remodel-cost-cincinnati |
| 7 | | "Won't it look like a plastic insert?" | consideration | Linda | acrylic shower walls look cheap | planned | |
| 8 | | Grab bars and walk-in showers are for old people (and other things we hear) | awareness | Margaret | walk in shower for seniors | planned | |
| 9 | 2026-11-21 | Three questions to ask a bathroom contractor before a deposit | decision | all | questions to ask bathroom contractor | drafted | blog/questions-to-ask-bathroom-contractor |
| 10 | | How to clean your new grout-free shower | post-purchase | all | how to clean acrylic shower walls | planned | |
| 11 | | A new grout-free shower for about the cost of a cable bill | consideration | Linda, Margaret | bathroom remodel financing | planned | |
| 12 | | Bathroom mildew that keeps coming back: where it lives | awareness | Linda | shower mildew keeps coming back | planned | |

The agent takes the next `planned` row in order unless the stage mix of the last ten `drafted`/`published` rows calls for a different stage; then it takes the next `planned` row of the needed stage. Topics beyond row 12 come from the topic bank in the skill's `references/funnel-stages.md`.
