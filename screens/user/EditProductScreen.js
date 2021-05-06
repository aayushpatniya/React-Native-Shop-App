//Edit user Product screen
import React, { useState, useReducer, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "react-navigation-stack";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DefaultText from "../../components/UI/DefaultText";
import * as productActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
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
      formIsValid:updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
}

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  let product;
  if (productId) {
    product = useSelector(state => state.products.userProducts.find(item => item.id === productId));
  }
  
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Warning', error, [{ text: 'Okay' }]);
    }
  },[error]);

  const [formState, dispatchFormState]=useReducer(formReducer, {
    inputValues: {
      title: productId ? product.title : '',
      price: '',
      description: productId ? product.description : '',
      imageUrl: productId ? product.imageUrl : '',
    },
    inputValidities: {
      title: productId ? true : false,
      price: productId ? true : false,
      description: productId ? true : false,
      imageUrl: productId ? true : false,
    },
    formIsValid: productId ? true : false,
  });

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatchFormState]);

  //submit button handler on form
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Warning!!", "Please enter the correct details.", [
        { text: "Okay", type: "default" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (productId) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
        ToastAndroid.show("Item Updated!", ToastAndroid.SHORT);
      } else {
        await dispatch(
          productActions.addProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            +formState.inputValues.price,
            formState.inputValues.imageUrl
          )
        );
        ToastAndroid.show("Item Added!", ToastAndroid.SHORT);
      }
      props.navigation.goBack();
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submitFn: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.form}>
          <Input
            id="title"
            autocorrect
            required
            autoCapitalize="sentences"
            returnKeyType="next"
            label="Title"
            errorText="Please enter a valid title"
            onInputChange={inputChangeHandler}
            initialValue={productId ? product.title : ""}
            initiallyValid={!!productId}
          ></Input>

          <Input
            id="description"
            autocorrect
            required
            minLength={5}
            autoCapitalize="sentences"
            returnKeyType="next"
            multiline
            numberOfLines={3}
            label="Description"
            errorText="Please enter a valid description"
            onInputChange={inputChangeHandler}
            initialValue={productId ? product.description : ""}
            initiallyValid={!!productId}
          ></Input>

          <Input
            id="imageUrl"
            autocorrect
            required
            autoCapitalize="sentences"
            returnKeyType="next"
            label="Image Url"
            errorText="Please enter a valid Image Url"
            onInputChange={inputChangeHandler}
            initialValue={productId ? product.imageUrl : ""}
            initiallyValid={!!productId}
          ></Input>

          {productId ? null : (
            <Input
              id="price"
              autocorrect
              required
              min={0.1}
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType="decimal-pad"
              label="Price"
              errorText="Please enter a valid price"
              onInputChange={inputChangeHandler}
            ></Input>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

//Navigation Options
EditProductScreen.navigationOptions = (navData) => {
  const productId = navData.navigation.getParam('productId');
  const submitFn = navData.navigation.getParam("submitFn");
  return {
    headerTitle: productId? "Edit Product":"Add Product",
    headerRight: () => (
      <View style={styles.headerButtonContainer}>
        <TouchableOpacity onPress={submitFn}>
          <View>
            <Ionicons name="md-checkmark" size={26} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    )
  };
};

//Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 1,
  },
  form:{
    padding:10,
  },
  input:{
    borderBottomColor: '#ababab',
    borderBottomWidth: 1,
    width:'100%',
    fontSize:17,
  },
  formControl:{
    width: '100%',
    marginVertical: 10,
  },
  label:{
    fontFamily: 'open-sans-bold',
    fontSize:17,
  },
  headerButtonContainer: {
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center",
  }
});

export default EditProductScreen;
