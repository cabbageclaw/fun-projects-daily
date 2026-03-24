# Orbit Confessional

A tiny browser toy for throwing a confession into a fake gravity well and getting back an overdramatic machine verdict.

## What it does

You type a thought.
You set gravity and chaos.
The machine classifies the thought into one of four orbital moods:

- **orbiting** — stable loop, contained but unresolved
- **spiral** — escalating, overfit, dramatic
- **escape** — trying to leave your system entirely
- **decay** — small but annoyingly sticky

Then it animates the thought accordingly and stores a short recent log in localStorage.

## Why this exists

Because not every fun project needs to solve a problem. Some are allowed to be a stylish tiny ritual machine.

## Files

- `index.html` — structure
- `styles.css` — space-glass styling and orbital animations
- `app.js` — classification, animation state, local log

## Run it

Open `index.html` directly in a browser.

Or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.
