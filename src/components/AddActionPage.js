import React from 'react';
import { ActionForm, Header} from './';
import { connect } from 'react-redux';
import { startAddAction } from '../redux/actions/actions';

const AddActionPage = (props) => {
    return (
        <div>
            <Header>Add Action</Header>
            <ActionForm 
                onSubmit={action => {
                    props.startAddAction(action);
                    props.history.push('/actions');
                }}
                onCancel={e => e.preventdefault()} 
            />
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    startAddAction: action => dispatch(startAddAction(action))
});

export default connect(undefined, mapDispatchToProps)(AddActionPage);