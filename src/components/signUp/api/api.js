import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

// params: user:{name:'', password:'',}
// return: resp:{status:'', msg:'', uid:''}
export function signup(data) {
    return axios({
        url: baseURL + '/Users/signup',
        method: 'POST',
        data: data
    })
}

// params: name
// return: isAvailable
export function checkNameAvailable(name) {
    return axios({
        url: baseURL + '/Users/checkNameAvailable?name='+name,
        method: 'GET'
    })
}