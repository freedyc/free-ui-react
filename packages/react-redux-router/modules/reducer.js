export const LOCATION_CHANGE = '@@react-redux-router/LOCATION_CHANGE';

const initState = {
  location: null,
};

export const routerReducer = (state = initState, { type, payload }) => {
  switch(type) {

    case LOCATION_CHANGE:
      return {
        ...state,
        location: payload.location,
      };

    default:
      return state;
  }
};

export default routerReducer;
