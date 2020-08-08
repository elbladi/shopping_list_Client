import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const add = (name) => {
    return {
        type: actionTypes.ADD_ITEM,
        name: name
    }
}

export const addItem = (name, user) => {
    return dispatch => {
        try {
            axios.patch(process.env.REACT_APP_API + '/api/item/addItem',
                { itemName: name });
        } catch (error) {

        }
    }
};

export const remove = (name) => {
    return {
        type: actionTypes.DELETE_ITEM,
        name: name
    };
}

export const deleteItem = (name, user) => {
    return dispatch => {
        try {
            axios.patch(process.env.REACT_APP_API + '/api/item/deleteItem',
                { itemName: name });
        } catch (error) {

        }
    }
};


export const getItems = (items) => {
    return {
        type: actionTypes.GET_ALL_ITEMS,
        items: items
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
                    items = resp.data;
                    dispatch(getItems(items));
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

const onDeleteContent = (itemId) => {
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