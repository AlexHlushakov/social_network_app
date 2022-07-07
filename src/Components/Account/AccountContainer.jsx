import React from 'react';
import Account from './Account';
import {connect} from "react-redux";
import {getProfilePageInfo, updateProfile} from "../../redux/profileReducer";
import Login from "../Login/Login";
import RefreshProfile from "../Profile/RefreshProfile";



class AccountContainer extends React.Component{

    componentDidMount() {
        this.props.getProfilePageInfo(this.props.authUserId);
    }



    render() {
        if(this.props.isAuth){
            if(this.props.profile === null || this.props.profile.userId !== this.props.authUserId){
                return <RefreshProfile />
            } else{
                return <Account profile={this.props.profile} updateProfile={this.props.updateProfile}/>
            }
        } else{ return <Login/>}
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