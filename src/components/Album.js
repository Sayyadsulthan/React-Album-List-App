import React from "react";
import { useState } from "react";
import { useAlbum } from "../hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Album({ album }) {
  const data = useAlbum();
  const [title, setTitle] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(album.title);
  }, []);

  async function handleUpdateAlbum() {
    if (title.length <= 1) {
      toast.error("empty name cannot be update...");
      return;
    }
    setIsLoading(true);
    const { userId, id } = album;
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
              className="edit"
              onClick={() => {
                setIsEditable(!isEditable);
              }}
            >
              Edit
            </button>
          )}

          <button
            className="remove"
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
