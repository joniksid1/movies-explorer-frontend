const KEY = 'id';

export const setId = (id) => {
  localStorage.setItem(KEY, id);
}

export const getId = () => localStorage.getItem(KEY);

export const removeId = () => {
  localStorage.removeItem(KEY)
}
