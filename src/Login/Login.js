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
        if (input.length < 3) return;
        props.onLogin(input);
    }

    return (
        <Fragment>
            {props.token && <Redirect to={props.userId} />}
            <div className={classes.login_background}>
                {props.loading ? <img src={loadGif} alt="Loading" /> :
                    (<Fragment>
                        {/* <p className={classes.not_valid}>Not Valid size</p> */}
                        <form onSubmit={(event) => handleLogin(event)}>
                            <input className={classes.input_id} onChange={(event) => setInput(event.target.value)} type='number' id='identify'></input>
                        </form>
                    </Fragment>)}
            </div>
        </Fragment>

    )
};

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        userId: state.login.userId,
        token: state.login.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (id) => dispatch(actions.login(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);