import { useContext } from "react"

import { AuthContext } from '../../context/AuthContext';


export const useAuthContext =()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useAuthContext must be used used inside an AuthContext Provider')
    }

    return context;
}

