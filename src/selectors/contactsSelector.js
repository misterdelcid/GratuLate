const getVisibleContacts = (contacts, text) => {
    return contacts.filter(contact => {
        const textMatch = contact.firstName.toLowerCase().includes(text.toLowerCase()) || contact.lastName.toLowerCase().includes(text.toLowerCase()) || contact.emailAddress.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    })
    .sort((a, b) => {
        return a.firstName > b.firstName ? 1: -1
    })
};

export { getVisibleContacts as default };