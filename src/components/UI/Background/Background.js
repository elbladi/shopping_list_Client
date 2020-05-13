import React, { Fragment } from 'react';

import Header from '../Header/Header';
import classes from './Background.module.css';

const Background = (props) => {
    return (
        <Fragment>
            <Header />
            <img className={classes.back} src={props.background} alt='background cool' />
        </Fragment>
    )
};

export default Background;