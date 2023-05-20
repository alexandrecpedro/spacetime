import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: `http://${process.env.NEXT_PUBLIC_URL}:3333`,
})
