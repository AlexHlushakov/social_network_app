import React from "react";
import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import Login from "../Login/Login";


const ProfilePage = (props) => {

        if (props.isAuth) {
            if (!props.isFetching) {
                return (<Profile {...props} userId={props.userId} />)
            }
            return (<Loader />)
        }
        return <Login />
}
export default ProfilePage
