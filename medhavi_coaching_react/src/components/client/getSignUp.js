require('dotenv').config();
export const getSignUp = async(data)=>{
    console.log("data =",data);

    var formdata = new FormData();
    formdata.append("name", "Amit Shah");
    formdata.append("email", "amit@gmail.com");
    formdata.append("password", "password");
    formdata.append("userId", "amit123");
    formdata.append("image", data.image);

    if(!data) return null;
    const url = process.env.REACT_APP_API_URL_SERVER+"/auth/register";
    if(data.email && data.userId){
        try{
            const response = await fetch(url,{
                method:"POST",
                // headers:{
                //     "Content-Type":"multipart/form-data",
                // },
                body:formdata,
                // credentials:'include',
            });
            console.log(response);
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