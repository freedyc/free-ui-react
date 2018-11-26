import React, { Component } from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class ModalTest extends Component {
  state = { openOne: false, counts: [1], openTwo: false }
  openOne = () => {
    this.setState({ openOne: true })
  }
  openTwo = () => {
      this.setState({ openTwo: true})
  }
  close = () => {
    this.setState({
      openOne: false,
    })
  }
  close2 = () => {
      this.setState(
          {openTwo:false}
      )
  }
  addOne = () => {
    const counts = this.state.counts;
    const gcounts = [...counts, counts[counts.length - 1] * 2 ];
    this.setState({ counts: gcounts })
  }
  change = (e) => {
    this.setState({ isChecked: e.target.checked })
  }
  render() {
    const btns = ["确认", "取消"];
    const footers = btns.map((t) => <button type="button" className="button button-3d button-royal button-rounded" onClick={this.close}>{t}</button> )
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openOne}>第一个对话框</button>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openTwo}>第二个对框框</button>
          <Modal
            open={this.state.openOne}
            close={this.close}
            loading={true}
            title="Modal Test"
            footer={footers}
          >
            <h1>支持Esc关闭</h1>
            <h1>不支持点击文档关闭</h1>
            <h1>支持点击关闭关闭</h1>
            <h1>显示标题</h1>
            <h1>显示Loding</h1>

            <button className="button button-3d button-primary button-rounded" onClick={this.addOne}>点我加1</button>
            <h1>{this.state.counts}</h1>
            <PropConponent isChecked={this.state.isChecked} change={this.change} counts={this.state.counts} />
          </Modal>
          <Modal
            open={this.state.openTwo}
            close={this.close2}
            loading={true}
            title="Modal Test222"
          >
            <h1>支持Esc关闭</h1>
            <h1>不支持点击文档关闭</h1>
            <h1>支持点击关闭关闭</h1>
            <h1>显示标题</h1>
            <h1>显示Loding</h1>

            <button className="button button-3d button-primary button-rounded" onClick={this.addOne}>点我加1</button>
            <h1>{this.state.counts}</h1>
            <PropConponent isChecked={this.state.isChecked} change={this.change} counts={this.state.counts} />
          </Modal>
          
        </div>
      </div>
    )
  }
};

const PropConponent = (props) => {
  console.log(props.counts);
  const listItems = props.counts ?  props.counts.map((v) => (<h1>{String(v)}</h1>) ) : null;
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => props.change(e)} checked={props.isChecked} />
      </label>
      { listItems }
      <span>{String(props.isChecked)}</span>
    </div>
  )
}
export default ModalTest;
