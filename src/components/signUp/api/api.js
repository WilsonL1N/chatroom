import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

export function signup(data) {
    return axios({
        url: baseURL + '/signup',
        method: 'POST',
        data: data
    })
}

export function checkDuplicated(data) {
    return axios({
        url: baseURL + '/checkDuplicated',
        method: 'GET',
        data: data
    })
}