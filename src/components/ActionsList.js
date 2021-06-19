import React, { useState } from 'react';
import { ActionItem, Modal, Snackbar, Header } from './';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startRemoveAction, startToggleCompleted, startToggleSent } from '../redux/actions/actions';
import getVisibleActions, { getSearchActions } from '../selectors/actionsSelector';
import styled from 'styled-components';

 
const ActionsList = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [actionID, setActionID] = useState(undefined);
    const actionsList = getVisibleActions(props.actions, props.current, props.filter);
    const searchList = getSearchActions(props.actions, props.filter);
    
    const actionsLength = actionsList.length;
    const searchListLength = searchList.length;

    const noActionsMessage = props => {
        const message = {
            actionsMessage: `You have no ${props.current ? 'current' : 'future'} actions right now`,
            searchMessage: 'No matches found. Try searching by another keyword',
        };
        if (actionsLength === 0 && props.filter === '' && props.current) return message.actionsMessage;
        if (searchListLength === 0 && props.current) return message.searchMessage;
        return false;
    };

    const modalMessage = {
      title: "Heads Up!",
      message:
        "This action will be permanently deleted. Would you still like to move forward?",
    };

    const setListHeader = () => {
        if (!props.current && props.filter === '' && actionsLength > 0) return 'Future Actions';
        return false;
    };

    const setActionList = () => {
        //Set non search list
        if (props.filter === '') return actionsList;
        //Set search list
        if (props.filter !== '') return searchList;
        return false;
    };

    const handleSnackbarMessage = (action) => {
        const message = () => {
            if (action === 'deleted') return 'Action Deleted';
            if (action === 'completed') return 'Action Completed';
            if (action === 'sent') return 'Message Sent';
            return false;
        }
        setSnackbarMessage(message);
    };

    const handleModalChange = () => {
        setModalOpen(!modalOpen);
    };

    const handleSetActionID = id => {
        setActionID(id);
    };

    const handleDelete = props => {
      props.startRemoveAction({ id: actionID });
      setModalOpen(!modalOpen);
      handleSnackbarMessage('deleted');
      setSnackbarOpen(true);
    };

    const handleCompleted = (id) => {
        props.startToggleCompleted(id, new Date());
        handleSnackbarMessage('completed');
        setSnackbarOpen(true);
    };

    const handleSend = (id) => {
        props.startToggleSent(id, new Date());
        props.startToggleCompleted(id, new Date());
        handleSnackbarMessage('sent');
        setSnackbarOpen(true);
    };

    return (
        <>
            <Modal 
                modalOpen={modalOpen}
                modalMessage={modalMessage}
                handleModalChange={handleModalChange}
                primaryAction={() => handleDelete(props)}
            />
            <Snackbar 
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
            />
            <Header>{setListHeader()}</Header>
            <StyledActionList actionsList={actionsLength} searchList={searchListLength} filter={props.filter}>
                {noActionsMessage(props) ? (
                    <div>{noActionsMessage(props)}</div>
                    ) : setActionList().map((actionItem, index) => (
                <ActionItem 
                    key={actionItem.id}
                    first={index === 0}
                    last={index === (setActionList().length-1)} 
                    {...actionItem}
                    handleModalChange={handleModalChange}
                    handleSetActionID={handleSetActionID}
                    handleCompleted={handleCompleted}
                    handleSend={handleSend}
                />
                ))}
            </StyledActionList>
        </>
    )
};

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveAction: (action) => dispatch(startRemoveAction(action)),
    startToggleCompleted: (id, date) => dispatch(startToggleCompleted(id, date)),
    startToggleSent: (id, date) => dispatch(startToggleSent(id, date)),
});

const mapStateToProps = (state, props) => {
    return {
        actions: state.actions,
        filter: state.filters.actionText,
    }
};

const StyledActionList = styled.div`
    border: 1px ${props => props.actionsList > 0 || (props.searchList > 0 && props.filter !== '') ? 'solid': 'none'} ${props => props.theme.colors.grayE0};
    margin: 40px 0 0 0;
    border-radius: 8px;
`

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsList));