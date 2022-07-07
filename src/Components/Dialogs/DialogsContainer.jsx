import { connect } from "react-redux";
import { addMessage } from "../../redux/dialogsReducer";
import {Link} from "react-router-dom";
import styles from "./Dialogs.module.css";
import Messages from "./Messages"
import Login from "../Login/Login";
import MessageInput from "./MessageInput";
import React from "react";


const DialogItem = (props) => {
    return (
        <div className={styles.dial_item}>
            <Link to={"/dialogs/" + props.id}>{props.name}</Link>
        </div>
    )
}

const Dialogs = (props) => {



    if(props.isAuth){
        return (
            <div className={styles.dial}>
                <div className={styles.dial_items}>
                    {props.dialogsPage.dial_items.map(item => {
                        return (<DialogItem name={item.name} id={item.id} key={item.id}></DialogItem>)
                    })}
                </div>
                <Messages messages={props.dialogsPage.messages_list} postNewMessage={props.addMessage} />
                <MessageInput postMessage={props.postNewMessage} />
            </div>
        )
    } else {
        return <Login/>
    }


}


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, { addMessage })(Dialogs);