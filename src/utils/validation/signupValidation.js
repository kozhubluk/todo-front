export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Поле является обязательным для заполнения';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Некорректный email-адрес';
  }

  return error;
};

export const validateName = (value) => {
  let error;
  if (!value) {
    error = 'Поле является обязательным для заполнения';
  } else if (value.length < 3) {
    error = 'Слишком короткое имя';
  } else if (value.length > 32) {
    error = 'Слишком длинное имя';
  }
  return error;
};

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Поле является обязательным для заполнения';
  } else if (value.length < 8) {
    error = 'Слишком короткий пароль';
  } else if (value.length > 32) {
    error = 'Слишком длинный пароль';
  }
  return error;
};

export const validateConfirmPassword = (password, value) => {
  let error;
  if (password && value) {
    if (password !== value) {
      error = 'Пароли не совпадают';
    }
  }
  return error;
};
