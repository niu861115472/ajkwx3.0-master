const initialState = {
  token: '',
  customerId: '',
  serveId: '',
  houseId: '',
  envir: {
    hum: "",
    pm: "",
    temp: "",
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE':
      return { ...state, token: action.token, customerId: action.customerId }
    case 'SERVERID':
      return { ...state, 'serveId': action.data }
    case 'SAVEHOUSEID':
      return { ...state, 'houseId': action.houseId }
    case 'SAVEENVIR':
      return { ...state, 'envir': action.envir }
    default:
      return state;
  }
};
