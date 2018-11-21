import React, { Component } from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class ModalExample extends Component {
  state = { openOne: false }
  openOne = () => {
    this.setState({ openOne: true })
  }
  openTwo = () => {
    this.setState({ openTwo: true })
  }
  close = () => {
    this.setState({
      openOne: false,
      openTwo: false,
     })
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openOne}>完整</button>
          <Modal
            open={this.state.openOne}
            close={this.close}
            title="完整Modal展示"
            loading={true} >
              <h1>支持Esc关闭</h1>
              <h1>支持点击文档关闭</h1>
              <h1>支持点击关闭关闭</h1>
              <h1>显示标题</h1>
              <h1>显示Loding</h1>
          </Modal>
        </div>

        <div style={{marginTop: "30px"}}>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openTwo}>不带标题</button>
          <Modal
            open={this.state.openTwo}
            close={this.close}
            title="完整Modal展示">
            <h1>支持Esc关闭</h1>
            <h1>支持点击文档关闭</h1>
            <h1>支持点击关闭关闭</h1>
            <h1>隐藏标题</h1>
            <h1>显示Loding</h1>
          </Modal>
        </div>
      </div>
    )
  }
};

export default ModalExample;
