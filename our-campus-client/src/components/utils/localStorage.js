export const addUserToLocalStorage = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("userInfo");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("userInfo");
  const user = result ? JSON.parse(result) : null;
  return user;
};
