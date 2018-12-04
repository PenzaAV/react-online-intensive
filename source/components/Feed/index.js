// Core
import React, {Component} from 'react';
import moment from 'moment';

// Components
import { withProfile } from '../HOC/withProfile';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

// Instruments
import Styles from './styles.m.css';
import {getUniqueID, delay} from '../../instruments';

@withProfile
export default class Feed extends Component {
    state = {
        isSpinning: false,
        posts:      [
            {id: '123', comment: 'Hi there!', created: 1543185420, likes: []},
            {id: '234', comment: 'Hello!', created: 1543185516, likes: []},
        ],
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            likes:   [],
            comment,
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:      [ post, ...posts ],
            isSpinning: false,
        }));
    };

    _removePost = async (id) => {
        const {posts} = this.state;
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.filter((item) => item.id !== id);
        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    };

    _likePost = async (id) => {
        const {currentUserFirstName, currentUserLastName} = this.props;
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });
        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    };

    render() {
        const {posts, isSpinning} = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar/>
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}
