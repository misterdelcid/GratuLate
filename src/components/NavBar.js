import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { IconButton, NavList, NavMenu } from './';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';

const NavBar = (props) => {

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
    <NavBarContainer>
        <StyledNavBar>
            <StyledLogoBlock onClick={() => props.history.push("/actions")}>
                <StyledLogo />
                <div>
                    <h1>GratuLate</h1>
                    <p>An App for Delayed Appreciation</p>
                </div>
            </StyledLogoBlock>
            {props.isAuthenticated ? 
            <>
                <StyledNav>
                    <StyledNavLink to='/actions'>Home</StyledNavLink>
                    <StyledNavLink to='/contacts'>Contacts</StyledNavLink>
                    <NavMenu />
                </StyledNav>
                <StyledHamburgerIcon>
                    <IconButton handleClick={toggleDrawer('right', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        <div
                            role="presentation"
                            onClick={toggleDrawer('right', false)}
                            onKeyDown={toggleDrawer('right', false)}
                        >
                            <NavList />
                        </div> 
                    </Drawer>
                </StyledHamburgerIcon>
            </> :
            <div></div>
            }
        </StyledNavBar>
    </NavBarContainer>
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
});


const NavBarContainer = styled.div`
    width: 100%;
    background-color: transparent;
`;

const StyledNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 16px 0;
  margin: 0 auto 0 auto;
  background-color: transparent;
  width: ${(props) => props.theme.primaryWidth};
  z-index: 5;
  @media (min-width: 600px) {
    width: ${(props) => props.theme.secondaryWidth};
    max-width: ${(props) => props.theme.maxWidth};
  }`;

  const StyledLogoBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: ${props => props.theme.colors.gray21};
    h1 {
        font-size: 1.5em;
    }
    p {
        font-size: .75em;
    }
    a {
        text-decoration: none;
    }
`;

const StyledLogo = styled(EcoOutlinedIcon)`
  &&& {
    font-size: 48px;
    margin-right: 4px;
    color: ${(props) => props.theme.colors.primaryColor};
`;

const StyledNav = styled.nav`
    display: none;
    @media (min-width: 600px) {
      display: flex;
    }
`;

const StyledNavLink = styled(NavLink)`
    align-self: center;
    margin: 8px;
    text-decoration: none;
    color: ${props => props.theme.colors.gray21};
    transition: ${props => props.theme.primaryTransition};
    &:hover {
      color: ${props => props.theme.colors.primaryColor};
    }
    :active{
        color: ${props => props.theme.colors.primaryColorDark}
    }
`;

const StyledHamburgerIcon = styled.div`
    display: flex;
    @media (min-width: 600px) {
      display: none;
    }
`;

export default withRouter(connect(mapStateToProps)(NavBar));