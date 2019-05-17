import actions from "../actions/index-types";

const initialState = {
  listeDreams: null
};

export default function DreamsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_DREAMS_CURRENT_USER:
      return {
        ...state,
        listeDreams: action.payload
      };
    default:
      return state;
  }
}
