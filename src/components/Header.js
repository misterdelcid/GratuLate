import React from 'react';
import styled from "styled-components";

const Header = (props) => {
    return (
        <StyledHeader>{props.children}</StyledHeader>
    )
};

const StyledHeader = styled.h3`
    font-size: 28px;
    font-weight: 900;
    margin: 40px 0 0 0;
`;

export { Header as default };