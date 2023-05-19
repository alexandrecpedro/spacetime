import axios from 'axios'
import 'dotenv/config'

export const api = axios.create({
  // baseURL: 'http://192.168.1.83:3333',
  baseURL: `http://${process.env.URL}:3333`,
})
