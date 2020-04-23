import React, { createContext, useState } from "react";
import albumData from "../json/albums.json";
import meJson from "../json/me.json";

export const StoreContext = createContext();

// Make a Provider
export const StoreProvider = ({ children }) => {  
  const [albums, setAlbums] = useState(albumData.albumList);
  const [me, setMe] = useState(meJson);
  const store = {
    albumsState: [albums, setAlbums],
    meState: [me, setMe],
  };
  return (
   <StoreContext.Provider value={store}>
      {children}
   </StoreContext.Provider>
  );
};

