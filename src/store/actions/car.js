import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { reorder } from 'react-reorder';
import storage from '../../helper/firebase';

export const showCarOptions = (item) => {
    return {
        type: actionTypes.SHOW_CAR_OPTIONS,
        item,
    }
}

export const add = (name, docId) => {
    return {
        type: actionTypes.ADD_TO_CAR,
        name: name,
        docId
    }
}

export const remove = (name) => {
    return {
        type: actionTypes.REMOVE_TO_CAR,
        name: name
    }
}

export const addToCar = (item) => {
    return dispatch => {
        console.log(item);
        axios.post(process.env.REACT_APP_API + `/api/item/addToCar`, item)
            .then(resp => {
                if (resp.data.message === `${item.name} ADDED TO CAR`) {
                    dispatch(add(item.name, resp.data.docId));
                    dispatch(closeCarOptions());
                }
            })
            .catch(err => { })
    }
}

export const removeToCar = (name, carId) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API + `/api/item/removeToCar/${name}`, { carId })
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

export const setOrder = (list, previousIndex, nextIndex, carId) => {
    return dispatch => {
        const newArray = reorder(list, previousIndex, nextIndex)

        axios.post(process.env.REACT_APP_API + '/api/item/setOrder', { carId, newArray })
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

const clearList = (newList, carId) => {
    return {
        type: actionTypes.CLEAR_ADDED_LIST,
        list: newList,
        carId
    }
}

export const clearAddedList = (addedList, carId) => {
    return dispatch => {
        const newList = addedList.filter(item => item.checked !== true)
        axios.patch(process.env.REACT_APP_API + '/api/item/updateOrderedList', { newList, carId })
            .then(resp => dispatch(clearList(newList, resp.data.carId)))
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

const uploadImg = (user, name, pickedFile) => {
    return new Promise((resolve, reject) => {
        try {
            const uploadTask = storage.ref().child(`${user}/${name}.png`).put(pickedFile);
            uploadTask.on('state_changed', () => { }, err => { throw err },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(url => {
                            resolve(url);
                        }).catch(err => { throw err });
                });
        } catch (error) {
            reject(error);
        }
    });
}

export const uploadNewItem = (name, pickedFile, close) => {
    return dispatch => {
        dispatch(initLoading());

        try {
            uploadImg('bladi', name, pickedFile).then(img_bladi => {
                uploadImg('beli', name, pickedFile).then(img_beli => {
                    const item = {
                        name,
                        img_bladi,
                        img_beli
                    }
                    axios.post(process.env.REACT_APP_API + '/api/item/uploadItem', item)
                        .then(_ => {
                            if (close) dispatch(closeAddItem())
                            else dispatch(endLoading());
                        }).catch(err => { throw err })
                }).catch(err => { throw err })
            }).catch(err => { throw err });
        } catch (error) {
            dispatch(endLoading());
        }
    }
}
