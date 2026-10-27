# Blog content calendar

One row per post. The agent reads this before picking a topic (stage mix: about 4 awareness, 3 consideration, 2 decision, 1 post-purchase per ten) and appends a row when it drafts. The assistant updates Status when they publish.

Status: `planned` → `drafted` (PR open) → `published` (PR merged) · `skipped`

Stage: awareness · consideration · decision · post-purchase

| # | Date | Title | Stage | Variant | Search phrase | Status | PR / URL |
|---|---|---|---|---|---|---|---|
| 0 | 2026-08-28 | 5 Bathroom Upgrades for Aging in Place | awareness | Margaret | aging in place bathroom | published (starter) | /blog/aging-in-place-bathroom-upgrades/ |
| 0 | 2026-09-15 | Cabinet Refacing vs. Replacement | consideration | (kitchen) | cabinet refacing vs replacement | published (starter) | /blog/kitchen-cabinet-refacing-vs-replacement/ |
| 0 | 2026-10-01 | Is a Tub-to-Shower Conversion Right for You? | consideration | Linda | tub to shower conversion | published (starter) | /blog/tub-to-shower-conversion-guide/ |
| 1 | 2026-10-05 | Why your shower grout turns gray again a year after you clean it | awareness | Linda | shower grout turns gray | published | /blog/shower-grout-turns-gray/ |
| 2 | 2026-10-08 | What's behind the shower tile in a 1960s Cincinnati bathroom | awareness | Linda | what is behind shower tile | published | /blog/behind-shower-tile-1960s-cincinnati-bathroom/ |
| 3 | 2026-10-17 | Tile vs. acrylic shower walls: what each one asks of you over 20 years | consideration | all | tile vs acrylic shower walls | published | /blog/tile-vs-acrylic-shower-walls/ |
| 4 | 2026-10-11 | One-day bathroom remodel: what to expect, hour by hour | decision | all | one day bathroom remodel what to expect | published | /blog/one-day-bathroom-remodel-what-to-expect/ |
| 5 | 2026-10-19 | Soft floor next to your bathtub: what it is and what waiting costs | awareness | Linda | soft floor next to bathtub | published | /blog/soft-floor-next-to-bathtub/ |
| 6 | 2026-10-13 | One-day bathroom remodel cost in Cincinnati: what sets the price | consideration | Dave & Karen | one day bathroom remodel cost Cincinnati | published | /blog/one-day-bathroom-remodel-cost-cincinnati/ |
| 7 | 2026-10-30 | "Won't it look like a plastic insert?" Why some acrylic shower walls look cheap | consideration | Linda | acrylic shower walls look cheap | drafted | blog/wont-it-look-like-a-plastic-insert |
| 8 | 2026-10-22 | "Grab bars are for old people," and four other things we hear | awareness | Margaret | walk in shower for seniors | published | /blog/grab-bars-are-for-old-people/ |
| 9 | 2026-10-15 | Three questions to ask a bathroom contractor before a deposit | decision | all | questions to ask bathroom contractor | published | /blog/questions-to-ask-bathroom-contractor/ |
| 10 | 2026-10-24 | How to clean your new grout-free shower (and what to keep off it) | post-purchase | all | how to clean acrylic shower walls | published | /blog/how-to-clean-grout-free-shower/ |
| 11 | | A new grout-free shower for about the cost of a cable bill | consideration | Linda, Margaret | bathroom remodel financing | planned | |
| 12 | | Bathroom mildew that keeps coming back: where it lives | awareness | Linda | shower mildew keeps coming back | planned | |

The agent takes the next `planned` row in order unless the stage mix of the last ten `drafted`/`published` rows calls for a different stage; then it takes the next `planned` row of the needed stage. Topics beyond row 12 come from the topic bank in the skill's `references/funnel-stages.md`.
