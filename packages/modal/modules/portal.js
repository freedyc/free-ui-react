import { Component } from 'react';
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
        if (!this.props.open) return
        this.mountPortal()
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.props.children,
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
        this.rootNode.parentNode.removeChild(this.rootNode);
        this.rootNode = null;
        this.portal = null;
    }

    render() {
        return null;
    }
}

export default Portal;
