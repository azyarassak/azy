// Elements
const display = document.getElementById('display');
const calc = document.getElementById('calc');
const emojiLayer = document.getElementById('emoji-layer');
const themeToggle = document.getElementById('theme-toggle');

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
        burstEmojis(); // trigger celebration
      } else {
        display.value = 'Error';
        expression = '';
      }
      return;
    }

    // Append values
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

// Emoji burst
function burstEmojis() {
  const emojis = ['🎉', '✨', '🔥', '💯', '😎', '🚀', '🎈', '⭐'];
  const count = 8;
  const layerWidth = emojiLayer.clientWidth || calc.clientWidth;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'emoji';
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const startX = Math.max(8, Math.min(layerWidth - 32, layerWidth * 0.65 + Math.random() * (layerWidth * 0.3)));
    const dx = (Math.random() - 0.4) * 40;
    span.style.left = `${startX}px`;
    span.style.setProperty('--dx', `${dx}px`);
    span.style.top = `20px`;

    emojiLayer.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }
}
