import React, { useEffect } from 'react';
import Reorder from 'react-reorder';
import classes from './Car.module.css';
import { ReactComponent as Mail } from '../assets/mail.svg';
import { ReactComponent as Delete } from '../assets/delete.svg';
import { ReactComponent as Empty } from '../assets/empty.svg';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

const Car = props => {
    const { getCar } = props;
    useEffect(() => {
        getCar();
    }, [getCar])

    const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        props.setOrder(props.added, previousIndex, nextIndex)
    }

    let list = '';
    if (props.added.length > 0) {
        list = <Reorder
            reorderId="my-list"
            onReorder={onReorder.bind(this)}
            touchHoldTime={200}
            holdTime={500}
            lock="horizontal"
        >
            {props.added.map(item => {
                let itemName = item.replace('_', ' ');
                itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                return (
                    <div key={item} className={classes.item} >
                        <div className={classes.itemName} >{itemName}</div>
                        <Delete onClick={() => props.removeToCar(item)} />
                    </div>
                )
            })}
        </Reorder>
    } else {
        list = <div className={classes.emptyCar} ><Empty /></div>
    }

    return (
        <div className={classes.carModal} >
            <div className={classes.header} >
                <div>MY SHOPPING CAR</div>
                {props.added.length > 0 && <Mail onClick={() => props.sendMail(props.added)} />}
            </div>
            <div className={classes.itemList} >
                {list}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        added: state.car.added
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeToCar: (name) => dispatch(actions.removeToCar(name)),
        sendMail: (car) => dispatch(actions.sendMail(car)),
        setOrder: (list, previousIndex, nextIndex) => dispatch(actions.setOrder(list, previousIndex, nextIndex)),
        getCar: () => dispatch(actions.getCar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);