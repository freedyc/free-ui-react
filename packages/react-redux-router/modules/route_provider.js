import React, { Component, PropTypes } from "react";

import { LOCATION_CHANGE } from "./reducer";

class RouteProvider extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static contextTypes = {
    store: PropTypes.object
  };

  static childContextTypes = {
    router: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      router: {
        history: this.props.history,
        location: this.state.location,
        push: this.props.history.push,
      }
    };
  }

  state = {
    location: this.props.history.getLocation()
  }

  handleLocationChange = (location) => {
    this.store.dispatch({
      type: LOCATION_CHANGE,
      payload: {
        location,
      }
    });
    this.setState({ location });
  };

  componentWillMount() {
    const { store: propsStore, history } = this.props;
    this.store = propsStore || this.context.store;

    this.unsubscribeFromHistory = history.subscribe(this.handleLocationChange);

    this.handleLocationChange(history.getLocation());
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}

export default RouteProvider;
