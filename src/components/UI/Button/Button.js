import React from 'react';
import { ReactComponent as ArrowUp } from '../assets/arrow.svg';
import classes from './Button.module.css';

const ButtonUp = () => {

    const onScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return <div className={classes.up} ><ArrowUp onClick={() => onScroll()} /></div>
};

export default ButtonUp;