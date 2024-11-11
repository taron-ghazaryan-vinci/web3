/* eslint-disable react/prop-types */
/*
import React from "react";

const Context = React.createContext(null)

const ProviderWrapper = (props) => {
    const [good, setGood] = React.useState(1)
    const [ok, setOk] = React.useState(1)
    const [bad, setBad] = React.useState(1)

    const resetAllValues = () => {
        setGood(0)
        setOk(0)
        setBad(0)
    }

    const increaseGood =  () => {
        setGood(good + 1)   
    }

    const increaseOk =  () => {
        setOk(ok + 1)   
    }

    const increaseBad =  () => {      
        setBad(bad + 1)   
    }

    const exposedValues = {
        good,
        ok,
        bad,
        increaseGood,
        increaseOk,
        increaseBad,
        resetAllValues
    }
    return <Context.Provider value={exposedValues}>
        { props.children }
    </Context.Provider>

}

export {
    ProviderWrapper,
    Context
}
/
*/
import React, { useState } from "react";

const Context = React.createContext();

const ProviderWrapper = ({ children }) => {
  const [opinions, setOpinions] = useState([]);

  // Ajouter une opinion
  const addOpinion = (text) => {
    const newOpinion = {
      id: opinions.length + 1,
      text,
      votes: 1,
    };
    setOpinions((prevOpinions) => [...prevOpinions, newOpinion].sort((a, b) => b.votes - a.votes));
  };

  // Voter pour une opinion
  const voteOpinion = (id) => {
    setOpinions((prevOpinions) =>
      prevOpinions
        .map((opinion) =>
          opinion.id === id ? { ...opinion, votes: opinion.votes + 1 } : opinion
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const exposedValues = {
    opinions,
    addOpinion,
    voteOpinion,
  };

  return <Context.Provider value={exposedValues}>{children}</Context.Provider>;
};

export { ProviderWrapper, Context };
