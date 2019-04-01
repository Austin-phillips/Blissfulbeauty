export const setFlash = (message, variant) => {
  return { type: 'SET_FLASH', message, variant };
};

export const clearFlash = () => {
  return { type: 'CLEAR_FLASH' };
};