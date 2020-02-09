// import '../_mockLocations'
import React, { useContext, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import useLocation from '../hooks/useLocation'
import { Context as locationContext } from '../context/LocationContext'
import Map from '../components/Map'

import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(locationContext)
  const callback = useCallback( (location) => {
    addLocation(location, recording)
  }, [recording] )

  const [error] = useLocation(isFocused || recording, callback)
  
  return (
    <SafeAreaView forceInset={{ top: 'always' }} >
      <Text h2>Create a Track</Text>
      <Map />
      {error ? <Text>{console.log(error)}</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen)
