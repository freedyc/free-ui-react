import React, { PropTypes } from "react";
import matchPath from "./match_path";

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired
  };

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { location } = this.context.router;
    const { children } = this.props;

    let match, child;
    React.Children.forEach(children, (element) => {
      if (match == null && React.isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          disabled,
          from
        } = element.props;
        const path = pathProp || from;

        if (disabled) return;
        child = element;
        match = matchPath(location, { path, exact });
      }
    });

    return match
      ? React.cloneElement(child, { location, computedMatch: match })
      : null;
  }
}

export default Switch;
