import React from "react";
import { Provider } from "react-redux";
import Screen from "./src/screens/Screen";
import store from "./src/redux/store";

// Wrap whole screen in a provider, and send store to it
const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
