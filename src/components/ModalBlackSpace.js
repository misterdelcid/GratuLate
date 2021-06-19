import React from 'react';
import styled from 'styled-components';

const ModalBlackSpace = ({modalOpen, handleModalChange}) => {
  return (
    <StyledModalBlackSpace>
      <div
        className={`modal ${modalOpen ? "open" : ""}`}
        modalOpen={modalOpen}
        onClick={handleModalChange}
      >
      </div>
    </StyledModalBlackSpace>
  );}

const StyledModalBlackSpace = styled.div`
  .modal {
    position: fixed;
    z-index: 200;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    margin: 0px;
    padding: 0px;
    visibility: hidden;
    opacity: 0;
    transition: opacity .25s ease;
  }
  .modal.open {
    visibility: visible;
    opacity: .5;
  }
`


export { ModalBlackSpace as default };