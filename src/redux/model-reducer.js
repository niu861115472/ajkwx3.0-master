
const initialState = {
  models:[]
};
export default function(state=initialState, action){
  switch (action.type) {
    case 'INITIALSTATE':
      return {...state, 'models':action.data}
    default:
        return state
  }
}
