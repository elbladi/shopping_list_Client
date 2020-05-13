import * as actionTypes from './actionTypes';



export const openFilter = () => {
    return {
        type: actionTypes.OPEN_FILTER_OPTIONS
    }
};

export const closeFilter = () => {
    return {
        type: actionTypes.CLOSE_FILTER
    }
}

