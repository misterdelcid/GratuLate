import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IconButton } from './';
import { startLogout } from '../redux/actions/auth';
import { startToggleTheme } from '../redux/actions/theme';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';

const NavMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.startLogout();
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton aria-controls="nav-menu" aria-haspopup="true" handleClick={handleClick}>
                <PersonOutlinedIcon />
            </IconButton>
            <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={() => props.startToggleTheme()}>{props.theme === 'light' ? 'Dark Theme': 'Light Theme'}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout()),
    startToggleTheme: () => dispatch(startToggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);