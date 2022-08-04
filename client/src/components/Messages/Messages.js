import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";
import styles from "./Messages.module.css";

const Messages = ({ messages, name }) => {
  return (
    <>
      <ScrollToBottom className={styles.messages}>
        {messages &&
          messages.map((message, i) => {
            return (
              <div key={i}>
                <Message name={name} message={message} />
              </div>
            );
          })}
      </ScrollToBottom>
    </>
  );
};

export default Messages;
