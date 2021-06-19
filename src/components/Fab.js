import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Fab as MuiFab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const Fab = (props) => {
    const path = props.location.pathname;
    return (
        <Link to={path === '/actions' ? '/add-action' : '/add-contact'}>
            <StyledFab color='primary'
                aria-label='add action'
            >
                <AddIcon />
            </StyledFab>
        </Link>
    )
};

const StyledFab = styled(MuiFab)`
    &&& {
    position: fixed;
    right: 2.5%;
    bottom: 48px;
    transition: ${props => props.theme.primaryTransition};
    @media (min-width: 600px) {
        right: 5%;
        }
    }
`;

export default withRouter(Fab);