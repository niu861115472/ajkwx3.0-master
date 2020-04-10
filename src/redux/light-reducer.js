
let initialState = {
  lights:[],
  serveId:'',
  middleRoundStatus:'卧室',
  large_round_rotate:0
}

export default function(state= initialState,action){
  switch (action.type) {
    case 'GETSERVEID':
      return {...state, "serveId":action.serveId}
    case 'GETLIGHTWAYS':
      return {...state,"lights": action.lights}
    case 'CHANGEMIDDLESTATUS':
      return {...state,"middleRoundStatus": action.class}
    case 'LARGEROTATE': {
      return {...state,large_round_rotate:action.payload}
    }
    case 'CHANGELIGHTSTATUS':
        const lights = state.lights.map((light, index) => {
          if (light.id === action.id) {
            light.status = action.status
          } 
          return light
        })
        return {...state, lights: lights}
    default:
      return state
  }
}
