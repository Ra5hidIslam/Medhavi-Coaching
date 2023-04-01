import React, { useEffect, useState } from 'react'


function Timer() {
  // const [deadline,setDeadline] = useState(15);
  const deadline = 15;
  const [time, setTime] = useState(deadline);
  const [stop,setStop] = useState(false);
  // const time = 15;
  // const currentDate = new Date.now()
  // const deadline = new Date(currentDate.getTime() + 15*60000);

  const getTime =()=>{
    if(time != 0){
      console.log(time);
      // setDeadline(deadline-1)
      setTime(time-1);
      
    }
    else{
      setStop(true);
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(stop == false){
        getTime(deadline)
      }},1000);
    return ()=>{
      clearInterval(interval);
    };
  },[time]);
  return (
    <p>{time}</p>
  )
}

// setInterval(Quiz,1000);
export default Timer;