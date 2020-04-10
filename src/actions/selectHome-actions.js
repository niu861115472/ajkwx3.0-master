import { request, config } from '../utlis'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'

const customerId_session = sessionStorage.getItem('customerId')

export function initialState(customerId) {
  const _customerId = customerId || customerId_session
  return (dispatch, getState) => {
    request.get(config.api.queryHotelHouses, { customerId: _customerId })
      .then(res => {

        if (res && res.dataObject) {
          console.log(res.dataObject)
          let rooms = res.dataObject.offlineHouse
          // for(const i in res.dataObject) {
          //   rooms = [...rooms, ...res.dataObject[i]]
          // }
          dispatch(initial(rooms))
        }
      })
  }
}

function initial(rooms) {
  return {
    type: 'INTIAL',
    rooms: rooms
  }
}

export function whetherCanOperate(houseName, houseId, id, source, type, floor, hotelId, powerHostId, serverId, houseNo) {
  let roomsType = ''
  if (type === 'recordId') {
    roomsType = 'offline'
  }
  if (type === 'subOrderCode') {
    roomsType = 'online'
  }
  return () => {
    request.get(config.api.whetherCanOperate, { type: roomsType, [type]: id })
      .then((res) => {
        if (res.success) {
          sessionStorage.setItem('hotelId', hotelId)
          sessionStorage.setItem('houseId', houseId)
          sessionStorage.setItem('powerHostId', powerHostId)
          sessionStorage.setItem('serverId', serverId)
          sessionStorage.setItem('houseName', houseName)
          sessionStorage.setItem('source',source)
          hashHistory.push(`home?name=${houseName}&houseId=${houseId}&floor=${floor}&hotelId=${hotelId}&${type}=${id}&serverId=${serverId}&houseNo=${houseNo}`)
        } else {
          Toast.info(res.msg, 2);
        }
      })
  }

}
