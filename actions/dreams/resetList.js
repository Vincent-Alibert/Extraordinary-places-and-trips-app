import actions from "../index-types";

export default function resetList() {
  return function(dispatch) {
    dispatch({
      type: actions.RESET_LIST,
      payload: null
    });
  };
}
