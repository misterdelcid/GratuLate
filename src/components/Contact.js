import React from 'react';
import { connect } from 'react-redux';
import { startEditContact } from '../redux/actions/contacts';
import { withRouter } from 'react-router-dom';
import { IconButton } from './';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const Contact = (props) => {

    const handleDelete = () => {
        props.handleModalChange();
        props.handleSetContactID(props.id);
    };

    const handleEdit = (contactID) => {
        props.history.push(`/edit-contact/${props.id}`)
    };

    return (
        <StyledListItem first={props.first} last={props.last}>
            <StyledEmailAndButtons>
                <div>
                    <StyledContactName>{`${props.firstName} ${props.lastName}`}</StyledContactName>
                    <StyledEmailAddress>{props.emailAddress}</StyledEmailAddress>
                </div>
                <StyledButtonGroup>
                    {/* <Tooltip title="Delete">
                        <div>
                            <IconButton handleClick={() => handleDelete(props.id)}>
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Tooltip> */}
                    <Tooltip title="Edit">
                        <div>
                            <IconButton handleClick={() => handleEdit(props.contactID)}>
                                <EditOutlinedIcon fontSize="small" />
                            </IconButton>   
                        </div>
                    </Tooltip>
                </StyledButtonGroup>
            </StyledEmailAndButtons>
        </StyledListItem>
    );
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditContact: (id, contact) => dispatch(startEditContact(id, contact)),
});

const StyledListItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px 8px;
    margin: 0;
    ${props => !props.last ?
      `border-bottom: 1px solid ${props.theme.colors.grayE0};`:''}
    background-color: ${props => props.theme.colors.backgroundColor};
    height: 50px;
    border-radius: ${props => 
      ((props.first && props.last) && '8px') ||
      (props.first && '8px 8px 0 0') ||
      (props.last && '0 0 8px 8px')}
    ;
    @media (min-width: 600px) {
      padding: 8px 16px;
    }
`;

const StyledContactName = styled.h4`
    font-size: ${props => props.theme.fonts.primaryFontSize};
    margin: 8px 0 4px 0;
    font-weight: ${props => props.theme.fonts.mediumFontWeight};
`;

const StyledEmailAndButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledEmailAddress = styled.p`
    font-size: ${props => props.theme.fonts.secondaryFontSize};
    font-weight: ${props => props.theme.fonts.lightFontWeight};
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.gray21};
`;

const StyledButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
`;


export default withRouter(connect(undefined, mapDispatchToProps)(Contact));