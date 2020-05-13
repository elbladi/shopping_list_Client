import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    items: null,
    byName: false,
    byQuantity: false,
    name: "",
    quantity: null,
    socket: null
}

const addItem = (state, action) => {
    const item = { [action.name]: state.items[action.name] + 1 };
    const newItems = updateObject(state.items, item);
    const updState = {
        items: newItems
    };
    return updateObject(state, updState);
}

const deleteItem = (state, action) => {
    const item = { [action.name]: state.items[action.name] - 1 };
    const newItems = updateObject(state.items, item);
    const updState = {
        items: newItems
    };
    return updateObject(state, updState);
}

const getAllItems = (state, action) => {
    const items = {
        items: action.items,
        byName: false,
        byQuantity: false,
        name: "",
        quantity: null,
    };
    return updateObject(state, items);
}

const setItems = (state, action) => {
    return updateObject(state, {
        items: null
    })
}

const searchByName = (state, action) => {
    return updateObject(state, {
        byName: true,
        byQuantity: false,
        name: action.name,
        quantity: null
    })
}
const searchByQuantity = (state, action) => {
    return updateObject(state, {
        byQuantity: true,
        byName: false,
        name: "",
        quantity: action.q
    })
}

const showAll = (state, action) => {
    return updateObject(state, {
        byName: false,
        byQuantity: false,
        name: "",
        quantity: null,
    })
}

const setSocket = (state, action) => {
    return updateObject(state, {
        socket: action.socket
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.DELETE_ITEM: return deleteItem(state, action);
        case actionTypes.GET_ALL_ITEMS: return getAllItems(state, action);
        case actionTypes.SET_ITEMS: return setItems(state, action);
        case actionTypes.SEARCH_BY_NAME: return searchByName(state, action);
        case actionTypes.SEARCH_BY_QUANTITY: return searchByQuantity(state, action);
        case actionTypes.SHOW_ALL: return showAll(state, action);
        case actionTypes.SET_SOCKET: return setSocket(state, action);
        default: return state;
    };
};

export default reducer;