import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Saving from "components/Appointment/Saving";
import Deleting from "components/Appointment/Deleting";
import Confirm from "components/Appointment/Confirm";
import ErrorDeleting from "components/Appointment/ErrorDeleting";
import ErrorSaving from "components/Appointment/ErrorSaving";

import useVisualMode from "../../hooks/useVisualMode.js";
import Form from "./Form.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { id, bookInterview, cancelInterview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (id && bookInterview) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
    }
    
  }

  function trash(name, interviewer) {
    console.log(id, name, cancelInterview);
    if (id && cancelInterview) {
      
      transition(DELETING, true);
      cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
    }
    
  }
  console.log(props, mode);
  return (
    <Fragment>
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer} 
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === SAVING && <Saving message="Saving" />}
        {mode === DELETING && <Deleting message="Deleting" />}
        {mode === CONFIRM && <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={() => transition(SHOW)}
          onConfirm={trash}
        />}
        {mode === EDIT && <Form
          name={props.interview.student}
          interviewer={props.interview.interviewers}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
        {mode === ERROR_SAVE && <ErrorSaving
          message="Could not save appointment."
          onClose={() => transition(EMPTY)}
        />}
        {mode === ERROR_DELETE && <ErrorDeleting
          message="Could not delete appointment."
          onClose={() => transition(SHOW)}
        />}
    </Fragment>
  );

}