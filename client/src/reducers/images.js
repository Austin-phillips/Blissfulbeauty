const images = (state = [], action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return action.images
    case 'ADD_IMAGE':
      let newState = state;
      let processed = 0
       action.images.forEach( i => {
        newState.push(i)
        processed++
      })
      return processed === action.images.length ? newState : state
    case 'DELETE_IMAGE':
      return state.filter(image => image.id !== action.id)
    default:
      return state;
  }
}

export default images;