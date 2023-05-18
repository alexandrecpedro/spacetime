import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.1.83:3333',
})
