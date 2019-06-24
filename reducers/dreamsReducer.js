import actions from "../actions/index-types";

const initialState = {
  listDreams: null,
  listDreamsCat: null
};

export default function DreamsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_DREAMS_CURRENT_USER:
      return {
        ...state,
        listDreams: action.payload
      };
    case actions.GET_ALL_DREAMS_CURRENT_USER_CAT:
      return {
        ...state,
        listDreamsCat: action.payload
      };
    case actions.RESET_LIST:
      return {
        ...state,
        listDreams: null,
        listDreamsCat: null
      };

    default:
      return state;
  }
}
