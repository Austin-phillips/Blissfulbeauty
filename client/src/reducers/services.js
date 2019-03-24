const services = (state = [], action) => {
  switch (action.type) {
    case 'GET_SERVICES':
      return action.services
    case 'ADD_SERVICE':
      return [action.service, ...state]
    case 'UPDATE_SERVICE':
      return state.map(s => {
        if (s.id === action.service.id)
          return action.service
        return s
      })
    case 'DELETE_SERVICE':
      return state.filter(service => service.id !== action.id)
    default:
      return state;
  }
}

export default services;