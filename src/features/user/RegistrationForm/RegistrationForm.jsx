import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserForm from '../UserForm';
import { Field } from '../../../ui';
import { userActions, userSelectors } from '../_userSlice_';

import { EMAIL_REGEXP } from '../constants';

const { registration } = userActions;
const { selectUserError } = userSelectors;

const RegistrationForm = () => {
  const userError = useSelector(selectUserError);
  const dispatch = useDispatch();

  const {
    register, handleSubmit, watch, errors, reset,
  } = useForm();

  const onSubmit = ({ password, email, username }) => {
    dispatch(
      registration({ email, password, username }),
    );

    reset();
  };

  const userNameValidation = {
    required: true,
    minLength: { value: 3, message: 'Ошибка: от 3 до 20 символов' },
    maxLength: { value: 20, message: 'Ошибка: от 3 до 20 символов' },
  };

  const emailValidation = {
    required: true,
    pattern: {
      value: EMAIL_REGEXP,
      message: 'Неверный формат email',
    },
  };

  const passwordValidation = {
    required: true,
    minLength: { value: 6, message: 'Необходимо от 6 до 30 символов' },
    maxLength: { value: 30, message: 'Необходимо от 6 до 30 символов' },
    validate: (value) => value === watch('password') || 'Пароли не совпадают',
  };

  return (
    <UserForm
      onSubmit={handleSubmit(onSubmit)}
      title="Регистрация"
      buttonTitle="Регистрация"
      link={<Link to="/auth">Нет аккаунта?</Link>}
      errorMessage={userError && getHumanMessage(userError.message)}
    >
      <Field
        title="Имя"
        name="username"
        type="text"
        ref={register(userNameValidation)}
        errorMessage={errors.username && errors.username.message}
      />
      <Field
        title="Email"
        name="email"
        type="text"
        ref={register(emailValidation)}
        errorMessage={errors.email && errors.email.message}
      />
      <Field
        title="Пароль"
        name="password"
        type="password"
        ref={register(passwordValidation)}
        errorMessage={errors.password && errors.password.message}
      />
      <Field
        title="Повторить пароль"
        name="password-repeat"
        type="password"
        ref={register(passwordValidation)}
        errorMessage={errors['password-repeat'] && errors['password-repeat'].message}
      />
    </UserForm>
  );
};

function getHumanMessage(message) {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'Пользователь с данным email уже существует';
    default:
      return '';
  }
}

export default RegistrationForm;
