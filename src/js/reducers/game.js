export default function Game(state = {}, action) {
  switch (action.type) {
    case 1:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 2:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state
  }
}
