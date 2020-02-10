import { useContext } from "react";
import { Context as TrackContext } from '../context/TrackContext'
import { Context as LocationContext } from '../context/LocationContext'
import { navigate } from '../navigationRef'

export default () => {
  const { createTrack } = useContext(TrackContext)
  const { state: { locations, name }, reset } = useContext(LocationContext)

  const saveTrack = async () => {
    let newName;
    if (!name) { newName = 'Unknown' } else { newName = name }
    if (locations.length > 2) {
      await createTrack(newName, locations)
      navigate('TrackList')
    }
    reset()
  }

  return [saveTrack]
}