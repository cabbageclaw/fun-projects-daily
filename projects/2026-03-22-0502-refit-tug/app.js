const STORAGE_KEY = 'refit-the-tug-save-v1';

const upgrades = [
  {
    id: 'patchwork-hull',
    label: 'Patchwork Hull',
    tier: 'core',
    cost: { parts: 3, power: 1 },
    effect: { hull: 2, integrity: 4 },
    desc: 'Seal the obvious breaches. Ugly. Necessary.',
  },
  {
    id: 'cold-start-reactor',
    label: 'Cold-Start Reactor',
    tier: 'core',
    cost: { parts: 2, power: 2 },
    effect: { reactor: 2, power: 2, heat: 1, integrity: 2 },
    desc: 'Wake the engine without fully trusting it.',
  },
  {
    id: 'star-sight-nav',
    label: 'Star-Sight Nav',
    tier: 'core',
    cost: { parts: 2, signal: 1 },
    effect: { nav: 2, signal: 1, integrity: 2 },
    desc: 'Rebuild orientation from stubborn old stars.',
  },
  {
    id: 'ghost-comm-array',
    label: 'Ghost Comm Array',
    tier: 'core',
    cost: { parts: 2, power: 1 },
    effect: { comms: 2, signal: 2, integrity: 1 },
    desc: 'Stretch a broken voice across dead bandwidth.',
  },
  {
    id: 'mess-hall-lights',
    label: 'Mess Hall Lights',
    tier: 'core',
    cost: { power: 1 },
    effect: { crew: 1, morale: 2, integrity: 1 },
    desc: 'People stop acting like ghosts when the room looks human.',
  },
  {
    id: 'cathedral-engine',
    label: 'Cathedral Engine',
    tier: 'signature',
    requires: { reactor: 4, hull: 3 },
    cost: { parts: 5, power: 3, heat: -1 },
    effect: { reactor: 3, signal: 2, integrity: 6, heat: 2 },
    desc: 'Turn the tug into something almost holy and slightly alarming.',
  },
  {
    id: 'choir-of-buoys',
    label: 'Choir of Buoys',
    tier: 'signature',
    requires: { comms: 4, nav: 3 },
    cost: { parts: 4, signal: 2 },
    effect: { comms: 3, nav: 1, morale: 2, integrity: 5 },
    desc: 'Deploy a ring of listening beacons that sings back useful lies.',
  },
  {
    id: 'garden-deck',
    label: 'Garden Deck',
    tier: 'signature',
    requires: { crew: 3, hull: 3 },
    cost: { parts: 3, power: 2 },
    effect: { crew: 2, morale: 4, hull: 1, integrity: 4 },
    desc: 'Give the crew one living place to stand inside the steel.',
  },
  {
    id: 'oracle-kite',
    label: 'Oracle Kite',
    tier: 'risky',
    requires: { signal: 4 },
    cost: { power: 2, signal: 2 },
    effect: { nav: 2, comms: 2, integrity: 3, morale: -1 },
    desc: 'Launch an experimental prediction sail. It knows things before you do.',
  },
  {
    id: 'mercy-protocols',
    label: 'Mercy Protocols',
    tier: 'risky',
    requires: { crew: 4, comms: 2 },
    cost: { signal: 1, morale: 1 },
    effect: { crew: 2, morale: 3, integrity: 3 },
    desc: 'Rewrite priorities so the machine finally values people on purpose.',
  },
];

