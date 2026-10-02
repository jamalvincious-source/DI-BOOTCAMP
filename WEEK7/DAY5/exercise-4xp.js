import React, { useEffect, useState } from 'react';

const Color = () => {
  const [favoriteColor, setFavoriteColor] = useState('red');

  useEffect(() => {
    alert('useEffect reached');
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>{favoriteColor}</h1>
      <button onClick={() => setFavoriteColor('blue')}>Change Color</button>
    </div>
  );
};

export default Color;
