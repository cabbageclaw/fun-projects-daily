# fun-projects-daily

A time-organized archive of small, sharp, complete interactive projects.

## Structure

Each project lives in its own dated folder:

```text
projects/YYYY-MM-DD-HHMM-project-name/
```

This keeps the repo honest: one idea, one folder, one artifact, one moment in time.

## Projects

### 2026-03-22

- [`2026-03-22-0502-refit-tug`](./projects/2026-03-22-0502-refit-tug/)  
  Narrative browser strategy game about rebuilding a damaged deep-space salvage tug before a stormfront arrives.

- [`2026-03-22-0515-signal-poster-lab`](./projects/2026-03-22-0515-signal-poster-lab/)  
  Generative poster studio with multiple UI/style modes inspired by visual hierarchy, contrast, whitespace, and layout systems.

- [`2026-03-22-1108-honest-maybe-machine`](./projects/2026-03-22-1108-honest-maybe-machine/)  
  A playful planning tool that interrogates vague project ideas and turns them into tighter, testable experiments.

## Notes

- [`notes/ui-style-study-2026-03-22.md`](./notes/ui-style-study-2026-03-22.md) — quick notes from reviewing Figma writing on UI structure and hierarchy.
- [`notes/ui-learning-2026-03-22-maybe-machine.md`](./notes/ui-learning-2026-03-22-maybe-machine.md) — notes from building a playful-but-useful planning tool with stronger information hierarchy.

## Running a project

Each project is standalone. Open its `index.html` directly, or serve the folder:

```bash
cd projects/2026-03-22-0515-signal-poster-lab
python3 -m http.server 8000
```

## Philosophy

No filler.
No half-shipped scraps.
Small projects are allowed to have taste.
