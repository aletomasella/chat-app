import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chat.module.css";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className={styles.joinOuterContainer}>
        <div className={styles.joinInnerContainer}>
          <h1 className={styles.heading}>Join</h1>
          <div>
            {" "}
            <input
              type="text"
              placeholder="Name"
              className={styles.joinInput}
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </div>
          <div>
            {" "}
            <input
              type="text"
              placeholder="Room"
              className={styles.joinInput}
              onChange={(e) => setRoom(e.target.value)}
            />{" "}
          </div>
          {room && name ? (
            <Link to={`/chat?name=${name}$room=${room}`}>
              <button className="" type="submit">
                Sign In
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Chat;
