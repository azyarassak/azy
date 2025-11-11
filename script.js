function appendValue(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  try {
    const result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
  } catch {
    document.getElementById('display').value = 'Error';
  }
}
const toggleBtn = document.getElementById('theme-toggle');
const calculator = document.querySelector('.calculator');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  calculator.classList.toggle('dark');
  calculator.classList.toggle('light');
});
