import React, { Component } from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class ModalTest extends Component {
  state = { openOne: false, counts: [1] }
  openOne = () => {
    this.setState({ openOne: true, isChecked: false })
  }
  close = () => {
    this.setState({
      openOne: false,
    })
  }
  addOne = () => {
    const counts = this.state.counts;
    const gcounts = [...counts, counts[counts.length - 1] * 2];
    this.setState({ counts: gcounts })
  }
  minus = () => {
    if (this.state.counts.length === 1) return;
    this.setState({ counts: this.state.counts.slice(1)})
  }
  change = (e) => {
    this.setState({ isChecked: e.target.checked })
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.addOne();
    // }, 100);
  }
  render() {
    const btns = ["确认", "取消"];
    const footers = btns.map((t) => <button type="button" className="button button-3d button-royal button-rounded" onClick={this.close}>{t}</button>)
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <button type="button" className="button button-3d button-primary button-rounded" onClick={this.openOne}>測試自動伸縮</button>
          <Modal
            open={this.state.openOne}
            close={this.close}
            loading={true}
            title="Modal Scroll"
            footer={footers}
          >
            <button className="button button-3d button-primary button-rounded" onClick={this.addOne}>增加</button>
            <button className="button button-3d button-primary button-rounded" onClick={this.minus}>减去</button>
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
  const listItems = props.counts ? props.counts.map((v) => (<h1>{String(v)}</h1>)) : null;
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => props.change(e)} checked={props.isChecked} />
      </label>
      {listItems}
      <span>{String(props.isChecked)}</span>
    </div>
  )
}
export default ModalTest;
