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
      };
    case 'SIGNUP_FAIL':
      return ''
    default:
      return state;
  }
}

const signin = dispatch => async ({email, password}) => {
  const res = await axios.post('http://localhost:3000/signin', {email, password})
  dispatch({ type: 'SIGNIN', payload: res.data })
}

const signup = dispatch => async ({email, password}) => {
  try {
    const res = await tracker.post(`/signup`, {email, password})
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({ type: 'SIGNUP', payload: res.data.token })

    navigate('TrackList');
    
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: error.response.data})
  }
}

const signout = dispatch => async () => {
  dispatch({ type: 'SIGNOUT' })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin },
  { token: '', errorMessage: '' }
)