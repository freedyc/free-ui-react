function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Portal from './portal';
import Header from './header';

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.updatePostions = function (left, top) {
            _this.setState({ left: left, top: top });
        };

        _this.updateInitPos = function () {
            var _this$state = _this.state,
                left = _this$state.left,
                top = _this$state.top,
                initLeft = _this$state.initLeft,
                initTop = _this$state.initTop;

            if (left === initLeft && top === initTop) return false;
            console.log('%c init left, top value change:', 'color: green', 'left=' + left + ', top:' + top);
            console.log(_this);
            _this.setState({ initLeft: left, initTop: top });
        };

        _this.state = {
            left: 500,
            top: 40,
            initLeft: 500,
            initTop: 40
        };
        return _this;
    }

    Modal.prototype.render = function render() {
        var _props = this.props,
            open = _props.open,
            close = _props.close,
            size = _props.size;
        var width = size.width,
            height = size.height;
        // api

        var _props2 = this.props,
            showMask = _props2.showMask,
            drapHeader = _props2.drapHeader,
            showHeader = _props2.showHeader,
            closeEsc = _props2.closeEsc;
        var _state = this.state,
            left = _state.left,
            top = _state.top,
            initLeft = _state.initLeft,
            initTop = _state.initTop;

        console.log("Modal render");
        return React.createElement(
            Portal,
            { open: open },
            React.createElement(
                'div',
                null,
                React.createElement(ModalMask, { showMask: showMask }),
                React.createElement(
                    ModalWrap,
                    { left: left, top: top, width: width, height: height, close: close },
                    React.createElement(Header, {
                        updatePostions: this.updatePostions,
                        updateInitPos: this.updateInitPos,
                        close: close,
                        initLeft: initLeft,
                        initTop: initTop,
                        width: width,
                        height: height,
                        showHeader: showHeader,
                        drapHeader: drapHeader,
                        closeEsc: closeEsc
                    }),
                    this.props.children
                )
            )
        );
    };

    return Modal;
}(Component);

Modal.defaultProps = {
    closeDocClick: true,
    closeEsc: true,
    drapHeader: true,
    showHeader: true,
    showMask: true,
    size: { width: 520, height: 450 }
};


var ModalMask = function ModalMask(props) {
    var clazz = props.showMask ? 'ddi-modal-mask' : '';
    return React.createElement('div', { className: clazz });
};

var ModalWrap = function ModalWrap(props) {
    var left = props.left,
        top = props.top,
        width = props.width,
        height = props.height,
        close = props.close,
        _props$isClickWrap = props.isClickWrap,
        isClickWrap = _props$isClickWrap === undefined ? true : _props$isClickWrap;

    var clazz = "ddi-modal-wrap";
    var handleClick = function handleClick(e) {
        e.stopPropagation();
        var className = e.target.className;
        console.log("%c trigger click", "color:green ", 'Click element: ' + e.target.className);
        if (className !== clazz) return false;
        if (isClickWrap) close();
    };

    return React.createElement(
        'div',
        { className: clazz, onClick: handleClick },
        React.createElement(
            'div',
            {
                className: 'ddi-modal-content',
                style: { left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px' } },
            props.children
        )
    );
};
export default Modal;