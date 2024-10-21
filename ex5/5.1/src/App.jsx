
/*import './App.css'
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
*/

import { useState, useContext } from "react";
import { Context } from './contexts/countersContext'

const OpinionList = () => {
  const { opinions, voteOpinion } = useContext(Context);

  return (
    <div>
      <h2>Opinions</h2>
      {opinions.map((opinion) => (
        <div key={opinion.id}>
          <p>{opinion.text}, Votes : {opinion.votes}</p>
          <button onClick={() => voteOpinion(opinion.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};


const AddOpinion = () => {
  const [newOpinion, setNewOpinion] = useState("");
  const { addOpinion } = useContext(Context);

  const handleAddOpinion = () => {
    if (newOpinion.trim()) {
      addOpinion(newOpinion);
      setNewOpinion("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newOpinion}
        onChange={(e) => setNewOpinion(e.target.value)}
        placeholder="Add your opinion"
      />
      <button onClick={handleAddOpinion}>Add Opinion</button>
    </div>
  );
}


function App() {
  return (
      <div>
        <h1>Give your Opinion</h1>
        <AddOpinion />
        <OpinionList />
      </div>
  );
}

export default App;
