import React from 'react';
import { connect } from "react-redux";
import Users from "./Users";
import Loader from '../common/Loader/Loader';
import { follow, unfollow, setCurrentPage, setUsers, getUsers } from "../../redux/usersReducer";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (this.props.isFetching ? <Loader /> :
                <Users
                    onPageChanged={this.onPageChanged}
                    {...this.props}
                />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, setUsers, getUsers
})(UsersContainer);