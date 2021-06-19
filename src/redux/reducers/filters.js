const defaultFilterState = {
    actionText: '',
    contactText: '',
}

const filterReducer = (state = defaultFilterState, action) => {
    switch (action.type) {
        case 'SET_ACTION_TEXT_FILTER':
            return {
                ...state,
                actionText: action.text
            };
        case 'SET_CONTACT_TEXT_FILTER':
            return {
                ...state,
                contactText: action.text
            }
        default:
            return state
    }
}

export default filterReducer