import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { loginUser } from "../../redux/authReducer";
import { required } from '../../utils/validate/formValidate';
import { Input } from '../common/FormControls/FormControls'
import style from '../common/FormControls/FormControls.module.css'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const LoginForm = (props) => {
    const { handleSubmit, invalid, submitting, pristine} = props
    return (
        <form onSubmit={handleSubmit}>
            <div style={{padding: "5px 0"}}>
                <Field name="email" placeholder="Email" component={Input} validate={[required]} />
            </div>
            <div style={{padding: "5px 0"}}>
                <Field name="password" placeholder="Password" component={Input} type="password" validate={[required]} />
            </div>
            <div style={{padding: "5px 0"}}>
                <Field name="rememberMe" component="input" type="checkbox" />Remember Me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }

            <div>
                <Button variant="contained" type="submit"
                        disabled={invalid || submitting || pristine}>Login</Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)



class Login extends React.Component {

    submitForm = (formData) => {
        if(this.props.loginUser(formData.email, formData.password, formData.rememberMe)){
        }
    }

    render() {
        if (this.props.isAuth) {
            return (
                <div>
                    <h2>Success! You logged in!</h2>
                    <Link to="/profile">Go to Profile</Link>
                </div>
            )
        } return (
            <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={this.submitForm} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps login")
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,
    { loginUser })(Login);