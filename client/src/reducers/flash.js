const flash = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FLASH':
      return { message: action.message, variant: action.variant };
    case 'CLEAR_FLASH':
      return {};
    default:
      return state;
  }
};

export default flash;
