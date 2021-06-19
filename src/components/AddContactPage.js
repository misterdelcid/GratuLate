import React from 'react';
import { connect } from 'react-redux';
import { ContactForm, Header } from './';
import { startAddContact } from '../redux/actions/contacts';

const AddContactPage = props => {
    return (
        <>
            <Header>Add Contact</Header>
            <ContactForm 
                onSubmit={contact => {
                    props.startAddContact(contact);
                    props.history.push('/contacts');
                }}
                onCancel={e => e.preventdefault()} 
            />
        </>
    )
};

const mapDispatchToProps = dispatch => ({
    startAddContact: contact => dispatch(startAddContact(contact))
});

export default connect(undefined, mapDispatchToProps)(AddContactPage);