const prompts = [
  'a social app where everyone can only post one sentence a day',
  'a tool that helps friends actually decide what to eat without endless loops',
  'a website that turns your browser tabs into a tiny city and exposes chaos',
  'an interface that helps people rehearse difficult conversations without therapist cosplay',
  'a tiny game that teaches kids how power grids fail by making them keep a neighborhood alive',
];

const nouns = {
  audience: {
    fragile: 'people who want relief without learning another system',
    steady: 'people who have a real problem and enough patience to try one new habit',
    feral: 'power users willing to tolerate weirdness if it gives them leverage',
  },
  goal: {
    learn: 'extract one real behavioral insight',
    ship: 'ship a useful first version with one honest promise',
    delight: 'create a small thing people want to show a friend',
    income: 'find out whether someone would actually pay to avoid this pain',
  },
};

const els = {
  idea: document.querySelector('#idea-input'),
  ambition: document.querySelector('#ambition'),
  days: document.querySelector('#days'),
  energy: document.querySelector('#energy'),
  goal: document.querySelector('#goal'),
  analyze: document.querySelector('#analyze'),
  randomize: document.querySelector('#randomize'),
  copyPlan: document.querySelector('#copy-plan'),
  verdictTitle: document.querySelector('#verdict-title'),
  verdictText: document.querySelector('#verdict-text'),
  hypeBar: document.querySelector('#hype-bar'),
  hypeLabel: document.querySelector('#hype-label'),
  scopeTitle: document.querySelector('#scope-title'),
  scopeText: document.querySelector('#scope-text'),
  userTitle: document.querySelector('#user-title'),
  userText: document.querySelector('#user-text'),
  testTitle: document.querySelector('#test-title'),
  testText: document.querySelector('#test-text'),
  pushbackList: document.querySelector('#pushback-list'),
  planList: document.querySelector('#plan-list'),
  remixGrid: document.querySelector('#remix-grid'),
};

function scoreHype(idea, ambition, days) {
  let score = 18;
  if (idea.split(' ').length > 24) score += 12;
  if (/platform|community|ai|revolution|everyone|marketplace|ecosystem/i.test(idea)) score += 24;
  if (ambition >= 4) score += 18;
  if (days < 7) score += 16;
  if (/for everyone|social network|change the world/i.test(idea)) score += 20;
  return Math.min(96, score);
}

function classify(score) {
  if (score < 35) return ['Promising, if you stay honest.', 'This idea still has bones. Don’t pad it to death.'];
  if (score < 60) return ['Interesting, but flirting with self-deception.', 'There is something here, but it wants stricter boundaries before it wastes your week.'];
  return ['Ambitious in the dangerous way.', 'This is currently carrying more narrative than proof. Good. Now cut it until it can survive contact with reality.'];
}

function tightenIdea(idea, ambition, days, energy, goal) {
  const scale = ambition >= 4 ? 'one painful but memorable thing' : 'one narrow thing done unusually well';
  const time = days <= 7 ? 'a weekend-grade prototype' : days <= 21 ? 'a sharp first version' : 'a focused small product';
  return {
    title: `${time}, built around ${scale}`,
    text: `Instead of trying to fully realize “${idea},” build the smallest version that can ${nouns.goal[goal]}. If a user cannot feel the value within ${Math.max(3, Math.min(days, 14))} minutes, the scope is still lying. With ${energy} energy, bias toward low-maintenance interactions and one strong loop.`
  };
}

function defineUser(idea, energy, goal) {
  return {
    title: 'A user with a concrete moment of need',
    text: `Aim this at ${nouns.audience[energy]}. More specifically: someone who says, “I need help with this ${extractProblem(idea)} right now.” If you can’t picture when they open the tool, you don’t have a user yet—you have a moodboard.`
  };
}

function extractProblem(idea) {
  const cleaned = idea.replace(/^an?\s+/i, '').replace(/^the\s+/i, '');
  return cleaned.length > 58 ? cleaned.slice(0, 58).trim() + '…' : cleaned;
}

function firstTest(idea, days, goal) {
  const testWindow = days <= 7 ? '48 hours' : 'one week';
  const angle = {
    learn: 'watch where people hesitate and what they misunderstand',
    ship: 'see whether one person completes the core loop without explanation',
    delight: 'see whether someone voluntarily shares it with a friend',
    income: 'ask for a tiny but real commitment instead of compliments',
  }[goal];
  return {
    title: `Run this within ${testWindow}`,
    text: `Put a rough version in front of 3 people and ${angle}. No surveys about “would you use this?” Watch behavior. Keep notes on where the promise breaks.`
  };
}

