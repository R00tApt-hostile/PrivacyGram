import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

const validateKey = (key) => {
  if (!key || key.length !== 32) {
    throw new Error('Invalid encryption key - must be 32 characters');
  }
};

export const secureStorage = {
  setItem: (key, value) => {
    validateKey(SECRET_KEY);
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(value), 
      SECRET_KEY,
      { iv: CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f') }
    ).toString();
    localStorage.setItem(key, ciphertext);
  },
  getItem: (key) => {
    validateKey(SECRET_KEY);
    const ciphertext = localStorage.getItem(key);
    if (!ciphertext) return null;
    
    const bytes = CryptoJS.AES.decrypt(
      ciphertext, 
      SECRET_KEY,
      { iv: CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f') }
    );
    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  },
  removeItem: (key) => localStorage.removeItem(key)
};
