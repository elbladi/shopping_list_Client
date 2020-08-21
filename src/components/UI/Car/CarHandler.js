import React, { Fragment } from 'react';
import { ReactComponent as Add } from '../assets/add.svg';
import { ReactComponent as Del } from '../assets/del.svg';
import classes from './CarHandler.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Backdrop from '../Backdrop/Backdrop';

const Car = (props) => {

    let isVisible = "slide_out";
    if (props.showCar) {
        isVisible = "slide_in"
    }

    return (
        <Fragment>
            <Backdrop show={props.showCar} clicked={() => props.onCloseCarOptions()} />
            <div className={[classes.images, classes[isVisible]].join(' ')} >
                {!props.exist && <Add onClick={() => props.onAddToCar(props.selectedItem)} />}
                {props.exist && <Del onClick={() => props.onRemoveToCar(props.selectedItem, props.carId)} />}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showCar: state.car.showCarOptions,
        selectedItem: state.car.selected,
        carList: state.car.added,
        exist: state.car.existInList,
        carId: state.car.carId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCar: (item) => dispatch(actions.addToCar(item)),
        onRemoveToCar: (name, carId) => dispatch(actions.removeToCar(name, carId)),
        onCloseCarOptions: () => dispatch(actions.closeCarOptions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);