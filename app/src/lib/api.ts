import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const setAuth = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default api
