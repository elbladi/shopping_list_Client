import React from 'react';
import classes from './ItemInList.module.css';

const ItemInList = props => {
    const { clicked, checked, itemName, image } = props

    const imageFormat = [
        classes.ima,
        checked ? classes.greyFormat : ''
    ]

    return (
        <div className={classes.itemRow} onClick={() => clicked()} >
            {/* {checked ? <Checked /> : <Unchecked />} */}
            <div className={imageFormat.join(' ')} >
                <img src={image} alt={itemName} />
            </div>
            <span className={checked ? classes.itemName : ''} >{itemName}</span>
        </div>
    );
};

export default ItemInList;