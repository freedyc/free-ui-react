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
  beforeOpen = () => {
    console.log("before open");
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 3000);
    return false;
  };

  afterClose = () => {
    console.log("before close");
    return this.state.count % 2 === 0;
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.onClickButton}>点击</button>
        <button onClick={this.toggleOpen}>开关</button>
        { true ?
          <Portal open={this.state.open} beforeOpen={this.beforeOpen} beforeClose={this.afterClose}>
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
