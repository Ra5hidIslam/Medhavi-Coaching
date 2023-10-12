import React from 'react'
import { createContext,useReducer } from 'react';


export const AuthContext = createContext();

export const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,login:true}
        case 'USERLOADED':
            return {...state,userStatus:true}
        case 'FEEDLOADED':
            return {...state,feedStatus:true}
        default:
            return state
    }
};

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        login:false,
        userStatus:false,
        feedStatus:false,
    });

    console.log("Auth Context state",state);
    

    // const setLogin = ()=>{
    //     const 
    // }

    return (
        <AuthContext.Provider value ={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


// export default AuthContext