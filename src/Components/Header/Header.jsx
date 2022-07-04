import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Button} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";



export default function MenuAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    let logoutFunc =() =>{
        props.logout();
    };

    let navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar position="sticky" sx={{   gridArea: "header",
            backgroundColor: "#293241",
            width: "100vw",
            maxWidth: "1200px",
            height: "70px",
            zIndex: "999"
        }}>
            <Toolbar>
                <img style={{position: "relative", padding: "8px", width: "40px"}} src="https://cdn.escharts.com/uploads/public/5ea/6e2/b92/5ea6e2b923be6687269039.png" alt="logo here" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    AlexChat
                </Typography>
                {props.isAuth ? (
                    <div>
                        <Button color={"inherit"} onClick={logoutFunc}>Logout</Button>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            <MenuItem onClick={ () => { handleClose(); navigate("/profile", { replace: true })}}>Profile</MenuItem>
                            <MenuItem onClick={ () => { handleClose(); navigate("/account", { replace: true })}}>My account</MenuItem>
                        </Menu>
                    </div>
                ): <Link style={{color: 'white', textDecoration: "none", fontSize:"20px"}} to={"/login"}>Login</Link>}
            </Toolbar>
        </AppBar>
    );
}