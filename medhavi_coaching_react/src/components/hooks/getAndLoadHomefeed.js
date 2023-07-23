// import { useEffect, useState } from "react";
// import { loadHomeFeed } from "../client/loadHomeFeed";


// const getNewArray = async ()=>{
//     var newArr = await fetchQuestions(sessionStorage.getItem("userId"));
//     return newArr;
// }

// export const getAndLoadHomeFeed= async ()=>{
    
//     const [tempArray,setTempArray] = useState({});
//     console.log("Get and load");
//     try{
//         function assignNewArray(newarr){
//             // newArray = newarr;
//             setTempArray(newarr);
//             // questionArray.val = newarr;
//             // console.log(questionArray.val);
//         }
//         const response = await getNewArray();
//         assignNewArray(response);
//         console.log("response",response);
    
//         if(tempArray.length != 0){
//             return tempArray;
//         }
//         else{
//             return tempArray;
//         }
//     }catch(err){
//         console.log("get and load error",err.message);
//     }
    
// }