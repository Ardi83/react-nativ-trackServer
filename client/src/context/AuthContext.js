import { AsyncStorage } from 'react-native'
import tracker from '../api/tracker'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'SIGNIN':
    case 'SIGNUP':
      return {
        errorMessage: '',
        token: action.payload
      }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: '' }
    case 'SIGNOUT':
      return { token: '', errorMessage: '' }
    default:
      return state;
  }
}

const signin = dispatch => async ({email, password}) => {
  try {
    const res = await tracker.post('/signin', {email, password})
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({ type: 'SIGNIN', payload: res.data.token })
    
    navigate('TrackList')
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: error.response.data })
  }
}

const signup = dispatch => async ({email, password}) => {
  try {
    const res = await tracker.post(`/signup`, {email, password})
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({ type: 'SIGNUP', payload: res.data.token })

    navigate('TrackList');
    
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: error.response.data})
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'SIGNIN', payload: token })
    navigate('TrackList')
  } else {
    navigate('Signin')
  }
}

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({ type: 'SIGNOUT' })
  navigate('loginFlow')
}

export const  { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, clearErrorMessage, tryLocalSignin, signout },
  { token: '', errorMessage: '' }
)