/* eslint-disable react/prop-types */
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