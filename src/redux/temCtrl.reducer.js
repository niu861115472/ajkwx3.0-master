const initailState = {
    devices:[]
  }
  export default function(state= initailState, action){
    switch (action.type) {
      case '[temCtrl] DATASUCCESS':
        return {...state, ...action.payload}
      default:
        return state
    }
  }