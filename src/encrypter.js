class Encrypter {
  constructor() {
    this._message = ''; //what the user writes on the textarea
    this._encrypted = ''; //the result of encryption/decryption
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

  //Getters
  get message() {
    return this._message;
  }
  get encrypted() {
    return this._encrypted;
  }

  validateData() {
    for (let i = 0; i < this.message.length; i++) {
      const asciiCode = this.message[i].charCodeAt();
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
    this.encrypted = ''; //cleans previous encryptions/decryptions

    for (let i = 0; i < this.message.length; i++) {
      const char = this.message[i];
      if (this.encryptionKeys[char]) {
        this.encrypted = this.encryptionKeys[char]; //adds the "char" encrypted;
      } else {
        this.encrypted = char;
      }
    }

    return this.encrypted;
  }

  decrypt() {
    this.encrypted = ''; //cleans previous encryptions/decryptions
    let p1 = 0;

    for (let p2 = 1; p2 <= this._message.length; p2++) {
      //this helps us to know when the letter in p1 is the begining of some key of "decryptionKeys"
      if (this.encryptionKeys[this.message[p1]]) {
        //verifies if the string from p1-p2 matches a key of "decryptionKeys"
        const key = this.message.slice(p1, p2);
        if (this.decryptionKeys[key]) {
          //if the key matches, decrypts the string
          this.encrypted = this.decryptionKeys[key];
          p1 = p2;
        }
      } else {
        //the letter in this.message is not encrypted, it passes without changes.
        this.encrypted = this.message[p1];
        p1++;
      }
    }
    return this.encrypted;
  }
}
