import React from "react";
import { useState } from "react";
import { useAlbum } from "../hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Album({ album }) {
  //   const [isTextEditable, setIsTextEditable] = useState(false);
  const data = useAlbum();
  const [title, setTitle] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const

  //   console.log(album);
  useEffect(() => {
    // console.log(album.title);
    setTitle(album.title);
  }, []);

  async function handleUpdateAlbum() {
    setIsLoading(true);
    const { userId, id } = album;
    console.log(userId, id, title);
    const response = await data.updateAlbum(id, title, userId);
    setIsEditable(false);
    if (response) {
      toast.success("Album Updated successfull...");
    } else {
      toast.error("Album Updated successfull...");
    }
    setIsLoading(false);
  }

  return (
    <div className="album-wrapper">
      <div className="left-component">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefd4wuCqY4KZvFm_7LoBAVWucDkLjvODedA&usqp=CAU"
          alt="image"
        />
      </div>
      <div className="right-component">
        <div className="top-body">
          <span className="title"> Title : </span>
          {isEditable ? (
            <input
              type="text"
              value={isLoading ? "Please wait..." : title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <span> {title} </span>
          )}
        </div>
        <div className="bottom-body">
          {isEditable ? (
            <button
              onClick={() => {
                handleUpdateAlbum();
              }}
            >
              Update{" "}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditable(!isEditable);
                console.log(title);
              }}
            >
              Edit
            </button>
          )}

          <button
            onClick={async () => {
              await data.removeAlbumFromList(album);
              toast.success("removed success full...");
            }}
          >
            Remove{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Album;
