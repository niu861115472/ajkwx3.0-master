import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'SCENE';
// const source = sessionStorage.getItem('source')

export function initialModel(serverId) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    if (sessionStorage.getItem('source') == '1') {
      request.get(config.api.queryHostScenes, { houseId: houseId, token: token })
        .then(res => {
          dispatch(initialState(res.dataObject))
        })
    } else {
      request.get(config.api.gethotelScence, { serverId: serverId, pageNo: 1, pageSize: 15 })
        .then(res => {
          dispatch(initialState(res.result))
        })
    }
  };
}
function initialState(data) {
  return {
    type: 'INITIALSTATE',
    data: data
  };
}

export function changeModel(scenceId, cb,roomId) {
  return (dispatch, getState) => {
    const token = getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    if(sessionStorage.getItem('source') == '1'){
    request.get(config.api.smartHostControl, {
      token: token,
      houseId: houseId,
      sceneId: scenceId,
      deviceType: deviceType,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
    })
      .then(res => {
        if (res.success) {
          if (cb) cb()
        }
      })
    }else{
      request.get(config.api.scenceControl,{roomId:roomId,sceneId:scenceId})
    }
  }
}
