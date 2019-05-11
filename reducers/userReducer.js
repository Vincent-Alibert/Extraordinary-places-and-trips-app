import actions from "../actions/index-types";

const initialState = {
  informations: {}
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        informations: action.payload
      };
    default:
      return state;
  }
}
