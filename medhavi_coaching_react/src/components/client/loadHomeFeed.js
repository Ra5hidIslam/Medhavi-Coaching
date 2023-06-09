export const loadHomeFeed =  async (user_id)=>{
    // console.log(data);
    const url = "http://localhost:8800/api/feed/getHomeFeed/" + String(user_id);
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            // body:JSON.stringify(data),
        });
        const result = await response.json();
        // sessionStorage.setItem("token",result["accessToken"]);
        // console.log("Success",result);
        // console.log(sessionStorage.getItem("token"));
        console.log(result);
        return result;
    }catch(err){
        console.error("Error:",err);
    }
}


export default loadHomeFeed;