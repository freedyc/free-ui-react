import React, { Component, PropTypes } from "react";

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class Link extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    component: React.DOM.a,
    activeClass: 'active',
    exact: false,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.router.location !== nextContext.router.location;
  }

  handleClick = (evt) => {
    if (this.props.onClick) this.props.onClick(evt);
    if (
      !evt.defaultPrevented && // onClick prevented default
      evt.button === 0 && // ignore everything but left clicks
      !isModifiedEvent(evt) // ignore clicks with modifier keys
    ) {
      evt.preventDefault();
      this.context.router.push(this.props.to);
    }
  }

  isActive() {
    const router = this.context.router;
    const path = router.location;
    const { to, exact } = this.props;
    if (exact) {
      return to === path;
    } else {
      return path.indexOf(to) === 0;
    }
  }

  render() {
    const {
      component,
      className,
      activeClass,
      exact,
      children,
      ...rest,
    } = this.props;
    return React.createElement(component, {
      ...rest,
      className: `${className} ${this.isActive() ? activeClass : ''}`,
      onClick: this.handleClick,
    }, children);
  }
}
