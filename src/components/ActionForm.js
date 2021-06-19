import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, AddContactLink, Button } from './';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const ActionForm = (props) => {
  const [recipientID, setRecipientID] = useState(props.action ? props.action.recipientID : undefined);
  const [subject, setSubject] = useState(props.action ? props.action.subject : '');
  const [message, setMessage] = useState(props.action ? props.action.message : '');
  const [timeFrame, setTimeFrame] = useState(props.action ? props.action.timeFrame : undefined);
  const [date, setDate] = useState(props.action ? props.action.date : new Date());
  const [endDate, setEndDate] = useState(props.action ? props.action.endDate : undefined);
  const [createdAt] = useState(props.action ? props.action.createdAt : undefined);
  const [reminder, setReminder] = useState(props.action ? props.action.reminder : undefined);
  const [completed] = useState(props.action ? props.action.completed : false);
  const [completedDate] = useState(props.action ? props.action.completedDate : '');
  const [sent] = useState(props.action ? props.action.sent: false);
  const [sentDate] = useState(props.action ? props.action.sentDate: '');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const modalMessage = {
      title: 'Heads up',
      message: 'Any unsaved changes will be permanently deleted. Would you still like to move forward?'
  };

  useEffect(() => {
    const days = Number(timeFrame);
    const newDate = addDays(date, days);
    if (date && timeFrame) {
      setEndDate(newDate.toString());
    }
  }, [date, timeFrame]);

  const addDays = (date, days) => {
    let endDate = new Date(date);
    let newDays = timeFrame === '0' ? days: days + 1;
    endDate.setDate(endDate.getDate() + newDays);
    return endDate;
  };

  const randomDate = (startDate, endDate) => {
    const newStart = new Date(startDate).getTime();
    const newEnd = new Date(endDate).getTime();
    const date = parseInt(timeFrame) === '0' ? endDate : new Date(newStart + Math.random() * (newEnd - newStart));
    setReminder(date);
    return date;
  };

  const onRecipientIDChange = (e) => {
    const recipientID = e.target.value;
    setRecipientID(recipientID);
  }; 

  const getRecipientName = () => {
    const recipient = props.contacts.find(contact => contact.id === recipientID);
    return `${recipient.firstName} ${recipient.lastName}`
  };

  const onSubjectChange = (e) => {
      const actionName = e.target.value;
      setSubject(actionName);
  };

  const onMessageChange = (e) => {
      const message = e.target.value;
      setMessage(message);
  };

  const onTimeFrameChange = (e) => {
    const timeFrame = e.target.value;
    setTimeFrame(timeFrame);
  }; 


  const onDateChange = (date) => {
    setDate(date);
  }; 

  const setReminderDate = (action) => {
    if (createdAt) {
      if (action.timeFrame === timeFrame) {
        if (action.date === date) {
          return reminder;
        }
        else {
          return randomDate(date, endDate);
        }
      }
      else {
        return randomDate(date, endDate);
      }
    }
    else {
      return randomDate(date, endDate);
    }
  };

  const handleModalChange = () => {
    setModalOpen(!modalOpen);
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (recipientID || subject || message || timeFrame || date) {
      handleModalChange();
    }
    else {
      props.history.push('/actions');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const actionItem = {
      recipientID,
      recipientName: recipientID ? getRecipientName() : undefined,
      subject,
      message,
      timeFrame,
      date: date.toString(),
      endDate,
      reminder: setReminderDate(props.action).toString(),
      completed,
      completedDate,
      sent, 
      sentDate,
      createdAt: createdAt ? createdAt : new Date().toString(),
      lastEdited: new Date().toString(),
    };
    if (!recipientID || !subject || !message || !timeFrame || !date) {
      setError('Please make sure that all fields are completed');
    }
    else {
      setError('');
      props.onSubmit({
        ...actionItem
      });
    }
  };

    return (
      <>
        <Modal 
          modalOpen={modalOpen}
          modalMessage={modalMessage}
          handleModalChange={handleModalChange}
          primaryAction={() => props.history.push('/actions')}
        />
        {error && <p>{error}</p>}
        <StyledForm>
          <StyledRecipientAndSubject>
            <FormControl>
              <InputLabel id="recipientID">Recipient</InputLabel>
              <StyledRecipentSelect
                labelId="recipientID"
                id="recipientID"
                value={recipientID}
                onChange={onRecipientIDChange}
              >
                {props.contacts.map((contact) => {
                  return (
                    <MenuItem 
                      key={contact.id} 
                      value={contact.id}
                    >
                      {`${contact.firstName} ${contact.lastName}`}
                    </MenuItem>)
                })}
              </StyledRecipentSelect>
              <AddContactLink />
            </FormControl>
            <StyledSubjectField
              label="Subject"
              value={subject}
              placeholder="Thank you!"
              onChange={onSubjectChange}
            />
          </StyledRecipientAndSubject>

            <StyledMessageField
              label="Message"
              multiline
              rowsMax={4}
              value={message}
              placeholder="Thanks for being awesome!"
              onChange={onMessageChange}
            />
            <StyledTimeFrameAndDate>
              <FormControl>
                <InputLabel id="timeFrame">Send</InputLabel>
                <StyledTimeFrame
                  labelId="timeFrame"
                  id="time-frame"
                  value={timeFrame}
                  onChange={onTimeFrameChange}
                >
                  <MenuItem value="0">Exactly on</MenuItem>
                  <MenuItem value="1">Within a day of</MenuItem>
                  <MenuItem value="7">Within a week of</MenuItem>
                  <MenuItem value="30">Within a month of</MenuItem>
                  <MenuItem value="90">Within the quarter of</MenuItem>
                  <MenuItem value="365">Within the year of</MenuItem>
                </StyledTimeFrame>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StyledCalendar
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date"
                  label="Date"
                  value={date}
                  onChange={onDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </StyledTimeFrameAndDate>
              <StyledButtonGroup>
                <Button 
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={onSubmit}
                  color='primary'
                  variant='contained'
                >
                  Submit
                </Button>
              </StyledButtonGroup>          
        </StyledForm>
        
    </>
    )
};

const mapStateToProps = (state, props) => ({
    contacts: state.contacts,
});

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding-bottom: 0px;
    margin: 24px auto 0px auto;
    background-color: transparent;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 0 0;
`;

const StyledRecipientAndSubject = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRecipentSelect = styled(Select)`
  margin: 8px 0 0 0;
`;

const StyledSubjectField = styled(TextField)`
    &&& {
      margin: 8px 0;
  }
`;

const StyledMessageField = styled(TextField)`
    &&& {
      margin: 8px 0;
  }
`;

const StyledTimeFrameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTimeFrame = styled(Select)`
  width: 45vw;
  margin-bottom: -8px;
  @media (min-width: 600px) {
    width: 42.5vw
  }
`;

const StyledCalendar = styled(KeyboardDatePicker)`
  width: 45vw;
  @media (min-width: 600px) {
    width: 42.5vw
  }
`;

export default withRouter(connect(mapStateToProps)(ActionForm));