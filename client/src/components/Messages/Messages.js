import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";
import styles from "./Messages.module.css";

const Messages = ({ messages, name }) => {
  return (
    <>
      <ScrollToBottom>
        {messages &&
          messages.map((message, i) => {
            return (
              <div key={i} className={styles.messages}>
                <Message name={name} message={message} />
              </div>
            );
          })}
      </ScrollToBottom>
    </>
  );
};

export default Messages;
