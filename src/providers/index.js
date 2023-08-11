import { createContext } from "react";
import { useProvideAlbum } from "../hooks";

const initialState = {
  albums: [],
  loading: Boolean,
  addDataToAlbum: () => {},
  updateAlbum: () => {},
  removeAlbumFromList: () => {},
};

export const AlbumContext = createContext(initialState);

export const AlbumProvider = ({ children  }) => {
  const album = useProvideAlbum();

  return (
    <AlbumContext.Provider value={album}>{children }</AlbumContext.Provider>
  );
};
