const contactsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTACTS':
            return action.contacts;
        case 'ADD_CONTACT':
            return [
                ...state,
                action.contact
            ]
        case 'REMOVE_CONTACT':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_CONTACT':
            return state.map((contact) => {
                if (contact.id === action.id) {
                    return {
                        ...action, 
                        ...action.updates
                    }
                } 
                else {
                    return contact;
                }
            });
        default:
            return state;
    }
};

export { contactsReducer as default };