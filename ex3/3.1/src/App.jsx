import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const StatisticLine = ({ name, stat }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{stat}</td>
    </tr>
  );
};

// eslint-disable-next-line react/prop-types
const Buttons = ({ state, name }) => {
  return <button onClick={state}>{name}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedbacks = good + neutral + bad;
  const positive = totalFeedbacks === 0 ? 0 : (good / totalFeedbacks) * 100;

  // Calcul de la moyenne
  const average = totalFeedbacks === 0 ? 0 : (good * 1 + bad * -1) / totalFeedbacks;

  const setGoodValue = () => {
    setGood(good + 1);
  };

  const setNeutralValue = () => {
    setNeutral(neutral + 1);
  };

  const setBadValue = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Buttons state={setGoodValue} name="good" />
      <Buttons state={setNeutralValue} name="neutral" />
      <Buttons state={setBadValue} name="bad" />
      <br />
      <h1>Statistics</h1>

      {totalFeedbacks === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine name="good" stat={good} />
            <StatisticLine name="neutral" stat={neutral} />
            <StatisticLine name="bad" stat={bad} />
            <StatisticLine name="all" stat={totalFeedbacks} />
            <StatisticLine name="average" stat={average.toFixed(2)} />
            <StatisticLine name="positive" stat={positive.toFixed(2) + ' %'} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
