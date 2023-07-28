import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// import axios from "axios";



const useAxiosPrivate = () =>{
    const refresh = useRefreshToken();

    try{
        useEffect(()=>{
            const requestIntercept = axiosPrivate.interceptors.request.use(
                config=>{
                    if(!config.headers['Authorization']){
                        config.headers['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
                    }
                    // if(!config.headers['Access-Control-Allow-Credentials']){
                    //     config.headers['Access-Control-Allow-Credentials'] = "*";
                    // }
                    return config;
                }, (error) => Promise.reject(error) 
            );
    
            const responseIntercept = axiosPrivate.interceptors.response.use(function(response){
                return response;
            },
            async (error) =>{
                // console.log(error)
                const prevRequest = error.config;
                if(error.response){
                    // const prevRequest = error
                    // && !(prevRequest.sent)
                    if(error.response.status === 403 ){
                        prevRequest.sent = true; // so it doesn't go into a infinite loop
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        // prevRequest.headers['NewAccessToken'] = newAccessToken;
                        return axiosPrivate(prevRequest);
                    }
                }
                return Promise.reject(error);
            }
            );
    
            return () =>{
                axiosPrivate.interceptors.reject.eject(responseIntercept);
                axiosPrivate.interceptors.response.eject(responseIntercept);
    
            }
        },[refresh])
    }catch(err){
        console.log(err.message);
    }
    

    return axiosPrivate;

}

export default useAxiosPrivate;