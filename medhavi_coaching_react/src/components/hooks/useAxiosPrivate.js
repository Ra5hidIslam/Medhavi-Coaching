// import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axios from "axios";

const BASE_URL = 'http://localhost:8800/api';

const axiosPrivate =  axios.create({
    baseURL:BASE_URL,
    headers:{ 'Content-Type':'application/json'},
    withCredentials:true
});


const refresh = useRefreshToken();


axiosPrivate.interceptors.request.use(function(config){
        if(!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
        }
        // if(!config.headers['Access-Control-Allow-Credentials']){
        //     config.headers['Access-Control-Allow-Credentials'] = "*";
        // }
        return config;
    }, function(error){
        Promise.reject(error)
    } 
);



axiosPrivate.interceptors.response.use(function(response){
    return response;
},
async function(error){
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

export default axiosPrivate;