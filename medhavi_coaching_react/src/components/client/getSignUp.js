export const getSignUp = async(data)=>{
    if(!data) return null;
    const url = "http://localhost:8800/api/auth/register"
    if(data.email && data.username){
        try{
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
                credentials:'include',
            });
        }
        catch(err){
            return err.message;
        }
    }
    else return "email or username not received";
}

