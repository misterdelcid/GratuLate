const actionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIONS':
      return action.actions;
    case 'ADD_ACTION':
      return [
        ...state,
        action.action
      ];
    case 'REMOVE_ACTION':
      return state.filter(({id}) => id !== action.id);
    case 'EDIT_ACTION':
      return state.map((actionItem) => {
        if (actionItem.id === action.id) {
          return {
            ...action,
            ...action.updates
          }
        }
        else {
          return actionItem
        }
      });
    case 'TOGGLE_COMPLETED':
      return state.map((actionItem) => {
        if (actionItem.id !== action.id) {
          return {
             ...actionItem
          }
        }
        else {
           return {
            ...actionItem,
            completed: !actionItem.completed,
            completedDate: action.date,
           }
        }
      });
    case 'TOGGLE_SENT':
      return state.map((actionItem) => {
        if (actionItem.id !== action.id) {
          return {
             ...actionItem
          }
        }
        else {
           return {
            ...actionItem,
            sent: !actionItem.completed,
            sentDate: action.date,
           }
        }
      });
    default:
      return state
  } 
};

export { actionsReducer as default};