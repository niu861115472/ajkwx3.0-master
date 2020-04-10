
const initialState = {
  airs:[],
  deviceType:''
};
export default function(state=initialState, action){
  switch (action.type) {
    case 'INTIALDATA':
      const style = action.style
      return {...state, [style]: action.data}
     default:
        return state;
  }
}
