import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

// params: user:{name:'', password:'',}
// return: resp:{status:'', msg:'', uid:''}
export function login(data) {
    return axios({
      url: baseURL + '/Users/login',
      method: 'POST',
      data: data
    })
  }
