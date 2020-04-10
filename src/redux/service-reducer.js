
const initailState = {
  lights:[]
}
export default function(state= initailState, action){
  switch (action.type) {
    case 'SETWAY':
      return {...state,'lights': action.lights}
    default:
      return state
  }
}
