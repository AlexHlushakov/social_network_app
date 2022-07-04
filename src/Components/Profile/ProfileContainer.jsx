import React from "react";
import { connect } from "react-redux";
import {getProfilePageInfo, updateUserPhoto, updateUserStatus} from "../../redux/profileReducer";
import ProfilePage from "./ProfilePage";


class MyProfilePage extends React.Component {

    componentDidMount() {
        this.refreshPage()
    }

    refreshPage() {
        let id = this.props.authUserId;
        this.props.getProfilePageInfo(id)
    }


    render() {
        return <ProfilePage {...this.props} userId={undefined}/>
    }
}


let mapStateToProps = (state) => {
    return {
        isFetching: state.profilePage.isFetching,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.authUserId
    }
}


export default connect(mapStateToProps,
    { getProfilePageInfo, updateUserStatus, updateUserPhoto })(MyProfilePage);
