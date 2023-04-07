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
        // <div>
        //     <Routes>
        //         <Route path = '/Prac_inside' exact Component={<PracInside name = {name}/>} >
                    
        //         </Route>
        //     </Routes>
        // <Link to ='/Prac_inside' state ={{name:name}}>
        //     prac_inside
        // </Link>
        // </div>
        <div>
            <button onClick={goinside}>Get inside Prac</button>
        </div>
        
        
    )
}

export default Prac