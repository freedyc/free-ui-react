'use strict';

exports.__esModule = true;

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = function (_Component) {
    _inherits(Portal, _Component);

    function Portal() {
        _classCallCheck(this, Portal);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Portal.prototype.componentDidMount = function componentDidMount() {
        if (this.props.open) {
            this.renderPortal();
        }
    };

    Portal.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        this.renderPortal();
        if (prevProps.open && !this.props.open) {
            this.unmountPortal();
        }
    };

    Portal.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unmountPortal();
    };

    Portal.prototype.renderPortal = function renderPortal() {
        if (!this.props.open) return;
        this.mountPortal();
        this.portal = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.props.children, this.rootNode);
    };

    Portal.prototype.mountPortal = function mountPortal() {
        if (this.rootNode) return;
        var mountNode = document.body;
        this.rootNode = document.createElement('div');
        this.rootNode.className = "";
        mountNode.appendChild(this.rootNode);
    };

    Portal.prototype.unmountPortal = function unmountPortal() {
        if (!this.rootNode) return false;
        _reactDom2.default.unmountComponentAtNode(this.rootNode);
        this.rootNode.parentNode.removeChild(this.rootNode);
        this.rootNode = null;
        this.portal = null;
    };

    Portal.prototype.render = function render() {
        return null;
    };

    return Portal;
}(_react.Component);

exports.default = Portal;