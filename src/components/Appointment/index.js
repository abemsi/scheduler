import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Saving from "components/Appointment/Saving";
import useVisualMode from "../../hooks/useVisualMode.js";
import Form from "./Form.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

export default function Appointment(props) {

  const { id, bookInterview } = props;

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
      .then(() => transition(SHOW));

    }
    
  }
  
  return (
    <Fragment>
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer} 
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === SAVING && <Saving />}
    </Fragment>
  );

}