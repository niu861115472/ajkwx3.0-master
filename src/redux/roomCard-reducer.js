
const initialState = {
  deviceId:'',
  elevatorList: []
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'ROOMCARD-DATASUCCESS':
      return { ...state,...action.payload}
    case 'INITIAL':
      return {...state,'deviceId': action.deviceId}
    default:
        return state
  }
}