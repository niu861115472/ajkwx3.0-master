import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
// const source = sessionStorage.getItem('source')

export function initialLights(info, roomId) {
  return function (dispatch, getState) {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    if (sessionStorage.getItem('source') == '1') {
      request.get(config.api.queryLightsStatus, { ...info, token: token, deviceType: 'SWITCH' })
        .then(res => {
          console.log(res)
          if (res && res.success) {
            dispatch(getServeId(res.dataObject.serverId))
            let lights = []
            lights = res.dataObject.filter(function (light) {
              return light.name.indexOf('灯') > -1
            })
            return lights
          }
        })
        .then(lights => {
          request.get(config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'VIRTUAL_RGB_REMOTE' })
            .then(res => {

              let allLight = []
              if (res && res.success && res.dataObject.devices.length > 0) {
                // res.dataObject.devices[0].name = '其他可调灯带'
                res.dataObject.devices[0].status = 'OFF'
                allLight = [...lights, ...res.dataObject.devices]
              } else {
                allLight = lights
              }
              return allLight
            })
            .then(lights => {
              request.get(config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'DIMMER' })
                .then(res => {

                  let allLight = []
                  if (res && res.success && res.dataObject.devices.length > 0) {
                    // res.dataObject.devices[0].name = '其他可调阅读灯'
                    allLight = [...lights, ...res.dataObject.devices]
                  } else {
                    allLight = lights
                  }
                  dispatch(getLightsWays(allLight))
                })
            })
        })
    } else {
      request.get(config.api.getHostDevices, { roomId: roomId, type: 'LIGHT' })
        .then(res => {
          console.log(res)
          if (res && res.success) {
            // dispatch(getServeId(res.dataObject.serverId))
            let lights =
              lights = res.result.filter(function (light) {
                return light.name.indexOf('灯') > -1
              })
            console.log(lights)
            return lights
          }
        })
        .then(lights => {
          request.get(config.api.getHostDevices, { roomId: roomId, type: 'DIMMER' })
            .then(res => {
              let allLight = []
              if (res && res.success && res.result.length > 0) {
                // res.dataObject.devices[0].name = '其他可调阅读灯'
                allLight = [...lights, ...res.result]
              } else {
                allLight = lights
              }
              dispatch(getLightsWays(allLight))
            })
        })
    }
  }
}


// 判断是否有阅读灯
export function yuedudeng(info) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.queryHostDeviceByType, { houseId: info.houseId, token: token, deviceType: 'VIRTUAL_RGB_REMOTE' })
      .then(res => {

      })
  }
}

export function getModelScens(data) {
  return {
    type: 'GETMODELSCENE',
    models: data
  }
}
export function getLightsWays(data) {
  return {
    type: 'GETLIGHTWAYS',
    lights: data
  }
}
export function getServeId(data) {
  return {
    type: 'GETSERVEID',
    serveId: data
  }
}
export function modelsClick(sceneId) {
  return function (dispatch, getState) {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.smartHostControl, {
      houseId: houseId,
      deviceType: 'SCENE',
      sceneId: sceneId,
      token: token,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
    })
      .then((res) => {

      });
  };
}
// 灯点击
export function lightsClick(wayId, status,deviceId) {

  const actionType = sessionStorage.getItem('source') == '1' ? (status === 'ON' ? 'CLOSE' : 'OPEN') : (status == 'OFF' ? 'open' : 'close')
  // const actionType = status === 'ON' ? 'CLOSE' : 'OPEN'
  const status_on = sessionStorage.getItem('source') == '1' ? (status === 'ON' ? 'OFF' : 'ON') : (status == '0' ? 'ON' : 'OFF')
  // const status_on = status === 'ON' ? 'OFF' : 'ON'
  return function (dispatch, getState) {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    
    if (sessionStorage.getItem('source') == '1') {
      dispatch(changelightstatus(wayId, status_on))
      request.get(config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        actionType: actionType,
        wayId: wayId,
        token: token,
        brightness: 80,
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
      })
        .then((res) => {
          if (res && res.success) {
            // dispatch(changelightstatus(index, status_on))
          }
        })
    } else {
      dispatch(changelightstatus(deviceId, status_on))
      request.get(config.api.deviceControl,{
        deviceId:deviceId,
        type:'LIGHT',
        op:'switch',
        val:actionType
      })
      .then(res =>{
        
      })
    }
  }
}
// 灯带点击
export function dengdaiClick(deviceId, status, index) {
  const status_on = status === 'ON' ? 'OFF' : 'ON'
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.smartHostControl,
      {
        token: token,
        deviceType: 'VIRTUAL_RGB_REMOTE',
        houseId: houseId,
        deviceId: deviceId,
        key: status_on,
        rgb: "*",
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
      })
      .then(res => {

        dispatch(changelightstatus(index, status_on))
      })
  }
}
export function changelightstatus(index,type) {
  console.log(index,type)
  return {
    type: 'CHANGELIGHTSTATUS',
    id: index,
    status: type
  };
}

// export function changeslightstatus(index,type) {
//   console.log(index,type)
//   return {
//     type: 'CHANGESLIGHTSTATUS',
//     id: index,
//     status: type
//   };
// }

export function changeMiddleStatus(cls) {
  return {
    type: 'CHANGEMIDDLESTATUS',
    class: cls
  }
}

// 大圈旋转
export function largeRoundRotate(rotate) {
  return {
    type: 'LARGEROTATE',
    payload: rotate
  }
}