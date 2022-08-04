import React from "react";
import styles from "./Infobar.module.css";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

const Infobar = ({ room }) => {
  return (
    <>
      <div className={styles.infoBar}>
        <div className={styles.leftInnerContainer}>
          <img src={onlineIcon} alt="/" className={styles.onlineIcon} />
          <h3>{room}</h3>
        </div>
        <div className={styles.RightInnerContainer}>
          <a href="/">
            <img className={styles.closeIcon} src={closeIcon} alt="/" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Infobar;
