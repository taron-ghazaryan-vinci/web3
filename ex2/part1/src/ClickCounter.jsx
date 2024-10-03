// ClickCounter.jsx
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function ClickCounter({ title, message, message2 }) {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("count")));
  const [overButton, setOverButton] = useState(false);

  const handleClick = () => {
    const newCount = count +1;
    setCount((newCount) => newCount + 1);
    localStorage.setItem("count", JSON.stringify(newCount))
  };

  const handleOver = () => {
    setOverButton(true)
  }

  const handleLeave = () => {
    setOverButton(false)
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{overButton ? `${message2}` : ''}</p>
      <button onClick={handleClick} onMouseOver={handleOver} onMouseLeave={handleLeave}>
        Count is {count}
      </button>
      {count >= 10 && <p>{message}</p>}
    </div>
  );
}

export default ClickCounter;
