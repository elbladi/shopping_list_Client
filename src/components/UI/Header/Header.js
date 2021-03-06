import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import FilterOptions from './Options';

import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as Filter } from '../assets/filter.svg';
import { ReactComponent as Close } from '../assets/back.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';

import classes from './Header.module.css';
import { Redirect } from 'react-router-dom';
import Car from '../Car/Car';
import Backdrop from '../Backdrop/Backdrop';

const Header = (props) => {

    const [showFilter, setShowFilter] = useState(props.filter);

    let Icon = <Heart />;
    let logoutIcon = <Close />
    if (props.userId === 'bladi') {
        logoutIcon = <LogoutIcon className={classes.close_blad} />
        Icon = <Filter fill={'white'} />;
    }

    const logout = (event) => {
        event.preventDefault();
        props.onLogout();
        props.onSetItems();
        props.onLogoutFilter();
        props.socket.disconnect();
    }

    const changeFilter = (event) => {
        event.preventDefault();
        setShowFilter(!showFilter);
        props.onHandleFilter();
    }


    return (
        <Fragment>
            {props.token && <Redirect to='/' />}
            {props.showCar && (
                <>
                    <Backdrop show={props.showCar} clicked={() => props.setShowCar(false)} />
                    <Car />
                </>
            )}
            <div className={classes.header}>
                <div className={classes.close} onClick={(event) => logout(event)} > {logoutIcon} </div>
                <span onClick={() => props.setShowCar(true)} >My Shopping list</span>
                <FilterOptions visible={showFilter} click={(event) => changeFilter(event)} />
                {!showFilter && <div onClick={(event) => changeFilter(event)} className={classes.icon}> {Icon} </div>}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.login.userId,
        token: state.login.token == null,
        filter: state.filter.openfilter,
        socket: state.items.socket,
        showCar: state.car.showCar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onHandleFilter: () => dispatch(actions.openFilter()),
        onSetItems: () => dispatch(actions.setItems()),
        onLogoutFilter: () => dispatch(actions.closeFilter()),
        setShowCar: (show) => dispatch(actions.setShowCar(show))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);