let initialState 
if(localStorage.getItem('deleteTime')>= new Date().getTime()){
   initialState = {
      userName:localStorage.getItem('userName')||'',
      password:localStorage.getItem('password')||'',
      isRemenber:localStorage.getItem('isRemenber')||true,
      deleteTime:localStorage.getItem('deleteTime')
  }
}else{
   initialState = {
      userName:'',
      password:'',
      isRemenber: true,
      deleteTime:''
  }
}


export default (state = initialState, action)=>{
  switch (action.type) {
    case 'DATASUCCESS': {
      return {...state, ...action.payload}
    }
    case 'CHANGEUSERANDPASSWORD':
      const name = action.name
      return {...state, [name]: action.value}
    case 'CHANGEREMEMBER':
      return {...state, isRemenber: action.value}
    default:
      return state;
  }
};