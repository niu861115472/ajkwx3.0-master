import { request,requestLocal, config } from '../utlis'
let deviceType
var serverId
const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const houseName_session = sessionStorage.getItem('houseName')
// const source = sessionStorage.getItem('source')
export function initialAirCondition(serverId,roomId) {
    return async function (dispatch, getState) {

        const token = getState().toObject().idStore.token || token_session
        const houseId = getState().toObject().idStore.houseId || houseId_session
        const houseName = getState().toObject().idStore.houseName || houseName_session
        console.log(sessionStorage.getItem('houseName'), houseId, token)
        const response = await request.get(config.api.queryDeviceType, { token: token, deviceName: encodeURI('空调'), houseId: houseId })

        if (response && response.success) {
            deviceType = response.dataObject
            if (response.dataObject == undefined) {
                deviceType = 'VIRTUAL_CENTRAL_AIR_REMOTE'
            }
            dispatch(initialData(deviceType, 'deviceType'))
            if (sessionStorage.getItem('source') == '1') {
                var airData = await request.get(config.api.queryHostDeviceByType, { token: token, houseId: houseId, deviceType: deviceType, houseNo: sessionStorage.getItem('houseName') })
            }else{
                var airData = await request.get(config.api.getHostDevices,{roomId:roomId,type:'AIR-CONDITIONER'})
            }
            if (airData && airData.success) {
                let airs = []
                
                
                if (deviceType === 'VIRTUAL_AIR_REMOTE' && sessionStorage.getItem('source') == '1') {
                    var serverId = airData.dataObject.serverId
                    sessionStorage.setItem('serverId', airData.dataObject.serverId)
                    const data = airData.dataObject.devices
                    for (let i = 0; i < data.length; i++) {
                        let air = data[i]

                        const switchStatus = await getTvAirStatus(serverId, air.deviceId)

                        let airInfo = {},
                            coolWays, warmWays

                        airInfo.switchStatus = switchStatus
                        if (air.ways) {
                            let coolName = ''
                            let warmName = ''
                            coolWays = air.ways.filter(way => {
                                if (way.remoteKey.indexOf('COOL') > -1) {
                                    return way;
                                } else {
                                    return null
                                }
                            }).map(way => {
                                coolName = way.remoteKey.slice(0, -2)
                                // console.log(coolName)
                                return way.remoteKey.slice(-2);
                            }).sort((a, b) => a - b).map(way => coolName + way)
                            warmWays = air.ways.filter(way => {
                                if (way.remoteKey.indexOf('WARM') > -1) {
                                    return way;
                                } else {
                                    return null
                                }
                            }).map(way => {
                                warmName = way.remoteKey.slice(0, -2)
                                return way.remoteKey.slice(-2);
                            }).sort((a, b) => a - b).map(way => warmName + way);
                        }
                        const arry = new Set(coolWays);
                        coolWays = Array.from(arry)
                        const arry1 = new Set(warmWays);
                        warmWays = Array.from(arry1)
                        airInfo.deviceId = air.deviceId
                        airInfo.coolWays = coolWays
                        airInfo.warmWays = warmWays
                        airInfo.name = air.name

                        airs.push(airInfo)
                    }

                } else if(sessionStorage.getItem('source') == '1'){
                    var serverId = airData.dataObject.serverId
                    sessionStorage.setItem('serverId', airData.dataObject.serverId)
                    const data = airData.dataObject.devices
                    for (let i = 0; i < data.length; i++) {
                        let air = data[i]
                        const switchStatus = await getTvAirStatus(serverId, air.deviceId)
                        let airInfo = {},
                            coolWays, warmWays
                        coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        warmWays = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        airInfo.switchStatus = switchStatus
                        airInfo.deviceId = air.deviceId
                        airInfo.coolWays = coolWays
                        airInfo.warmWays = warmWays
                        airInfo.name = air.name

                        airs.push(airInfo)
                    }
                }else{
                     const data = airData.result
                     for (let i = 0; i < data.length; i++) {
                        let air = data[i]
                        // const switchStatus = await getTvAirStatus(serverId, air.deviceId)
                        let airInfo = {},
                            coolWays, warmWays
                        coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        warmWays = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        // airInfo.switchStatus = switchStatus
                        airInfo.deviceId = air.deviceId
                        airInfo.coolWays = coolWays
                        airInfo.warmWays = warmWays
                        airInfo.name = air.name

                        airs.push(airInfo)
                    }
                }
                dispatch(initialData(airs, 'airs'))
            }
        }

    };
}

