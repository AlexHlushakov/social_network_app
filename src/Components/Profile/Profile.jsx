import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {

    return <div style={{
        gridArea: "content",
        width: "100%",
        display: "flex",
        padding: "10px 50px",
        alignItems: "flex-start",
        justifyContent: "space-between"
    }}>
        <ProfileInfo {...props}/>
        <MyPostsContainer />
    </div>
}


export default Profile;