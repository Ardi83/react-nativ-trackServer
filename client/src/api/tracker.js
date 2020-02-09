import axios from 'axios'
import { AsyncStorage } from 'react-native'

const instance = axios.create({
  baseURL: 'http://192.168.0.9:3434'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance;