import React from 'react';
import { connect } from 'react-redux';
import { startEditContact } from '../redux/actions/contacts';
import { ContactForm } from './';


const EditContactPage = (props) => {
    return (
        <ContactForm 
            contact={props.contact}
            onSubmit={contact => {
                props.startEditContact(props.contact.id, contact);
                props.history.push('/contacts');
            }}
        />
    )
};

const mapStateToProps = (state, props) => ({
    contact: state.contacts.find(contact => contact.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditContact: (id, contact) => dispatch(startEditContact(id, contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContactPage);