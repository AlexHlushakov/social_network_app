import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div>
                <Link to="/profile" className={styles.navlink}>Profile</Link>
            </div>
            <div>
                <Link to="/dialogs" className={styles.navlink} >Dialogs</Link>
            </div>
            <div>
                <Link to="/vlog" className={styles.navlink} >Vlog</Link>
            </div>
            <div>
                <Link to="/users" className={styles.navlink} >Users</Link>
            </div>
            <div>
                <Link to="/feedback" className={styles.navlink} >Feedback</Link>
            </div>
        </nav>
    )
}


export default Navbar;