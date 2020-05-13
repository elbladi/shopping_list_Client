import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import loadGif from './loading.gif';
import classes from './Login.module.css';
import { Redirect } from 'react-router-dom';

const Login = props => {


    const [input, setInput] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        if (input.length < 3)
            return;
        props.onLogin(input);
    }
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    let redirect = null;
    if (props.token) {
        redirect = <Redirect to={props.userId} />
    }

    return (
        <Fragment>
            {redirect}
            <div className={classes.login_background}>
                {props.loading ? <img src={loadGif} alt="Loading" /> :
                    (<Fragment>
                        <p className={classes.not_valid}>Not Valid size</p>
                        <form onSubmit={(event) => handleLogin(event)}>
                            <input className={classes.input_id} value={input} onChange={(event) => handleChange(event)} type='number' id='identify'></input>
                        </form>
                    </Fragment>)}
            </div>
        </Fragment>

    )
};

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        userId: state.login.userId,
        token: state.login.token !== null,
        message: state.login.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (id) => dispatch(actions.login(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);