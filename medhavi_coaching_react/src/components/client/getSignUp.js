require('dotenv').config();
export const getSignUp = async(data)=>{
    if(!data) return null;
    const url = process.env.REACT_APP_API_URL_SERVER+"/auth/register";
    if(data.email && data.userId){
        try{
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
                // credentials:'include',
            });
            if(response.status == 200){
                return true;
            }
            else if(response.status == 409){
                return "errorCode1";
            }
        }
        catch(err){
            return err.message;
        }
    }
    else return "email or username not received";
}

