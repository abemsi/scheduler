import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA: 
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state.appointments,
          [action.id]: { ...action.interview }
        }
      case SET_SPOTS:
        return {
          ...state,
          days: action.days
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }
          

  const setDay = day => dispatch({ type: SET_DAY, day});

  useEffect(() => {
    const promise1 = axios.get(`/api/days`);
    const promise2 = axios.get(`/api/appointments`);
    const promise3 = axios.get(`/api/interviewers`);

    Promise.all([promise1, promise2, promise3])
      .then((all) => {
        dispatch({ 
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data 
        }); 
      })
      .catch((error) => {
        console.log(error.response);
      })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const subtractSpots = () => {
      
    }
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
        dispatch({ type: SET_INTERVIEW, appointments });
        dispatch({ type: SET_SPOTS, appointments });
      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const addSpots = () => {
      
    }
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
        dispatch({ type: SET_INTERVIEW, appointments });
        dispatch({ type: SET_SPOTS, appointments });
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}