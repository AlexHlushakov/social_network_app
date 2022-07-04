import React, {useMemo} from 'react';
import {Button, List, ListItem} from "@mui/material";
import {Input, Textarea} from "../common/FormControls/FormControls";
import {Field, reduxForm} from "redux-form";
import SendIcon from "@mui/icons-material/Send";
import {maxLength} from "../../utils/validate/formValidate";



const Contact = ({contactTitle, contactValue, style})=>{
    return <ListItem divider={true}>
        <b style={style}>{contactTitle}:</b>
        <Field name={"contacts."+ contactTitle} placeholder={contactValue}
               component={Input} type={"text"} autocomplete="off" />
    </ListItem>
}

const Account = (props) =>{
    const {handleSubmit, invalid, submitting, pristine, error} = props;
    let maxLength40 = useMemo(() => maxLength(40),[]);
    let maxLength20 = useMemo(() => maxLength(20),[]);
    let inputStyle={width: 200, resize: "none"};

    const styles = {
        title: {
            minWidth: "85px"
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <List
                sx={{
                    display: "grid",
                    alignItems: "center",
                    gridTemplateColumns: "repeat(2, 350px)",
                    gridTemplateRows: "repeat(7, 60px)",
                    gridColumnGap: "20px",
                    width: '100%',
                    mt: "5%",
                    ml: "5%",
                    maxWidth: 1000}}>
                <ListItem divider={true}>
                    <b style={styles.title}>Name: </b>
                    <Field name="fullName" placeholder={props.profile.fullName}
                           component={Input} type={"text"} autocomplete="off"
                           validate={[maxLength20]}/>
                </ListItem>
                <ListItem divider={true}>
                    <b style={styles.title}>About Me: </b>
                    <Field name="aboutMe" placeholder={props.profile.aboutMe}
                           component={Textarea} type={"text"} style={inputStyle}
                           maxRows={2} minRows={2} autocomplete="off"/>
                </ListItem>
                <ListItem divider={true}>
                    <b style={styles.title}>Need Job: </b>
                    <Field name="lookingForAJob"
                           component={"input"} type={"checkbox"}/>
                </ListItem>
                <ListItem divider={true}>
                    <b style={styles.title}>Skills: </b>
                    <Field name="lookingForAJobDescription"
                           placeholder={props.profile.lookingForAJobDescription}
                           component={Textarea} type={"text"} autocomplete="off"
                           maxRows={2} minRows={2} style={inputStyle} validate={[maxLength40]}/>
                </ListItem>
                {Object
                    .keys(props.profile.contacts)
                    .map((key)  => {
                        return (<Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} style={styles.title}/>)
                    })}
            </List>

            {error && alert(error)}

            <Button variant="contained" type="submit"
                    size="large" endIcon={<SendIcon />}
                    disabled={invalid || submitting || pristine}
                    sx={{
                        ml: "50px",
                        width: "200px"
                    }}
            >Save changes</Button>
        </form>
    )
}

const AccountReduxForm = (reduxForm({form: "accountForm"})(Account))


const AccountForm = (props) =>{

    let updateUserProfile = (formData) =>{
        props.updateProfile(formData);
    }

    return <AccountReduxForm {...props} initialValues={props.profile} onSubmit={updateUserProfile}/>
}

export default AccountForm;