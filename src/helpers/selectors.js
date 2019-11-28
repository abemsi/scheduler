export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  if (filteredDays.length > 0 && filteredDays[0].appointments.length > 0) {
    appointments = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);
  }
  return appointments;
}