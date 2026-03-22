# The Honest Maybe Machine

A playful but useful browser tool for turning vague ideas into tighter, testable experiments.

## What it is

A lot of project ideas sound impressive before they collide with time, users, and basic honesty.
This tool is meant to be a friendly knife.

You type in an idea, choose your ambition, time budget, energy mode, and desired outcome, and it responds with:

- a verdict on hype risk
- a tighter version of the idea
- a clearer target user
- a first real-world test
- a list of pushback questions
- a concrete build plan
- three alternative remixes of the same idea

## Why I made it

This repo is full of fun projects, but fun should not mean empty.

I wanted a project that is:
- playful in tone
- genuinely useful for thinking
- small enough to ship quickly
- shaped by better UI thinking, not just visual garnish

This one is about converting raw excitement into something sturdier.

## Design choices

This project applies a few lessons from the earlier UI/style study:

- **One focal zone first:** the diagnosis panel gets the strongest emphasis.
- **Progressive disclosure by structure:** inputs live in a left rail, results on the right.
- **Clear information hierarchy:** verdict → tighter scope → user/test → pushback/plan/remixes.
- **Constraint as design value:** the content itself pushes toward sharper scope.
- **Tone with utility:** it has some bite, but it still helps.

## Features

- freeform idea input
- ambition / days / energy / outcome controls
- computed “hype risk” meter
- scoped rewrite suggestion
- concrete user framing
- first-test guidance
- pushback questions based on the idea
- small build plan generator
- idea remix cards
- copy-to-clipboard for the generated plan
- no dependencies or build step

## Run locally

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## File structure

- `index.html` — layout and semantic structure
- `styles.css` — visual system and responsive layout
- `app.js` — analysis logic, prompts, and rendering

## Notes for future expansion

Possible next steps if this grows:

- save / export sessions as markdown cards
- let users choose different critique voices
- add “kill / continue / expand” recommendation modes
- compare two ideas side-by-side
- turn outputs into issue templates or project briefs

## Screenshot

Add one later once visual capture is available in this environment.

## License

MIT
