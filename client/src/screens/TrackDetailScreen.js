import React, { useContext } from 'react'
import { Text, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { Context as TrackContext } from '../context/TrackContext'

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext)
  const _id = navigation.getParam('_id')
  const track = state.find(item => item._id === _id)
  const initialCoords = track.locations[0].coords;
 
  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView 
        style={ styles.map }
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export default TrackDetailScreen