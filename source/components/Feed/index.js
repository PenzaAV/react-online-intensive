// Core
import React, { Component } from 'react';


// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

// Instruments
import Styles from './styles.m.css';


export default class Feed extends Component {
    state = {
        isSpinning: false,
        posts:      [
            { id: '123', comment: 'Hi there!', created: 1543185420 },
            { id: '234', comment: 'Hello!', created: 1543185516 },
        ],
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar/>
                <Composer/>
                {postsJSX}
            </section>
        );
    }
}
