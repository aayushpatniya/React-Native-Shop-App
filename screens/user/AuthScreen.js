import React, {useReducer, useCallback, useState, useEffect} from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch} from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("Warning", error, [{ text: "Okay!" }]);
    }
  }, error)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      emaal: '',
      password:''
    },
    inputValidities: {
      email: false,
      password:false,
    },
    formIsValid: false,
  });
  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    setError(null);
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    }
    else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    }
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    }
    catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient style={styles.gradient} colors={["#ffedff", "#ffe3ff"]}>
        <Card style={styles.authContainer}>
          <Input
            id="email"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            errorText="Please Enter a valid email address"
            email
            required
            onInputChange={inputChangeHandler}
            initialValue=""
          ></Input>
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            autoCapitalize="none"
            errorText="Please Enter a valid password"
            secureTextEntry
            required
            onInputChange={inputChangeHandler}
            initialValue=""
          ></Input>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} size="large"></ActivityIndicator>
            ) : (
              <Button
                color={Colors.primary}
                title={isSignup ? "Sign Up" : "Login"}
                onPress={authHandler}
              ></Button>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color={Colors.accent}
              title={`Switch to ${!isSignup ? "SignUp" : "Login"}`}
              onPress={() => setIsSignup((prev) => !prev)}
            ></Button>
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    padding: 15,
    width: "80%",
  },
  buttonContainer: {
    marginVertical: 4,
  },
});

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

export default AuthScreen;
