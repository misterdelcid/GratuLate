import React from 'react';
import styled from 'styled-components';

const Footer = (props) => (
    <StyledFooter>
        <div>{props.children}</div>
    </StyledFooter>
);

const StyledFooter = styled.div`
  background-color: transparent;
  margin: 16px 0 0;
  padding: 18px 0px;
  display: flex;
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  div {
    opacity: 0.45;
    font-size: 12px;
    width: ${(props) => props.theme.primaryWidth};
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (min-width: 600px) {
      width: ${(props) => props.theme.secondaryWidth};
      max-width: ${(props) => props.theme.maxWidth};
    }
  }
`;

export { Footer as default };