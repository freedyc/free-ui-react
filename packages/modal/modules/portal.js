import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';


class Portal extends Component {

    componentDidMount() {
        if(this.props.open) {
            this.renderPortal()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.renderPortal()
        if (prevProps.open && !this.props.open) {
            this.unmountPortal()
        }
    }

    componentWillUnmount() {
        this.unmountPortal()
    }

    renderPortal() {
        const {
            open,
            children
        } = this.props;
        if (!open) return false;
        this.mountPortal()
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            Children.only(children),
            this.rootNode
        )
    }

    mountPortal() {
        if (this.rootNode) return
        const mountNode = document.body;
        this.rootNode = document.createElement('div');
        this.rootNode.className="";
        mountNode.appendChild(this.rootNode);

    }

    unmountPortal() {
        if (!this.rootNode) return false;
        ReactDOM.unmountComponentAtNode(this.rootNode);
        document.body.removeChild(this.rootNode);
        this.rootNode = null;
        this.portal = null;
    }

    render() {
        return null;
    }
}

class Portal1 extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        const  { open } = this.props;
        if(!open) return null;
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default Portal;
