import React from 'react'
import {IconButton as MaterialIconButton} from '@material-ui/core/'
import styled from 'styled-components'

const IconButton = props => (
    <StyledIconButton onClick={props.handleClick} disabled={props.disabled} color={props.color}>{props.children}</StyledIconButton>
)

const StyledIconButton = styled(MaterialIconButton)`
    /* &&& {
        color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.54)': props.theme.colors.gray61};
        :hover {
            color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.54)': props.theme.colors.gray21};
        }
    } */
`

export { IconButton as default };