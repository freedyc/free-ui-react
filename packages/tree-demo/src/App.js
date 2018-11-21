import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import data from './data.json';
import Tree from '@zddi/tree';

class App extends Component {
  constructor() {
    super()
    this.state = { selectedIds: []};
  }

  handleChange(selectedIds) {
    this.setState({selectedIds})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-content">
          <p>Selected Ids:</p>
          <p>{this.state.selectedIds.join(', ')}</p>
          <Tree expandAll={true} expandIcon="fa fa-minus" collapseIcon="fa fa-plus" data={data} onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
