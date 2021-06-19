import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { LoginPage, NavBar, AddActionPage, PageNotFound, HomePage, ContactsPage, EditActionPage, AddContactPage, EditContactPage } from '../components';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import styled from 'styled-components';

export const history = createHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
          <NavBar />
          <StyledContainer>
            <Switch>
              <PublicRoute path='/login' component={LoginPage} />
              <PrivateRoute path='/actions' component={HomePage} />
              <PrivateRoute path='/add-action' component={AddActionPage} />
              <PrivateRoute path='/edit-action/:id' component={EditActionPage} />
              <PrivateRoute path='/contacts' component={ContactsPage} />
              <PrivateRoute path='/add-contact' component={AddContactPage} />
              <PrivateRoute path='/edit-contact/:id' component={EditContactPage} />
              <Route component={PageNotFound} />
            </Switch>
          </StyledContainer>
        </Router>
    )
};

const StyledContainer = styled.div`
  width: ${(props) => props.theme.primaryWidth};
  margin 0 auto; 
  @media (min-width: 600px) {
    width: ${(props) => props.theme.secondaryWidth};
    max-width: ${(props) => props.theme.maxWidth};
  }
`;

export { AppRouter as default };