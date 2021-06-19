import database from '../../firebase/firebase'

//Toggle Theme
export const toggleTheme = () => ({
    type: 'TOGGLE_THEME'
});

//Start Toggling the theme
export const startToggleTheme = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/theme`).once('value').then(snapshot => {
            const theme = snapshot.val();
            if (theme === 'light') return database.ref(`users/${uid}/theme`).set('dark').then(() => {
                return dispatch(toggleTheme());
            })
            return database.ref(`users/${uid}/theme`).set('light').then(() => {
                return dispatch(toggleTheme());
            })
        });
    };
};

//Set Theme
export const setTheme = (theme) => ({
    type: 'SET_THEME',
    theme
});

//Start Setting the Theme
export const startSetTheme = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/theme`).once('value').then(snapshot => {
            const theme = snapshot.val();
            if (theme === null) return database.ref(`users/${uid}/theme`).set('light');
            dispatch(setTheme(theme));
        });
    };
};