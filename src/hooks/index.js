import { useContext } from "react";
import { AlbumContext } from "../providers";
import { useState } from "react";
import { useEffect } from "react";
import { getAlbums, addAlbum, removeAlbum, updatedAlbum } from "../api";

export const useAlbum = () => {
  return useContext(AlbumContext);
};

export const useProvideAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getAlbums();
      if (data) {
        setAlbums(data);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const addDataToAlbum = async (userId, title) => {
    setLoading(true);
    const response = await addAlbum(userId, title);

    if (response) {
      setAlbums([response, ...albums]);
    }
    setLoading(false);
    return response;
  };

  const updateAlbum = async (id, title, userId) => {
    const data = await updatedAlbum(id, title, userId);
    const updatedValue = albums.map((val) => {
      if (val.id === id) {
        val = data;
      }

      return val;
    });

    setAlbums([...updatedValue]);
    return data;
  };

  const removeAlbumFromList = async (album) => {
    setLoading(true);
    await removeAlbum(album);
    const updatedData = albums.filter((val) => val.id !== album.id);
    setAlbums([...updatedData]);
    setLoading(false);
  };

  return {
    albums,
    loading,
    addDataToAlbum,
    updateAlbum,
    removeAlbumFromList,
  };
};