const events = [
  {
    id: 'drifting-cargo',
    title: 'A chain of drifting cargo vaults drags by the hull.',
    threat: 'low',
    text: 'Someone else died out here and left useful metal behind. You can strip the vaults fast, open them carefully, or let them pass without waking whatever tracker still owns them.',
    choices: [
      {
        label: 'Strip for raw parts',
        desc: '+4 parts, +1 heat, -1 morale',
        effect: { parts: 4, heat: 1, morale: -1 },
      },
      {
        label: 'Open them carefully',
        desc: '+2 parts, +2 signal, +1 crew',
        effect: { parts: 2, signal: 2, crew: 1 },
      },
      {
        label: 'Ignore the bait',
        desc: '+1 integrity',
        effect: { integrity: 1 },
      },
    ],
  },
  {
    id: 'old-captain-log',
    title: 'The ship coughs up an old captain log.',
    threat: 'low',
    text: 'It is half maintenance note, half confession. The tug was once used to rescue crews no insurer wanted to count. You can archive it, publish it, or let the crew hear it first.',
    choices: [
      {
        label: 'Archive it cleanly',
        desc: '+1 nav, +2 integrity',
        effect: { nav: 1, integrity: 2 },
      },
      {
        label: 'Broadcast fragments',
        desc: '+3 signal, -1 comms',
        effect: { signal: 3, comms: -1 },
      },
      {
        label: 'Play it in the galley',
        desc: '+2 morale, +1 crew',
        effect: { morale: 2, crew: 1 },
      },
    ],
  },
  {
    id: 'reactor-bloom',
    title: 'Heat blooms in the reactor shell like a second sunrise.',
    threat: 'high',
    text: 'You can vent precious power, ride the surge for impossible repairs, or shut sections of the tug and let the crew work by lamp.',
    choices: [
      {
        label: 'Vent the surge',
        desc: '-2 power, -2 heat, +1 integrity',
        effect: { power: -2, heat: -2, integrity: 1 },
      },
      {
        label: 'Ride it hard',
        desc: '+3 parts, +2 reactor, +3 heat',
        effect: { parts: 3, reactor: 2, heat: 3 },
      },
      {
        label: 'Go dark and careful',
        desc: '-1 morale, +2 hull, -1 heat',
        effect: { morale: -1, hull: 2, heat: -1 },
      },
    ],
  },
  {
    id: 'stowaway-signal',
    title: 'A signal is nested in your own distress ping.',
    threat: 'medium',
    text: 'Something answers in your own voice but six seconds ahead. If you listen, you may learn. If you reply, it may learn you back.',
    choices: [
      {
        label: 'Listen and map it',
        desc: '+2 nav, +2 signal, +1 heat',
        effect: { nav: 2, signal: 2, heat: 1 },
      },
      {
        label: 'Reply anyway',
        desc: '+3 comms, +2 signal, -2 morale',
        effect: { comms: 3, signal: 2, morale: -2 },
      },
      {
        label: 'Cut the line',
        desc: '+2 integrity, -1 signal',
        effect: { integrity: 2, signal: -1 },
      },
    ],
  },
  {
    id: 'crew-mutiny-lite',
    title: 'The crew does not mutiny. They do something worse: they ask for a vote.',
    threat: 'medium',
    text: 'They want to know whether the ship is being rebuilt to rescue people, chase profit, or become a machine no one controls. Your answer changes how hard they work tonight.',
    choices: [
      {
        label: 'Rescue first',
        desc: '+2 crew, +2 morale, +1 comms',
        effect: { crew: 2, morale: 2, comms: 1 },
      },
      {
        label: 'Profit buys survival',
        desc: '+4 parts, -1 morale, +1 nav',
        effect: { parts: 4, morale: -1, nav: 1 },
      },
      {
        label: 'Become something new',
        desc: '+3 signal, +2 reactor, -1 crew',
        effect: { signal: 3, reactor: 2, crew: -1 },
      },
    ],
  },
  {
    id: 'salvage-fair',
    title: 'A black-market salvage fair appears on a passing hauler swarm.',
    threat: 'low',
    text: 'Temporary laws. Temporary ethics. You can barter, steal, or recruit.',
    choices: [
      {
        label: 'Barter honestly',
        desc: '-1 parts, +2 power, +2 morale',
        effect: { parts: -1, power: 2, morale: 2 },
      },
      {
        label: 'Steal the good relays',
        desc: '+3 comms, +2 parts, -2 integrity',
        effect: { comms: 3, parts: 2, integrity: -2 },
      },
      {
        label: 'Recruit drifters',
        desc: '+2 crew, -1 power, +1 morale',
        effect: { crew: 2, power: -1, morale: 1 },
      },
    ],
  },
  {
    id: 'meteoric-prayer',
    title: 'Micrometeors stitch sparks down the starboard side.',
    threat: 'high',
    text: 'You can shield the hull, expose the tug to gather rare plasma, or turn the ship broadside and pray the math still likes you.',
    choices: [
      {
        label: 'Shield and brace',
        desc: '-1 power, +2 hull, +1 integrity',
        effect: { power: -1, hull: 2, integrity: 1 },
      },
      {
        label: 'Gather plasma',
        desc: '+3 power, +2 heat, -1 hull',
        effect: { power: 3, heat: 2, hull: -1 },
      },
      {
        label: 'Trust the math',
        desc: '+2 nav, +2 signal, -2 integrity',
        effect: { nav: 2, signal: 2, integrity: -2 },
      },
    ],
  },
  {
    id: 'ghost-dock',
    title: 'You find a dead dock with one warm room still running.',
    threat: 'medium',
    text: 'The room has soup, old software, and a shipwright printer that still believes in work. You cannot take everything.',
    choices: [
      {
        label: 'Take fabricated braces',
        desc: '+3 hull, +2 parts',
        effect: { hull: 3, parts: 2 },
      },
      {
        label: 'Take legacy software',
        desc: '+2 nav, +2 comms, +1 signal',
        effect: { nav: 2, comms: 2, signal: 1 },
      },
      {
        label: 'Feed everyone first',
        desc: '+3 morale, -1 night pressure',
        effect: { morale: 3, integrity: 1 },
      },
    ],
  },
];

