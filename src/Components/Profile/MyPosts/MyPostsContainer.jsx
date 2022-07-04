import { connect } from "react-redux";
import MyPosts from "./MyPosts";
import { addNewPost, addLike } from "../../../redux/profileReducer";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts
    }
};


export default connect(mapStateToProps, {
    addLike,
    addNewPost
})(MyPosts);