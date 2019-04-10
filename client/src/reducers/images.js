const images = (state = [], action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return action.images
    case 'ADD_IMAGE':
      return [...state, action.image]
    case 'DELETE_IMAGE':
      return state.filter(image => image.id !== action.id)
    default:
      return state;
  }
}

export default images;