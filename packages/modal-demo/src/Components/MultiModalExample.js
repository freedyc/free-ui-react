import React, { Component } from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class ModalExample extends Component {

  state = {
    openWhite: false,
    openBlack: false,
  }

  open = (name) => {
    this.setState({
      [name]: true
    })
  }

  close = (name) => {
    this.setState({
      [name]: false,
    })
  }

  render() {
    const {
      openBlack,
      openWhite
    } = this.state;
    console.log("Redner");
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <hr />
          <h1>多个Modal展示</h1>

          <button type="button" className="button button-3d button-primary button-rounded" onClick={() => this.open("openBlack")}>阿黑</button>
          <Modal
            open={openBlack}
            close={() => this.close("openBlack")}
            title="阿黑"
          >
            <h1>大黑</h1>
            <button type="button" className="button button-3d button-primary button-rounded" onClick={() => this.open("openWhite")}>阿白</button>
          </Modal>
          <Modal
            open={openWhite}
            close={() => this.close("openWhite")}
            title="阿白"
          >
            <h1>大白</h1>
          </Modal>
        </div>
      </div>
    )
  }
};

export default ModalExample;
