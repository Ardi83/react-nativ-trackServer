import React, { useContext } from 'react'
import { Input } from 'react-native-elements'
import { Button } from 'react-native'
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from './Spacer'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const { state: { name, recording, locations }, 
    startRecording, 
    stopRecording, 
    changeName 
  } = useContext(LocationContext)
  const [saveTrack] = useSaveTrack()
  console.log('name', name, 'location', locations.length )
  return (
    <>
      <Spacer>
        <Input value={name} onChangeText={changeName} placeholder="Enter name" />
      </Spacer>
      <Spacer>
        {
          recording 
          ? <Button color="#f144ff" title="Stop Recording" onPress={stopRecording} />
          : <Button onPress={startRecording} title="Start Recording" />
        }
      </Spacer>
      <Spacer>
        {
          !recording && locations.length 
          ? <Button color="green" title="Save Recording" onPress={saveTrack} />
          : null
        }
      </Spacer>
    </>
  )
}

export default TrackForm
