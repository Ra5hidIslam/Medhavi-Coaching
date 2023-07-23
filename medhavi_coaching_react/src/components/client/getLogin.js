export const getLogin =  async (data)=>{
    console.log("I am inside getLogin");
    const url = "http://localhost:8800/api/auth/login"
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        });
        const result = await response.json();
        console.log("The result of response")
        console.log(result);
        sessionStorage.setItem("token",result["accessToken"]);
        sessionStorage.setItem("userId",result["userId"]);
        console.log("The result of response")
        return true

    }catch(err){
        console.log("Error:",err.message);
        return false;
    }
}


// export default logState