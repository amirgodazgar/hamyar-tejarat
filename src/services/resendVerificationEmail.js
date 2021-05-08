import http from "./httpServices"

export const resendVerificationEmail = async (email) =>  {
   await http.post("/Account/ResendVerificationEmail" , {
      email
   })
   .then(res => {
      console.log(res)
   })
}