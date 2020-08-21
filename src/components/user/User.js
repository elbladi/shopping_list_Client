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
import BottomButtons from '../UI/Button/Button';
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
        undoDelete,
        userId,
        images,
    } = props;

    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_API);
        socket.on('added', data => {
            if (data.itemId !== null)
                onAddItem(data.itemId);
        });
        socket.on('deleted', data => {
            if (data.itemId !== null)
                onDeleteItem(data.itemId);
        })
        socket.on('deleteContent', data => {
            if (data.userId === userId) return;
            if (data.itemId !== null)
                onDeleteContent(data.itemId, data.images);
        })
        socket.on('undoDeleteItem', data => {
            if (data.userId === userId) return
            if (data.newItem !== null) undoDelete(data.newItem);
        })
        return () => socket.disconnect();
    }, [onAddItem, onDeleteItem, onDeleteContent, undoDelete, userId])

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
                        < BottomButtons
                            show={() => props.openAddItem()}
                            undo={props.deletedItem ? true : false}
                            clicked={() => props.undoButtonClicked(props.deletedItem.name, images, userId)}
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
        images: state.items.imagesToDelete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (itemId) => dispatch(actions.add(itemId)),
        onDeleteItem: (itemId) => dispatch(actions.remove(itemId)),
        getCar: (carId) => dispatch(actions.getCar(carId)),
        openAddItem: () => dispatch(actions.openAddItem()),
        deleteCancel: () => dispatch(actions.onDeleteItemCancel()),
        undoButtonClicked: (deletedItem, images, userId) => dispatch(actions.undoButtonClicked(deletedItem, images, userId)),
        onDeleteContent: (itemId, images) => dispatch(actions.onDeleteContent(itemId, images, false)),
        undoDelete: (item) => dispatch(actions.undoDelete(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blad);