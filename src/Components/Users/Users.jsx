import React from "react";
import styles from "./Users.module.css";
import avatarPhoto from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import PaginatorControlled from "../common/PaginatorControlled";



const Users = (props) => {

    return (
        <div>
            <PaginatorControlled currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                                 totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>
            <div className={styles.users}>
                {props.users.map(user  => (
                    <div key={user.id} className={styles.user_item}>
                        <div className={styles.user_item_block}>
                            <div className={styles.user_avatar_block}>
                                <img src={user.photos.small != null ? user.photos.small : avatarPhoto} alt="user avatar" className={styles.user_avatar_img} />
                            </div>
                            <div className={styles.user_info}>
                                <Link to={'/profile/' + user.id} style={{textDecoration: "none", color: "black"}}>
                                    <span className={styles.user_name}>{user.name}</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            {user.followed ?
                                <button disabled={props.followingProgress.some(id => id === user.id) || !props.isAuth} className={styles.user_following} onClick={() => {
                                    props.unfollow(user.id)
                                }}>UNFOLLOW</button>
                                :
                                <button disabled={props.followingProgress.some(id => id === user.id) || !props.isAuth} className={styles.user_following} onClick={() => { props.follow(user.id); }}>FOLLOW</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Users;