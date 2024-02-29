import React from 'react';
import { validateEmail } from '../utils/validateEmail';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});

    // Проверка валидности email
    if (name === 'email') {
      const isValidEmail = validateEmail(value);
      setErrors({...errors, [name]: isValidEmail ? '' : 'Некорректный формат email'});
    } else {
      setErrors({...errors, [name]: target.validationMessage });
    }

    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, setErrors, isValid, setIsValid, resetForm };
}
