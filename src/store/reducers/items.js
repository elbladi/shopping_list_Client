import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    items: [],
    byName: false,
    byQuantity: false,
    name: "",
    quantity: null,
    socket: null,
    loading: false,
    deleteItem: false,
    itemIdToDelete: '',
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
        loading: false
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

const initLoading = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const endLoading = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const onDeleteItem = (state, action) => {
    return updateObject(state, {
        deleteItem: true,
        itemIdToDelete: action.itemId
    })
}

const onDeleteItemCancel = (state, action) => {
    return updateObject(state, {
        deleteItem: false,
        itemIdToDelete: ''
    })
}

const onDeleteContent = (state, action) => {
    let itemsCopy = { ...state.items };
    delete (itemsCopy[action.itemId]);

    return updateObject(state, {
        deleteItem: false,
        itemIdToDelete: '',
        items: itemsCopy
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
        case actionTypes.INIT_LOADING_ITEMS: return initLoading(state, action);
        case actionTypes.END_LOADING_ITEMS: return endLoading(state, action);
        case actionTypes.ON_DELETE_ITEM: return onDeleteItem(state, action);
        case actionTypes.ON_DELETE_ITEM_CANCEL: return onDeleteItemCancel(state, action);
        case actionTypes.DELETE_ITEM_CONTENT: return onDeleteContent(state, action);

        default: return state;
    };
};

export default reducer;