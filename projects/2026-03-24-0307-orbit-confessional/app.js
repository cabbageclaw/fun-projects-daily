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

const roastMap = {
  orbiting: [
    'Incredible. You took a small avoidable problem and gave it the emotional budget of a prestige miniseries.',
    'This confession has the energy of someone refreshing their suffering so it does not lose relevance.',
    'You are not trapped. You are just weirdly loyal to your own unfinished nonsense.'
  ],
  spiral: [
    'This is not a crisis. This is you putting dramatic lighting on basic incompetence.',
    'You keep calling it a spiral because “I refuse to do one boring obvious thing” sounds less cinematic.',
    'Congratulations on turning one awkward feeling into a full haunted amusement park.'
  ],
  escape: [
    'Even your confession is trying to leave you. Honestly, fair.',
    'This thought hit escape velocity before your work ethic even found its shoes.',
    'You do not need closure. You need to stop pitching every discomfort like it deserves a sequel.'
  ],
  decay: [
    'Ah yes, the classic tiny rotting problem you kept alive like a Victorian child with a cough.',
    'This is so small it should have died naturally, but you keep feeding it attention pellets.',
    'You could solve this in ten minutes, which is exactly why your brain turned it into folklore.'
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
  if (intensity > 150 || /always|never|ruined|panic|spiral|doom|disaster|over/i.test(cleaned)) return { type: 'spiral', seed };
  return { type: 'orbiting', seed };
}

function renderLog(items) {
  log.innerHTML = '';
  if (!items.length) {
    const empty = document.createElement('li');
    empty.className = 'log-item';
    empty.innerHTML = '<div><p class="log-text">No recent humiliations.</p><p class="log-sub">offer the machine something embarrassing</p></div><span class="badge">idle</span>';
    log.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.log-text').textContent = `“${item.text}”`;
    node.querySelector('.log-sub').textContent = item.roast;
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
  const roastText = pick(roastMap[type], result.seed);

  satellite.className = `satellite ${type}`;
  satellite.style.setProperty('--radius', `${110 + gravityValue}px`);
  satellite.style.setProperty('--duration', `${Math.max(5, 18 - Math.floor(gravityValue / 15))}s`);
  satellite.classList.remove('hidden');
  satelliteText.textContent = text.length > 76 ? `${text.slice(0, 73)}…` : text;

  reading.textContent = text;
  orbitType.textContent = type;
  verdict.textContent = roastText;

  const items = [{ text, type, roast: roastText }, ...load()].slice(0, 6);
  save(items);
  renderLog(items);
}

form.addEventListener('submit', launch);
clearLog.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderLog([]);
});

renderLog(load());
