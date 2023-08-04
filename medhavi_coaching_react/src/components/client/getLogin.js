export const getLogin =  async (data)=>{
    console.log(data);
    const url = "http://localhost:8800/api/auth/login"
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            credentials:'include',
        });
        let result =  response;
        if(response.status == 200){
            result = await response.json();
            sessionStorage.setItem("token",result["accessToken"]);
            sessionStorage.setItem("userId",result["userId"]);
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