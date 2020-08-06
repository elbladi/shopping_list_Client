import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    added: [],
    showCarOptions: false,
    selected: "",
    existInList: false,
    showCar: false,
    goShopping: false,
    loading: false,
    listToShop: []
}

const showCarOptions = (state, action) => {
    let exist = false;
    const itemExist = state.listToShop.filter(item => item.name === action.selected)
    if (itemExist.length > 0) exist = true;

    return updateObject(state, {
        showCarOptions: true,
        selected: action.selected,
        existInList: exist
    })
}

const addToCar = (state, action) => {
    const newState = state.listToShop;
    const item = {
        name: action.name,
        checked: false
    }
    newState.push(item);
    return updateObject(state, { listToShop: newState })
}

const removeToCar = (state, action) => {
    const newState = state.listToShop.filter(item => item.name !== action.name);
    return updateObject(state, { listToShop: newState })
}

const closeCarOptions = (state, action) => {
    return updateObject(state, {
        showCarOptions: false,
        selected: ""
    })
}

const getCar = (state, action) => {
    return updateObject(state, {
        listToShop: action.car
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
    return updateObject(state, {
        listToShop: action.newArray
    });
}

const goShopping = (state, action) => {
    return updateObject(state, {
        goShopping: !state.goShopping
    })
}

const checkItem = (state, action) => {

    const oldList = [...state.listToShop];
    const index = oldList.map(item => item.name).indexOf(action.name)
    oldList[index].checked = !oldList[index].checked

    return updateObject(state, {
        listToShop: oldList
    });
}

const clearAddedList = (state, action) => {
    return updateObject(state, {
        listToShop: action.list,
        goShopping: false
    });
}

const initLoading = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const endLoading = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const getListSuccess = (state, action) => {
    return updateObject(state, {
        listToShop: action.items,
        loading: false
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
        case actionTypes.GO_SHOPPING: return goShopping(state, action);
        case actionTypes.CHECK_ITEM: return checkItem(state, action);
        case actionTypes.CLEAR_ADDED_LIST: return clearAddedList(state, action);
        case actionTypes.INIT_LOADING: return initLoading(state, action);
        case actionTypes.END_LOADING: return endLoading(state, action);
        case actionTypes.GET_LIST_SUCCESS: return getListSuccess(state, action);
        default: return state;
    }

};

export default reducer;