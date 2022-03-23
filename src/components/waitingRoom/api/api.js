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