// 获取 空调 状态
function getTvAirStatus(serverId, deviceId) {
    return request.get(config.api.getTvAirStatus, {
        serverId: serverId,
        deviceId: deviceId,
    })
        .then(res => {
            return res.dataObject
        })

}

function initialData(airs, style) {
    return {
        type: 'INTIALDATA',
        style: style,
        data: airs
    }
}
//普通空调温度变化
export function changeTem(key, deviceId) {
    return function (dispatch, getState) {
        const token = getState().toObject().idStore.token || token_session
        const houseId = getState().toObject().idStore.houseId || houseId_session
        request.get(config.api.smartHostControl, {
            houseId: houseId,
            deviceType: deviceType,
            token: token,
            deviceId: deviceId,
            serverId: sessionStorage.getItem('serverId'),
            key: key,
            operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
        })
            .then(res => {

            })
    }
}
//中央空调温度变化

export function centerchangeTem(key, deviceId, model, speed,op,val) {
    const mode = model === 'cold' ? 'COOL' : 'WARM'

    return function (dispatch, getState) {
        const token = getState().toObject().idStore.token || token_session
        const houseId = getState().toObject().idStore.houseId || houseId_session
        const houseName = getState().toObject().idStore.houseName || houseName_session
        if(sessionStorage.getItem('source') == '1'){
        request.get(config.api.smartHostControl, {
            houseId: houseId,
            deviceType: deviceType,
            token: token,
            deviceId: deviceId,
            serverId: sessionStorage.getItem('serverId'),
            mode: mode,
            temp: key,
            wind: speed,
            houseNo: sessionStorage.getItem('houseName'),
            operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
        })
            .then(res => {

            })
        }else{
            request.get(config.api.deviceControl,{deviceId:deviceId,type:'AIR-CONDITIONER',op:op,val:val})
            .then(res =>{

            })
        }
    }
}
//开关空调
export function airswitch(key, deviceId,val) {
    let data
    return function (dispatch, getState) {
        const token = getState().toObject().idStore.token || token_session
        const houseId = getState().toObject().idStore.houseId || houseId_session
        const houseName = getState().toObject().idStore.houseName || houseName_session
        if (deviceType === 'VIRTUAL_AIR_REMOTE') {
            data = {
                houseId: houseId,
                deviceType: deviceType,
                token: token,
                deviceId: deviceId,
                serverId: sessionStorage.getItem('serverId'),
                key: key
            }
        }
        if (deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE') {
            if (key === 'OFF') {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    token: token,
                    deviceId: deviceId,
                    serverId: sessionStorage.getItem('lwServerId'),
                    onOff: "OFF",
                    mode: 'COOL',
                    wind: 0,
                    temp: 25,
                    houseNo: sessionStorage.getItem('houseName')
                }
            } else {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    token: token,
                    deviceId: deviceId,
                    serverId: sessionStorage.getItem('lwServerId'),
                    mode: 'COOL',
                    temp: key,
                    wind: 0,
                    houseNo: sessionStorage.getItem('houseName')
                }
            }
        }
        if(sessionStorage.getItem('source') == '1'){
            request.get(config.api.smartHostControl, { ...data, operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ==' })
            .then(res => {

            })
        }else{
            request.get(config.api.deviceControl,{deviceId:deviceId,type:'AIR-CONDITIONER',op:'switch',val:val})
            .then(res =>{

            })
        }
        
    }
}