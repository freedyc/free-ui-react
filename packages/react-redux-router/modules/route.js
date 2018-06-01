import React, { Component, PropTypes } from "react";
import matchPath from './match_path';

const isEmptyChildren = children => React.Children.count(children) === 0;


/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    disabled: PropTypes.book,
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      location: PropTypes.string.isRequired,
    })
  };

  state = {
    match: this.computeMatch(this.props)
  };

  computeMatch({ computedMatch, path, exact }) {
    if (computedMatch) return computedMatch; // <Switch> already computed the match for us
    const { location } = this.context.router;

    return matchPath(location, { path, exact });
  }

  render() {
    const { match } = this.state;
    const { children, component, disabled } = this.props;
    const { history, location, push } = this.context.router;
    const props = { match, location, history, push };

    if (disabled) return null;

    if (component) return match ? React.createElement(component, props) : null;

    if (typeof children === "function") return children(props);

    if (children && !isEmptyChildren(children))
      return React.Children.only(children);

    return null;
  }
}

export default Route;
