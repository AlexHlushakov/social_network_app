import React from "react";
import styles from "./MyPosts.module.css";
import PostInput from "./PostInput";


const Post = (props) => {
    let addLike = () => {
        props.addLike(props.id);
    }

    return (<div className={styles.post} key={props.id}>
            <img src="https://e7.pngegg.com/pngimages/85/761/png-clipart-pokxe9mon-go-pikachu-icon-lovely-pikachu-love-pet-thumbnail.png" alt="Pikachu" className={styles.post_avatar} />
            <div className={styles.post_info}>
                <div className={styles.post_author}>{props.postAuthor}</div>
                <div className={styles.post_text}>{props.postText}</div>
                <div className={styles.post_details}>
                    <div className={styles.post_date}>{props.postDate}</div>
                    <div className={styles.post_likes}>
                        <button className={styles.post_likes_btn} onClick={addLike}>Like it!</button>
                        <div className={styles.post_likes_count}>{props.postLikes}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const MyPosts = (props) => {

    return(
        <div className={styles.my_posts}>
            <div>
                <h2 className={styles.my_posts_title}>My Posts</h2>
                <PostInput addNewPost={props.addNewPost}/>
            </div>
            <Posts posts={props.posts} addLike={props.addLike}/>
        </div>)
}

const Posts = React.memo((props) =>{

    return(
        <div>
            {props.posts.map(post => {
                return (<Post key={post.id} id={post.id} postAuthor={post.postAuthor} postText={post.postText} postDate={post.postDate} postLikes={post.postLikes} addLike={props.addLike} />)
            })}
        </div>
    )
})

export default MyPosts;