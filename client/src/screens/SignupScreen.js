import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
import NavLink from '../components/NavLink'
import AuthForm from '../components/AuthForm';


const SignupScreen = () => {
  const { state, signup } = useContext(AuthContext)

  return (
    <View style={ styles.container }>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup} 
      />

      <NavLink 
        title="Already have an account? Sign in instead!" 
        routeName='Signin'
        color={styles.link.color} 
      />
    </View>
  )
}


SignupScreen.navigationOptions = () => {
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

export default SignupScreen
