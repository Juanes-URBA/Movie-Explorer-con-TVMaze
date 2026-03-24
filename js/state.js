const state = {
    shows: [],
    page: 1,
    limit: 20
};

export function setState(key, value){
    state[key] = value;
}

export function getState(key){
    return state[key];
}