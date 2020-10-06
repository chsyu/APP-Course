import React, { useContext } from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StoreContext, StoreProvider } from "./src/stores";
import LoginScreen from "./src/screens/LoginScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

const Stack = createStackNavigator();
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUH6vOCALEXSjYHgv8P9d2y3tKklE44qA",
  authDomain: "f2e2020-bd468.firebaseapp.com",
  databaseURL: "https://f2e2020-bd468.firebaseio.com",
  projectId: "f2e2020-bd468",
  storageBucket: "f2e2020-bd468.appspot.com",
  messagingSenderId: "832044128799",
  appId: "1:832044128799:web:5dedad46efcd2c3253932a",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;
  return isLogin ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerTitleStyle: {
              fontWeight: "400",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitleStyle: {
              fontWeight: "400",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};
