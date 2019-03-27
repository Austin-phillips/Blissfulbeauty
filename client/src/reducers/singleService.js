const service = (state = [], action) => {
  switch (action.type) {
    case 'GET_SINGLESERVICE':
      return action.service
    default:
      return state;
  }
}

export default service;