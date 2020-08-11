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
    deletedItem: null,
}

const addItem = (state, action) => {
    const itemId = action.itemId;

    const newItem = {
        ...state.items[itemId]
    }
    newItem.count += 1;

    const tempItems = { ...state.items };
    delete (tempItems[itemId])
    tempItems[itemId] = { ...newItem };

    return updateObject(state, {
        items: tempItems
    });
}

const deleteItem = (state, action) => {
    const itemId = action.itemId;

    const newItem = {
        ...state.items[itemId]
    }
    newItem.count -= 1;

    const tempItems = { ...state.items };
    delete (tempItems[itemId])
    tempItems[itemId] = { ...newItem };

    return updateObject(state, {
        items: tempItems
    });
}

const getAllItems = (state, action) => {
    const items = {
        items: action.items,
        byName: false,
        byQuantity: false,
        name: "",
        quantity: null,
        loading: false,
        deletedItem: action.deleted
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
    const itemToDelete = {
        name: itemsCopy[action.itemId].name,
        checked: false
    }
    delete (itemsCopy[action.itemId]);

    return updateObject(state, {
        deleteItem: false,
        itemIdToDelete: '',
        items: itemsCopy,
        deletedItem: itemToDelete
    })
}

const undoDelete = (state, action) => {
    const newList = { ...state.items }
    newList[action.id] = {
        name: action.name,
        count: 0
    }

    return updateObject(state, {
        items: newList,
        deletedItem: null,
        loading: false
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
        case actionTypes.UNDO_DELETE: return undoDelete(state, action);

        default: return state;
    };
};

export default reducer;