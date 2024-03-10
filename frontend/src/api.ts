import axios from 'axios'

const http = axios.create({ baseURL: 'http://localhost:3000' })
http.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
  config.headers['Content-Type'] = 'application/json'
  return config
}, err => Promise.reject(err))
http.interceptors.response.use(res => res, err => {
  return Promise.reject(err.response ? err.response.data : { statusCode: 500, message: err.message })
})

interface SignIn {
  username: string
  password: string
}

interface SignUp {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  phone: string
}

export const apiSignIn = async (body: SignIn): Promise<{ data: any, err: any }> => {
  try {
    const { data } = await http.post('/auth/login', body)
    return { data, err: null }
  } catch (err) {
    return { data: null, err }
  }
}

export const apiSignUp = async (body: SignUp): Promise<{ data: any, err: any }> => {
  try {
    const { data } = await http.post('/auth/register', body)
    return { data, err: null }
  } catch (err) {
    return { data: null, err }
  }
}

export const apiGetProfile = async (): Promise<{ data: any, err: any }> => {
  try {
    const { data } = await http.get('/auth/profile')
    return { data, err: null }
  } catch (err) {
    return { data: null, err }
  }
}
