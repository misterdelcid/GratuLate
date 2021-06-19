import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startEditAction } from '../redux/actions/actions';
import { IconButton } from './';
import moment from 'moment';
import emailjs from 'emailjs-com';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

const ActionItem = (props) => {
    
    const contact = {
        firstName: props.contact.firstName,
        lastName: props.contact.lastName,
        emailAddress: props.contact.emailAddress,
    };


    const sendEmail = () => {
        emailjs.send('service_87tyo5n', 'template_ul4ysco', templateParams, 'user_41tQL1RCTDvvj1BQCIosI')
        .then((result) => {
        console.log(result.text);
        }, (error) => {
        console.log(error.text);
        });
        props.handleSend(props.id);
    };

    const handleDelete = () => {
        props.handleModalChange();
        props.handleSetActionID(props.id);
    };


    const handleEdit = () => {
        props.history.push(`/edit-action/${props.id}`)
    };

    const setCompletedStatus = () => {
        //Set Completed Status
        if (props.completed) return (<Tooltip title={`Completed: ${moment(props.completedDate).format('MM/DD/YYYY')}`}><Chip label="Completed" variant="outlined" size="small" /></Tooltip>);
        //Set Current Status
        if (!(props.completed) && new Date(props.reminder) <= new Date()) return (<Tooltip title={`Reminder: ${moment(props.reminder).format('MM/DD/YYYY')}`}><Chip label="Current" variant="outlined" size="small" /></Tooltip>);
        //Set Future Status
        if (!(props.completed) && new Date(props.reminder) > new Date()) return (<Tooltip title={`Reminder: ${moment(props.reminder).format('MM/DD/YYYY')}`}><Chip label="Future" variant="outlined" size="small" /></Tooltip>);
        return false;
    };
    
    const templateParams = {
        recipient: contact.emailAddress,
        subject: props.subject,
        message: props.message,
    };

    const momentParams = {
    sameDay: 'MM/DD/YYYY',
    nextDay: 'MM/DD/YYYY',
    nextWeek: 'MM/DD/YYYY',
    lastDay: 'MM/DD/YYYY',
    lastWeek: 'MM/DD/YYYY',
    sameElse: 'MM/DD/YYYY',
    };
    
    return(
    <StyledListItem first={props.first} last={props.last}>
        <StyledActionSubjectAndStatus>
            <div>
                <StyledActionSubject>{props.subject}</StyledActionSubject>
                <StyledMessage>{props.message}</StyledMessage>
            </div>
            <div>
                {props.filter && setCompletedStatus()}
            </div>
        </StyledActionSubjectAndStatus>
        
        <StyledNameDateAndButtons>
            <StyledNameAndDate>{`For: ${props.recipientName} ${props.filter && ` - ${moment(props.reminder).calendar(null, momentParams)}`}`}</StyledNameAndDate>
            <StyledButtonGroup>
                <Tooltip title="Delete" arrow>
                    <div>
                        <IconButton handleClick={() => handleDelete()}>
                                <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Tooltip>
                <Tooltip title="Edit" arrow>
                    <div>
                        <IconButton handleClick={() => handleEdit()}>
                            <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Tooltip>
                <Tooltip title="Mark as Complete" arrow>
                    <div>
                        <IconButton handleClick={() => props.handleCompleted(props.id)} disabled={props.completed}>
                            <DoneOutlinedIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Tooltip>
                <Tooltip title="Send" arrow>
                    <div>
                        <IconButton handleClick={() => sendEmail()} disabled={props.completed}>
                            <SendOutlinedIcon 
                                fontSize="small" 
                            />
                        </IconButton>
                    </div>
                </Tooltip>
            </StyledButtonGroup>
        </StyledNameDateAndButtons>
    </StyledListItem>
)};

const mapStateToProps = (state, props) => {
    return {
        contact: state.contacts.find(contact => contact.id === props.recipientID),
        filter: state.filters.actionText,
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditAction: (id, action) => dispatch(startEditAction(id, action)),
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
    height: 100px;
    border-radius: ${props => 
      ((props.first && props.last) && '8px') ||
      (props.first && '8px 8px 0 0') ||
      (props.last && '0 0 8px 8px')}
    ;
    @media (min-width: 600px) {
      padding: 8px 16px;
    }
`;

const StyledActionSubjectAndStatus = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 0 0 0;
`;

const StyledActionSubject = styled.h4`
    font-size: ${props => props.theme.fonts.primaryFontSize};
    margin: 0 0 8px 0;
    font-weight: ${props => props.theme.fonts.mediumFontWeight};
`;

const StyledMessage = styled.p`
    font-size: ${props => props.theme.fonts.secondaryFontSize};
    font-weight: ${props => props.theme.fonts.lightFontWeight};
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.gray21};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    max-height: 55px;
`;

const StyledNameDateAndButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledNameAndDate = styled.p`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: ${props => props.theme.fonts.lightFontWeight};
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.gray75};
`;

const StyledButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
`;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionItem));