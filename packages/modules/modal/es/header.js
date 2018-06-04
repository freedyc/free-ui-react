function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var Header = function (_Component) {
    _inherits(Header, _Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            cursor: 'pointer',
            clientx: null,
            clienty: null,
            isDragging: false
        };

        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        _this.move = _this.move.bind(_this);
        _this.up = _this.up.bind(_this);
        _this.keydown = _this.keydown.bind(_this);
        _this.resize = _this.resize.bind(_this);

        document.addEventListener('mousemove', _this.move, false);
        document.addEventListener('mouseup', _this.up, false);
        document.addEventListener('keydown', _this.keydown, false);
        window.addEventListener('resize', _this.resize, false);

        _this.innerWidth = window.innerWidth;
        _this.innerHeight = window.innerHeight;

        return _this;
    }

    Header.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        // console.log("%c header update", "color: orange", nextState, nextProps)
        if (nextProps.initLeft === this.props.initLeft && nextProps.initTop === this.props.initTop) return false;
        console.log("%c update Component", "color: green");
        return true;
    };

    Header.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('mousemove', this.move, false);
        document.removeEventListener('mouseup', this.up, false);
        document.removeEventListener('keydown', this.keydown, false);
        window.removeEventListener('resize', this.resize, false);
    };

    Header.prototype.move = function move(e) {
        var _state = this.state,
            isDragging = _state.isDragging,
            clientx = _state.clientx,
            clienty = _state.clienty;
        var _props = this.props,
            initLeft = _props.initLeft,
            initTop = _props.initTop,
            height = _props.height,
            width = _props.width;

        var nega = function nega(v) {
            return v > 0 ? v : 0;
        };
        if (isDragging && initLeft !== undefined) {
            var innerWidth = this.innerWidth,
                innerHeight = this.innerHeight;

            var nLeft = nega(e.pageX - clientx + initLeft);
            var nTop = nega(e.pageY - clienty + initTop);
            nLeft = nLeft + width > innerWidth ? nega(innerWidth - width) : nLeft;
            nTop = nTop + height > innerHeight ? nega(innerHeight - height) : nTop;
            this.props.updatePostions(nLeft, nTop);
        }
        return false;
    };

    Header.prototype.up = function up(e) {
        this.setState({
            isDragging: false,
            clientx: 0,
            clienty: 0
        });
        this.props.updateInitPos();
    };

    Header.prototype.resize = function resize() {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        console.log('%c The window resize:', 'color: green', 'width:' + this.innerWidth + ' height:' + this.innerHeight);
    };

    Header.prototype.keydown = function keydown(e) {
        var closeEsc = this.props.closeEsc;

        if (closeEsc && (e.key === "Escape" || e.which === 27)) {
            console.log('%c close modal', 'color: blue');
            this.props.close();
        }
    };

    Header.prototype.handleMouseDown = function handleMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('%c header first click:', 'color: green', 'pageX: ' + e.pageX + ', pageY: ' + e.pageY);
        this.setState({
            clientx: e.pageX,
            clienty: e.pageY,
            isDragging: true
        });
        return false;
    };

    Header.prototype.render = function render() {
        var _props2 = this.props,
            close = _props2.close,
            loading = _props2.loading,
            title = _props2.title,
            showHeader = _props2.showHeader;

        if (!showHeader) {
            return null;
        }
        return React.createElement(
            'div',
            { className: 'ddi-modal-header', onMouseDown: this.handleMouseDown },
            loading ? React.createElement('span', { className: 'loading' }) : null,
            React.createElement(
                'span',
                { className: 'title' },
                title
            ),
            React.createElement('i', { className: 'close', onClick: close })
        );
    };

    return Header;
}(Component);

Header.defaultProps = {
    title: '',
    loading: false
};
;

export default Header;