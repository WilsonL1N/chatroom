import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

// params: none
// return: resp:[room{roomId:"", isPrivate:"", password: "", name: "", discription:""}]
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

// params: room:{}
// return: 'ok/fail'
export function createRoom(data) {
    return axios({
        url: baseURL + '/rooms/addRoom',
        method: 'POST',
        data: data,
    })
}