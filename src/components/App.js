import React from "react";

import Album from "./Album";
import { useAlbum } from "../hooks";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  const data = useAlbum();
  const [albums, setAlbums] = useState([]);
  const [text, setText] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  // console.log(data.albums);

  useEffect(() => {
    setAlbums(data.albums);
  });

  const handleAddToalbum = async () => {
    if (text.length <= 1) {
      return toast.error("Please fill the album name to add");
    }
    const userId = 101;
    const title = text;
    const response = await data.addDataToAlbum(userId, title);
    console.log(response);
    if (response) {
      toast.success("album created...");
    } else {
      toast.error("please try again");
    }
  };
  if (data.loading) {
    return <h1 className="loading">loading....</h1>;
  }

  return (
    <>
      <div className="app-wrapper">
        <h1 className="heading">Album List App</h1>
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <img
            onClick={handleAddToalbum}
            src="https://cdn-icons-png.flaticon.com/128/7625/7625498.png"
            alt="add"
          />
        </div>
        <div className="AppContainer">
          {/* {console.log(albums)} */}
          {data.albums.map((album, i) => {
            return <Album album={album} data={data} key={`album${i}`} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
