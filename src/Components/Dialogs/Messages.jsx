import React from "react";
import styles from "./Dialogs.module.css";


const Message = (props) => {
    return (
        <div className={styles.message}>
            <span>{props.message}</span>
        </div>
    )
}


const Messages = (props) => {

    return (<div className={styles.messages_page}>
            <div className={styles.messages}>
                {props.messages.map(item => {
                    return (<Message message={item.message} />)
                })}
            </div>
        </div>

    )
}

export default Messages;