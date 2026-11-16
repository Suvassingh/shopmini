

import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from 'react'
import GeneralButton from "../components/GeneralButton";
import TextButton from "../components/TextButton";
const SigninScreen = () => {  function signinHandler() {
  console.log("Clicked signup");
}
function forgetPasswordHandler() {
  console.log("forgetPasswordHandler clicked");
}
  return (
    <View style={styles.rootcontainer}>
      <Text style={styles.protext}>ShopMini</Text>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/login.jpg")}
        />
      </View>
      <View>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.signinText}>Sign in to keep shopping</Text>
      </View>
      {/* Email */}

      <View>
        <Text style={styles.labelText}>Email</Text>
        <TextInput style={styles.input} placeholder="example@gmail.com" />
      </View>
      {/* Password */}
      <View>
        <Text style={styles.labelText}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="........"
          inlineImageLeft="search_icon"
        />
      </View>
      <GeneralButton title="Sign in" onPress={signinHandler} />
      <TextButton title="Forgot Password ?" onPress={forgetPasswordHandler} />
      <View style={styles.bottomContainer}>
        <Text style={styles.termsText}>
          By continuing you agree to our Terms
        </Text>
      </View>
    </View>
  );
}

export default SigninScreen

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    margin: 20,
  },
  protext: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "green",
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  signinText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
    marginBottom: 12,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "green",
    marginBottom: 12,
  },
  bottomContainer: {
    marginTop: "auto",
    paddingVertical: 10,
  },
  termsText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
  },
});