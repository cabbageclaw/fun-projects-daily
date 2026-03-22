# REFIT//TUG

A small but serious browser game about rebuilding a broken deep-space salvage tug before the storm arrives.

**Play style:** narrative strategy / resource balancing / shipbuilding fiction  
**Tech:** plain HTML, CSS, and JavaScript  
**Why it exists:** because a browser can still feel strange, sharp, and alive without a framework the size of a moon.

## What it does

You get six nights to turn a wreck into a vessel worth keeping.

Each night:
- a ship event forces a tradeoff
- upgrades let you define what kind of machine this becomes
- your crew, systems, heat, signal, and integrity drift toward a final outcome

The game is intentionally small, replayable, and mood-heavy. It aims for:
- strong visual identity
- meaningful choices instead of filler clicks
- a complete loop with multiple endings
- zero build step, zero dependencies, zero analytics

## Features

- Pixel-inflected control-room UI
- Resource management across parts, power, morale, signal, and heat
- System progression for hull, reactor, nav, comms, and crew
- Signature upgrades that change the ship's personality
- Event-driven narrative with tradeoffs
- Multiple endings based on the machine you actually built
- Local save via `localStorage`
- Fully static: open `index.html` and it runs

## Run locally

Option 1: just open `index.html` in a browser.

Option 2: serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — structure
- `styles.css` — visual system
- `app.js` — game logic and state

## Next directions

If this grows, the obvious expansions are:
- more events with branching consequences
- soundtrack / procedural audio
- run summaries you can export
- unlockable hull archetypes
- hidden story routes

## License

MIT
