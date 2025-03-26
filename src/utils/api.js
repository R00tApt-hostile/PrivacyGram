import axios from 'axios'
import { secureStorage } from './encryption'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

// Add auth token to requests
api.interceptors.request.use(config => {
  const tokenData = secureStorage.getItem('instagram_token')
  if (tokenData) {
    config.headers.Authorization = `Bearer ${tokenData.access_token}`
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired - trigger logout
      window.location.href = '/logout'
    }
    return Promise.reject(error)
  }
)

export const fetchUserMedia = (userId) => 
  api.get(`/media/${userId}?fields=id,caption,media_type,media_url,timestamp`)

export const searchUsers = (username) =>
  api.get(`/users/search?q=${username}`)
