// Elements
const display = document.getElementById('display');
const calc = document.getElementById('calc');
const themeToggle = document.getElementById('theme-toggle');
const bgLayer = document.getElementById('background-emojis');

// State
let expression = '';

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  calc.classList.toggle('dark');
  calc.classList.toggle('light');
});

// Button handling
document.querySelectorAll('.key').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');

    if (action === 'clear') {
      expression = '';
      display.value = '';
      return;
    }

    if (action === 'equals') {
      if (!expression) return;
      const result = safeEval(expression);
      if (result !== null && result !== undefined) {
        display.value = result;
        expression = String(result);
      } else {
        display.value = 'Error';
        expression = '';
      }
      return;
    }

    expression += val;
    display.value = expression;
  });
});

// Safe evaluation
function safeEval(expr) {
  const valid = /^[\d+\-*/\s.]+$/.test(expr);
  if (!valid) return null;
  try {
    const result = Function(`return (${expr})`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

// Floating background emojis
function spawnEmoji() {
  const emojis = ['🎉','✨','🔥','💯','😎','🚀','🎈','⭐','🌸','🍀','🌙'];
  const emoji = document.createElement('span');
  emoji.className = 'bg-emoji';
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // random horizontal position
  emoji.style.left = Math.random() * window.innerWidth + 'px';
  // random animation duration
  const duration = 5 + Math.random() * 5;
  emoji.style.animationDuration = duration + 's';

  bgLayer.appendChild(emoji);
  // remove after animation
  setTimeout(() => emoji.remove(), duration * 1000);
}

// spawn emojis continuously
setInterval(spawnEmoji, 1000);
