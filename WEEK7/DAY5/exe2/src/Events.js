import React, { useState } from 'react';

const Events = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert('I was clicked');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(`You pressed Enter: ${event.target.value}`);
    }
  };

  const toggle = () => {
    setIsToggleOn((prevState) => !prevState);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <button onClick={clickMe}>Click me</button>

      <div style={{ marginTop: '15px' }}>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Type here and press Enter"
          style={{ padding: '8px', marginRight: '10px' }}
        />
      </div>

      <div style={{ marginTop: '15px' }}>
        <button onClick={toggle}>{isToggleOn ? 'ON' : 'OFF'}</button>
      </div>
    </div>
  );
};

export default Events;
