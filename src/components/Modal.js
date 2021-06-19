import React from 'react';
import { ModalBlackSpace, Button } from './'
import styled from 'styled-components';

const Modal = ({modalOpen, modalMessage, handleModalChange, primaryAction}) => {
    return (
      <StyledModal modalOpen={modalOpen}>
        <ModalBlackSpace 
          modalOpen={modalOpen} 
          handleModalChange={handleModalChange} 
        />
        <StyledModalMessage>
          <div>
            <h4>{modalMessage.title}</h4>
            <p>{modalMessage.message}</p>
          </div>
          <StyledButtonGroup>
            <Button 
                onClick={() => handleModalChange()}
            >
                Cancel
            </Button>
            <Button 
                onClick={primaryAction}
                color='primary'
                variant='contained'
            >
                Delete
            </Button>
          </StyledButtonGroup>
        </StyledModalMessage>
      </StyledModal>
    );}

const StyledModal = styled.div`
    display: ${props => props.modalOpen ? 'flex': 'none'};
`

const StyledModalMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 85%;
    background-color: ${props => props.theme.colors.backgroundColor};
    
    z-index: 300;
    border-radius: 8px;
    max-width: 600px;
    h4 {
        font-size: 20px;
        margin-bottom: 8px;
    }
    div {
        padding: 24px;
    }
`

const StyledButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
`

export { Modal as default };