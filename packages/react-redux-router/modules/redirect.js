import React, { PropTypes } from "react";

const createLocation = (to, props) => {
  if (typeof to === 'string') {
    return to;
  } else {
    return to(props);
  }
};

/**
 * The public API for updating the location programmatically
 * with a component.
 */
class Redirect extends React.Component {
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    from: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired
  };

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate(prevProps) {
    const prevTo = createLocation(prevProps.to, this.props);
    const nextTo = createLocation(this.props.to, this.props);

    if (prevTo === nextTo) {
      return;
    }

    this.redirect();
  }

  computeTo({ computedMatch, to }) {
    if (computedMatch) {
      if (typeof to === "string") {
        to.replace(/[\*:]\w+/, (key) => {
          const name = key.slice(1);
          return computedMatch.params[name];
        });
      }
    }

    return to;
  }

  redirect() {
    const { push } = this.context.router;
    const to = this.computeTo(this.props);
    push(to);
  }

  render() {
    return null;
  }
}

export default Redirect;
