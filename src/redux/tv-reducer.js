
const initialState = {
  tvs:[],
  tvSwitch: true
};


export default function TvReducer(state = initialState, action) {
  switch (action.type) {
    case 'INITAILSTATE': {
      return {...state, 'tvs': action.tv}
    }
    case 'TVSwitch': {
      return {...state,'tvSwitch':!state.tvSwitch}
    }
    default:
      return state;
  }
}
