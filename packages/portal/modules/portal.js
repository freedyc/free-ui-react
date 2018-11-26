import { Component } from 'react';
import ReactDOM from 'react-dom';


class Portal extends Component {

    static defaultProps = {
        open: false,
    }
    componentWillMount() {
        console.log("portal will Mount")
    }

    componentDidMount() {
        console.log("portal did Mount")
        if (this.props.open) {
            this.renderPortal()
        }
    }

    componentDidUpdate(prevProps) {
        this.renderPortal()
        if (prevProps.open && !this.props.open) {
            this.unmountPortal()
        }
    }

    componentWillUnmount() {
        console.log("我什么时候写在")
        alert(1);
        this.unmountPortal()
    }

    renderPortal() {
        console.log("render Portal");
        if (!this.props.open) return
        console.log("我不会执行")
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
        this.rootNode.className = "";
        mountNode.appendChild(this.rootNode);

    }

    unmountPortal() {
        if (!this.rootNode) return false;
        var isDelete = ReactDOM.unmountComponentAtNode(this.rootNode);
        console.log(isDelete);
        this.rootNode.parentNode.removeChild(this.rootNode);
        this.rootNode = null;
        this.portal = null;
    }

    render() {
        return null;
    }
}

export default Portal;
