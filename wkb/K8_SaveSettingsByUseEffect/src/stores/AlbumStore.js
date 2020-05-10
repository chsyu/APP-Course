import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import albumData from "../json/albums.json";
import meJson from "../json/me.json";
const ME_PERSISTENCE_KEY = "ME_PERSISTENCE_KEY";
const HAS_SET_KEY = "HAS_SET_KEY";

export const StoreContext = createContext();

// Make a Provider
export const StoreProvider = ({ children }) => {
  const [albums, setAlbums] = useState(albumData.albumList);
  const [me, setMe] = useState(meJson);
  const store = {
    albumsState: [albums, setAlbums],
    meState: [me, setMe],
  };

  const restoreState = async () => {
    try {
      const hasSetString = await AsyncStorage.getItem(HAS_SET_KEY);
      const hasSet = JSON.parse(hasSetString);
      if (hasSet) {
        const meString = await AsyncStorage.getItem(ME_PERSISTENCE_KEY);
        const state_me = JSON.parse(meString);
        setMe(state_me);
      }
    } catch (e) {}
  };

  useEffect(() => {
    restoreState();
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
