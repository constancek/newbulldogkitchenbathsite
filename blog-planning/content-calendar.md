# Blog content calendar

One row per post. The agent reads this before picking a topic (stage mix: about 4 awareness, 3 consideration, 2 decision, 1 post-purchase per ten) and appends a row when it drafts. The assistant updates Status when they publish.

Status: `planned` → `drafted` (PR open) → `published` (merged with draft: false) · `skipped`

Stage: awareness · consideration · decision · post-purchase

| # | Date | Title | Stage | Variant | Search phrase | Status | PR / URL |
|---|---|---|---|---|---|---|---|
| 0 | 2026-08-28 | 5 Bathroom Upgrades for Aging in Place | awareness | Margaret | aging in place bathroom | published (starter) | /blog/aging-in-place-bathroom-upgrades/ |
| 0 | 2026-09-15 | Cabinet Refacing vs. Replacement | consideration | (kitchen) | cabinet refacing vs replacement | published (starter) | /blog/kitchen-cabinet-refacing-vs-replacement/ |
| 0 | 2026-10-01 | Is a Tub-to-Shower Conversion Right for You? | consideration | Linda | tub to shower conversion | published (starter) | /blog/tub-to-shower-conversion-guide/ |
| 1 | 2026-10-17 | Why your shower grout turns gray again a year after you clean it | awareness | Linda | shower grout turns gray | drafted | blog/shower-grout-turns-gray |
| 2 | | What's behind the tile in a 1960s Cincinnati bathroom | awareness | Linda | what is behind shower tile | planned | |
| 3 | | Tile shower vs. solid-surface walls: an honest comparison | consideration | all | tile vs acrylic shower walls | planned | |
| 4 | | Install day, hour by hour | decision | all | one day bathroom remodel what to expect | planned | |
| 5 | | The soft spot in the floor next to your tub | awareness | Linda | soft floor next to bathtub | planned | |
| 6 | | What sets the price of a one-day shower gut in Cincinnati | consideration | Dave & Karen | one day bathroom remodel cost Cincinnati | planned | |
| 7 | | "Won't it look like a plastic insert?" | consideration | Linda | acrylic shower walls look cheap | planned | |
| 8 | | Grab bars and walk-in showers are for old people (and other things we hear) | awareness | Margaret | walk in shower for seniors | planned | |
| 9 | | The three questions to ask every bathroom contractor before a deposit | decision | all | questions to ask bathroom contractor | planned | |
| 10 | | How to clean your new grout-free shower | post-purchase | all | how to clean acrylic shower walls | planned | |
| 11 | | A new grout-free shower for about the cost of a cable bill | consideration | Linda, Margaret | bathroom remodel financing | planned | |
| 12 | | Bathroom mildew that keeps coming back: where it lives | awareness | Linda | shower mildew keeps coming back | planned | |

The agent takes the next `planned` row in order unless the stage mix of the last ten `drafted`/`published` rows calls for a different stage; then it takes the next `planned` row of the needed stage. Topics beyond row 12 come from the topic bank in the skill's `references/funnel-stages.md`.
