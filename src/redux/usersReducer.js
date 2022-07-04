import { UsersAPI } from "../api/api";

const FOLLOW = "social-network/users/FOLLOW",
    UNFOLLOW = "social-network/users/UNFOLLOW",
    SET_USERS = "social-network/users/SET_USERS",
    SET_CURRENT_PAGE = "social-network/users/SET_CURRENT_PAGE",
    SET_TOTAL_USERS_COUNT = "social-network/users/SET_TOTAL_USERS_COUNT",
    TOGGLE_IS_FETCHING = "social-network/users/TOGGLE_IS_FETCHING",
    TOGGLE_FOLLOWING_PROGRESS = "social-network/users/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    followingProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            };
        }

        case UNFOLLOW: {
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        }

        case SET_USERS: {
            return { ...state, users: [...action.users] }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count };
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }

        case TOGGLE_FOLLOWING_PROGRESS: {
            return { ...state, followingProgress: action.isFetching ? [...state.followingProgress, action.userId] : state.followingProgress.filter(id => id !== action.userId) }
        }

        default:
            return state;
    }
}


//ActionCreators

export const followSuccess = (userId) => {
    return { type: FOLLOW, id: userId };
}
export const unfollowSuccess = (userId) => {
    return { type: UNFOLLOW, id: userId };
}

export const setUsers = (users) => {
    return { type: SET_USERS, users: users };
}

export const setCurrentPage = (currentPage) => {
    return { type: SET_CURRENT_PAGE, currentPage: currentPage };
}

export const setTotalUsersCount = (totalUsersCount) => {
    return { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount };
}

export const toggleIsFetching = (isFetching) => {
    return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
}

export const toggleFollowingProgress = (isFetching, userId) => {
    return { type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId };
}


//ThunkCreators functions

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        UsersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(toggleIsFetching(false));
        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        UsersAPI.followUser(userId).then(result => {
            if (result === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        UsersAPI.unfollowUser(userId).then(result => {
            if (result === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        })
    }
}

export default usersReducer;