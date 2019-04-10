import axios from 'axios';
import { setFlash } from './flash';
import { BASE_URL } from '../Secrets/env';

export const getImages = () => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/images`)
      .then(res => {
        dispatch({ type: 'GET_IMAGES', images: res.data })
      })
      .catch(err => {
        dispatch(setFlash('Error loading images, please try again.', 'error'))
      })
  }
}

export const deleteImage = (id) => {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/api/images/${id}`)
      .then(res => {
        dispatch({ type: 'DELETE_IMAGE', id, headers: res.headers });
        dispatch(setFlash('Successfully removed image', 'success'));
      })
      .catch(err => {
        console.log('Error:', err)
        dispatch(setFlash('Error Deleting Image. Try Again,', 'error'));
      });
  }
}

export const addImage = (image, callback) => {
  return (dispatch) => {
    let data = new FormData()
    data.append('image', image)
    axios.post(`${BASE_URL}/api/images`, data)
      .then(res => {
        console.log(res.data)
        dispatch({ type: 'ADD_IMAGE', image: res.data, headers: res.headers })
        dispatch(setFlash('Successfully Added Image.', 'success'));
        callback()
      })
      .catch(err => {
        dispatch(setFlash('Failed to add image', 'error'))
        callback()
      })
  }
}