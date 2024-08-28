// App.jsx
import React, { useState } from 'react';
import HelloWorld from './components/HelloWorld';
// import Model from './components/Model';

const App2 = () => {
  const [stat, setStat] = useState(false);

  return (
    <div id="app">
      <img id="logo" alt="Vue logo" style={{ display: 'none' }} src="./assets/logo.png" />
      <button id="btn" onClick={() => setStat(!stat)}>switch</button>
      {stat ? <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> :''}
    </div>
  );
};

export default App2;

