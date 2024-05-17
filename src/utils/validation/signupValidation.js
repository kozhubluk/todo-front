export const validateUsername = (value) => {
  let error;
  if (!value) {
    error = 'Поле является обязательным для заполнения';
  } else if (value.length < 6) {
    error = 'Слишком короткий логин';
  } else if (!/(?!.*\.\.)^[A-Za-z0-9_][A-Za-z0-9_.]*[A-Za-z0-9_]$/.test(value)) {
    error = 'Некорректный логин';
  } else if (value.length > 48) {
    error = 'Слишком длинный логин';
  }
  return error;
};

export const validateName = (value) => {
  let error;
  if (!value) {
    error = 'Поле является обязательным для заполнения';
  } else if (value.length < 1) {
    error = 'Слишком короткое имя';
  } else if (value.length > 48) {
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
  if (password || value) {
    if (password !== value) {
      error = 'Пароли не совпадают';
    }
  }
  return error;
};
