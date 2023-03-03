import mysql from "mysql";
import * as Mailer from "nodemailer";
import { sign } from 'jsonwebtoken';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ACCOUNT,
    password: process.env.DB_PASSCODE,
    database: process.env.DB_NAME,
    // port: process.env.PORT,
});
export const transporter = Mailer.createTransport({
  host:process.env.SMTP_HOST,
  port:465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

export default function statusHandler() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn){
            if (err) reject(err);
            else resolve(conn);
        });
    })
}

export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error:any) {
      throw new Error(error)
    }
}

export const ordersListing = async <T>(query: string, orderlistQuery:string, params: string[] | Object): Promise<T> => {
  try {
  const serverState = statusHandler();
    if (!serverState) throw new Error('Offline!');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        // else resolve(results);
        results.map((n:any)=>{
          const ordered = JSON.parse(n.orderedItems)
          ordered.map((pid:any)=>{
            pool.query(orderlistQuery, pid.product_id, (error, results) =>{
              if(error) reject(error)
              else resolve(results)
            })
          })
        })
      });
    });

  } catch (error:any) {
    throw new Error(error)
  }
}

export const findById = async <T>(query: string, params: string[]|Object,): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results[0]);
        });
      });
  
    } catch (error:any) {
      throw new Error(error.messge)
    }
}

export const findVendorMenusById = async <T>(query: string, params: string[]|Object,): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}

//Find Orders by Vendor ID
export const findOrderById = async <T>(query: string, params: string[]|Object,): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}

//Find Products by Vendor ID
export const findProductById = async <T>(query: string, params: string[]|Object): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}

//Create Products by Vendor ID
export const createProduct = async <T>(query: string, params: string[]|Object, create:string, createParams: string[]|Object): Promise<T> => {
  const errorMessage:any = "Failed!"
  try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        // const verifyVendorById = 
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          results ? pool.query(create, createParams, (err, result) => {
            if(err) reject(err)
            else resolve(result)
          }):reject(errorMessage)
        })
    })
  
    } catch (error:any) {
      throw new Error(error.messge)
    }
}

//Edit Products by Vendor ID
export const editProductById = async <T>(query: string, params: string[]|Object, create:string, createParams: string[]|Object): Promise<T> => {
  const errorMessage:any = "Failed!"
  try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        // const verifyVendorById = 
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          results ? pool.query(create, createParams, (err, result) => {
            if(err) reject(err)
            else resolve(result)
          }):reject(errorMessage)
        })
    })
  
    } catch (error:any) {
      throw new Error(error.messge)
    }
}

//Get payment history by Vendor ID
export const getPaymentHistory = async <T>(query: string, params: string[]|Object, getPayments:string, vendorId: string[]|Object): Promise<T> => {
  const errorMessage:any = "Failed!"
  try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        // const verifyVendorById = 
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          results ? pool.query(getPayments, vendorId, (err, result) => {
            if(err) reject(err)
            else resolve(result)
          }):reject(errorMessage)
        })
    })
  
    } catch (error:any) {
      throw new Error(error.messge)
    }
}

//Order details by unique ID
export const orderDetailsById = async <T>(query: string, vendor_params: string, orderQuery:string, params:string): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        const verifyVendorById = pool.query(query, vendor_params, (error, results) => {
          if (error) return false;
          else return results ? true : false;
        })

        verifyVendorById ? pool.query(orderQuery, params, (err, result) => {
          err ? reject(err) : resolve(result)
        }):reject("Failed!")
    })
  
    } catch (error:any) {
      throw new Error(error.messge)
    }
}

export const findVendorsByAddress = async <T>(query: string, params: string[]|Object,): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, ['%%'+params+'%'], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}
 
export const findSingleMenuById = async <T>(query: string, params: string[]|Object,): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results[0]);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}

// Create Store Account 
export const createAccount = async <T>(query: string, create:string, email:string, params: string[]|Object): Promise<T> => {
    const errorMessage:any = "User Exist!"
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
        return new Promise<T>((resolve, reject) => {
        pool.query(query, email, async (error, results) => {
          if (error) reject(error);

          // Checks if email address exists
          results.length !== 0 ? resolve(errorMessage) 
          : pool.query(create, params, (error, result)=>{
            if(error) reject(error)
            else {
              resolve(result[0])
            }});
        });
      });
}

//Store payment information
export const makePayment = async <T>(query: string, params:string[]|Object): Promise<T> => {
      try {
        const serverState = statusHandler();
          if (!serverState) throw new Error('Offline!');
          
          return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
              if (error) reject(error);
              else resolve(results);
            });
          });
          
        } catch (error:any) {
          throw new Error(error)
        }
}

export const createOrder = async <T>(query: string, params:string[]|Object): Promise<T> => {
    try {
      const serverState = statusHandler();
        if (!serverState) throw new Error('Offline!');

        return new Promise<T>((resolve, reject) => {
          pool.query(query, params, (error, results) => {
            if (error) reject(error);
            else resolve(results[0]);
          });
        })
    
      } catch (error:any) {
        throw new Error(error.messge)
      }
}

