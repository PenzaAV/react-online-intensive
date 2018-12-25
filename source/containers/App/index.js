// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from '../../components/Catcher';
import StatusBar from '../../components/StatusBar';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import { Provider } from '../../components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa';
import Login from '../../components/Login';

const options = {
    avatar,
    currentUserFirstName: 'Антон',
    currentUserLastName:  'Пенза',
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    return (
        <Route
            { ...rest }
            render = { (props) => authed === true ? (
                <Component { ...props } />
            ) : (
                <Redirect to = {{ pathname: '/login', state: { from: props.location } }} />
            )
            }
        />
    );
};
@hot(module)
export default class App extends Component {
    state = {
        isLoggedIn: false,
    };

    componentDidMount() {
        this._LoggedInStorage();
    }

    _logIn = () => {
        this.setState({
            isLoggedIn: true,
        });
        localStorage.setItem('isLoggedIn', 'true');
    };

    _LoggedInStorage = () => {
        const LoggedInStorage = localStorage.getItem('isLoggedIn');
        if (LoggedInStorage === 'true') {
            this.setState({
                isLoggedIn: true,
            });
        }
    };

    _logOut = () => {
        this.setState({
            isLoggedIn: false,
        });
        localStorage.setItem('isLoggedIn', 'false');
    };

    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar _logOut = { this._logOut } />
                    <Switch>
                        <PrivateRoute
                            authed = { this.state.isLoggedIn }
                            component = { Profile }
                            path = '/profile'
                        />
                        <PrivateRoute
                            authed = { this.state.isLoggedIn }
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            path = '/login'
                            render = { () => <Login _logIn = { this._logIn } /> }
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
