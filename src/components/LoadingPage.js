import React from 'react';
import styled from 'styled-components';
import CircularProgress from "@material-ui/core/CircularProgress";
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';


const LoadingPage = () => (
  <StyledLoading>
    <StyledLoadingDiv>
      <StyledLogo />
      <StyledLoadingMessage>GratuLate</StyledLoadingMessage>
    </StyledLoadingDiv>
    <StyledProgress />
  </StyledLoading>
);

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image: linear-gradient(to right top, #AA00FF, #0097a7);
`;

const StyledLogo = styled(EcoOutlinedIcon)`
  &&& {
    font-size: 10vw;
    margin-right: 8px;
    color: white;
  }
`;

const StyledLoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  height: 200px;
  color: #fff;
  font-size: 7vw;
  font-weight: 500;
`;

const StyledLoadingDiv = styled.div`
    display: flex;
    align-items: center;
`;

const StyledProgress = styled(CircularProgress)`
  &&& {
    color: white;
  }
`;

export { LoadingPage as default };