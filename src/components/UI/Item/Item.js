import React, { Fragment } from 'react';
import classes from './Item.module.css';
import { ReactComponent as Add } from '../assets/plus.svg';
import Delete from '../assets/remove.png';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as actions from '../../../store/actions';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import { ReactComponent as DeleteSvg } from '../assets/delete.svg';
import LongPress from 'react-long';
import Spinner from '../../../Login/loading.gif';

const Item = props => {

    let fontColor;
    if (props.userId === 'bladi') {
        fontColor = 'from_blad';
    }


    return (
        <Fragment>
            <div className={[classes.item_container, classes[fontColor]].join(' ')}  >
                {!props.loading && <button className={classes.item_add} onClick={() => { props.onAddItem(props.id) }}>
                    <Add />
                </button>}
                <div className={classes.item_ima_count}>
                    { 
                        props.selectedToDelete ? (
                            <div className={`${classes.item_ima} ${classes.delIcon}`} >
                                {props.loading ? (
                                    <div className={classes.loading} >
                                        <img src={Spinner} alt='Loading...' />
                                    </div>
                                ) : <DeleteSvg onClick={() => props.deleteItemContent(props.id, props.name)} />}
                            </div>
                        ) :
                            <LongPress
                                time={500}
                                key={props.id}
                                onLongPress={() => props.setToDeleteItem(props.id)}
                            >
                                <div className={classes.item_ima} onClick={() => { props.showCarOptions(props.name) }} >
                                    <LazyLoadImage
                                        alt={props.name}
                                        src={props.image}
                                        effect='black-and-white'
                                    />
                                </div>
                            </LongPress>
                    }
                    {!props.loading && <div className={classes.item_count}>
                        {props.amount}
                    </div>}
                </div>
                {!props.loading && <button disabled={props.amount < 1} className={classes.item_delete} onClick={() => { props.onDeleteItem(props.id) }}>
                    <img src={Delete} alt="Delete" />
                </button>}
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.login.userId,
        carOptionsOpen: state.car.showCarOptions,
        deleteItem: state.items.deleteItem,
        loading: state.items.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showCarOptions: (name) => { dispatch(actions.showCarOptions(name)) },
        closeCarOptions: () => { dispatch(actions.closeCarOptions()) },
        onDeleteItem: (itemId) => { dispatch(actions.deleteItem(itemId)) },
        onAddItem: (id) => dispatch(actions.addItem(id)),
        setToDeleteItem: (itemId) => dispatch(actions.onDeleteItem(itemId)),
        deleteItemContent: (itemId, name) => dispatch(actions.deleteItemContent(itemId, name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);