import React from 'react';
import Account from './Account';
import {connect} from "react-redux";
import {getProfilePageInfo, updateProfile} from "../../redux/profileReducer";
import Login from "../Login/Login";



class AccountContainer extends React.Component{

    componentDidMount() {
        this.props.getProfilePageInfo(this.props.authUserId);
    }


    render() {
        if(this.props.isAuth){
            return <Account profile={this.props.profile} updateProfile={this.props.updateProfile}/>
        } return <Login/>
    }
}





let mapStateToProps = (state) =>{
    return {
        isFetching: state.profilePage.isFetching,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.authUserId
    }
}

export default connect(mapStateToProps, {updateProfile, getProfilePageInfo })(AccountContainer)