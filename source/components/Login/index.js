// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
// Instruments
import Styles from './styles.m.css';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    static propTypes = {
        _logIn: func.isRequired,
    };

    state = {
        redirectToReferrer: false,
    };

    _login = () => {
        this.props._logIn();
        this.setState({
            redirectToReferrer: true,
        });
    };

    render() {
        const { from } = this.props.location || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to = { from } />;
        }

        return (
            <section className = { Styles.login }>
                <button onClick = { this._login }>Log In</button>
            </section>
        );
    }
}
