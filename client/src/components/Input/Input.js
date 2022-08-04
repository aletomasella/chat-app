import React from "react";
import styles from "./Input.module.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <>
      <div>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            placeholder="Type a message ..."
          />
          <button className={styles.sendButton} onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Input;
