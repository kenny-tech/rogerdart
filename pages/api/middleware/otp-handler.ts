export const otpHandler = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
    for (let i = 0; i < 6; i++){
        otp += characters[Math.floor(Math.random() * characters.length)];
    }

    return otp.toLocaleUpperCase()
  }