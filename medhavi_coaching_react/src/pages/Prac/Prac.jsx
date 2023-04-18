import React from 'react'
import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import PracInside from './PracInside';


function Prac() {
    // const [name,setName] = useState('Rashdiul');
    const navigate = useNavigate();


    function goinside(){
        navigate('/PracInside', { state: { name: 'Rashidul'}});    
    }

    return (
       <PracInside/>
    )
}

export default Prac