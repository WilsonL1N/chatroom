import axios from 'axios'
import baseURL from '@/assets/js/baseURL_config'

export function signin(data) {
    return axios({
      url: baseURL + '/signin',
      method: 'POST',
      data: data
    })
  }
