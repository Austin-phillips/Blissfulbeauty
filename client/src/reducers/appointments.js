const appointments = (state = [], action) => {
  switch (action.type) {
    case 'GET_APPOINTMENTS':
      return action.appointments
    case 'ADD_APPOINTMENT':
      return [...state, action.appointment]
    case 'UPDATE_APPOINTMENT':
      return state.map(s => {
        if (s.id === action.appointment.id)
          return action.appointment
        return s
      })
    case 'DELETE_APPOINTMENT':
      return state.filter(appointment => appointment.id !== action.id)
    default:
      return state;
  }
}

export default appointments;