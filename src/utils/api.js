/** 
 * 项目所有请求接口
 * Created by aerfa on 2018/8/9.
 */
import {post} from './axios.js'

/**
 * 获取房间列表
 */
export function roomListRequest(data){
    return post('/waterAmmeterFee/roomList',data);
}

/**
 * 获取单元列表
 */
export function cellListRequest(data){
    return post('/waterAmmeterFee/cellList',data);
}

/**
 * 获取房间费用数
 */
export function roomWatchNumberRequest(data){
    return post('/waterAmmeterFee/roomWatchNumber',data);
}

/**
 * 保存抄表数
 */
export function saveRoomWatchNumberRequest(data){
    return post('/waterAmmeterFee/saveRoomWatchNumber',data);
}

/**
 * 楼号列表
 */
export function getTowerListRequest(data){
    return post('/openLockDevice/getTowerList',data);
}

/**
 * 单元列表
 */
export function getCellListRequest(data){
    return post('/openLockDevice/getCellList',data);
}