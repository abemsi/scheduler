function getAppointmentsForDay(state, day) {
  let appointments = [];
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  if (filteredDays.length > 0 && filteredDays[0].appointments.length > 0) {
    appointments = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);
  }
  return appointments;
}

function getInterview(state, interview) {
  if (interview) {
    let student = interview.student;
    let interviewer = state.interviewers[interview.interviewer];
    let interviewInfo = { student, interviewer };
    return interviewInfo;
  }
  return null;
}

function getInterviewersForDay(state, day) {
  let interviewers = [];
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  if (filteredDays.length > 0 && filteredDays[0].interviewers.length > 0) {
    interviewers = filteredDays[0].interviewers.map((interviewerId) => state.interviewers[interviewerId]);
  }
  
  return interviewers;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }