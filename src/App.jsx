import { useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'


function App() {
  const [dice, setDice] = useState(allnewDice)

  function generateNumber(){
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
  } 

  function allnewDice() {
    let array = []
    for (let index = 0; index < 10; index++) {
      array.push(generateNumber())
    }
    return array
  }
  
  function rollDice() {
    setDice(prevState => prevState.map(item => {
      return item.isHeld ? item : generateNumber()
    }))
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  const elements = dice.map((item) => 
      <Die 
        key={item.id} 
        value={item.value} 
        isHeld={item.isHeld}
        holdDice={() => holdDice(item.id)} 
    />)

  return (
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {elements}
        </div>
          <button className='roll-dice' onClick={rollDice}>Roll</button>
      </main>
  )
}

export default App
