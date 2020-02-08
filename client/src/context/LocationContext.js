import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { 
        ...state, 
        currentLocation: action.payload,
      }
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [ ...state.locations, action.payload ]
      }
    case 'START_RECORDING':
      return {
        ...state,
        recording: true
      }
    case 'STOP_RECORDING':
      return {
        ...state,
        recording: false
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state;
  }
}

const changeName = dispatch => (name) => {
  dispatch({ type: 'CHANGE_NAME', payload: name })
}

const startRecording = dispatch => () => {
  dispatch({ type: 'START_RECORDING' })
}

const stopRecording = dispatch => () => {
  dispatch({ type: 'STOP_RECORDING' })
}

const addLocation = dispatch => (newLocation, recording) => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: newLocation })
  if (recording) {
    dispatch({ type: 'ADD_LOCATION', payload: newLocation })
  }
}

export const { Provider, Context } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName },
  {recording: false, locations: [], currentLocation: null, name: '' }
)
