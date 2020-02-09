import React, { useContext } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context as locationContext } from '../context/LocationContext'

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(locationContext)

  
  if (!currentLocation) { 
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />
  }
  
  // console.log(locations)
  return <MapView 
    style={styles.map}
    initialRegion={{
      ...currentLocation.coords,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004
    }}
    // region={{
    //   ...currentLocation.coords,
    //   latitudeDelta: 0.003,
    //   longitudeDelta: 0.003
    // }}
  >
    <Circle 
      center={currentLocation.coords}
      radius={12}
      strokeColor="rgba(158, 158, 255, 1.0)"
      fillColor="rgba(158, 158, 255, .6)"
    />
    <Polyline coordinates={locations.map(loc => loc.coords)} />
  </MapView>

}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export default Map
