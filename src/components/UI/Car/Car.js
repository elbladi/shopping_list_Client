import React, { useEffect } from 'react';
import Reorder from 'react-reorder';
import classes from './Car.module.css';
import { ReactComponent as Delete } from '../assets/delete.svg';
import { ReactComponent as Empty } from '../assets/empty.svg';
import * as actions from '../../../store/actions';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

const Car = props => {
    const { getCar, carId, show } = props;
    useEffect(() => {
        getCar(carId);
    }, [getCar, carId])

    const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        props.setOrder(props.added, previousIndex, nextIndex, carId)
    }

    let list = '';
    if (props.added.length > 0) {
        list = <Reorder
            reorderId="my-listx"
            onReorder={onReorder.bind(this)}
            touchHoldTime={200}
            holdTime={500}
            lock="horizontal"
        >
            {props.added.map(item => {
                let itemName = item.name.replace('_', ' ');
                itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                return (
                    <div key={item.name} className={classes.item} >
                        <div className={classes.itemName} >{itemName}</div>
                        <Delete onClick={() => props.removeToCar(item.name, carId)} />
                    </div>
                )
            })}
        </Reorder>
    } else {
        list = <div className={classes.emptyCar} ><Empty /></div>
    }

    const animationTiming = {
        enter: 300,
        exit: 300
    }

    return (
        <CSSTransition
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            appear
            classNames={{
                enterActive: classes.openCarActive,
                exitActive: classes.closeCarActive,
            }}
            in={show}>
            <div className={classes.carModal} >
                <div className={classes.header} >
                    <div className={classes.go} onClick={() => props.goShopping()} ><span>Go Shopping!</span></div>
                    <div>MY SHOPPING CAR</div>
                </div>
                <div className={classes.itemList} >
                    {list}
                </div>
            </div>
        </CSSTransition>
    )
}

const mapStateToProps = state => {
    return {
        added: state.car.listToShop,
        carId: state.car.carId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeToCar: (name, carId) => dispatch(actions.removeToCar(name, carId)),
        sendMail: (car) => dispatch(actions.sendMail(car)),
        setOrder: (list, previousIndex, nextIndex, carId) => dispatch(actions.setOrder(list, previousIndex, nextIndex, carId)),
        getCar: (carId) => dispatch(actions.getCar(carId)),
        goShopping: () => dispatch(actions.goShopping())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);