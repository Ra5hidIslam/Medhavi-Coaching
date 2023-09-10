import axios from '../api/axios';
import React from 'react';
require('dotenv').config();

const useRefreshToken = () =>{
    
    const refresh  = async() =>{
        const response = await axios.get('/refresh',{
            withCredentials:true        
        });
        console.log("previous token:",sessionStorage.getItem("token"));
        console.log("new token:",response.data.accessToken);
        // set the session token as the new accesstoken
        sessionStorage.setItem("token",response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;