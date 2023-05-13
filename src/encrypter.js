class Encrypter {
  constructor() {
    this._message = '';
    this._encrypted = '';
    this.valid = false;
    this.encryptionKeys = {
      a: 'ai',
      e: 'enter',
      i: 'imes',
      o: 'ober',
      u: 'ufat',
    };
    //Reverts the encryptionKeys
    this.decryptionKeys = Object.fromEntries(
      Object.entries(this.encryptionKeys).map(([key, value]) => [value, key])
    );
  }

  //Setters
  set message(msg) {
    this._message = msg;
  }

  set encrypted(char) {
    char === '' ? (this._encrypted = '') : (this._encrypted += char);
  }

  validateData() {
    for (let i = 0; i < this._message.length; i++) {
      const asciiCode = this._message[i].charCodeAt();
      //If the ascii code is not in the range of 97-122 (a-z) or is not 32 (space) the message is not valid
      if (asciiCode !== 32 && (asciiCode < 97 || asciiCode > 122)) {
        this.valid = false;
        return this.valid;
      }
    }
    this.valid = true;
    return this.valid;
  }

  encrypt() {
    this.encrypted = ''; //cleans previous encryptions

    for (let i = 0; i < this._message.length; i++) {
      const char = this._message[i];
      if (keys[char]) {
        this.encrypted = keys[char]; //adds the "char" encrypted;
      } else {
        this.encrypted = char;
      }
    }

    return this._encrypted;
  }
}
