
const initialState = {
  status: 'CLOSE',
  wayIds: null
};
export default function(state=initialState, action){
  switch (action.type) {
    case 'INITALSTATE':
      return {...state,'wayIds': action.wayIds}
    case 'CHANGESTATE':
    const key = action.key
      return {...state, [key]:action.value}
     default:
        return state;
  }
}
