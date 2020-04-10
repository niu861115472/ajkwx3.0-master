import { request, config } from '../utlis'

const token_session = sessionStorage.getItem('token')


export function dataSuccess(data) {
  return {
    type: 'ELEVTOR-DATASUCCESS',
    payload: data
  }
}

export function elevator({floor, hotelId}) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    request.get(config.api.queryElevatorHost, {
        token: token,
        hotelId: hotelId,
      })
      .then(res => {
        if (res.success) {
          dispatch(dataSuccess({elevatorList: res.dataObject}))
          dispatch(dataSuccess({elevatorIf: res.dataObject.length === 0 ? false : true}))
        }
      })
  }
}

export function smartHostControl(info,cb) {
  return (dispatch,getState) => {
    const token =  getState().toObject().idStore.token || token_session
    request.get(config.api.smartHostControl, {
              token: token,
              ...info,
              operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
            })
            .then(res => {
              if (res && res.success) {
                return cb?cb():null
              
              }
            })
  }
}