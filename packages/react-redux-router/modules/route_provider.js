import React, { Component } from "react";
import PropTypes from "prop-types";

import { LOCATION_CHANGE } from "./reducer";

class RouteProvider extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleLocationChange = (location) => {
    this.store.dispatch({
      type: LOCATION_CHANGE,
      payload: {
        location,
      }
    });
  };

  componentWillMount() {
    const { store: propsStore, history } = this.props;
    this.store = propsStore || this.context.store;

    this.unsubscribeFromHistory = history.subscribe(this.handleLocationChange);

    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}

export default ConnectedRouter;
