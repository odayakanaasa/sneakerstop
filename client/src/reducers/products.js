let defaultState = {
    isFetching: false,
    quote: '',
    authenticated: false
}

const products = (state = defaultState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                quote: action.response,
                authenticated: action.authenticated || false
            });
        case PRODUCT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}