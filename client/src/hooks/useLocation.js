import { useState, useEffect } from 'react'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (shouldTrack, callback) => {
  const [error, setError] = useState('')

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        const res = await requestPermissionsAsync();
        if (res.status === 'denied') {
          return setError('Please enable location services')
        }
        if (res.status === 'granted' && res.granted) {
          subscriber = await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
            }, 
            callback
          )
        }
      } catch (err) {
        setError('Please enable location services')
      }
    }
    if (shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [error];
}