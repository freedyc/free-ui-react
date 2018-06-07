<p align="center">
    <h3 align="center">Free UI React</h3>
</p>

## Content

- Modal
- Portal

## Quick start

- npm i @dengyongchao/modal --save
```
import React, { Component }  from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';

class Example extends Component {
    state = {
        open: false,
        header: false,
        mask: false
    }

    show = () => {
        this.setState({ open: true, showHeader: true, showMask: true  })
    }

    render() {
        return (
            <div>
                <button type="button" onClick={ this.show }>Show Modal </button>
                <Modal {...this.state} close={this.close} size={{width: 500, height: 300}}>
                    <h1>You Contnet</h1>
                </Modal>
            </div>
        )
    }
};

export default Example;

```
