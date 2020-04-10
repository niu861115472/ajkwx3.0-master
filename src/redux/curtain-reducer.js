
const initailState = {
  curtains:{},
  type: 0
};

export default function(state=initailState, action){
  switch (action.type) {
    case 'CURTAIN-INITIALSTATE':
      return {...state,'curtains': action.data}
    case 'INITIALSTATETYPE':
      return {...state,'type': action.data}
    default:
        return state;
  }
}
