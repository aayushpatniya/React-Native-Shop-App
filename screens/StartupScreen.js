import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import React, { useEffect } from 'react';
import Colors from '../constants/Colors';

const StartupScreen = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedUserData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedUserData;
      if (new Date(expiryDate) <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Shop");
      // console.log('userData',token, userId)
      const expirationTime = new Date(expiryDate).getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors}></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default StartupScreen;