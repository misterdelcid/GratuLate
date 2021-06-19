import React from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { cyan, purple } from '@material-ui/core/colors';
import AppRouter from './router/AppRouter';
import styled, { ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from './styles/themes'
import darkdoodle from './img/darkdoodle.svg';
import darkerdoodle from './img/darkerdoodle.svg';

const App = props => {
  const theme = createMuiTheme({
    palette: {
      type: props.theme === 'light' ? 'light': 'dark',
      primary: {
        main: props.theme === 'light' ? cyan[700]: purple[400],
      },
    },
  });

  return (
    <ThemeProvider theme={props.theme === 'light' ? lightTheme : darkTheme}>
    <MuiThemeProvider theme={theme}>
      <StyledApp mode={props.theme === 'light' ? 'light': 'dark'}>
        <AppRouter></AppRouter>
      </StyledApp>
    </MuiThemeProvider>
    </ThemeProvider>
  )};

const StyledApp = styled.div`
  min-height: calc(100vh - 40px);
  min-width: 96vw;
  height: 100%;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primaryFont};
  color: ${(props) => props.theme.colors.gray21};
  background-color: ${(props) => props.theme.colors.backgroundColor};
  background-image: url(${props => props.mode === 'light' ? darkdoodle: darkerdoodle});
  background-repeat: repeat;
  background-size: 400px;
  background-attachment: fixed;
  background-position: cover cover;
  padding: 0 0 40px 0;
`;

const mapStateToProps = state => ({
  theme: state.theme,
})

export default connect(mapStateToProps)(App);
