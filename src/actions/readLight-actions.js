import { request, config } from '../utlis'


const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function getInitialState() {
  return (dispatch, getState) => {
    const token =  getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'DIMMER' })
      .then(res => {
       
        if (res && res.success && res.dataObject.devices.length > 0) {
          // const wayIds = res.dataObject.devices[0].ways.reduce((previousValue, currentValue) => {
          //   if (currentValue.name.indexOf('白光') > -1) {
          //     return { ...previousValue, baiguangWayid: currentValue.wayId }
          //   }
          //   if (currentValue.name.indexOf('暖') > -1) {
          //     return { ...previousValue, nuanguangWayid: currentValue.wayId }
          //   }
          //   return { ...previousValue, otherWayid: currentValue.wayId }
          // }, {})
          dispatch(initialState(res.dataObject.devices[0].ways))
        }
      })
  }
}

export function initialState(wayIds) {
  return {
    type: 'INITALSTATE',
    wayIds: wayIds
  }
}

export function rangeChange(value, wayId) {
  return (dispatch, getStore) => {
   const token =  getStore().toObject().idStore.token || token_session
    const houseId = getStore().toObject().idStore.houseId || houseId_session
    request.get(config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : 'OPEN',
        wayId : wayId,
        brightness : value,
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
      })
      .then(res => {
       
      })
  }
}

export function changeState(key, value) {
  return {
    type: 'CHANGESTATE',
    key: key,
    value: value
  }
}
export function switchClick(actionType) {
  return (dispatch, getStore) => {
    const token =  getStore().toObject().idStore.token || token_session
    const houseId =  getStore().toObject().idStore.houseId || houseId_session
    const wayIds = getStore().toObject().readLightStore.wayIds

    Promise.all(wayIds.map(light => runAsync(light.wayId)))
    .then(res => {
      dispatch(changeState('status', actionType))
    })

    function runAsync(wayId){
      setTimeout(function() {
        request.get(config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : actionType,
        wayId : wayId,
        brightness : 50
      })
        .then(res => {
          return true
        })
      },2000)
 }
  }
  
}


