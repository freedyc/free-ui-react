import React, { Component } from 'react';
import './App.css';
import Portal from '@dengyongchao/portal';

class App extends Component {
  state = {count: 1 };
  onClickButton = () => {
    console.log(this.state.count);
    this.setState({count: this.state.count + 1 });
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.onClickButton}>点击</button>
        <Portal open={true}>
          <div>{this.state.count}</div>
        </Portal>
      </div>
    );
  }
}

export default App;
