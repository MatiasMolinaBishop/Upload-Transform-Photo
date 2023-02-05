export const INITIAL_STATE = {
    loading: false,
    img: {},
    download: false
}

export const reducer = (state, action) => {

    switch (action.type) {
        case 'START':
            return {
                loading: true,
                img: {},
                download: false
            }
        case 'POSTED':
            return {
                loading: false,
                img: action.payload,
                download: true
            }
        default:
            return state
    }
}