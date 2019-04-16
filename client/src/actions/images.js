import axios from 'axios';
import { setFlash } from './flash';
import { BASE_URL } from '../Secrets/env';
import { finished } from 'stream';

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
        dispatch({ type: 'DELETE_IMAGE', id: res.data, headers: res.headers });
        dispatch(setFlash('Successfully removed image', 'success'));
      })
      .catch(err => {
        console.log('Error:', err)
        dispatch(setFlash('Error Deleting Image. Try Again,', 'error'));
      });
  }
}

export const addImage = (images, callback) => {
  return (dispatch) => {
    let data = new FormData();
    let processed = 0;

    images.forEach( i => {
      data.append('image', i);
      processed++
      if ( processed === images.length){
          axios.post(`${BASE_URL}/api/images`, data)
            .then(res => {
              dispatch({ type: 'ADD_IMAGE', images: res.data })
              dispatch(setFlash('Successfully Added Image.', 'success'));
              callback()
            })
            .catch(err => {
              dispatch(setFlash('Failed to add image', 'error'))
              callback()
            })
          }
        })
    }
}
