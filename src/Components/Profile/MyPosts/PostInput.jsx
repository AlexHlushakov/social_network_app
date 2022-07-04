import React, {useMemo} from "react";
import {maxLength} from "../../../utils/validate/formValidate";
import styles from "./MyPosts.module.css";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Textarea} from "../../common/FormControls/FormControls";


const PostInputForm = (props) => {
    const {handleSubmit, invalid, submitting, pristine} = props;
    let maxLength100 = useMemo(() => maxLength(100),[]);
    let maxRows = 5, minRows = 5, style = {width: 300, resize: "none"} ;

    return (
        <form onSubmit={handleSubmit} className={styles.new_post}>
            <Field className={styles.new_post_text} name="postText" component={Textarea} maxRows={maxRows} minRows={minRows} style={style} placeholder="Enter your ideas" autocomplete="off" validate={[maxLength100]} />
            <div>
                <Button className={styles.new_post_btn} variant="contained" type="submit" size="large" endIcon={<SendIcon />} disabled={invalid || submitting || pristine}>Post</Button>
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('postForm'));

const PostReduxForm = (reduxForm({ form: "postForm", onSubmitSuccess: afterSubmit})(PostInputForm))


const PostInput = (props) =>{

    let submitPost = (formData) =>{
        console.log(formData)
        props.addNewPost(formData.postText)
    }

    return <PostReduxForm onSubmit={submitPost} />
}
export default PostInput