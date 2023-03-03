

function setCookie(
    name: string,
    value: string,
  ): void {
    console.log(name, value, {expires:1, httpOnly:true, secure: process.env.NODE_ENV === "production", sameSite:"Strict", path:''});
  }


function removeCookie(
    name:string,
): void {
    console.log(name, { expires: new Date(0), path:'', httpOnly:true, secure: process.env.NODE_ENV === 'production', sameSite:"Strict" })
}

export {setCookie, removeCookie}