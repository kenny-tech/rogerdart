import CryptoJS from "crypto-js";

export const encryptId = (str:any) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(str), `${process.env.ENC_SECRET}`).toString();
  return encodeURIComponent(ciphertext);
}