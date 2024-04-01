import React from "react";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/Homescreen";
import store from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
