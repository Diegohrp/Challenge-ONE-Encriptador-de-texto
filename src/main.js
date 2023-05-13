//class Encrypter
const encrypter = new Encrypter();

//HTML elements
const textarea = document.getElementById('message');
const warning = document.querySelector('.encrypter__note');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const emptyResult = document.querySelector('.result__none');
const result = document.querySelector('.result__encrypted');
const encResult = document.getElementById('encrypter-result');
const warningClass = 'wrong-text';

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

//function for the encryptButton
function execute(fn) {
  if (encrypter.message.length < 1 || !encrypter.valid) {
    emptyResult.style.display = 'block';
    result.style.display = 'none';
  } else {
    emptyResult.style.display = 'none';
    result.style.display = 'flex';
    //adds the encrypted/decrypted message to the HTML element
    encResult.innerText = fn();
  }
}
//function for the encryptButton
encryptButton.addEventListener('click', () =>
  execute(encrypter.encrypt.bind(encrypter))
);

//function for the decryptButton
decryptButton.addEventListener('click', () =>
  execute(encrypter.decrypt.bind(encrypter))
);
