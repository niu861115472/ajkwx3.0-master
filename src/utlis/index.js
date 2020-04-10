import {_} from 'lodash'
import queryString from 'query-string'
import 'whatwg-fetch'
import 'es6-promise'
import { Toast } from 'antd-mobile'

export function encode64(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/=";
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}

export function decode64 (input) {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = _utf8_decode(output);
  return output;
}

function _utf8_decode (utftext) {
  var string = "";
  var i = 0;
  var c = 0, c1 = 0, c2 = 0,c3=0
  while ( i < utftext.length ) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}

//api配置

 export const config = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'http://demo.live-ctrl.com/aijukex/', // http://47.100.123.83/aijukex http://www.live-ctrl.com/aijukex
    // base1:'http://192.168.0.32:8888/aijukex/',
    websocketA: 'www.live-ctrl.com/aijukex',
    websocketB: 'plt.live-ctrl.com/aijukex',
    wzjwHouseInfo: 'op/op_queryHotelHouseInfo',
    getLoginCode: 'we/we_generatePassword',
    login: 'we/we_loginx',
    queryHotelHouses: 'we/we_queryHotelHouses', //获取房间
    queryHostDeviceByType:"we/we_queryHostDeviceByType",//主机信息
    queryHostScenes:"we/we_queryHostScenes",
    queryLightsStatus: "we/we_queryLightsStatus",
    smartHostControl:"we/we_smartHostControl",//控制
    querySmartDeviceWays:"we/we_querySmartDeviceWays",//获取路数信息
    queryDeviceType:"we/we_queryDeviceType",//获取设备类型
    queryTvDevices:"we/we_queryTvDevices", //获取电视信息
    modifyWaysStatus:"we/we_modifyWaysStatus", //上传灯的状态
    queryCurtains: "we/we_queryCurtains", // 获取窗帘数据
    whetherCanOperate: 'we/we_whetherCanOperate',  // 验证房间是否可以入住
    queryElevatorHost: 'we/we_queryElevatorHost',
    queryEnvDatas: 'we/we_queryEnvDatas', // 获取房间环境
    powerControl: 'we/we_powerControl',
    checkout: 'we/we_customerLeave',
    getTvAirStatus: 'we/we_queryTvAirStatus', // 获取设备状态
    queryHeatings: 'we/we_queryHeatings',  // 地暖设备 
    getHostDevices:'op/rcu_getHostDevices', //获取RCU设备
    deviceControl:'op/rcu_deviceControl', //新RCU设备kong控制
    gethotelScence:'op/rcu_rcuSmartHostSceneList', //获取新RCU情景
    scenceControl:'op/rcu_senseControl'  //新rcu情景控制
  }
}

export const config_wz = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'https://plt.live-ctrl.com/wzj/', // http://47.100.123.83/aijukex http://www.live-ctrl.com/aijukex
    websocketA: 'www.live-ctrl.com/wzj',
    websocketB: 'plt.live-ctrl.com/wzj',
    wzjwHouseInfo: 'op/op_queryHotelHouseInfo',
    getLoginCode: 'we/we_generatePassword',
    login: 'we/we_loginx',
    queryHotelHouses: 'we/we_queryHotelHouses', //获取房间
    queryHostDeviceByType:"we/we_queryHostDeviceByType",//主机信息
    queryHostScenes:"we/we_queryHostScenes",
    queryLightsStatus: "we/we_queryLightsStatus",
    smartHostControl:"we/we_smartHostControl",//控制
    querySmartDeviceWays:"we/we_querySmartDeviceWays",//获取路数信息
    queryDeviceType:"we/we_queryDeviceType",//获取设备类型
    queryTvDevices:"we/we_queryTvDevices", //获取电视信息
    modifyWaysStatus:"we/we_modifyWaysStatus", //上传灯的状态
    queryCurtains: "we/we_queryCurtains", // 获取窗帘数据
    whetherCanOperate: 'we/we_whetherCanOperate',  // 验证房间是否可以入住
    queryElevatorHost: 'we/we_queryElevatorHost',
    queryEnvDatas: 'we/we_queryEnvDatas', // 获取房间环境
    powerControl: 'we/we_powerControl',
    checkout: 'we/we_customerLeave',
    getTvAirStatus: 'we/we_queryTvAirStatus', // 获取设备状态
    queryHeatings: 'we/we_queryHeatings',  // 地暖设备 
  }
}
//get/post请求
export const request = {
  get(url,params) {
    const _config = window.LOGIN_IF ? config : config_wz
    if(params) {
      url = _config.api.base + url +  '?' + queryString.stringify(params)
    }
    return fetch(url)
    .then((res)=>res.json())
    .then(res => {
      if(res.success) {
        return res
      } else {
        if(res.msg) {
          Toast.info(res.msg)
        }
      }
      return res
    })
  },
  post(url,body){
    const options = _.extend(config.header,{
      body: JSON.stringify(body)
    })
    return fetch(url,options)
      .then(res=>res.json())
  }
}

export const requestLocal = {
  get(url,params) {
    const _config = window.LOGIN_IF ? config : config_wz
    if(params) {
      url = _config.api.base1 + url +  '?' + queryString.stringify(params)
    }
    return fetch(url)
    .then((res)=>res.json())
    .then(res => {
      if(res.success) {
        return res
      } else {
        if(res.msg) {
          Toast.info(res.msg)
        }
      }
      return res
    })
  },
  post(url,body){
    const options = _.extend(config.header,{
      body: JSON.stringify(body)
    })
    return fetch(url,options)
      .then(res=>res.json())
  }
}

//判断象限
export function quadrant(x,x0,y,y0){
  if (x<=x0 && y<=y0) {
    return 3
  }
  if (x<x0 && y>y0) {
    return 4
  }
  if(x>x0 && y<y0) {
    return 2
  }
  if(x>=x0 && y>=y0) {
    return 1
  }
}

//根据数字转化成数组
export function numToarray(num) {
  const arry = []
  for (var i = num - 1; i >= 0; i--) {
    arry[i]=1
  }
  return arry
}

export function getParam(url, name) {
  const _index = url.indexOf('#')
  const _url = _index>-1 ?  url.slice(0, _index) : url
  let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
  let r = _url.match(reg);
  if (r !== null) {
      return decodeURIComponent(r[2]);
  }
  return null;
}


