import React, { Fragment, useEffect, useCallback } from 'react';
import fondoBeli from './assets/fondoBeli.jpg';
import fondoBladi from './assets/fondoBladi.png';
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

    const { carId,
        onAddItem,
        onDeleteItem,
        getCar,
        deleteItem,
        deleteCancel,
        onDeleteContent,
        setDeletedItemToNull,
        undoDelete,
        userId,
    } = props;

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
        socket.on('onDeletedForever', data => {
            if (data.name) {
                setDeletedItemToNull(data.name);
            }
        })

        return () => socket.disconnect();
    }, [onAddItem, onDeleteItem, onDeleteContent, undoDelete, setDeletedItemToNull])

    useEffect(useCallback(() => {
        getCar(carId)
    }, [getCar, carId]))

    return (
        <Fragment>
            {<Background background={userId === 'bladi' ? fondoBladi : fondoBeli} />}
            {deleteItem && <Backdrop show={deleteItem} clicked={() => deleteCancel()} />}
            <Upload show={props.showAddItem} />
            {!props.showAddItem && (
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
            )}

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
        userId: state.login.userId,
    }
}

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
        setDeletedItemToNull: (itemName) => dispatch(actions.setDeletedItemToNull(itemName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blad);