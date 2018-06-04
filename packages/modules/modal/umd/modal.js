(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global.modal = factory(null,null));
}(this, (function (React,ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Portal = function (_Component) {
      inherits(Portal, _Component);

      function Portal() {
          classCallCheck(this, Portal);
          return possibleConstructorReturn(this, _Component.apply(this, arguments));
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
          this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, this.rootNode);
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
          ReactDOM.unmountComponentAtNode(this.rootNode);
          this.rootNode.parentNode.removeChild(this.rootNode);
          this.rootNode = null;
          this.portal = null;
      };

      Portal.prototype.render = function render() {
          return null;
      };

      return Portal;
  }(React.Component);

  var Header = function (_Component) {
      inherits(Header, _Component);

      function Header(props) {
          classCallCheck(this, Header);

          var _this = possibleConstructorReturn(this, _Component.call(this, props));

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
          return React__default.createElement(
              'div',
              { className: 'ddi-modal-header', onMouseDown: this.handleMouseDown },
              loading ? React__default.createElement('span', { className: 'loading' }) : null,
              React__default.createElement(
                  'span',
                  { className: 'title' },
                  title
              ),
              React__default.createElement('i', { className: 'close', onClick: close })
          );
      };

      return Header;
  }(React.Component);

  Header.defaultProps = {
      title: '',
      loading: false
  };

  var Modal = function (_Component) {
      inherits(Modal, _Component);

      function Modal(props) {
          classCallCheck(this, Modal);

          var _this = possibleConstructorReturn(this, _Component.call(this, props));

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
          return React__default.createElement(
              Portal,
              { open: open },
              React__default.createElement(
                  'div',
                  null,
                  React__default.createElement(ModalMask, { showMask: showMask }),
                  React__default.createElement(
                      ModalWrap,
                      { left: left, top: top, width: width, height: height, close: close },
                      React__default.createElement(Header, {
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
  }(React.Component);

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
      return React__default.createElement('div', { className: clazz });
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

      return React__default.createElement(
          'div',
          { className: clazz, onClick: handleClick },
          React__default.createElement(
              'div',
              {
                  className: 'ddi-modal-content',
                  style: { left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px' } },
              props.children
          )
      );
  };

  return Modal;

})));
