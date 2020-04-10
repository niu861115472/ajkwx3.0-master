import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')


export function fetchDevice(info) {
  return async function(dispatch,getState){
    request.get( config.api.queryHeatings, info)
            .then(res => {
                console.log(res)
                if(res.success) {
                    const arr = res.dataObject.map(item => ({
                        ...item, ways: item.ways.filter(way => way.name.indexOf('地暖') > -1)
                    }))
                    dispatch(dataSucess({devices: arr}))
                }
            })
  }
}

export function smartControl(info) {
    return async function(dispatch,getState){
      request.get( config.api.smartHostControl, info)
              .then(res => {
                  console.log(res)
                  if(res.success) {
                  }
              })
    }
  }

export function dataSucess(data) {
    return {
        type: '[temCtrl] DATASUCCESS',
        payload: data
    }
}