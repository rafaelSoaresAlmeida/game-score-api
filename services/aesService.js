const keys = require("../configs/keys");
const CryptoJS = require('crypto-js');
const keylength = 4;
const iterations = 10000;
const iv = "F27D5C9927726BCEFE7510B1BDD3D137";
const salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
  
  function generateKey() {
    var key = CryptoJS.PBKDF2(
        keys.pwdKey, 
        CryptoJS.enc.Hex.parse(salt),
        { keySize: keylength, iterations: iterations});
    return key;
  }
  
  function encode(plainText) {
    var key = generateKey();
    var encrypted = CryptoJS.AES.encrypt(
        plainText,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
  
  function decode(cipherText) {
    var key = generateKey();
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });
    var decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  function isPasswordMatch(pwdRequestDecrypted, pwdDbEncrypted){
    var pwdDbDecrypted = decode(pwdDbEncrypted);
    const isPasswordMatch =  pwdDbDecrypted.localeCompare(encodeDecodePwdRequest(pwdRequestDecrypted));
  
    if (isPasswordMatch == 0) {
      return true;
    }
    console.log("Password not match");
    return false;  
}

  function encodeDecodePwdRequest(pwd) {
    var pwdEncoded = encode(pwd);
    console.log("user pass sent encrypt=> " + pwdEncoded);
    return decode(pwdEncoded);
  };

  module.exports = { encode, decode, isPasswordMatch };