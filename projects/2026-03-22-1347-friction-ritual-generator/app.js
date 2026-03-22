const taskInput = document.querySelector('#task-input');
const dreadInput = document.querySelector('#dread');
const minutesInput = document.querySelector('#minutes');
const noiseSelect = document.querySelector('#noise');
const energySelect = document.querySelector('#energy');
const rewardSelect = document.querySelector('#reward');
const witnessSelect = document.querySelector('#witness');

const generateButton = document.querySelector('#generate');
const randomizeButton = document.querySelector('#randomize');
const copyButton = document.querySelector('#copy');

const ritualName = document.querySelector('#ritual-name');
const ritualSummary = document.querySelector('#ritual-summary');
const frictionBar = document.querySelector('#friction-bar');
const frictionLabel = document.querySelector('#friction-label');

const openingTitle = document.querySelector('#opening-title');
const openingText = document.querySelector('#opening-text');
const goalTitle = document.querySelector('#goal-title');
const goalText = document.querySelector('#goal-text');
const sceneTitle = document.querySelector('#scene-title');
const sceneText = document.querySelector('#scene-text');
const payoffTitle = document.querySelector('#payoff-title');
const payoffText = document.querySelector('#payoff-text');

const sabotageList = document.querySelector('#sabotage-list');
const scriptList = document.querySelector('#script-list');
const variantGrid = document.querySelector('#variant-grid');

const presets = [
  'untangle the inbox until the scary thread loses its religious aura',
  'rewrite the messy brief into one page that another human could actually use',
  'start the bug fix I keep orbiting because it smells like hidden complexity',
  'clean the desk before it turns into an archaeological site of unresolved intent',
  'record the demo take instead of optimizing the setup forever'
];

const openings = {
  gentle: ['Warm Start', 'Set a timer for two minutes and touch the task before judgment wakes up.'],
  clean: ['Clean Cut', 'Clear one surface, close three tabs, and name the first visible move out loud.'],
  feral: ['Kick the Gate', 'Stand up, crack your knuckles, and begin before your inner committee can file paperwork.']
};

const scenes = {
  silent: 'Keep the room austere. One light source. No side quests. Let the silence make the task less theatrical.',
  soft: 'Use a soft loop or low rain track. The point is forward drift, not cinematic self-mythology.',
  loud: 'Use loud, shameless momentum music. This is not contemplation. This is a controlled breach.'
};

const rewards = {
  cozy: ['Soft Landing', 'When the timer ends, claim a small comfort immediately. Tea, sun patch, blanket, tiny throne.'],
  proof: ['Visible Scar', 'Leave evidence. A checked box, a sent message, a diff, a photo, a note with a timestamp.'],
  chaos: ['Gremlin Prize', 'When you finish, allow one absurd micro-celebration. Walk outside, eat the weird snack, play one loud song.']
};

const witnessModes = {
  private: 'Keep it private. The ritual exists to get motion, not applause.',
  text: 'Send one terse accountability text when done: task touched, proof attached, no novel required.',
  public: 'Publish a tiny artifact when done. Screenshot, note, commit, or before/after proof.'
};

