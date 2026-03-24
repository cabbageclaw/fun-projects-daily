const form = document.getElementById('confession-form');
const input = document.getElementById('confession-input');
const gravity = document.getElementById('gravity');
const chaos = document.getElementById('chaos');
const satellite = document.getElementById('satellite');
const satelliteText = document.getElementById('satellite-text');
const reading = document.getElementById('reading');
const orbitType = document.getElementById('orbit-type');
const verdict = document.getElementById('verdict');
const log = document.getElementById('log');
const clearLog = document.getElementById('clear-log');
const template = document.getElementById('log-item-template');

const STORAGE_KEY = 'orbit-confessional-log';

const verdictMap = {
  orbiting: [
    'clingy thought. keeps looping because it still wants attention.',
    'stable orbit. not solved, but contained enough to survive the night.',
    'this one is circling the drain politely.'
  ],
  spiral: [
    'spiral pattern detected. probably meaningful, definitely dramatic.',
    'the machine thinks you are overfitting a feeling.',
    'slow collapse. not fatal, but it does want a name.'
  ],
  escape: [
    'this thought wants out. let it leave before it colonizes the room.',
    'escape velocity achieved. stop babysitting it.',
    'the confession is less important than the motion it unlocked.'
  ],
  decay: [
    'decay orbit. tiny thing, weirdly sticky.',
    'it keeps falling inward because you keep feeding it narrative calories.',
    'low-altitude dread. better puncture it than worship it.'
  ]
};

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function classify(text, gravityValue, chaosValue) {
  const cleaned = text.trim();
  const length = cleaned.length;
  const intensity = gravityValue + Math.floor(chaosValue / 2);
  const seed = [...cleaned].reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0);

  if (chaosValue > 76 && length > 40) return { type: 'escape', seed };
  if (gravityValue > 135 && chaosValue < 38) return { type: 'decay', seed };
  if (intensity > 150 || /always|never|ruined|panic|spiral|doom/i.test(cleaned)) return { type: 'spiral', seed };
  return { type: 'orbiting', seed };
}

function renderLog(items) {
  log.innerHTML = '';
  if (!items.length) {
    const empty = document.createElement('li');
    empty.className = 'log-item';
    empty.innerHTML = '<div><p class="log-text">No recent emissions.</p><p class="log-sub">launch something weird</p></div><span class="badge">idle</span>';
    log.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.log-text').textContent = `“${item.text}”`;
    node.querySelector('.log-sub').textContent = item.verdict;
    node.querySelector('.badge').textContent = item.type;
    log.appendChild(node);
  });
}

function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 6)));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function launch(event) {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const gravityValue = Number(gravity.value);
  const chaosValue = Number(chaos.value);
  const result = classify(text, gravityValue, chaosValue);
  const type = result.type;
  const verdictText = pick(verdictMap[type], result.seed);

  satellite.className = `satellite ${type}`;
  satellite.style.setProperty('--radius', `${110 + gravityValue}px`);
  satellite.style.setProperty('--duration', `${Math.max(5, 18 - Math.floor(gravityValue / 15))}s`);
  satellite.classList.remove('hidden');
  satelliteText.textContent = text.length > 76 ? `${text.slice(0, 73)}…` : text;

  reading.textContent = text;
  orbitType.textContent = type;
  verdict.textContent = verdictText;

  const items = [{ text, type, verdict: verdictText }, ...load()].slice(0, 6);
  save(items);
  renderLog(items);
}

form.addEventListener('submit', launch);
clearLog.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderLog([]);
});

renderLog(load());
