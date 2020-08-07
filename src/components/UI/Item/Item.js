import React, { Fragment } from 'react';
import classes from './Item.module.css';
import { ReactComponent as Add } from '../assets/plus.svg';
import Delete from '../assets/remove.png';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as actions from '../../../store/actions';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
// import useLongPress from '../../hooks/useLongPress';

const Item = props => {

    // const backspaceLongPress = useLongPress(() => props.showCarOptions(props.name), 500);
    //{...backspaceLongPress}
    let fontColor;
    if (props.userId === 'bladi') {
        fontColor = 'from_blad';
    }


    return (
        <Fragment>
            <div className={[classes.item_container, classes[fontColor]].join(' ')}  >
                <button className={classes.item_add} onClick={() => { props.onAddItem(props.name) }}>
                    <Add />
                </button>
                <div className={classes.item_ima_count}>
                    <div className={classes.item_ima} onClick={() => { props.showCarOptions(props.name) }} >
                        <LazyLoadImage
                            alt={props.name}
                            src={props.image}
                            effect='black-and-white'
                        />
                    </div>
                    <div className={classes.item_count}>
                        {props.amount}
                    </div>
                </div>
                <button disabled={props.amount < 1} className={classes.item_delete} onClick={() => { props.onDeleteItem(props.name) }}>
                    <img src={Delete} alt="Delete" />
                </button>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.login.userId,
        carOptionsOpen: state.car.showCarOptions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showCarOptions: (name) => { dispatch(actions.showCarOptions(name)) },
        closeCarOptions: () => { dispatch(actions.closeCarOptions()) },
        onDeleteItem: (name) => { dispatch(actions.deleteItem(name)) },
        onAddItem: (name) => dispatch(actions.addItem(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);