import React from 'react';
import { ActionForm } from './';
import { connect } from 'react-redux';
import { startEditAction } from '../redux/actions/actions';

const EditActionPage = (props) => {
    return (
        <div>
            <h2>Edit Action</h2>
            <ActionForm 
                action={props.action}
                onSubmit={action => {
                    props.startEditAction(props.action.id, action)
                    props.history.push('/actions')
            }}  
            />
        </div>
    )
};

const mapStateToProps = (state, props) => ({
    action: state.actions.find(action => action.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditAction: (id, action) => dispatch(startEditAction(id, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditActionPage);