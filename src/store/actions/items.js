import * as actionTypes from './actionTypes';
import axios from '../../axios';
import storage from '../../helper/firebase';

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
        // dispatch(getItems(items, null))
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

export const onDeleteContent = (itemId, images, canUndo) => {
    return {
        type: actionTypes.DELETE_ITEM_CONTENT,
        itemId,
        images,
        canUndo
    }
}

export const deleteItemContent = (itemId, userId, itemName) => {
    return dispatch => {
        dispatch(initLoading());
        axios.patch(process.env.REACT_APP_API + '/api/item/deleteContent', { itemId, userId })
            .then(resp => {
                if (resp.status === 200) {
                    dispatch(onDeleteContent(itemId, resp.data, true))
                    setTimeout(() => {
                        dispatch(removeUndoButton(itemName));
                    }, 1000 * 60)
                }
                dispatch(endLoading());
            })
            .catch(_ => dispatch(endLoading()))
    }
}

export const undoDelete = (item) => {
    if (!item.id) return;
    const itemId = item.id;
    delete (item['id']);
    return {
        type: actionTypes.UNDO_DELETE,
        item,
        itemId
    }
}

export const undoButtonClicked = (deletedName, images, userId) => {
    return dispatch => {
        dispatch(initLoading());
        axios.post(process.env.REACT_APP_API + `/api/item/undoDeleteItem`, { deletedName, images, userId })
            .then(resp => {
                if (resp.status === 200) dispatch(undoDelete(resp.data));

            }).catch(_ => dispatch(endLoading()));
    }
}

const removeUndoBtn = () => {
    return {
        type: actionTypes.REMOVE_UNDO_BUTTON
    }
}

const removeUndoButton = itemName => {
    return dispatch => {
        dispatch(removeUndoBtn());
        try {
            const ref = storage.ref();
            ref.child(`bladi/${itemName}.png`).delete()
                .then(_ => {
                    ref.child(`beli/${itemName}.png`).delete()
                        .then(_ => { }).catch(err => { throw err })
                }).catch(err => {
                    throw err
                });
        } catch (error) { }
    }
}

