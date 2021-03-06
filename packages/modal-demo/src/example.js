import React, { Component }  from 'react';
import Modal from '@dengyongchao/modal';
import '@dengyongchao/modal/modal.css';
import { Button } from  'styled-mask';

class Example extends Component {
    state = {
        open: false,
        header: false,
        mask: false
    }

    show = () => {
        this.setState({ open: true, showHeader: true, showMask: true  })
    }

    show1 = () => {
        this.setState({ open: true, showHeader: true, showMask: false  })
    }

    show2 = () => {
        this.setState({ open: true, showHeader: false, showMask: false })
    }

    close = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <Button theme={{color: 'green'}} type="button" onClick={ this.show }>Show Modal </Button>
                <Button theme={{color: 'yellow'}} type="button" onClick={ this.show1 }>Show Modal --Hide Mask</Button>
                <Button theme={{color: 'blue'}} type="button" onClick={ this.show2 }>Show Modal --Hide Header, Mask</Button>
                <Modal {...this.state} close={this.close} size={{width: 500, height: 300}}>
                    <h1>You Contnet</h1>
                    <h2>You content</h2>
                    <h3>You content</h3>
                    <h4>You content</h4>
                    <h5>You content</h5>
                    <h6>You content</h6>
                </Modal>
            </div>
        )
    }
};

export default Example;
