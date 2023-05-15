//class Encrypter
const encrypter = new Encrypter();

//HTML elements

const textarea = document.getElementById('message');
const warning = document.querySelector('.encrypter__note');
//buttons
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const copyButton = document.getElementById('copy-button');
//divs
const result = document.querySelector('.result');
//classname
const warningClass = 'wrong-text';

//UI functions

function addWarning() {
  warning.classList.add(warningClass);
  textarea.classList.add(warningClass);
}
function removeWarning() {
  warning.classList.remove(warningClass);
  textarea.classList.remove(warningClass);
}
//higlihts in red the textarea and text when the message doesn't fit in the requirements
textarea.addEventListener('input', () => {
  encrypter.message = textarea.value;
  !encrypter.validateData() ? addWarning() : removeWarning();
});

function showResult(msg) {
  result.innerHTML = `
  <div class="result__encrypted">
    <p id ="msg-result">
      ${msg}
    </p>
    <button onclick="copy()">Copiar</button>
  </div>
  `;
}

function showEmpty() {
  result.innerHTML = `
  <div class="result__none">
    <picture>
      <source
        media="(min-width:1000px)"
        srcset="./assets/icons/searching-bro.svg"
      />
      <img src="" alt="" />
    </picture>
    <h3>Ningún mensaje fue encontrado</h3>
    <p>Ingresa el texto que desees encriptar o desencriptar.</p>
  </div>`;
}

function showCopyMessage() {
  const resultDiv = document.querySelector('.result__encrypted');
  const msg = document.createElement('span');
  msg.innerText = '¡Copiado a la papelera!';
  resultDiv.appendChild(msg);
  setTimeout(() => msg.remove(), 2500);
}

function copySupport() {
  const auxInput = document.createElement('textarea');
  auxInput.value = encrypter.encrypted;
  result.appendChild(auxInput);
  auxInput.select();
  document.execCommand('copy');
  result.removeChild(auxInput);
  showCopyMessage();
}

function copy() {
  navigator.clipboard
    .writeText(encrypter.encrypted)
    .then(showCopyMessage)
    .catch(copySupport);
}

function goToResult() {
  const isMobile = window.matchMedia('(max-width:700px)').matches;
  if (isMobile) {
    result.scrollIntoView({ behavior: 'smooth' });
  }
}

//Encrypter functions

//encrypts/decrypts and shows the result if the message is valid.
function execute(fn) {
  if (encrypter.message.length < 1 || !encrypter.valid) {
    showEmpty();
  } else {
    const msg = fn();
    showResult(msg);
  }
  goToResult();
}

//function for the encryptButton
encryptButton.addEventListener('click', () =>
  execute(encrypter.encrypt.bind(encrypter))
);

//function for the decryptButton
decryptButton.addEventListener('click', () =>
  execute(encrypter.decrypt.bind(encrypter))
);
