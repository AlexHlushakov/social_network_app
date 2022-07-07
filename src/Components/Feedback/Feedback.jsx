import React, {useMemo} from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {maxLength, required} from '../../utils/validate/formValidate';
import {Input, Textarea} from '../common/FormControls/FormControls'
import style from '../common/FormControls/FormControls.module.css'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {feedback} from "../../redux/appReducer";

const FeedbackForm = (props) => {
    const { handleSubmit, invalid, submitting, pristine} = props
    let maxLength200 = useMemo(() => maxLength(200),[])

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{padding: "5px 0"}}>
                <Field name="email" placeholder="Email" component={Input} validate={[required]} style={{width: "40vw", resize: "none"}} />
            </div>
            <div style={{padding: "5px 0"}}>
                <Field name="feedbackBody" component={Textarea} maxRows={4} minRows={4} style={{width: "40vw", resize: "none"}} placeholder="Enter your message" autocomplete="off" validate={[maxLength200, required]} />
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <Button variant="contained" type="submit" style={{width: "40vw"}}
                        disabled={invalid || submitting || pristine}>Send</Button>
            </div>
        </form>
    )
}

const FeedbackReduxForm = reduxForm({ form: "feedback" })(FeedbackForm)



class Feedback extends React.Component {

    submitForm = (formData) => {
        this.props.feedback(formData);
    }

    render() {
        if (this.props.isAuth) {
            return (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5%"}}>
                    <h1>Feedback</h1>
                    <FeedbackReduxForm onSubmit={this.submitForm} />
                </div>
            )
        } return (
            <div>
                <h2>Please, login first!</h2>
                <Link to="/login">Go to Login</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,
    { feedback })(Feedback);