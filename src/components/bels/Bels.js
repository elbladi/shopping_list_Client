import React, { Fragment, useEffect, useCallback } from 'react';
import Background from '../UI/Background/Background';
import fondo from './assets/fondo.jpg';
import ShopInStoreList from '../UI/ShopInStoreList/ShopInStoreList';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Items from '../UI/Items/Items';
import openSocket from 'socket.io-client';
import ButtonUp from '../UI/Button/Button';
import CarHandler from '../UI/Car/CarHandler';
import Backdrop from '../UI/Backdrop/Backdrop';
import Upload from '../UI/UploadImage/Upload';

const Bels = props => {

    const { carId,
        onAddItem,
        onDeleteItem,
        getCar,
        deleteItem,
        deleteCancel,
        onDeleteContent,
        undoDelete } = props;

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
        socket.on('deleteContent', data => {
            if (data.itemId !== null) {
                onDeleteContent(data.itemId);
            }
        })
        socket.on('undoDeleteItem', data => {
            if (data.newItemId !== null) {
                undoDelete(data.name, data.newItemId);
            }
        })
        return () => socket.disconnect();
    }, [onAddItem, onDeleteItem, onDeleteContent, undoDelete]);

    useEffect(useCallback(() => {
        getCar(carId)
    }, [getCar, carId]))

    return (
        <Fragment>
            <Background background={fondo} />
            {deleteItem && <Backdrop show={deleteItem} clicked={() => deleteCancel()} />}
            {props.showAddItem ? <Upload /> : (
                props.goShopping ? <ShopInStoreList /> :
                    <>
                        <Items />
                        < ButtonUp
                            show={() => props.openAddItem()}
                            undo={props.deletedItem ? true : false}
                            clicked={() => props.undoButtonClicked(props.deletedItem.name)}
                        />
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
        carId: state.car.carId,
        deletedItem: state.items.deletedItem,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (itemId) => dispatch(actions.add(itemId)),
        onDeleteItem: (itemId) => dispatch(actions.remove(itemId)),
        getCar: (carId) => dispatch(actions.getCar(carId)),
        openAddItem: () => dispatch(actions.openAddItem()),
        deleteCancel: () => dispatch(actions.onDeleteItemCancel()),
        undoButtonClicked: (deletedItem) => dispatch(actions.undoButtonClicked(deletedItem)),
        onDeleteContent: (itemId) => dispatch(actions.onDeleteContent(itemId)),
        undoDelete: (name, id) => dispatch(actions.undoDelete(name, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bels);