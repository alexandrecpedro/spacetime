import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: `http://${process.env.URL}:3333`,
})
