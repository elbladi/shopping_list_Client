import React, { useEffect } from 'react';
import { ReactComponent as Checked } from '../assets/checked.svg';
import { ReactComponent as Unchecked } from '../assets/unchecked.svg';
import classes from './ShopInStoreList.module.css';
import * as actions from '../../../store/actions';
import Reorder from 'react-reorder';
import LoadingImg from '../../../Login/loading.gif';
import { connect } from 'react-redux';

const ShopInStoreList = props => {

    const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        props.setOrder(props.listToShop, previousIndex, nextIndex)
    }

    const { getList } = props;

    useEffect(() => {
        getList();
    }, [getList])

    let list = '';
    if (props.listToShop.length > 0) {
        list = <Reorder
            reorderId="my-list"
            onReorder={onReorder.bind(this)}
            touchHoldTime={200}
            holdTime={500}
            lock="horizontal"
        >
            {props.listToShop.map(item => {
                let itemName = item.name.replace('_', ' ');
                itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                return (
                    <div key={item.name} className={classes.itemRow} onClick={() => props.checkItem(item.name)} >
                        {item.checked ? <Checked /> : <Unchecked />}
                        <span className={item.checked ? classes.itemName : ''} >{itemName}</span>
                    </div>
                )
            })}
        </Reorder>
    }

    const handleListoButton = () => {
        let checkedItems = props.listToShop.find(item => item.checked === true)
        if (!checkedItems) return;

        props.clearAddedList(props.listToShop)
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
        added: state.car.added,
        loading: state.car.loading,
        listToShop: state.car.listToShop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goShopping: () => dispatch(actions.goShopping()),
        getList: () => dispatch(actions.getList()),
        checkItem: (name) => dispatch(actions.checkItem(name)),
        clearAddedList: (added) => dispatch(actions.clearAddedList(added)),
        setOrder: (list, previousIndex, nextIndex) => dispatch(actions.setOrder(list, previousIndex, nextIndex)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopInStoreList);