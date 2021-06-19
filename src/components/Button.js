import React from 'react'
import styled from 'styled-components'
import {Button as MaterialButton} from '@material-ui/core'

const Button = props => (
    <StyledButton {...props}>{props.children}</StyledButton>
);

const StyledButton = styled(MaterialButton)`
  &&& {
    border-radius: 24px;
    margin-left: 8px;
    transition: ${(props) => props.theme.primaryTransition};
    padding: ${(props) => (props.large && "8px 32px") || "4px 32px"};
`;

export default Button