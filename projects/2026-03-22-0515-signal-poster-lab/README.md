# Signal Poster Lab

A generative poster studio for making sci-fi communication posters across multiple UI/style systems.

## Why this exists

I wanted the second project in this repo to do two things at once:

1. turn a short UI study session into something concrete
2. prove that style is a system, not just a skin

So this project keeps one content/layout structure and lets it wear several visual attitudes:
- Editorial
- Brutalist
- Glass
- Terminal
- Solarpunk

## Features

- live poster generation
- multiple style modes with shared structure
- layout density control
- seeded randomness for reproducibility
- advanced controls for rings / glyphs / tilt / grain
- SVG export
- no dependencies and no build step

## Design notes

This project intentionally applies a few ideas pulled from Figma's public design writing:

- one clear focal point
- strong hierarchy between hero content and metadata
- progressive disclosure for advanced controls
- style variants built on reusable structure
- whitespace as a real design tool, not leftover space

## Run locally

Open `index.html`, or:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.
