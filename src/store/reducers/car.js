import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { reorder } from 'react-reorder';

const initialState = {
    added: [],
    showCarOptions: false,
    selected: "",
    existInList: false,
    showCar: false
}

const showCarOptions = (state, action) => {
    let exist = false;
    if (state.added.includes(action.selected)) {
        exist = true;
    }
    return updateObject(state, {
        showCarOptions: true,
        selected: action.selected,
        existInList: exist
    })
}

const addToCar = (state, action) => {
    const newState = state.added;
    newState.push(action.name);
    return updateObject(state, { added: newState })
}

const removeToCar = (state, action) => {
    const newState = state.added.filter(item => item !== action.name);
    return updateObject(state, { added: newState })
}

const closeCarOptions = (state, action) => {
    return updateObject(state, {
        showCarOptions: false,
        selected: ""
    })
}

const getCar = (state, action) => {
    return updateObject(state, {
        added: action.car
    })
}

const setShowCar = (state, action) => {
    return updateObject(state, {
        showCar: action.show
    })
}

const sendEmail = (state, action) => {
    return updateObject(state, {
        added: []
    })
}

const setOrder = (state, action) => {
    const newArray = reorder(state.added, action.previousIndex, action.nextIndex)
    return updateObject(state, {
        added: newArray
    });
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SHOW_CAR_OPTIONS: return showCarOptions(state, action);
        case actionTypes.ADD_TO_CAR: return addToCar(state, action);
        case actionTypes.REMOVE_TO_CAR: return removeToCar(state, action);
        case actionTypes.CLOSE_CAR_OPTIONS: return closeCarOptions(state, action);
        case actionTypes.GET_CAR: return getCar(state, action);
        case actionTypes.SHOW_CAR: return setShowCar(state, action);
        case actionTypes.SEND_MAIL: return sendEmail(state, action);
        case actionTypes.SET_ORDER: return setOrder(state, action);
        default: return state;
    }

};

export default reducer;