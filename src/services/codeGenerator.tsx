export const transactionCode = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTC = '';
    for (let i = 0; i < 6; i++){
        OTC += characters[Math.floor(Math.random() * characters.length)];
    }

    return OTC.toLocaleUpperCase()
  }