import React, { useEffect, useState } from 'react'

// function resetr(){
//     return "Rashidul Islam";
// }




function Prac() {


    const [which_answer,setAnswer] = useState({});

    function select_answer(event){
        const ID = event.currentTarget.id;
        // console.log(event.currentTarget.id);
        setAnswer((prev)=>{
            let toggleId;
            if(prev[ID]){
                toggleId = {[ID]:false};
            }else{
                toggleId = {[ID]:true};
            }
            return {...toggleId};
        });
    }
    function show_answer(question_id){
        if(which_answer[question_id] === true){
            return(
                <p1>Submit</p1>
            )
        }
        else{
            return(
                <p1>Right Answer</p1>
            )
        }
    }

    useEffect(()=>{
        console.log(which_answer)
    },[which_answer])



    return (
        <div className='button-elements' style = {{display:"inline"}}>
           <button id = '1' onClick={(e) => {select_answer(e)}}>
           {/* Show the answer of this particular question */}
           {show_answer("1")}
           </button>
           
           <button id = '2' onClick={(e) => {select_answer(e)}}>
           {show_answer('2')}
           </button>
          
        </div>
        
    )
}

export default Prac;
// Get the id of the question then    i

