import actions from "../actions/index-types";

const initialState = {
  listDreams: [],
  listDreamsCat: []
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
        listDreams: [],
        listDreamsCat: []
      };

    default:
      return state;
  }
}
