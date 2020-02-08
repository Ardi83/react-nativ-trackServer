import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import NavLink from '../components/NavLink'
import AuthForm from '../components/AuthForm';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext)

  return (
    <View style={ styles.container }>
      <NavigationEvents 
        onWillBlur={clearErrorMessage}
      />
      <AuthForm
        headerText="Sign In for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin} 
      />

      <NavLink
        title="Don't have an account? Go back to sign up." 
        routeName='Signup'
        color={styles.link.color}
      />
    </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .7,
    justifyContent: 'center'
  },
  link: {
    color: 'blue'
  }
})

export default SigninScreen
