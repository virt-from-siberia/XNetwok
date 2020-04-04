import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoue from "./components/routing/PrivateRoute";
import "./App.css";
//NOTE/: REDUX
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />

                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <PrivateRoue
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoue
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                            <PrivateRoue
                                exact
                                path='/edit-profile'
                                component={EditProfile}
                            />
                            <PrivateRoue
                                exact
                                path='/add-experience'
                                component={AddExperience}
                            />
                            <PrivateRoue
                                exact
                                path='/add-education'
                                component={AddEducation}
                            />
                            <PrivateRoue
                                exact
                                path='/posts'
                                component={Posts}
                            />
                            <PrivateRoue
                                exact
                                path='/posts/:id'
                                component={Post}
                            />
                        </Switch>
                        <Alert />
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
