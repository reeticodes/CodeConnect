import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./components/layout/Landing";
import "./components/layout/Navbar";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";

import Profiles from "./components/profiles/Profiles";
import FollowerProfiles from "./components/profiles/FollowerProfiles";
import FollowingProfiles from "./components/profiles/FollowingProfiles";

import PrivateRoute from "./components/routing/PrivateRoute";

import Profile from "./components/Profile/Profile";

import Posts from "./components/posts/Post";
import Post from "./components/post/Post";

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./Utils/setAuthToken";
import Footer from "./components/layout/Footer/Footer";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar />
						<Route exact path="/" component={Landing} />
						<section className="container">
							<Alert />
							<Switch>
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/profiles" component={Profiles} />
								<Route
									exact
									path="/profile/followers/:id"
									component={FollowerProfiles}
								/>
								<Route
									exact
									path="/profile/following/:id"
									component={FollowingProfiles}
								/>
								<Route exact path="/profile/:id" component={Profile} />
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
								<PrivateRoute exact path="/posts" component={Posts} />
								<PrivateRoute exact path="/posts/:id" component={Post} />
							</Switch>
						</section>
					</Fragment>
				</Router>
				<Footer />
			</Provider>
		</div>
	);
};

export default App;
