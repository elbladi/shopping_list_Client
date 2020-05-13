import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import classes from './Options.module.css';

const Filter = props => {

    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const { onSearchName, onSearchQuantity, onSeeAll } = props;

    useEffect(useCallback(() => {
        const timeout = setTimeout(() => {
            if (itemName !== "")
                onSearchName(itemName);
            else
                onSeeAll();
        }, 200);
        return () => clearTimeout(timeout);
    }, [onSeeAll, itemName, onSearchName]), [itemName, onSearchName, onSeeAll]);

    useEffect(useCallback(() => {
        const timeout = setTimeout(() => {
            if (quantity !== "")
                onSearchQuantity(quantity);
            else
                onSeeAll();
        }, 200);
        return () => clearTimeout(timeout);
    }, [onSeeAll, quantity, onSearchQuantity]), [quantity, onSearchQuantity, onSeeAll]);

    const onReset = () => {
        setItemName("");
        setQuantity("");
        props.onSeeAll();
    }


    let isVisible = "slide_out";
    if (props.visible) {
        isVisible = "slide_in"
    }

    return (
        <ul className={[classes.options, classes[isVisible]].join(" ")} >
            <li onClick={(event) => props.click(event)} >x</li>
            <li>Articulo:
                    <input value={itemName} onChange={(event) => setItemName(event.target.value)} type='text' />
            </li>
            <li>Cantidad:
                    <input value={quantity} onChange={(event) => setQuantity(event.target.value)} type='number' />
            </li>
            <li onClick={() => onReset()} >Ver todos</li>
        </ul>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchName: (itemName) => dispatch(actions.searchByName(itemName)),
        onSearchQuantity: (quantity) => dispatch(actions.searchByQuantity(quantity)),
        onSeeAll: () => dispatch(actions.showAll())
    }
}


export default connect(null, mapDispatchToProps)(Filter);