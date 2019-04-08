const userAppointments = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERAPPOINTMENTS':
      if (action.userAppointments.length === 0) {
        return { any: false, appointments: action.userAppointments}
      } else {
        return { any: true, appointments: action.userAppointments }
      }
    case 'CLEAR_USERAPPOINTMENTS':
      return []
    default:
      return state;
  }
}

export default userAppointments;