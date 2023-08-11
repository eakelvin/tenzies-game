import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = useState(allnewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(item => item.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(item => item.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('CONGRATULATIONS!!!🎉');
    }
  }, [dice])

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
    if (!tenzies) {
      setDice(prevState => prevState.map(item => {
        return item.isHeld ? item : generateNumber()
      }))
    } else {
      setTenzies(false)
      setDice(allnewDice)
    }
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
        {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {elements}
        </div>
          <button 
            className='roll-dice' 
            onClick={rollDice}>
              {tenzies ? "NEW GAME" : "ROLL"}
          </button>
      </main>
  )
}

export default App
