const getSearchActions = (actions, text) => {
    return actions
    .filter((action) => {
        const textMatch = action.subject.toLowerCase().includes(text.toLowerCase()) || action.message.toLowerCase().includes(text.toLowerCase()) || action.recipientName.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    })
    .sort((a, b) => {
        return new Date(a.reminder) < new Date(b.reminder) ? -1: 1;
    })
};

const getVisibleActions = (actions, current, text) => {
    return actions
    .filter((action) => {
        const textMatch = action.subject.toLowerCase().includes(text.toLowerCase()) || action.message.toLowerCase().includes(text.toLowerCase()) || action.recipientName.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    })
    .filter((action) => {
        const ActionsList = current ? new Date(action.reminder) <= new Date() : new Date(action.reminder) > new Date();
        return ActionsList;
    })
    .filter((action) => {
        const ActionsList = action.completed === false;
        return ActionsList;
    })
    .sort((a, b) => {
        return new Date(a.reminder) < new Date(b.reminder) ? -1: 1;
    })
};

export { getSearchActions, getVisibleActions as default };