function titleCase(text) {
  return text
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function buildName(task, energy, dread) {
  const noun = task.split(' ').filter(Boolean).slice(0, 2).join(' ');
  const prefixes = {
    gentle: ['Velvet', 'Quiet', 'Mild'],
    clean: ['Glass', 'Clear', 'Steel'],
    feral: ['Wolf', 'Torch', 'Riot']
  };
  const suffixes = ['Rite', 'Sequence', 'Procedure', 'Summoning', 'Cutover'];
  const prefix = prefixes[energy][(dread - 1) % prefixes[energy].length];
  const suffix = suffixes[(task.length + dread) % suffixes.length];
  return `${prefix} ${titleCase(noun || 'Task')} ${suffix}`;
}

function buildGoal(task, minutes, dread) {
  const chunk = Math.max(3, Math.round(minutes * (dread >= 4 ? 0.35 : 0.5)));
  return {
    title: `${chunk}-minute honest attack`,
    text: `Do not finish ${task}. Reduce it. Your only job is to produce one undeniable unit of progress within ${chunk} minutes, then reassess from reality instead of dread.`
  };
}

function buildSummary(task, dread, energy) {
  const intensity = dread >= 4 ? 'The resistance is real, so the ritual needs smaller stakes and harder walls.' : 'This is mostly friction, not fate.';
  const tone = {
    gentle: 'Treat the task like a skittish animal: approach cleanly, without self-threat.',
    clean: 'Use precision instead of drama. Start with the sharpest visible cut.',
    feral: 'You do not need peace. You need ignition.'
  };
  return `${intensity} ${tone[energy]} The target is simple: ${task}.`;
}

function buildSabotage(task, dread, witness) {
  const list = [
    'Do not redesign the whole plan just to avoid the first move.',
    'No “quick research” detour unless the task is literally blocked.',
    `If you stall, make the task smaller, not nobler: touch ${task} in a visibly incomplete way.`,
    witnessModes[witness]
  ];

  if (dread >= 4) {
    list.unshift('Ban perfection for the first pass. Ugly motion beats elegant avoidance.');
  }

  return list;
}

function buildScript(task, minutes, energy, reward) {
  const opener = openings[energy][1];
  const rewardLine = rewards[reward][1];
  return [
    `Name the task without perfume: “I am doing ${task}.”`,
    opener,
    `Set a timer for ${minutes} minutes and forbid all parallel ambitions.`,
    'Stop at the first real proof of movement, then decide whether to continue from a less delusional emotional state.',
    rewardLine
  ];
}

function buildVariants(task) {
  return [
    {
      title: 'Monastic version',
      text: `Strip the ritual to one chair, one timer, and one sheet or window. ${task} gets no soundtrack and no emotional negotiations.`
    },
    {
      title: 'Gremlin version',
      text: `Make it ugly on purpose. Speedrun the embarrassing first draft of ${task}, then laugh at the part of you that wanted a moon landing.`
    },
    {
      title: 'Public pressure version',
      text: `Promise one visible artifact from ${task} within the next hour. Social gravity is crude, but it works.`
    }
  ];
}

function renderList(element, items, ordered = false) {
  element.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
  if (ordered) {
    element.start = 1;
  }
}

function renderVariants(items) {
  variantGrid.innerHTML = items
    .map(
      (item) => `
        <article class="variant-card">
          <p class="eyebrow">MOOD SHIFT</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join('');
}

function generateRitual() {
  const task = taskInput.value.trim() || 'touch the avoided thing with enough honesty to break the spell';
  const dread = Number(dreadInput.value);
  const minutes = Math.max(3, Number(minutesInput.value) || 15);
  const energy = energySelect.value;
  const noise = noiseSelect.value;
  const reward = rewardSelect.value;
  const witness = witnessSelect.value;

  const pressure = Math.min(100, dread * 16 + Math.max(0, 25 - minutes) + (energy === 'feral' ? 8 : 0));
  const goal = buildGoal(task, minutes, dread);
  const opening = openings[energy];
  const payoff = rewards[reward];

  ritualName.textContent = buildName(task, energy, dread);
  ritualSummary.textContent = buildSummary(task, dread, energy);
  frictionBar.style.width = `${pressure}%`;
  frictionLabel.textContent = `${pressure}%`;

  openingTitle.textContent = opening[0];
  openingText.textContent = opening[1];
  goalTitle.textContent = goal.title;
  goalText.textContent = goal.text;
  sceneTitle.textContent = noise === 'silent' ? 'Silent cave' : noise === 'soft' ? 'Soft drift' : 'Righteous noise';
  sceneText.textContent = scenes[noise];
  payoffTitle.textContent = payoff[0];
  payoffText.textContent = `${payoff[1]} ${witnessModes[witness]}`;

  renderList(sabotageList, buildSabotage(task, dread, witness));
  renderList(scriptList, buildScript(task, minutes, energy, reward), true);
  renderVariants(buildVariants(task));
}

function randomizeTask() {
  taskInput.value = presets[Math.floor(Math.random() * presets.length)];
  dreadInput.value = String(1 + Math.floor(Math.random() * 5));
  minutesInput.value = String(8 + Math.floor(Math.random() * 28));
  const noises = ['silent', 'soft', 'loud'];
  const energies = ['gentle', 'clean', 'feral'];
  const rewardsList = ['cozy', 'proof', 'chaos'];
  const witnesses = ['private', 'text', 'public'];
  noiseSelect.value = noises[Math.floor(Math.random() * noises.length)];
  energySelect.value = energies[Math.floor(Math.random() * energies.length)];
  rewardSelect.value = rewardsList[Math.floor(Math.random() * rewardsList.length)];
  witnessSelect.value = witnesses[Math.floor(Math.random() * witnesses.length)];
  generateRitual();
}

async function copyRitual() {
  const lines = [
    ritualName.textContent,
    '',
    ritualSummary.textContent,
    '',
    `${openingTitle.textContent}: ${openingText.textContent}`,
    `${goalTitle.textContent}: ${goalText.textContent}`,
    `${sceneTitle.textContent}: ${sceneText.textContent}`,
    `${payoffTitle.textContent}: ${payoffText.textContent}`,
    '',
    'Anti-sabotage:',
    ...Array.from(sabotageList.querySelectorAll('li')).map((li, index) => `- ${li.textContent}`),
    '',
    'Ritual script:',
    ...Array.from(scriptList.querySelectorAll('li')).map((li, index) => `${index + 1}. ${li.textContent}`)
  ].join('\n');

  try {
    await navigator.clipboard.writeText(lines);
    copyButton.textContent = 'Copied';
    setTimeout(() => {
      copyButton.textContent = 'Copy ritual';
    }, 1400);
  } catch (error) {
    copyButton.textContent = 'Clipboard blocked';
    setTimeout(() => {
      copyButton.textContent = 'Copy ritual';
    }, 1600);
  }
}

generateButton.addEventListener('click', generateRitual);
randomizeButton.addEventListener('click', randomizeTask);
copyButton.addEventListener('click', copyRitual);

randomizeTask();
