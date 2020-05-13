import React from 'react';
import { connect } from 'react-redux';
import Item from '../Item/Item';
import classes from './Items.module.css';

const Items = props => {

    let itemList;

    if (props.items) {

        itemList = Object.keys(props.items).map(item => {
            return { name: item, q: props.items[item] };
        });

        if (props.byName) {
            itemList = itemList.filter(item => item.name.includes(props.name.toLowerCase()))
        }

        if (props.byQuantity) {
            itemList = itemList.filter(item => item.q === parseInt(props.quantity))
        }
    }



    return (
        <div className={classes.items}>
            {
                props.items && itemList.map(item => {
                    return <Item
                        key={item.name}
                        name={item.name}
                        amount={item.q}
                    />
                })
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
        byName: state.items.byName,
        byQuantity: state.items.byQuantity,
        name: state.items.name,
        quantity: state.items.quantity
    };
};

export default connect(mapStateToProps)(Items);