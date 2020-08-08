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

    const { getItems, onAddItem, onDeleteItem, getCar, deleteItem, deleteCancel } = props;

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
        return () => socket.disconnect();
    }, [onAddItem, onDeleteItem])

    // useEffect(() => {
    //     getItems();
    // }, [getItems]);

    useEffect(useCallback(() => {
        getCar()
    }, [getCar]), [])


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
        deleteItem: state.items.deleteItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (name) => dispatch(actions.add(name)),
        onDeleteItem: (name) => dispatch(actions.remove(name)),
        getCar: () => dispatch(actions.getCar()),
        openAddItem: () => dispatch(actions.openAddItem()),
        deleteCancel: () => dispatch(actions.onDeleteItemCancel())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blad);