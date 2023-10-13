require('dotenv').config();
// import { useAuthContext } from '../hooks/useAuthContext';

// const context = useAuthContext();

export const getLogin =  async (data)=>{
    console.log(process.env);
    const url = process.env.REACT_APP_API_URL_SERVER + "/auth/login";

    console.log("url=",process.env.REACT_APP_API_URL_SERVER);
    console.log("working??")
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            credentials:'include',
        });
        let result = response;
        if(response.status == 200){
            result = await response.json();
            sessionStorage.setItem("token",result["accessToken"]);
            localStorage.setItem("userId",result["userId"]);
            // context.dispatch({type:'LOGIN'})
            // console.log(result);
            return true
        }
        else{
            console.log(result);
            return false;
        }
        
        // console.log("The result of response")
        

    }catch(err){
        console.log("Error:",err.message);
        return false;
    }
}


// export default logState
