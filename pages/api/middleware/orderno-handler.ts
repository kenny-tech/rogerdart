export const orderNoHandler = () => {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < 10; i++){
        otp += characters[Math.floor(Math.random() * characters.length)];
    }

    return otp
  }