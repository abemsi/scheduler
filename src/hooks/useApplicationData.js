import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
        setState({ ...state, appointments });
      })
    
  }


  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
        setState({ ...state, appointments });
    })

  }
  
  
  useEffect(() => {

    const promise1 = axios.get(`/api/days`);
    const promise2 = axios.get(`/api/appointments`);
    const promise3 = axios.get(`/api/interviewers`);

    Promise.all([promise1, promise2, promise3])
      .then((all) => {
      console.log(all)
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data })); 
      })
      .catch((error) => {
        console.log(error.response);
      })
  }, [])


  return { state, setDay, bookInterview, cancelInterview };
}