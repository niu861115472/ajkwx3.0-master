
const initialState = {
  elevatorList: [],
  elevatorIf: false
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'ELEVTOR-DATASUCCESS':
      return { ...state,...action.payload}
    default:
        return state
  }
}