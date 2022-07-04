import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLength} from "../../utils/validate/formValidate";
import styles from "./Dialogs.module.css"
import React, {useMemo} from "react";
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const MessageInputForm = (props) => {
    const {handleSubmit, invalid, submitting, pristine} = props;
    let maxLength100 = useMemo(() => maxLength(100),[])
    let maxRows=2, minRows=2, style={width: 400, resize: "none"};

    return (
        <form onSubmit={handleSubmit} className={styles.new_message}>
            <Field className={styles.new_message_input} name="message" component={Textarea} maxRows={maxRows} minRows={minRows} style={style} placeholder="Enter your message" autocomplete="off" validate={[maxLength100]} />
            <div>
                <Button variant="contained" type="submit" size="large" endIcon={<SendIcon />} disabled={invalid || submitting || pristine}>Send</Button>
                {/*<button className={styles.new_message_btn}  type="submit" disabled={invalid || submitting || pristine}>Send</button>*/}
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('messageForm'));

const MessageReduxForm = (reduxForm({ form: "messageForm", onSubmitSuccess: afterSubmit})(MessageInputForm))

const MessageInput = (props) => {

    let postMessage = (formData) => {
        props.postMessage(formData.message);
    }

    return <MessageReduxForm onSubmit={postMessage} />
}

export default MessageInput;