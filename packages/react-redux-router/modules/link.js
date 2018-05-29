import React, { Component, PropTypes } from "react";
import { NAMESPACE } from './constants';

export default class Link extends Component {
  static contextTypes = {
    store: PropTypes.object,
    routeTo: PropTypes.func,
  };

  static defaultProps = {
    Component: React.DOM.a,
    activeClass: 'active'
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.store.getState().get(NAMESPACE) !== nextContext.store.getState().get(NAMESPACE);
  }

  click = (evt) => {
    evt.preventDefault();
    this.context.routeTo(this.props.to);
  }

  isActive() {
    const router = this.context.store.getState().get(NAMESPACE);
    const path = router.get('location');
    const { to, exact } = this.props;
    if (exact) {
      return to === path;
    } else {
      return path.indexOf(to) === 0;
    }
  }

  render() {
    const {
      Component,
      className,
      activeClass,
      ...rest,
    } = this.props;
    return (
      <Component
        {...rest}
        className={`${className} ${this.isActive() ? activeClass : ''}`}
        onClick={this.click}
      />);
  }
}