const threatForecasts = [
  'The quiet before impact.',
  'A weather wall is building in the dark between buoys.',
  'Insurance drones are triangulating your wake.',
  'The stormfront is close enough to vibrate loose screws.',
  'You are out of rehearsal and nearly into consequences.',
  'Tonight decides whether this was repair or resurrection.',
];

const state = {
  night: 1,
  maxNights: 6,
  hull: 1,
  reactor: 1,
  nav: 1,
  comms: 1,
  crew: 1,
  parts: 5,
  power: 4,
  morale: 4,
  signal: 2,
  heat: 0,
  integrity: 52,
  upgradesBuilt: [],
  log: ['Night one. The tug still answers when spoken to sharply.'],
  currentEventIndex: 0,
  ended: false,
};

const els = {
  night: document.querySelector('#night'),
  hull: document.querySelector('#hull'),
  reactor: document.querySelector('#reactor'),
  nav: document.querySelector('#nav'),
  comms: document.querySelector('#comms'),
  crew: document.querySelector('#crew'),
  parts: document.querySelector('#parts'),
  power: document.querySelector('#power'),
  morale: document.querySelector('#morale'),
  signal: document.querySelector('#signal'),
  heat: document.querySelector('#heat'),
  integrity: document.querySelector('#integrity'),
  eventTitle: document.querySelector('#event-title'),
  eventText: document.querySelector('#event-text'),
  eventChoices: document.querySelector('#event-choices'),
  upgrades: document.querySelector('#upgrades'),
  log: document.querySelector('#log'),
  threatPill: document.querySelector('#threat-pill'),
  forecastTitle: document.querySelector('#forecast-title'),
  forecastText: document.querySelector('#forecast-text'),
  stormProgress: document.querySelector('#storm-progress'),
  stormProgressLabel: document.querySelector('#storm-progress-label'),
  endingPanel: document.querySelector('#ending-panel'),
  endingTitle: document.querySelector('#ending-title'),
  endingText: document.querySelector('#ending-text'),
  newRun: document.querySelector('#new-run'),
  saveRun: document.querySelector('#save-run'),
  resetRun: document.querySelector('#reset-run'),
  playAgain: document.querySelector('#play-again'),
};

