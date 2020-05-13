import React, { Fragment, useEffect, useCallback } from 'react';
import fondo from './assets/fondo.png';
import Background from '../UI/Background/Background';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Items from '../UI/Items/Items';
import openSocket from 'socket.io-client';
import ButtonUp from '../UI/Button/Button';
import CarHandler from '../UI/Car/CarHandler';

const Blad = props => {

    const { getItems, onAddItem, onDeleteItem, setSocket, getCar } = props;

    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_API);
        socket.on('added', data => {
            if (data.item !== null) {
                onAddItem(data.item);
            }
        });
        socket.on('deleted', data => {
            if (data.item !== null) {
                onDeleteItem(data.item);
            }
        })
        setSocket(socket);
    }, [onAddItem, onDeleteItem, setSocket])

    useEffect(useCallback(() => {
        getItems();
    }, [getItems]), [getItems]);

    useEffect(() => {
        getCar()
    }, [getCar])



    return (
        <Fragment>
            {<Background background={fondo} />}
            {props.items && <Items />}
            <ButtonUp />
            <CarHandler />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        items: state.items.items !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(actions.getAllItems()),
        onAddItem: (name) => dispatch(actions.add(name)),
        onDeleteItem: (name) => dispatch(actions.remove(name)),
        setSocket: (socket) => dispatch(actions.setSocket(socket)),
        getCar: () => dispatch(actions.getCar())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blad);