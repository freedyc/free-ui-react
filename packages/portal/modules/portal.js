import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {

    static defaultProps = {
        open: false,
    }

    static propTypes = {
        open: PropTypes.bool,
        children: PropTypes.element,
        beforeOpen: PropTypes.func,
        beforeClose: PropTypes.func,
    }

    componentDidMount() {
        this.renderPortal();
    }

    componentDidUpdate(prevProps) {
        this.renderPortal();
        if (prevProps.open && !this.props.open) {
            this.unmountPortal()
        }
    }

    componentWillUnmount() {
        this.unmountPortal()
    }

    renderPortal() {
        if (!this.props.open) return;
        this.mountPortal()
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.props.children,
            this.rootNode
        )
    }

    mountPortal() {
        if (this.rootNode) return;
        this.props.beforeOpen && this.props.beforeOpen()
        const mountNode = document.body;
        this.rootNode = document.createElement('div');
        // this.rootNode.className = "";
        mountNode.appendChild(this.rootNode);
    }

    unmountPortal() {
        if (!this.rootNode) return false;
        if (!this.triggerBeforeClose()) return false;
        ReactDOM.unmountComponentAtNode(this.rootNode);
        this.rootNode.parentNode.removeChild(this.rootNode);
        this.rootNode = null;
        this.portal = null;
    }

    triggerBeforeClose() {
        const { beforeClose } = this.props;
        if (typeof beforeClose === 'function') {
            const hasClose = beforeClose();
            if (typeof hasClose === 'boolean' && hasClose === false) {
                return false;
            }
        }
        return true;
    }

    render() {
        return null;
    }
}

export default Portal;
