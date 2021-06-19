import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin } from '../redux/actions/auth';
import styled from 'styled-components';
import { Button } from './';
import Google from '../img/google-brands.svg';

const LoginPage = ({ startGoogleLogin }) => (
    <div>
        <StyledLoginPage>
            <Button 
                color='primary'
                variant='contained'
                onClick={startGoogleLogin}
            ><img src={Google} alt="Google-logo" />Log in with Google Account
            </Button>
        </StyledLoginPage>
    </div>
);

const StyledLoginPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 36px 80px;
    border-radius: 8px;
    padding: 36px 0;
    background-color: transparent;
    button {
        margin: 8px 0;
    }
    img {
        height: 24px;
        margin-right: 16px;
        color: white;
    }
`;


const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);