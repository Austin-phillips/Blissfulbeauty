const user = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      return {isAuthenticated: true, profile: action.profile};
    case 'CLEAR_USER':
      return {};
    default:
      return state;
  }
};

export default user;
