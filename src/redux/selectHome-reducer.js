const initialState = {
  rooms: []
};
export default function(state=initialState,action){
  switch (action.type) {
    case 'INTIAL':
      return  {...state, rooms: action.rooms }
     default:
        return state;
  }
}
