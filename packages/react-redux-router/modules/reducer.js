import { fromJS } from 'immutablejs';

export const LOCATION_CHANGE = '@@react-redux-router/LOCATION_CHANGE';

const initState = fromJS({
  location: null,
});

export const routerReducer = (state = initState, { type, payload }) => {
  switch(type) {

    case LOCATION_CHANGE:
      return state.set('location', payload.location);

    default:
      return state;
  }
};

export default routerReducer;
