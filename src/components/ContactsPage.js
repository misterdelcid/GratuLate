import React from 'react';
import { ContactsList, SearchBar, Fab, Header } from './';
import styled from 'styled-components';

const ContactsPage = props => {
    return (
        <div>
            <StyledTitleAndSearch>
                <Header>Contacts</Header>
                <SearchBar />
            </StyledTitleAndSearch>
            <ContactsList />
            <Fab />
        </div>
    )
};

const StyledTitleAndSearch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export { ContactsPage as default };