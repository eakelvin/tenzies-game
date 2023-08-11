import { useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'


function App() {
  const [dice, setDice] = useState(allnewDice)

  function allnewDice() {
    let array = []
    for (let index = 0; index < 10; index++) {
      array.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return array
  }
  
  function rollDice() {
    setDice(allnewDice())
  }

  const elements = dice.map((item) => 
      <Die key={item.id} value={item.value} 
    />)

  return (
      <main>
        <div className="dice-container">
          {elements}
        </div>
          <button className='roll-dice' onClick={rollDice}>Roll</button>
      </main>
  )
}

export default App
