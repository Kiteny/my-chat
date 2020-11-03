import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserForm from '../UserForm';
import { Field } from '../../../ui';
import { userSelectors, userActions } from '../_userSlice_';

import { EMAIL_REGEXP } from '../constants';

const { selectUserError } = userSelectors;
const { authorization } = userActions;

const AuthorizationForm = () => {
  const userError = useSelector(selectUserError);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(authorization({ email, password }));
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
  };

  return (
    <UserForm
      onSubmit={handleSubmit(onSubmit)}
      title="Авторизация"
      buttonTitle="Войти"
      link={<Link to="/reg">Есть аккаунт?</Link>}
      errorMessage={userError && getHumanMessage(userError.message)}
    >
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
    </UserForm>
  );
};

function getHumanMessage(message) {
  switch (message) {
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь не найден';
    default:
      return '';
  }
}

export default AuthorizationForm;
