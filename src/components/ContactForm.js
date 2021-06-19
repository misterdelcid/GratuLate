import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from './';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const ContactForm = (props) => {
    const [firstName, setFirstName] = useState(props.contact ? props.contact.firstName : '');
    const [lastName, setLastName] = useState(props.contact ? props.contact.lastName : '');
    const [emailAddress, setEmailAddress] = useState(props.contact ? props.contact.emailAddress : '');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const modalMessage = {
        title: 'Heads up',
        message: 'Any unsaved changes will be permanently deleted. Would you still like to move forward?'
    };

    const onFirstNameChange = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onLastNameChange = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onEmailAddressChange = (e) => {
        const emailAddress = e.target.value;
        setEmailAddress(emailAddress);
    };

    const handleModalChange = () => {
        setModalOpen(!modalOpen);
    };

    const onCancel = (e) => {
        e.preventDefault();
        if (firstName || lastName || emailAddress) {
            handleModalChange();
        }
        else {
            props.history.push('/contacts');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newContact = {
            firstName,
            lastName,
            emailAddress
        };
        if (!firstName || !lastName || !emailAddress) {
            setError('Please make sure that all fields are completed');
        }
        else {
            setError('');
            props.onSubmit({...newContact});
        }
    };
    return (
        <>
            <Modal 
                modalOpen={modalOpen}
                modalMessage={modalMessage}
                handleModalChange={handleModalChange}
                primaryAction={() => props.history.push('/contacts')}
            />
            {error && <p>{error}</p>}
            <StyledForm>
                <StyledFirstAndLastName>
                    <StyledFirstNameField 
                        label="First Name"
                        value={firstName}
                        onChange={onFirstNameChange}
                    />
                    <StyledLastNameField 
                        label="Last Name"
                        value={lastName}
                        onChange={onLastNameChange}
                    />
                </StyledFirstAndLastName>
                <StyledTextField 
                    label="Email Address"
                    type="email"
                    value={emailAddress}
                    onChange={onEmailAddressChange}
                />
                <StyledButtonGroup>
                    <Button 
                        onClick={onCancel}
                    >
                            Cancel
                    </Button>
                    <Button 
                        onClick={onSubmit}
                        color='primary'
                        variant='contained'
                    >
                        Submit
                    </Button>
                </StyledButtonGroup>
            </StyledForm>
        </>
    )
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding-bottom: 0px;
    margin: 24px auto 0px auto;
    background-color: transparent;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 0 0;
`;

const StyledFirstAndLastName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 600px) {
        flex-direction: row;
    }
`;

const StyledFirstNameField = styled(TextField)`
    &&& {
        margin: 8px 0;
    }
    @media (min-width: 600px) {
        width: 42.5vw;
    }
`;

const StyledLastNameField = styled(TextField)`
    &&& {
        margin: 8px 0;
    }
    @media (min-width: 600px) {
        width: 42.5vw;
    }
`;

const StyledTextField = styled(TextField)`
    &&& {
        margin: 8px 0;
    }
`;

export default withRouter(ContactForm);