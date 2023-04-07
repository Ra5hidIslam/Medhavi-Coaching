import React from 'react'
import { useLocation } from 'react-router-dom'


function PracInside() {
  const { state } =  useLocation();
  const { name } = state;

  console.log(name)
  return (
    <p>Hello</p>
  )
}

export default PracInside