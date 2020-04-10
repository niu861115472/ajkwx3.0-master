import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function rgbClick(deviceId, key) {
  return (dispatch, getState) => {
    const token =   getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.smartHostControl, 
      { 
        token: token, 
        deviceType : 'VIRTUAL_RGB_REMOTE', 
        houseId: houseId, 
        deviceId : deviceId,
        key: key.toUpperCase(),
        rgb : "*",
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
       })
       .then(res => {
       
       })
  }
}