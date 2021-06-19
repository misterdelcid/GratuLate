import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionsList, SearchBar, Fab, Header } from './';
import styled from 'styled-components';



const HomePage = (props) => {
     const setListHeader = () => {
        if (props.actions.length === 0 || props.contacts.length === 0) return 'Get Started';
        if (props.filter !== '') return 'Search Results';
        return 'Current Actions';
    };

    const setGetStartedMessage = () => {
        if ((props.actions.length === 0 && props.contacts.length === 0) || props.contacts.length === 0) 
        return (<StyledMessage>You have no contacts yet. <Link to='add-contact'>Add a contact</Link> to get started</StyledMessage>);
        if (props.actions.length === 0)  
            return (<StyledMessage>You have no actions yet. <Link to='add-action'>Add an action</Link> to get started</StyledMessage>);
        return false;
    };

    return (
        <div>
            <StyledTitleAndSearch>
                <Header>{setListHeader()}</Header>
                <SearchBar />
            </StyledTitleAndSearch>
            {setGetStartedMessage() ? 
                setGetStartedMessage()
                :
                <>
                    <ActionsList current={true} />
                    {(props.filter === '') && <ActionsList current={false} />}
                    <Fab />
                </>
            }
        </div>
    )
};

const mapStateToProps = (state,props) => ({
    actions: state.actions,
    contacts: state.contacts,
    filter: state.filters.actionText,
});

const StyledTitleAndSearch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledMessage = styled.div`
    margin: 24px 0;
`;

export default connect(mapStateToProps)(HomePage);