//Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';


const Postman = (props) => {
    const animatePostmanEnter = (postman) => {
        fromTo(postman, 1, {right: -280}, {right: 30});
    };

    const animatePostmanEntered = (postman) => {
        fromTo(postman, 1, {right: 30}, {right: -280});
    };

    return (
        <Transition
            appear
            in
            timeout = { 4000 }
            onEnter = { animatePostmanEnter }
            onEntered = { animatePostmanEntered }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
