import React, { Fragment, useEffect, useCallback } from 'react';
import fondo from './assets/fondo.png';
import Background from '../UI/Background/Background';
import Backdrop from '../UI/Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Items from '../UI/Items/Items';
import ShopInStoreList from '../UI/ShopInStoreList/ShopInStoreList';
import openSocket from 'socket.io-client';
import ButtonUp from '../UI/Button/Button';
import CarHandler from '../UI/Car/CarHandler';
import Upload from '../UI/UploadImage/Upload';

const Blad = props => {

    const { carId, onAddItem, onDeleteItem, getCar, deleteItem, deleteCancel } = props;

    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_API);
        socket.on('added', data => {
            if (data.itemId !== null) {
                onAddItem(data.itemId);
            }
        });
        socket.on('deleted', data => {
            if (data.itemId !== null) {
                onDeleteItem(data.itemId);
            }
        })
        return () => socket.disconnect();
    }, [onAddItem, onDeleteItem])

    useEffect(useCallback(() => {
        getCar(carId)
    }, [getCar, carId]))

    return (
        <Fragment>
            {<Background background={fondo} />}
            {deleteItem && <Backdrop show={deleteItem} clicked={() => deleteCancel()} />}
            {props.showAddItem ? <Upload /> : (
                props.goShopping ? <ShopInStoreList /> :
                    <>
                        <Items />
                        < ButtonUp show={() => props.openAddItem()} />
                        <CarHandler />
                    </>
            )
            }
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        items: state.items.items !== null,
        goShopping: state.car.goShopping,
        showAddItem: state.car.showAddItem,
        deleteItem: state.items.deleteItem,
        carId: state.car.carId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (itemId) => dispatch(actions.add(itemId)),
        onDeleteItem: (itemId) => dispatch(actions.remove(itemId)),
        getCar: (carId) => dispatch(actions.getCar(carId)),
        openAddItem: () => dispatch(actions.openAddItem()),
        deleteCancel: () => dispatch(actions.onDeleteItemCancel())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blad);