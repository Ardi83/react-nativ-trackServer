import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Spacer from './Spacer'
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, title, routeName, color }) => {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(routeName)
      }}
    >
      <Spacer>
        <Text style={{ color: color }}>{title}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

export default withNavigation(NavLink)