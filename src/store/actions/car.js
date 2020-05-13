import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const showCarOptions = (name) => {
    return {
        type: actionTypes.SHOW_CAR_OPTIONS,
        selected: name
    }
}

export const add = name => {
    return {
        type: actionTypes.ADD_TO_CAR,
        name: name
    }
}

export const remove = (name) => {
    return {
        type: actionTypes.REMOVE_TO_CAR,
        name: name
    }
}

export const addToCar = (name) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API + `/api/item/addToCar/${name}`)
            .then(resp => {
                if (resp.data.message === `${name} ADDED TO CAR`) {
                    dispatch(add(name));
                    dispatch(closeCarOptions());
                }
            })
            .catch(err => { })
    }
}

export const removeToCar = (name) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API + `/api/item/removeToCar/${name}`)
            .then(resp => {
                if (resp.data.message === `${name} REMOVED TO CAR`) {
                    dispatch(remove(name));
                    dispatch(closeCarOptions());
                }
            })
            .catch(err => { })
    }
}

export const closeCarOptions = () => {
    return {
        type: actionTypes.CLOSE_CAR_OPTIONS,
    }
}

export const setCar = (car) => {
    return {
        type: actionTypes.GET_CAR,
        car: car
    }
}

export const getCar = () => {
    return dispatch => {

        axios.get(process.env.REACT_APP_API + '/api/item/getCar')
            .then(resp => {
                if (resp.data.car) {
                    const newCar = Object.keys(resp.data.car).map(c => c);
                    dispatch(setCar(newCar));
                } else {
                    dispatch(setCar([]));
                }
            })
            .catch(err => { })
    }
}

export const send = () => {
    return {
        type: actionTypes.SEND_MAIL
    }
}

export const sendMail = (car) => {
    return dispatch => {
        const carToSend = {
            items: car
        };
        console.log(carToSend);
        axios.post(process.env.REACT_APP_API + '/api/item/sendEmail', carToSend)
            .then(resp => {
                dispatch(setShowCar(false))
                dispatch(send())
            })
            .catch(err => { })

    }
}

export const setShowCar = (show) => {
    return {
        type: actionTypes.SHOW_CAR,
        show: show
    }
}

export const setOrder = (list, previousIndex, nextIndex) => {
    return {
        type: actionTypes.SET_ORDER,
        list: list,
        previousIndex: previousIndex,
        nextIndex: nextIndex
    }
}
