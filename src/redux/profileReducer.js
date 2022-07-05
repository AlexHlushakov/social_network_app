import { ProfileAPI } from "../api/api";
import {stopSubmit} from "redux-form";


const ADD_POST = "social-network/profile/ADD_POST",
    ADD_LIKE = "social-network/profile/ADD_LIKE",
    SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE",
    TOGGLE_IS_FETCHING = "social-network/profile/TOGGLE_IS_FETCHING",
    SET_USER_STATUS = "social-network/profile/SET_USER_STATUS",
    SET_USER_PHOTO = "social-network/profile/SET_USER_PHOTO";


let initialState = {
    posts: [
        { id: 0, postAuthor: "Alex", postText: "Hello, world!", postDate: "2022-1-7", postLikes: 12 },
        { id: 1, postAuthor: "Alex", postText: "This is my second post!", postDate: "2022-1-14", postLikes: 27 },
        { id: 2, postAuthor: "Alex", postText: "What a beutiful weather!", postDate: "2022-1-20", postLikes: 20 }
    ],
    newPostText: "",
    profile: null,
    status: "yuhu",
    isFetching: true
};


const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let id = state.posts.length;
            const date = new Date();
            let timeStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            let newPost = {
                id: id,
                postAuthor: "Alex",
                postText: action.text,
                postDate: timeStamp,
                postLikes: 0
            };
            return { ...state, posts: [...state.posts, newPost]};
        }

        case ADD_LIKE: {
            let stateCopy = { ...state };
            stateCopy.posts[action.postNumber].postLikes = state.posts[action.postNumber].postLikes + 1;
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }

        case SET_USER_PHOTO: {
            return { ...state, profile: {...state.profile, photos: action.photos }}
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }

        default:
            return state;
    }

}


//Action Creators

export const addNewPost = (text) => {
    return { type: ADD_POST, text };
}

export const addLike = (postNumber) => {
    return { type: ADD_LIKE, postNumber };
}

export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile: profile };
}

export const setUserStatus = (status) => {
    return { type: SET_USER_STATUS, status };
}

export const setUserPhoto = (photos) => {
    return { type: SET_USER_PHOTO, photos };
}

export const toggleIsFetching = (isFetching) => {
    return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
}



// Thank creators

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getUserProfile(userId);
    dispatch(setUserProfile(response));
}

export const getUserStatus = (userId) =>
    async (dispatch) => {
        let response = await ProfileAPI.getUserStatus(userId);
        dispatch(setUserStatus(response));
    }

export const getProfilePageInfo = (userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let promiseProfile = dispatch(getUserProfile(userId));
    let promiseStatus = dispatch(getUserStatus(userId));
    Promise.all([promiseProfile, promiseStatus])
        .then(() => {
            dispatch(toggleIsFetching(false));
        });
}

export const updateUserStatus = (status, userId) =>
    async (dispatch) => {
        let response = await ProfileAPI.updateUserStatus(status);

        if (response.resultCode === 0) {
            dispatch(setUserStatus(status));
            dispatch(getProfilePageInfo(userId))
        }
    }

export const updateProfile = (profile) => async (dispatch) => {
    let response = await ProfileAPI.updateProfile(profile);

    if (response.resultCode === 0) {
        dispatch(getProfilePageInfo(profile.userId))
        dispatch(stopSubmit("accountForm", { _error : "successes save profile"}))
    } else {
        console.log(response.messages)
        dispatch(stopSubmit("accountForm", { _error : response.messages[0]}))
    }
}

export const updateUserPhoto = (file, userId) => async (dispatch) => {
    let response = await ProfileAPI.updateUserPhoto(file);

    if (response.resultCode === 0) {
        dispatch(setUserPhoto(response.photos));
    }

    let promise = dispatch(getProfilePageInfo(userId))
    Promise.all([promise])
        .then(() => {
            dispatch(toggleIsFetching(false));
        })
}

export default profileReducer;