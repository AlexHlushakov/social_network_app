import React from "react";

const Welcome =() => {

        return (
            <div style={{
                width: "75%",
                maxWidth: "850px",
                marginTop: "5%"
            }}>
                <h2>Welcome to Alex-Chat!</h2>
                <p>This is the first version of my React pet project. It is quite raw and can have some bugs. It is under
                    the development.</p>
                <p>App is using third party API provider, so that's why we need to log in. I am providing my testing account.</p>
                <div>
                    <b>Login:</b><span>alex1glushakov@gmail.com</span>
                    <br/>
                    <br/>
                    <b>Password:</b><span>P!9!8NgGs9gT3xf</span>
                </div>
                <p>At the moment responsive design is under development. For smooth interface please use laptop or
                    desktop PC.</p>
                <p>API provider uses old way of generating authentication. So some browsers can block authentication.
                    For best experience recommended to use Chrome browser.</p>
                <p>If you find any specific bugs, please mention it in the feedback form, available by the link in the NavBar</p>
            </div>
        )
}
export default Welcome