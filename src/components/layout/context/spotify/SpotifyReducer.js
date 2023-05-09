const spotifyReducer = (state, action) => {
    switch (action.type) {
        case "GET_ARTISTS":
            return {
                ...state,
                artists: action.payload,
                loading: false,
                accessToken: action.accessTokenPayload,
            };
        case "SET_LOADING":
            return { ...state, loading: true };
        case "CLEAR_ARTISTS":
            return { ...state, artists: [] };
        default:
            return state;
    }
};

export default spotifyReducer;
