import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Item from '../Item/Item';
import * as actions from '../../../store/actions';
import classes from './Items.module.css';
import loading from '../../../Login/loading.gif';

const Items = props => {

    const { getItems, itemIdToDelete } = props;

    useEffect(() => {
        getItems();
    }, [getItems])


    // if (props.items) {
    //     console.log(props.items);
    //     itemList = props.items.map(item => {
    //         return { name: item, q: props.items[item] };
    //     });

    //     if (props.byName) {
    //         itemList = itemList.filter(item => item.name.includes(props.name.toLowerCase()))
    //     }

    //     if (props.byQuantity) {
    //         itemList = itemList.filter(item => item.q === parseInt(props.quantity))
    //     }
    // }



    return (
        <div className={classes.items}>
            {props.loading && <div className={classes.spinner} ><img src={loading} alt='Loading' /></div>}
            {Object.keys(props.items).map(item => {
                const deleteItem = item === itemIdToDelete;
                return <Item
                    key={item}
                    id={item}
                    name={props.items[item].name}
                    amount={props.items[item].count}
                    selectedToDelete={deleteItem}
                />
            })}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
        byName: state.items.byName,
        byQuantity: state.items.byQuantity,
        name: state.items.name,
        quantity: state.items.quantity,
        loading: state.items.loading,
        itemIdToDelete: state.items.itemIdToDelete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(actions.getAllItems()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);