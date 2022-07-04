import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout, getAuthUserData } from "../../redux/authReducer";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props} logout={this.props.logout} />
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        email: state.auth.email
    }
}


export default connect(mapStateToProps, { logout, getAuthUserData })(HeaderContainer);