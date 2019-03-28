import axios from 'axios';
import { setFlash } from './flash';
import { BASE_URL } from '../Secrets/env';

export const getAppointments = () => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/appointments`)
      .then(res => {
        dispatch({ type: 'GET_APPOINTMENTS', appointments: res.data })
      })
      .catch(err => {
        dispatch(setFlash('Error loading appointments, please try again.', 'red'))
      })
  }
}

export const updateService = (appointment, id, history) => {
  return (dispatch) => {
    axios.put(`${BASE_URL}/api/appointments/${id}`, { appointment })
      .then(res => {
        dispatch({ type: 'UPDATE_APPOINTMENT', appointment: res.data, headers: res.headers })
      })
      .catch(err => {
        dispatch(setFlash('Failed to update appointment', 'red'))
      })
  }
}

export const deleteAppointment = (id) => {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/api/appointments/${id}`)
      .then(res => {
        dispatch({ type: 'DELETE_APPOINTMENT', id, headers: res.headers });
      })
      .catch(err => {
        dispatch(setFlash('Error Deleting Appointment. Try Again,', 'red'));
      });
  }
}

export const addAppointment = (appointment) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/api/appointments`, { appointment })
      .then(res => {
        dispatch({ type: 'ADD_APPOINTMENT', appointment: res.data })
      })
      .catch(err => {
        dispatch(setFlash('Failed to add appointment', 'red'))
      })
  }
}