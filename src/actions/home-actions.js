import {request, config } from '../utlis'

const token_session = sessionStorage.getItem('token')

export const DATASUCCESS = '[HOME] DATASUCCESS'

export function saveEnvir(envir) {
  return {
    type: 'SAVEENVIR',
    envir: envir
  }
}

export function saveHouseId(houseId) {
  sessionStorage.setItem('houseId', window.btoa(houseId))
  return {
    type: 'SAVEHOUSEID',
    houseId: window.btoa(houseId)
  }
}

export function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}

export function wzjwHouseInfo(info) {
    return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    request.get(config.api.wzjwHouseInfo, {
      ...info,
      key: 'WkROV05tRkhWblZoYld4c1RGZEdjR0Z1Vm5KYVV6RnlXbGhyUFE9PQ==',
      token: token
    })
      .then(res => {
        if(res&&res.success){
          dispatch(dataSuccess({wzjHouseInfo: res.dataObject}))
        } else {
          dispatch(dataSuccess({wzjNoAthority: false}))
        }
    })

  }
}
