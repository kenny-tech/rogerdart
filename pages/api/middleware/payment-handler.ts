import axios from "axios";

const rogerPay = (tRef:number|string) => {
    return new Promise( async (resolve, reject) =>{   
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${process.env.PAYSTACK_S_KEY}`
           }
           
           let response = await fetch(`https://api.paystack.co/transaction/verify/${tRef}`, { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           if(!data) reject("ERROR!")
           else resolve(data)
    })
}
        
export default rogerPay;