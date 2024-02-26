import React from 'react'
import '../style.css'

function Die(props) {
    
  return (
    <div onClick={()=>props.hold(props.id)} className={props.isHeld ? "die-container active": "die-container"} >
        <h1>{props.number}</h1>
    </div>
  )
}

export default Die