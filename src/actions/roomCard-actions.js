import { Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import { request, config, requestLocal } from '../utlis'

const deviceType = 'FINGERPRINT_LOCK';
const type = 'GATE'
const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const customerId_session = sessionStorage.getItem('customerId')

export function dataSuccess(data) {
  return {
    type: 'ROOMCARD-DATASUCCESS',
    payload: data
  }
}

export function initialState(roomId) {

  return (dispatch, getStore) => {
    const token = getStore().toObject().idStore.token || token_session
    const houseId = getStore().toObject().idStore.houseId || houseId_session
    if (sessionStorage.getItem('source') == '1') {
      request.get(config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: deviceType })
        .then(res => {
          if (res && res.success) {

            if (res && res.success && res.dataObject.devices.length > 0)
              dispatch(initail(res.dataObject.devices[0].deviceId))
          }
        })
    } else {
      console.log('222222222222')
      request.get(config.api.getHostDevices, { roomId: roomId, type: type })
        .then(res => {
          if (res && res.success) {

            if (res && res.success && res.result.length > 0) {
              dispatch(initail(res.result[0].roomId))
            }
          }
        })
    }

  }
}

export function initail(deviceId) {
  return {
    type: 'INITIAL',
    deviceId: deviceId
  }
}
// 开门
export function openTheDoor(deviceId, cb) {
  return (dispatch, getStore) => {
    const token = getStore().toObject().idStore.token || token_session
    const houseId = getStore().toObject().idStore.houseId || houseId_session
    const customerId = getStore().toObject().idStore.customerId || customerId_session
    if (sessionStorage.getItem('source') == '1') {
      request.get(config.api.smartHostControl, {
        token: token,
        houseId: houseId,
        deviceType: deviceType,
        deviceId: deviceId,
        customerId: customerId,
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
      })
        .then(res => {
          Toast.info('开锁成功')
          if (res && res.success) {
            // request.get( config.api.powerControl, {
            //     hostId: sessionStorage.getItem('powerHostId'),
            //     action: 'jdqoff'
            //   })
            //   .then(res => {

            //   })

          }
        })
    }else{
      request.get(config.api.deviceControl,{
        deviceId:deviceId,
        type:type,
        op:'switch',
        val:'open'
      })
      .then(res =>{
        Toast.info(res.msg)
      })
    }
  }
}
// 梯控
export function elevator({ floor, hotelId }) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    request.get(config.api.base + config.api.queryElevatorHost, {
      token: token,
      hotelId: hotelId,
    })
      .then(res => {
        if (res.success) {
          dispatch(dataSuccess({ elevatorList: res.dataObject }))
        }
      })

  }
}

export function smartHostControl(info, cb) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    request.get(config.api.base + config.api.smartHostControl, {
      token: token,
      ...info,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
    })
      .then(res => {
        if (res && res.success) {
          return cb ? cb() : null

        }
      })
  }
}
// export function source() {
//   return (dispatch, getState) => {
//     request.get(config.api.base + config.api.powerControl, {
//       hostId: sessionStorage.getItem('powerHostId'),
//       action: 'jdqon'
//     })
//       .then(res => {

//         if (res && res.success) {
//           Toast.info('断电成功')
//           setTimeout(() => {
//             hashHistory.goBack()
//           }, 2000)
//         }
//       })
//   }
// }
