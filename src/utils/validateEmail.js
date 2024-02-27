export const validateEmail = (email) => {
  // Регулярное выражение для проверки валидности email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
