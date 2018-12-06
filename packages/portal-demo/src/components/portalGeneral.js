import React, { Component } from 'react';
import Portal from '@dengyongchao/portal';

class App extends Component {
  state = {
    count: 1,
    open: false,
  };
  onClickButton = () => {
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
  }
  toggleOpen = () => {
    this.setState({ open: !this.state.open})
  }
  beforeOpen() {
    console.log("打开之前");
    return false;
  };
  afterOpen() {
    console.log("打开之后")
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.onClickButton}>点击</button>
        <button onClick={this.toggleOpen}>开关</button>
        { true ?
          <Portal open={this.state.open} beforeOpen={this.beforeOpen} afterOpen={this.afterOpen}>
            <div>
              {this.state.count}
              <h1>Hello Portal!</h1>
            </div>
          </Portal> : null }
      </div>
    );
  }
}

export default App;
