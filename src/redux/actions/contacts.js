import database from '../../firebase/firebase';

//Action for adding a new contact
export const addContact = (contact) => ({
    type: 'ADD_CONTACT',
    contact
});

//Function to dispatch addContact
export const startAddContact = (contactData) => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            firstName = '',
            lastName = '',
            emailAddress = '',
        } = contactData
        const contact = {firstName, lastName, emailAddress}
        database.ref(`users/${uid}/contacts`).push(contact).then(ref => {
            dispatch(addContact({
                id: ref.key,
                ...contact
            }));
        });
    });
};

//Action for removing a contact
export const removeContact = ({id} = {}) => ({
    type: 'REMOVE_CONTACT',
    id
});

//Function to dispatch removeContact
export const startRemoveContact =({id} = {}) => {
    return((dispatch, getState) => {
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/contacts/${id}`).remove().then(() => {
            dispatch(removeContact({id}));
        });
    });
};

//Action for editing a contact
export const editContact = (id, updates) => ({
    type: 'EDIT_CONTACT',
    id, 
    updates
});

//Function to dispatch editContact
export const startEditContact = (id, updates) => {
    return((dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/contacts/${id}`).update(updates).then(() => {
            dispatch(editContact(id, updates));
        });
    });
};

//Action for setting contacts
export const setContacts = (contacts) => ({
    type: 'SET_CONTACTS',
    contacts
});

//Function to dispatch setContacts
export const startSetContacts = () => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/contacts`).once('value').then(snapshot => {
            const contacts = [];
            snapshot.forEach(childSnapshot => {
                contacts.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setContacts(contacts));
        });
    });
};

