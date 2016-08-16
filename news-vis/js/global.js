var state = {
    posts: [],
    sources: [],
    page: null,
    filter: 'posts',
    isFetching: true,
    isRefreshing: true,
    next: null
}

var J = {
    setState: function(newState) {
        state = newState;
    },
    setProp: function (prop, value) {
        if ( state[prop] === undefined ) return null;
        state[prop] = value;
        return state;
    },
    getProp: function(prop, value) {
        if ( state[prop] === undefined ) return null;
        return state[prop];
    },
    getState: function() {
        return state;
    }
}
