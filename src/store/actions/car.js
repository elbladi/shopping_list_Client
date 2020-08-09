import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { reorder } from 'react-reorder';

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

export const setCar = (car, carId) => {
    return {
        type: actionTypes.GET_CAR,
        car,
        carId
    }
}

export const getCar = carId => {
    return dispatch => {

        axios.get(process.env.REACT_APP_API + `/api/item/getCar/${carId}`)
            .then(resp => {
                if (resp.data) dispatch(setCar(resp.data.car, resp.data.carId));
                else dispatch(setCar([]));
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

const changeOrder = (newArray) => {
    return {
        type: actionTypes.SET_ORDER,
        newArray: newArray
    }
}

export const setOrder = (list, previousIndex, nextIndex, carId ) => {
    return dispatch => {
        const newArray = reorder(list, previousIndex, nextIndex)
        console.log(carId);

        axios.post(process.env.REACT_APP_API + '/api/item/setOrder', {carId, newArray})
            .then(_ => { })
            .catch(err => console.log(err));

        dispatch(changeOrder(newArray));
    }

}

export const handleGoShopping = () => {
    return {
        type: actionTypes.GO_SHOPPING
    }
}

export const goShopping = () => {
    return dispatch => {
        dispatch(setShowCar(false))
        dispatch(handleGoShopping())
    }
}

export const checkItem = (itemName) => {
    return {
        type: actionTypes.CHECK_ITEM,
        name: itemName
    }
}

const clearList = (newList) => {
    return {
        type: actionTypes.CLEAR_ADDED_LIST,
        list: newList
    }
}

export const clearAddedList = (addedList) => {
    return dispatch => {
        const newList = addedList.filter(item => item.checked !== true)
        axios.patch(process.env.REACT_APP_API + '/api/item/updateOrderedList', newList)
            .then(_ => dispatch(clearList(newList)))
            .catch(err => console.log(err));
    }
}

const initLoading = () => {
    return {
        type: actionTypes.INIT_LOADING
    }
}

const endLoading = () => {
    return {
        type: actionTypes.END_LOADING
    }
}

const itemsGettedToShop = items => {
    return {
        type: actionTypes.GET_LIST_SUCCESS,
        items
    }
}

export const getList = () => {
    return dispatch => {
        dispatch(initLoading());
        setTimeout(() => {
            axios.get(process.env.REACT_APP_API + '/api/item/getListToShop')
                .then(resp => {
                    dispatch(itemsGettedToShop(resp.data.items))
                }).catch(_ => {
                    dispatch(endLoading);
                })
        }, 1000)
    }
}

export const closeAddItem = () => {
    return {
        type: actionTypes.CLOSE_ADD_ITEM
    }
}


export const openAddItem = () => {
    return {
        type: actionTypes.OPEN_ADD_ITEM
    }
}

export const uploadNewItem = (formData, keep = false) => {
    return dispatch => {
        dispatch(initLoading());
        axios.post(process.env.REACT_APP_API + '/api/item/uploadItem', formData)
            .then(_ => {
                if (!keep) dispatch(closeAddItem())
                else dispatch(endLoading());
            }).catch(err => {
                dispatch(endLoading());
            })

    }
}
