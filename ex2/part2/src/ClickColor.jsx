// src/ClickCounter.jsx

import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function ClickColour() {
  const [color, setColor] = useState(0);
  const colorList = ['red','green','blue','yellow','violet'];


  const handleClick = ()=>{
    setColor((color+1)%colorList.length)
  }



  return (
    <div className="card">
        <div >
      <button style={{backgroundColor : colorList[color]}} onClick={handleClick} >
        The next color is {colorList[(color+1)%colorList.length]}
      </button>
      <p>Color is {colorList[color]}</p>
       </div>
    </div>
  );
}

export default ClickColour;