import { useState, useEffect } from 'react'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (shouldTrack, callback) => {
  const [error, setError] = useState('')
  const [subscriber, setSubscriber] = useState(null)

  const startWatching = async () => {
    try {
      const res = await requestPermissionsAsync();
      if (res.status === 'denied') {
        return setError('Please enable location services')
      }
      if (res.status === 'granted' && res.granted) {
        const sub = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
          }, 
          callback
        )
        setSubscriber(sub)
      }
    } catch (err) {
      setError('Please enable location services')
    }
  }

  useEffect(() => {
    if (shouldTrack) {
      startWatching()
    } else {
      subscriber.remove()
      setSubscriber(null)
    }
  }, [shouldTrack])

  return [error];
}