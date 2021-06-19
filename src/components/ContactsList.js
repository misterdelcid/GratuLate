import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveContact } from '../redux/actions/contacts';
import { Contact, Modal, Snackbar } from './';
import getVisibleContacts from '../selectors/contactsSelector';
import styled from 'styled-components';

const ContactsList = props => {
    const contactsList = getVisibleContacts(props.contacts, props.filter);
    const [modalOpen, setModalOpen] = useState(false);
    const [contactID, setContactID] = useState(undefined);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const modalMessage = {
        title: "Heads Up!",
        message:
            "This action will be permanently deleted. Would you still like to move forward?",
    };

    const contactsLength = contactsList.length;

    const noContactsMessage = props => {
        const message = {
            actionsMessage: (<p>You have no contacts yet. <Link to='add-contact'>Add a contact</Link> to get started</p>),
            searchMessage: 'No matches found. Try searching by another keyword',
        };
        if (contactsLength === 0 && props.filter === '') return message.actionsMessage;
        if (contactsLength === 0 && props.filter !=='') return message.searchMessage;
        return false;
    };

    const handleModalChange = () => {
        setModalOpen(!modalOpen);
    };

    const handleSetContactID = id => {
        setContactID(id);
    };

    const handleDelete = props => {
        props.startRemoveContact({ id: contactID });
        setModalOpen(!modalOpen);
        setSnackbarOpen(true);
    };

    return (
        <>
            <Modal 
                modalOpen={modalOpen}
                modalMessage={modalMessage}
                handleModalChange={handleModalChange}
                primaryAction={() => handleDelete(props)}
            />
            <Snackbar 
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage='Contact Deleted'
            />
            <StyledContactList contactsLength={contactsLength}>
                {noContactsMessage(props) ? (
                    <div>{noContactsMessage(props)}</div>
                    ) : contactsList.map((contact, index) => (
                    <Contact 
                        key={contact.contactID} 
                        first={index === 0}
                        last={index === (contactsLength-1)}
                        {...contact} 
                        handleModalChange={handleModalChange}
                        handleSetContactID={handleSetContactID} 
                    />
                ))}
            </StyledContactList>
        </>
    );
};

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveContact: (contact) => dispatch(startRemoveContact(contact)),
});

const mapStateToProps = (state, props) => {
    return {
        contacts: state.contacts,
        filter: state.filters.contactText,
    }
}

const StyledContactList = styled.div`
    border: 1px ${props => props.contactsLength > 0 ? 'solid': 'none'} ${props => props.theme.colors.grayE0};
    margin: 40px 0;
    border-radius: 8px;
`

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);