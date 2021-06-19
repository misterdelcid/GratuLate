import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { startLogout } from '../redux/actions/auth';
import { startToggleTheme } from '../redux/actions/theme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const NavList = (props) => {
    const NavLinks = [
    {
        link: 'Home',
        icon: <HomeOutlinedIcon />,
        path: '/actions'
    },
    {
        link: 'Add Action',
        icon: <CheckBoxOutlinedIcon />,
        path: '/add-action',
    },
    {
        link: 'Contacts',
        icon: <PersonOutlineOutlinedIcon />,
        path: '/contacts',
    }, 
    {
        link: props.theme === 'light' ? 'Dark Theme': 'Light Theme',
        icon: props.theme === 'light' ? <Brightness3Icon />: <Brightness7Icon />,
        func: () => props.startToggleTheme(),
    },
    {
        link: 'Logout',
        icon: <ExitToAppOutlinedIcon />,
        func: () => props.startLogout(),
    }];

    return (
        <List>
            {NavLinks.map((NavLink, index) => (
                <ListItem button key={NavLink.link} onClick={NavLink.path ? () => props.history.push(NavLink.path): NavLink.func}>
                    <ListItemIcon>
                        {NavLink.icon}
                    </ListItemIcon>
                    <ListItemText primary={NavLink.link} />
                </ListItem>
            ))}
        </List>
    )
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout()),
    startToggleTheme: () => dispatch(startToggleTheme()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavList));