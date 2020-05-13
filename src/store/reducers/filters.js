import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    openfilter: false
};

const openFilterr = (state, action) => {
    return updateObject(state, {
        openfilter: !state.openfilter
    });
};

const closeFilter = (state, action) => {
    return updateObject(state, {
        openfilter: false
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_FILTER_OPTIONS: return openFilterr(state, action);
        case actionTypes.CLOSE_FILTER: return closeFilter(state, action);
        default: return state;
    }
};

export default reducer;