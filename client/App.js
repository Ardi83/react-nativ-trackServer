import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AccountScreen from './src/screens/AccountScreen'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import { Provider } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'
import { setNavigator } from './src/navigationRef'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import { FontAwesome } from '@expo/vector-icons'

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} />
}


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  })
})

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <Provider>
          <App ref={ (navigation) => { setNavigator(navigation) }} />
        </Provider>
      </LocationProvider>
    </TrackProvider>
  )
}
