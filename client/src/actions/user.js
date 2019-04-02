export const setUser = (profile) => {
  return {type: 'SET_USER', profile}
};

export const clearUser = () => {
  return { type: 'CLEAR_USER' };
};