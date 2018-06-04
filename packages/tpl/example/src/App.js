import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Portal from 'portal';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Portal open={true}>React Portal</Portal>
      </div>
    );
  }
}

export default App;
