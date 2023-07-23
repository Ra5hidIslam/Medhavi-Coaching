// export const loadFeed =  async (data)=>{
//     console.log(data);
//     const url = "http://localhost:8800/api/auth/login"
//     try{
//         const response = await fetch(url,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify(data),
//         });
//         const result = await response.json();
//         sessionStorage.setItem("token",result["accessToken"]);
//         // console.log("Success",result);
//         console.log(sessionStorage.getItem("token"));
//     }catch(err){
//         console.error("Error:",err);
//     }
// }


// // export default logState