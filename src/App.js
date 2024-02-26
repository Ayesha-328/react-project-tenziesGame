import './App.css';
import './style.css';
import Die from './component/Die';
import {useState,useEffect} from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice,setDice]=useState(allNewDice())
  const [tenzies,setTenzies]= useState(false)
  const [turns, setTurns]=useState(0)
  const [rollsArray,setRollsArray]= useState(JSON.parse(localStorage.getItem("rolls")) || [])
  const [timer,setTimer]=useState("00:00:00")

  const minRolls=Math.min(...rollsArray)
  // console.log(minRolls)

  useEffect(function(){
    const AllHeld=dice.every(die=>die.isHeld=== true)
    const firstValue=dice[0].value;
    const allSameValue=dice.every(die=>die.value===firstValue);
    (AllHeld && allSameValue) && setTenzies(true)

  },[dice])

function hold(id){
  setDice(prevDice=> prevDice.map(die=>{
    return die.id===id ? {...die, isHeld:!die.isHeld}: die
  })
  ) 
}

useEffect(function(){
  if(tenzies){
    rollsArray.push(turns)
    localStorage.setItem("rolls",JSON.stringify(rollsArray))
  }},[tenzies])
  
 let localRollsArray=localStorage.getItem("rolls")


  const diceElements=dice.map((die,index)=><Die hold={hold} key={index} id={die.id} number={die.value} isHeld={die.isHeld}/>)
  
  function generateNewDice(){
    const random=Math.floor(Math.random()*6) + 1;
    return {
      value:random,
    isHeld:false,
    id:nanoid()
    }
  }
  
  function allNewDice(){
    const randomNumberArr=[]
    for(let i=0;i<10;i++){
      randomNumberArr.push(generateNewDice())
    }
    return randomNumberArr;
  }

  function rollDice(){
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false);
      setTurns(0)
    }
    else{
      setTurns(prevTurn=> prevTurn+1)
      setDice(prevDice=>prevDice.map(die=> die.isHeld? die:generateNewDice()));
    }   
  }
  

  return (
    <>
    <main className="container">
      {tenzies && <Confetti />}
      <div className="game-container">
      <h1 className="title">Tenzies</h1>
      <p className="desc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="tenzies">
       {diceElements}
        </div>
        <div className="turns">Number of Rolls: {turns}</div>
        <div className="rolls">Lowest Rolls Record: {minRolls}</div>
        <button onClick={rollDice} className="btn">{tenzies? "New Game" : "Roll"}</button>
        

      </div>
    </main>
    </>
  );
}

export default App;
