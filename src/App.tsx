import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './routerComponent/Navigation';
import Content from './routerComponent/Content';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Content/>
    </div>
  );
}

export default App;
