import React from 'react'
import { useState,useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const getUsers = async (userID) =>{
    try{
        const axiosPrivate = useAxiosPrivate();
        console.log("Im inside getuser");
        console.log(sessionStorage.getItem("token"));
        const response = await axiosPrivate.get('/user/'+ userID,{
            // signal:controller.signal
            headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
        });
        console.log(response);
        console.log(response.data);
        const user = await response.data;
        return user;
    } catch(err){
        console.log(err.message);
    }
}

const getUser = async (userID)=>{
    let user;
    console.log("Im inside getuser");
    try{
        // let isMounted = true;
        // const controller = new AbortController();
        user = await getUsers(userID);
    }catch(err){
        console.log(err.message);
    }
    return user;
}

export default getUser


// const getUser=(userID)=> {
//     const [user,setUser] = useState();
//     const axiosPrivate = useAxiosPrivate();
//     console.log("Im inside getuser");
//     useEffect(()=>{
//         const getUsers = async () =>{
//             try{
//                 console.log("Im inside getuser");
//                 console.log(sessionStorage.getItem("token"));
//                 const response = await axiosPrivate.get('/user/'+ userID,{
//                     // signal:controller.signal
//                     headers:{'Authorization':`Bearer ${sessionStorage.getItem("token")}`},
//                 });
//                 console.log(response);
//                 console.log(response.data);
//                 user = response.data;
//             } catch(err){
//                 console.log(err.message);
//             }
//         }
//         getUsers();
//     },[])
//         // let isMounted = true;
//         // const controller = new AbortController();

//     return user;
// }

// export default getUser