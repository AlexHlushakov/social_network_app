import React from "react";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus"
import {ButtonBase, List, ListItem, ListItemText} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";


const ProfileInfo = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMainPhotoSelected = (e) => {
        if (e.target.files && e.target.files.length) {
            props.updateUserPhoto(e.target.files[0], props.authUserId);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.profile_info}>
                {!props.userId ?
                    <ButtonBase sx={{ width: 100, height: 100 }}
                                aria-label="photo of current user"
                                aria-controls="menu-photo"
                                aria-haspopup="true"
                                onClick={handleMenu}>
                        <img className={styles.profile_avatar} src={props.profile.photos.small || "https://e7.pngegg.com/pngimages/85/761/png-clipart-pokxe9mon-go-pikachu-icon-lovely-pikachu-love-pet-thumbnail.png"} alt="" />
                    </ButtonBase>:
                    <img className={styles.profile_avatar} src={props.profile.photos.small || "https://e7.pngegg.com/pngimages/85/761/png-clipart-pokxe9mon-go-pikachu-icon-lovely-pikachu-love-pet-thumbnail.png"} alt="" />
                }
                {!props.userId  &&
                    <Menu
                        id="menu-photo"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <input className={styles.photo_input} type={"file"} onChange={onMainPhotoSelected}/>
                        <MenuItem onClick={handleClose}>Close</MenuItem>
                    </Menu> }
                <div className={styles.profile_description}>
                    <div className={styles.profile_userinfo}>
                        <div className={styles.profile_user_name}>{props.profile.fullName}</div>
                        <div><b>Need Job:</b> {props.profile.lookingForAJob ? "yes" : "no"}</div>
                        {props.profile.lookingForAJobDescription &&
                            <div className={styles.profile_lfj_description}>{props.profile.lookingForAJobDescription}</div>}
                        <ProfileStatus status={props.status} updateStatus={props.updateUserStatus} myUserId={props.authUserId} userId={props.userId} />
                        <div className={styles.profile_user_about}><b>About: </b>{props.profile.aboutMe}</div>
                    </div>
                </div>
            </div>

            <List sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "repeat(2, 50%)",
                gridTemplateRows: "repeat(4, 25%)",
                gridColumnGap: "10px",
                width: '100%',
                maxWidth: 420
            }}>
                {Object.keys(props.profile.contacts)
                    .map((key)  => {
                        return (<ListItem key={key} divider={true}>
                            <ListItemText key={key} primary={key} secondary={props.profile.contacts[key] || "none"} sx={{maxWidth: "100%", overflow: "scroll"}}/>
                        </ListItem>)
                    })}
            </List>
        </div>
    )
}

export default ProfileInfo;