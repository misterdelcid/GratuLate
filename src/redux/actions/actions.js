import database from '../../firebase/firebase';

//Action for adding a new action item
export const addAction = (action) => ({
    type: 'ADD_ACTION',
    action,
});

//Function to dispatch AddAction
export const startAddAction = (actionData) => {
    return((dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            recipientID = '',
            recipientName = '',
            subject = '',
            message = '',
            timeFrame = '',
            date = '',
            endDate = '',
            reminder = '',
            completed = '',
            completedDate = '',
            createdAt = '',
            lastEdited = '',
            sent = '',
            sentDate = '',
        } = actionData
        const action = {
            recipientID,
            recipientName,
            subject,
            message,
            timeFrame,
            date,
            endDate,
            reminder,
            completed,
            completedDate,
            createdAt,
            lastEdited,
            sent,
            sentDate,
        }

        database.ref(`users/${uid}/actions`).push(action).then(ref => {
            dispatch(addAction({
                id: ref.key,
                ...action,
            }));
        });
    });
};

//Action to remove action item
export const removeAction = ({id} = {}) => ({
    type: 'REMOVE_ACTION',
    id
});

//Function to dispatch removeAction
export const startRemoveAction = ({id} = {}) => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/actions/${id}`).remove().then(() => {
            dispatch(removeAction({ id }));
        });
    });
};

//Action to edit an action item
export const editAction = (id, updates) => ({
    type: 'EDIT_ACTION',
    id, 
    updates
});

//Function to dispatch editAction
export const startEditAction = (id, updates) => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/actions/${id}`).update(updates).then(() => {
            dispatch(editAction(id, updates));
        });
    });
};

//Action to set action as completed
export const toggleCompleted = (id, date) => ({
    type: 'TOGGLE_COMPLETED',
    id, 
    date
});

//Function to dispatch toggleCompleted
export const startToggleCompleted = (id, date) => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;

        database.ref(`users/${uid}/actions/${id}`).update({completed: true, completedDate: date.toString()}).then(() => {
            dispatch(toggleCompleted(id, date));
        });
    });
};

//Action to set action as sent
export const toggleSent = (id, date) => ({
    type: 'TOGGLE_SENT',
    id, 
    date
});

//Function to dispatch toggleSent
export const startToggleSent = (id, date) => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;

        database.ref(`users/${uid}/actions/${id}`).update({sent: true, sentDate: date.toString()}).then(() => {
            dispatch(toggleSent(id, date));
        });
    });
};

//Action to set list of action items
export const setActions = (actions) => ({
    type: 'SET_ACTIONS',
    actions
});

//Function to setActions
export const startSetActions = () => {
    return ((dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/actions`).once('value').then(snapshot => {
            const actions = [];
            snapshot.forEach(childSnapshot => {
                actions.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setActions(actions));
        });
    });
};