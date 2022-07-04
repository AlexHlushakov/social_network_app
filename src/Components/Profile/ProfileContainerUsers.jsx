import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withRouter from '../../hoc/withRouter';
import { getProfilePageInfo, updateUserStatus } from "../../redux/profileReducer";
import ProfilePage from "./ProfilePage";



class UserProfilePage extends React.Component {

    componentDidMount() {
        this.refreshPage()
    }

    refreshPage() {
        let id = this.props.router.params.userId;
        this.props.getProfilePageInfo(id)
    }



    render() {
       return <ProfilePage {...this.props} userId={this.props.router.params.userId}/>
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


export default compose(connect(mapStateToProps,
    { getProfilePageInfo, updateUserStatus }), withRouter)(UserProfilePage);