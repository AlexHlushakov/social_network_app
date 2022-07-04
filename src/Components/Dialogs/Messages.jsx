import React from "react";
import styles from "./Dialogs.module.css";
import MessageInput from "./MessageInput";


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
            <div className={styles.new_message}>
                <MessageInput postMessage={props.postNewMessage} />
            </div>
        </div>

    )
}

export default Messages;