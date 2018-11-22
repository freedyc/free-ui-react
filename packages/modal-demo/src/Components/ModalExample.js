import React, { Component } from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class ModalExample extends Component {
  state = { openOne: false, count: 1 }
  openOne = () => {
    this.setState({ openOne: true, isChecked: false})
  }
  close = () => {
    this.setState({
      openOne: false,
     })
  }
  addOne = () => {
    this.setState({ count: this.state.count + 1})
  }
  change = (e) => {
    this.setState({ isChecked: e.target.checked})
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openOne}>完整</button>
          <Modal
            open={this.state.openOne}
            close={this.close}
            loading={true}
            title="Modal Test"
            >
              <h1>支持Esc关闭</h1>
              <h1>支持点击文档关闭</h1>
              <h1>支持点击关闭关闭</h1>
              <h1>显示标题</h1>
              <h1>显示Loding</h1>
              <button className="button button-3d button-primary button-rounded" onClick={this.addOne}>点我加1</button>
              <h1>{this.state.count}</h1>
            <PropConponent isChecked={this.state.isChecked} change={this.change} count={this.state.count} />
          </Modal>
        </div>
      </div>
    )
  }
};

const PropConponent = (props) => {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => props.change(e)} checked={props.isChecked} />
      </label>
      {props.count}
      <span>{String(props.isChecked)}</span>
  </div>
  )
}
export default ModalExample;
