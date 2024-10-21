
import './App.css'
import { useContext } from 'react'
import { Context } from './contexts/countersContext'

// eslint-disable-next-line react/prop-types
const Counter = ({counter, setter, name}) => {
  return (
    <div>
      <button onClick={setter}>{name} :{counter} </button>
    </div>
  )
}


const ResetButton = () => {
  const {resetAllValues} = useContext(Context);
  return (<button onClick={resetAllValues}>Reset all</button>)
}

function App() {
  const {good, increaseGood} = useContext(Context)
  const {ok, increaseOk} = useContext(Context)
  const {bad, increaseBad} = useContext(Context)

  return (
    <>
      <h1>Give feedback</h1>
      <Counter counter={good} setter={increaseGood} name="good" />
      <Counter counter={ok} setter={increaseOk} name="ok" />
      <Counter counter={bad} setter={increaseBad} name="bad" />
      <ResetButton />
    </> 
  )
}

export default App