export const requestPassReset = async <T>(query: string, params:string[]|Object, resetQuery:string, resetCode:string[]|Object): Promise<T> => {
    const errorMessage:any = "User Not Found!"    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(`${error} ${errorMessage}`);
          if(results[0].user_email.match(params)){
            pool.query(resetQuery, resetCode, (error, response) => {
              if (error) reject(`${error}`);
              resolve(response)
            })
            // resolve(resetCode)
          }
          else reject(`Email ${params} Not Matched!`)
        });
      });
}
export const passwordReset = async <T>(query: string, reset:string, resetCode:string, params: string[]|Object): Promise<T> => {
    const errorMessage:any = "User Not Found!"
    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, resetCode, async (error, results) => {
          if (error) reject(error);
          if(results.length !== 0){
            pool.query(reset, params, (error, result)=>{
              if(error) reject(error)
              if(result.length !== 0){
                pool.query(`UPDATE users SET resetCode = null WHERE id = ${results[0].id}`,
                [],
                (err, response)=>{
                  if(err) reject(`${err} ${errorMessage}`)
                  else resolve(response)
                })
              }
              else{
                reject("No internet!")
               }
            })
          }else{
            resolve(errorMessage)
           };
          // results.length !== 0 ?resolve(results[0]):resolve(errorMessage)
        });
      });
}

export const accountConfirmation = async <T>(query: string, reset:string, email:string, code:string, params: string[]|Object): Promise<T> => {
    const errorMessage:any = "User Not Found!"
    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, email, async (error, results) => {
          if (error) reject(error);
          if(results[0].confirmationCode === code){
            pool.query(reset, params, (error, result)=>{
              if(error) reject(error)
              else {resolve(result[0])}
            })
          }else{
            resolve(errorMessage)
           };
        });
      });
}

// Verify account with confirmation code
export const businessAccountConfirmation = async <T>(query: string, reset:string, code:string, params: string[]|Object): Promise<T> => {
    const errorMessage:any = "User Not Found!"
    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!'); //Checks if server is still online
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, code, async (error, results) => {
          if (error) reject(error);
          // check if code is confirmed! 
          results[0].confirmation_code === code ? 
          pool.query(reset, params, (error, result)=>{
                if(error) reject(error)
                else {
                  let mailOptions = {
                    from: process.env.USER,
                    to: results[0].email,
                    subject: process.env.SUBJECT,
                    html:`<div marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" bgcolor="#eaeeef"
                    leftmargin="0">
                    <div style="text-align:center; background-color:#f2f3f8; color:#455056bd; line-height:18px;"><strong> </strong></div>
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Raleway:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                      <td>
                        <table style="background-color: #f2f3f8; max-width:670px; margin:4rem auto;" width="100%" border="0" align="center"
                          cellpadding="0" cellspacing="0">
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:600px; background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                  <td style="padding:40px;">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td>
                                        <h1 style="color: #1e1e2d; font-weight: 500; margin: 0; text-transform:capitalize; font-size: 28px;font-family:'Raleway',sans-serif;">Account Verification</h1>
                                        <p style="font-size:15px; color:#455056; line-height:20px; margin:8px 0 30px;">Hi ${results[0].business_name},</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                            <tr
                                              style="border-bottom:1px solid #ebebeb; margin-bottom:26px; padding-bottom:29px; display:block;">
                                              <td width="84">
                                              </td>
                                              <td style="vertical-align:top;">
                                              <p style="font-size:15px; color:#455056; line-height:24px; margin:0 0 30px;">
                                                Welcome to <strong>Rogerdart</strong> <br />
                                                Congratulations... @ <strong>${results[0].email} </strong> has been verified successfully!
                                                <br /> Go setup your store and start selling.
                                              </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="height:25px;">&nbsp;</td>
                          </tr>
                          <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:#455056bd; line-height:18px; margin:0 0 0;">&copy; <strong>Rogerdart</strong> ${new Date().getFullYear()}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="height:80px;">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  </div>`
                  }
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {reject(error.message)} 
                    else {
                      const jsontoken = sign({ data: results[0]}, `${process.env.TOKEN_SECRET}`, {
                        expiresIn: '12h'
                    })
                      resolve({...results[0], confirmation_code:null, access_token:jsontoken})
                    }
                });
                }
          }) :
          reject(errorMessage)
        });
      });
}

//Saves business information ...
export const businessAccountInfo = async <T>(query: string, update:string, id:string, params:string[]|Object): Promise<T> => {
    const errorMessage:any = "Vendor Not Found!";
    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, id, async (error, results) => {
          if (error) reject(error);
          results.length === 0 ? reject(errorMessage) : pool.query(update, params, async (err, result) => {
            if(err) reject(err)
            resolve(result ? results[0] : null)
          }) // resolve(params)
        });
      });
}

// Send OTP to phone number
export const businessIdentitiyVerification = async <T>(query: string, update:string, id:string, params:string[]|Object): Promise<T> => {
    const errorMessage:any = "Vendor Not Found!";
    
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, id, async (error, results) => {
          if (error) reject(error);
          results.length === 0 ? reject(errorMessage) : pool.query(update, params, async (err, result) => {
            if(err) reject(err)
            resolve(result ? results[0] : null)
          }) // resolve(params)
        });
      });
}
  
export const executeAuth = async <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
    const serverState = statusHandler();
      if (!serverState) throw new Error('Offline!');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results[0]);
        });
      });
  
    } catch (error:any) {
      console.log(`Failure Occured: ${error.message}`);
      throw new Error(error.messge)
    }
}

export const executeAll = async <T>(query: string):Promise<T> => {
    try {
      const serverState = statusHandler();
        if (!serverState) throw new Error('Offline!');
    
        return new Promise<T>((resolve, reject) => {
          pool.query(query, [], (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
    
      } catch (error:any) {
        console.log(`Failure Occured: ${error.message}`);
        throw new Error(error.messge)
      }
}