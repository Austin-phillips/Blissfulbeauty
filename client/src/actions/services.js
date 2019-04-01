import axios from 'axios';
import { setFlash } from './flash';
import { BASE_URL } from '../Secrets/env';

export const getServices = () => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/services`)
      .then(res => {
        dispatch({ type: 'GET_SERVICES', services: res.data})
      })
      .catch(err => {
        dispatch(setFlash('Error loading services, please try again.', 'error'))
      })
  }
}

export const updateService = (service, id, history) => {
  return (dispatch) => {
    axios.put(`${BASE_URL}/api/services/${id}`, { service })
      .then(res => {
        dispatch({ type: 'UPDATE_SERVICE', service: res.data, headers: res.headers })
      })
      .catch(err => {
        dispatch(setFlash('Failed to update service', 'error'))
      })
  }
}

export const deleteService = (id) => {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/api/services/${id}`)
      .then(res => {
        dispatch({ type: 'DELETE_SERVICE', id, headers: res.headers });
        dispatch(setFlash('Successfully removed service', 'success'));
      })
      .catch(err => {
        dispatch(setFlash('Error Deleting Service. Try Again,', 'error'));
      });
  }
}

export const addService = (service) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/api/services`, { service })
      .then(res => {
        dispatch({ type: 'ADD_SERVICE', service: res.data, headers: res.headers })
      })
      .catch(err => {
        dispatch(setFlash('Failed to add service', 'error'))
      })
  }
}

export const getSingleService = (id) => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/services/${id}`)
      .then(res => {
        dispatch({ type: 'GET_SINGLESERVICE', service: res.data })
      })
      .catch(err => {
        dispatch(setFlash('Error loading service, please try again.', 'error'))
      })
  }
}