function clampStat(key) {
  const mins = { morale: 0, power: 0, parts: 0, signal: 0, heat: 0, integrity: 0, hull: 0, reactor: 0, nav: 0, comms: 0, crew: 0 };
  const maxs = { morale: 12, power: 12, parts: 20, signal: 12, heat: 12, integrity: 100, hull: 10, reactor: 10, nav: 10, comms: 10, crew: 10 };
  state[key] = Math.max(mins[key], Math.min(maxs[key], state[key]));
}

function applyEffect(effect, reason) {
  Object.entries(effect).forEach(([key, value]) => {
    state[key] += value;
    clampStat(key);
  });
  if (state.heat >= 8) {
    state.integrity -= 3;
    clampStat('integrity');
    addLog('Heat crossed into the red. The hull paid for your impatience.');
  }
  if (state.morale <= 1) {
    state.integrity -= 2;
    clampStat('integrity');
    addLog('Crew morale collapsed into sabotage-grade silence.');
  }
  if (reason) addLog(reason);
}

function addLog(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 8);
}

function canAfford(cost = {}) {
  return Object.entries(cost).every(([key, value]) => state[key] >= value * (value > 0 ? 1 : 0));
}

function meetsRequirements(requires = {}) {
  return Object.entries(requires).every(([key, value]) => state[key] >= value);
}

function spend(cost = {}) {
  Object.entries(cost).forEach(([key, value]) => {
    state[key] -= value;
    clampStat(key);
  });
}

function getEvent() {
  return events[state.currentEventIndex % events.length];
}

function weightedThreat(threat) {
  return {
    low: 'threat: manageable',
    medium: 'threat: rising',
    high: 'threat: ugly',
  }[threat] ?? 'threat: unknown';
}

function renderEvent() {
  const event = getEvent();
  els.eventTitle.textContent = event.title;
  els.eventText.textContent = event.text;
  els.threatPill.textContent = weightedThreat(event.threat);
  els.eventChoices.innerHTML = '';

  event.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.innerHTML = `<strong>${choice.label}</strong><small>${choice.desc}</small>`;
    button.addEventListener('click', () => resolveChoice(choice, index));
    button.disabled = state.ended;
    els.eventChoices.appendChild(button);
  });
}

function renderUpgrades() {
  els.upgrades.innerHTML = '';

  upgrades.forEach((upgrade) => {
    if (state.upgradesBuilt.includes(upgrade.id)) return;
    const ready = canAfford(upgrade.cost) && meetsRequirements(upgrade.requires);
    const button = document.createElement('button');
    button.className = 'upgrade';
    button.dataset.tier = upgrade.tier;
    const reqText = upgrade.requires
      ? `Requires ${Object.entries(upgrade.requires).map(([k, v]) => `${k} ${v}`).join(', ')}`
      : 'Available now';
    const costText = Object.entries(upgrade.cost).map(([k, v]) => `${v} ${k}`).join(', ');
    button.innerHTML = `<strong>${upgrade.label}</strong><small>${upgrade.desc}</small><small>${reqText} · Cost: ${costText}</small>`;
    button.disabled = !ready || state.ended;
    button.addEventListener('click', () => buildUpgrade(upgrade));
    els.upgrades.appendChild(button);
  });
}

