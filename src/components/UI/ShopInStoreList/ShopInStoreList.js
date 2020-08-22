import React from 'react';
import classes from './ShopInStoreList.module.css';
import * as actions from '../../../store/actions';
import Reorder from 'react-reorder';
import LoadingImg from '../../../Login/loading.gif';
import { connect } from 'react-redux';

const ShopInStoreList = props => {

    const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        props.setOrder(props.listToShop, previousIndex, nextIndex, props.carId)
    }
    let list = '';
    if (props.listToShop.length > 0) {
        list = <Reorder
            reorderId="my-list"
            onReorder={onReorder.bind(this)}
            touchHoldTime={200}
            mouseHoldTime={200}
            holdTime={500}
            lock="horizontal"
            auto
        >
            {props.listToShop.map(item => {
                let itemName = item.name.replace('_', ' ');
                itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                const imageFormat = [
                    classes.ima,
                    item.checked ? classes.greyFormat : ''
                ]
                return (
                    <div key={itemName} className={classes.itemRow} onClick={() => props.checkItem(item.name)} >
                        <div className={imageFormat.join(' ')} >
                            <img
                                src={props.user === 'bladi' ? item.img_bladi : item.img_beli}
                                alt={itemName} />
                        </div>
                        <span className={item.checked ? classes.itemName : ''} >{itemName}</span>
                    </div>)
            })}
        </Reorder>
    }

    const handleListoButton = () => {
        let checkedItems = props.listToShop.find(item => item.checked === true)
        if (!checkedItems) return;

        props.clearAddedList(props.listToShop, props.carId)
    }

    return (
        <div className={classes.card} >
            <div className={classes.close} onClick={() => props.goShopping()} >X</div>
            <div className={classes.items} >
                {props.loading ? (
                    <div className={classes.loading} >
                        <img src={LoadingImg} alt='loading' />
                    </div>
                ) : list}
            </div>
            <div className={classes.button} >
                <button onClick={() => handleListoButton()} >Listo!</button>
            </div>
        </div>
    )

};

const mapStateToProps = state => {
    return {
        loading: state.car.loading,
        listToShop: state.car.listToShop,
        carId: state.car.carId,
        user: state.login.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goShopping: () => dispatch(actions.goShopping()),
        checkItem: (name) => dispatch(actions.checkItem(name)),
        clearAddedList: (added, carId) => dispatch(actions.clearAddedList(added, carId)),
        setOrder: (list, previousIndex, nextIndex, carId) => dispatch(actions.setOrder(list, previousIndex, nextIndex, carId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopInStoreList);