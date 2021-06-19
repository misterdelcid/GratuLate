import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setContactTextFilter } from '../redux/actions/filters';
import { setActionTextFilter } from '../redux/actions/filters';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = (props) => {
    const path = props.location.pathname;
    return (
        <StyledSearchBar>
            <Input
                placeholder="search"
                value={path === '/actions' ? props.filters.actionText: props.filters.contactText}
                onChange={(e) => {
                    if (path === '/actions') {
                        props.dispatch(setActionTextFilter(e.target.value));
                    } else {
                        props.dispatch(setContactTextFilter(e.target.value));
                    }
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </StyledSearchBar>
    );
};

const mapStateToProps = state => {
    return {
        filters: state.filters
    }
};

const StyledSearchBar = styled.div`
    margin: 40px 0 0 0;
`;

export default withRouter(connect(mapStateToProps)(SearchBar));