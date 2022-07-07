import React, {lazy, Suspense} from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import HeaderContainer from './Components/Header/HeaderContainer'
import Loader from './Components/common/Loader/Loader'
import { HashRouter, Route, Routes} from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/appReducer'
import store from './redux/redux-store';
import Welcome from "./Components/Welcome/Welcome";

const ProfileContainer = lazy(() => import('./Components/Profile/ProfileContainer'));
const AccountContainer = lazy(() => import('./Components/Account/AccountContainer'));
const ProfileContainerUsers = lazy(() => import('./Components/Profile/ProfileContainerUsers'));
const DialogsContainer = lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./Components/Users/UsersContainer'));
const Login = lazy(() => import('./Components/Login/Login'));
const InDev = lazy(() => import('./Components/common/InDev/InDev'));
const Feedback = lazy(() => import('./Components/Feedback/Feedback'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (this.props.initialized === false) {
      return <Loader />
    }
    return (
        <div className="app-wrapper">
          <HeaderContainer/>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={
                  <Welcome/>}/>
              <Route path="/profile" element={
                <Suspense fallback={<Loader />}>
                  <ProfileContainer/>
                </Suspense>} />
              <Route path="/profile/:userId" element={
                <Suspense fallback={<Loader />}>
                  <ProfileContainerUsers/>
                </Suspense>} />
              <Route path="/dialogs/*" element={
                <Suspense fallback={<Loader />}>
                  <DialogsContainer/>
                </Suspense>} />
              <Route path="/account" element={<Suspense fallback={<Loader/>}><AccountContainer /></Suspense>} />
              <Route path="/users/*" element={<Suspense fallback={<Loader/>}><UsersContainer /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
              <Route path="/feedback" element={<Suspense fallback={<Loader/>}><Feedback /></Suspense>} />
              <Route path="/vlog" element={<Suspense fallback={<Loader/>}><InDev /></Suspense>} />
            </Routes>
          </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, { initializeApp })(App)


const SocialApp = () => {
  return <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SocialApp;
