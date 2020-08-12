import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const add = (itemId) => {
    return {
        type: actionTypes.ADD_ITEM,
        itemId
    }
}

export const addItem = (itemId) => {
    return dispatch => {
        try {
            axios.patch(process.env.REACT_APP_API + '/api/item/addItem', { itemId });
        } catch (_) { }
    }
};

export const remove = (itemId) => {
    return {
        type: actionTypes.DELETE_ITEM,
        itemId
    };
}

export const deleteItem = (itemId) => {
    return dispatch => {
        try {
            axios.patch(process.env.REACT_APP_API + '/api/item/deleteItem',
                { itemId });
        } catch (error) {

        }
    }
};


export const getItems = (items, deleted) => {
    return {
        type: actionTypes.GET_ALL_ITEMS,
        items: items,
        deleted
    }
}

const initLoading = () => {
    return {
        type: actionTypes.INIT_LOADING_ITEMS
    }
}

const endLoading = () => {
    return {
        type: actionTypes.END_LOADING_ITEMS
    }
}


export const getAllItems = () => {
    return dispatch => {
        dispatch(initLoading());
        let items
        try {
            axios.get(process.env.REACT_APP_API + '/api/item/getItems')
                .then(resp => {
                    items = resp.data.items;
                    const deleted = resp.data.deleted ? { ...resp.data.deleted } : null;
                    dispatch(getItems(items, deleted));
                })
                .catch(_ => dispatch(endLoading()));
        } catch (_) {
            dispatch(endLoading())
        }
    }
}

export const setItems = () => {
    return {
        type: actionTypes.SET_ITEMS
    }
}


export const searchByName = (name) => {
    return {
        type: actionTypes.SEARCH_BY_NAME,
        name: name
    }
}
export const searchByQuantity = (q) => {
    return {
        type: actionTypes.SEARCH_BY_QUANTITY,
        q: q
    }
}

export const showAll = () => {
    return {
        type: actionTypes.SHOW_ALL
    }
}

export const setSocket = (socket) => {
    return {
        type: actionTypes.SET_SOCKET,
        socket: socket
    }
}

export const onDeleteItem = (itemId) => {
    return {
        type: actionTypes.ON_DELETE_ITEM,
        itemId
    }
}

export const onDeleteItemCancel = () => {
    return {
        type: actionTypes.ON_DELETE_ITEM_CANCEL
    }
}

export const onDeleteContent = (itemId) => {
    return {
        type: actionTypes.DELETE_ITEM_CONTENT,
        itemId
    }
}

export const deleteItemContent = (itemId, name) => {
    return dispatch => {
        dispatch(initLoading());
        axios.patch(process.env.REACT_APP_API + '/api/item/deleteContent', { itemId, name })
            .then(resp => {
                if (resp.status === 200) dispatch(onDeleteContent(itemId))
                dispatch(endLoading());
            })
            .catch(_ => dispatch(endLoading()))
    }
}

export const undoDelete = (name, id) => {
    return {
        type: actionTypes.UNDO_DELETE,
        name,
        id
    }
}

export const undoButtonClicked = deletedName => {
    return dispatch => {
        dispatch(initLoading());
        axios.get(process.env.REACT_APP_API + `/api/item/undoDeleteItem/${deletedName}`)
            .then(resp => {
                if (resp.status === 200) {
                    // const newItemId = resp.data;
                    // dispatch(undoDelete(deletedName, newItemId));
                }
            }).catch(_ => dispatch(endLoading()));
    }
}

export const setDeletedItemToNull = () => {
    return {
        type: actionTypes.SET_DELETED_ITEM_TO_NULL
    }
}