function pushback(idea, ambition, days, goal) {
  const items = [
    'What does this do in the first 30 seconds that a normal notes app, chat, or spreadsheet does not?',
    'Which part of the idea is genuinely novel, and which part is just borrowed importance?',
    'If you had to delete 60% of the feature list, what would survive?',
  ];
  if (ambition >= 4) items.push('You are probably trying to solve identity, interface, and business model at once. Pick one to earn first.');
  if (days < 10) items.push('Your time budget is insulting your ambition. Reduce scope or accept lower polish.');
  if (goal === 'income') items.push('Admiration is not demand. What would someone actually pay to make disappear?');
  if (/ai/i.test(idea)) items.push('If the AI part vanished, would the product still have a reason to exist?');
  return items;
}

function buildPlan(idea, days) {
  const horizon = Math.max(3, days);
  return [
    `Day 1: write the product promise in one sentence and list the one interaction the whole thing depends on.`,
    `Day 1-${Math.min(2, horizon)}: make the ugly version fast. No branding detours before the loop works.`,
    `Day ${Math.min(3, horizon)}-${Math.min(5, horizon)}: reduce friction in the first-use experience and remove one unnecessary choice.`,
    `By day ${Math.min(horizon, 7)}: test with three humans and record concrete failure points.`,
    `After that: either sharpen the wedge or kill it without writing poetry about the corpse.`
  ];
}

function remixes(idea) {
  return [
    {
      title: 'The Tool Version',
      text: `Strip the theater out of “${idea}” and make it solve one repeated problem faster than a blank document could.`
    },
    {
      title: 'The Toy Version',
      text: `Turn the core mechanic into a 3-minute playful interaction. If that is fun, the idea may have real voltage.`
    },
    {
      title: 'The Ritual Version',
      text: `Make it a daily or weekly habit artifact—small, repeatable, and emotionally legible rather than feature-dense.`
    },
  ];
}

function renderAnalysis() {
  const idea = (els.idea.value || '').trim();
  if (!idea) return;

  const ambition = Number(els.ambition.value);
  const days = Number(els.days.value);
  const energy = els.energy.value;
  const goal = els.goal.value;
  const hype = scoreHype(idea, ambition, days);
  const [title, text] = classify(hype);
  const scope = tightenIdea(idea, ambition, days, energy, goal);
  const user = defineUser(idea, energy, goal);
  const test = firstTest(idea, days, goal);

  els.verdictTitle.textContent = title;
  els.verdictText.textContent = text;
  els.hypeBar.style.width = `${hype}%`;
  els.hypeLabel.textContent = `${hype}%`;
  els.scopeTitle.textContent = scope.title;
  els.scopeText.textContent = scope.text;
  els.userTitle.textContent = user.title;
  els.userText.textContent = user.text;
  els.testTitle.textContent = test.title;
  els.testText.textContent = test.text;

  els.pushbackList.innerHTML = '';
  pushback(idea, ambition, days, goal).forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line;
    els.pushbackList.appendChild(li);
  });

  els.planList.innerHTML = '';
  buildPlan(idea, days).forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line;
    els.planList.appendChild(li);
  });

  els.remixGrid.innerHTML = '';
  remixes(idea).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'remix';
    card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    els.remixGrid.appendChild(card);
  });
}

function loadRandomPrompt() {
  els.idea.value = prompts[Math.floor(Math.random() * prompts.length)];
  renderAnalysis();
}

function copyPlan() {
  const lines = [
    els.verdictTitle.textContent,
    els.verdictText.textContent,
    '',
    `Tighter version: ${els.scopeText.textContent}`,
    `User: ${els.userText.textContent}`,
    `First test: ${els.testText.textContent}`,
    '',
    'Pushback:',
    ...Array.from(els.pushbackList.querySelectorAll('li')).map((li) => `- ${li.textContent}`),
    '',
    'Build plan:',
    ...Array.from(els.planList.querySelectorAll('li')).map((li, index) => `${index + 1}. ${li.textContent}`),
  ].join('\n');
  navigator.clipboard.writeText(lines);
  els.copyPlan.textContent = 'Copied';
  setTimeout(() => {
    els.copyPlan.textContent = 'Copy plan';
  }, 1200);
}

els.analyze.addEventListener('click', renderAnalysis);
els.randomize.addEventListener('click', loadRandomPrompt);
els.copyPlan.addEventListener('click', copyPlan);

loadRandomPrompt();
