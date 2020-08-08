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

    const compare = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    let itemList;
    if (props.items) {
        itemList = Object.keys(props.items).map(item => {
            return {
                id: item,
                name: props.items[item].name,
                count: props.items[item].count,
            }
        })
        if (props.byName)
            itemList = itemList.filter(item => item.name.toLowerCase().includes(props.name.toLowerCase()))


        if (props.byQuantity)
            itemList = itemList.filter(item => item.count === parseInt(props.quantity))

        itemList.sort(compare)
    }

    return (
        <div className={classes.items}>
            {props.loading && <div className={classes.spinner} ><img src={loading} alt='Loading' /></div>}
            {itemList.map(item => {
                const deleteItem = item === itemIdToDelete;
                return <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.count}
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