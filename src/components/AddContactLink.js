import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AddContactLink = () => {
    return (
        <StyledLink to='/add-contact'>Add New Contact</StyledLink>
    )
};

const StyledLink = styled(Link)`
    margin: 4px 0 0 0;
    font-size: 13px;
    text-decoration: none;
    color: ${props => props.theme.colors.gray61};
    transition: ${props => props.theme.primaryTransition};
    &:hover {
      color: ${props => props.theme.colors.primaryColor};
    }
`;

export { AddContactLink as default };