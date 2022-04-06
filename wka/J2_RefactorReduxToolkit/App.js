import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";

// Wrap whole screen in a provider
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