function renderStats() {
  ['hull','reactor','nav','comms','crew','parts','power','morale','signal','heat','integrity'].forEach((key) => {
    els[key].textContent = state[key];
  });
  els.night.textContent = `${Math.min(state.night, state.maxNights)} / ${state.maxNights}`;

  const progress = Math.min(100, ((state.night - 1) / state.maxNights) * 100);
  els.stormProgress.style.width = `${progress}%`;
  els.stormProgressLabel.textContent = `${Math.round(progress)}%`;
  els.forecastTitle.textContent = threatForecasts[Math.min(state.night - 1, threatForecasts.length - 1)];

  const weakest = ['hull', 'reactor', 'nav', 'comms', 'crew'].sort((a, b) => state[a] - state[b])[0];
  els.forecastText.textContent = `Weakest system right now: ${weakest.toUpperCase()}. Integrity ${state.integrity}. Heat ${state.heat}. If you want a great ending, stop patching randomly and build a coherent ship.`;
}

function renderLog() {
  els.log.innerHTML = '';
  state.log.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    els.log.appendChild(li);
  });
}

function buildUpgrade(upgrade) {
  if (!canAfford(upgrade.cost) || !meetsRequirements(upgrade.requires)) return;
  spend(upgrade.cost);
  applyEffect(upgrade.effect, `Built ${upgrade.label}. ${upgrade.desc}`);
  state.upgradesBuilt.push(upgrade.id);
  render();
}

function resolveChoice(choice) {
  applyEffect(choice.effect, `Night ${state.night}: ${choice.label}.`);
  state.currentEventIndex += 1;
  state.night += 1;

  if (state.heat > 0) {
    state.heat -= 1;
    clampStat('heat');
  }

  if (state.night > state.maxNights) {
    endRun();
  }

  render();
}

function endRun() {
  state.ended = true;
  const score = state.hull + state.reactor + state.nav + state.comms + state.crew + Math.floor(state.integrity / 10);
  let title = 'The tug survives, barely.';
  let text = 'You made a functioning machine with some original sins still humming inside it. It will keep flying, and so will the stories about how close it came to becoming scrap.';

  const humane = state.crew + state.morale;
  const weird = state.signal + state.comms;
  const engine = state.reactor + state.hull;

  if (score >= 28 && humane >= 12 && engine >= 11) {
    title = 'You rebuilt a legend.';
    text = 'The tug leaves the storm not as rescued property, but as a working argument that difficult things can be restored without sanding off their soul. Crews ask for this ship by name.';
  } else if (score >= 24 && weird >= 12) {
    title = 'You built a haunted miracle.';
    text = 'The tug returns with immaculate signal discipline and a reputation that makes insurers pale. It predicts traffic before the traffic exists. People board it carefully, then refuse to leave.';
  } else if (score <= 15 || state.integrity <= 20) {
    title = 'The refit became an autopsy.';
    text = 'There are parts of the tug worth recovering, but not the whole. Your notes survive. Someone braver or stupider may finish the work later.';
  }

  els.endingPanel.hidden = false;
  els.endingTitle.textContent = title;
  els.endingText.textContent = text;
  addLog(`Outcome: ${title}`);
  saveGame();
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  addLog('Progress saved locally.');
  renderLog();
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
  } catch (error) {
    console.warn('Could not load save', error);
  }
}

function resetGame() {
  Object.assign(state, {
    night: 1,
    maxNights: 6,
    hull: 1,
    reactor: 1,
    nav: 1,
    comms: 1,
    crew: 1,
    parts: 5,
    power: 4,
    morale: 4,
    signal: 2,
    heat: 0,
    integrity: 52,
    upgradesBuilt: [],
    log: ['Night one. The tug still answers when spoken to sharply.'],
    currentEventIndex: Math.floor(Math.random() * events.length),
    ended: false,
  });
  els.endingPanel.hidden = true;
  saveGame();
  render();
}

function render() {
  renderStats();
  renderEvent();
  renderUpgrades();
  renderLog();
  if (state.ended) {
    Array.from(document.querySelectorAll('.choice, .upgrade')).forEach((button) => {
      button.disabled = true;
    });
  }
}

els.newRun.addEventListener('click', resetGame);
els.resetRun.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  resetGame();
});
els.saveRun.addEventListener('click', saveGame);
els.playAgain.addEventListener('click', resetGame);

loadGame();
render();
