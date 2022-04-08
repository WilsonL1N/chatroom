import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

// params: none
// return: res:[room{roomId:"", isPrivate:"", password: "", name: "", discription:""}]
export function getRooms() {
    return axios({
        url: baseURL + '/rooms/getRooms',
        method: 'GET',
    })
}

// params: room:{}
// return: 'ok/fail'
export function enterRoom(data) {
    return axios({
        url: baseURL + '/rooms/enterRoom',
        method: 'POST',
        data: data,
    })
}

// params: roomId
// return: null
export function createRoom(data) {
    return axios({
        url: baseURL + '/rooms/addRoom',
        method: 'POST',
        data: data,
    })
}

export function delRoom(roomId) {
    return axios({
        url: baseURL + '/rooms/delRoom?roomId='+roomId,
        method: 'GET',
    })
}