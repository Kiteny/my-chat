import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import UserForm from '../UserForm';
import { Field } from '../../../ui';
import { userSelectors, userActions } from '../_userSlice_';

import { EMAIL_REGEXP } from '../constants';

const { selectUserError, selectUserStatus, selectUserLoggedIn } = userSelectors;
const { authorization } = userActions;

const AuthorizationForm = () => {
  const userError = useSelector(selectUserError);
  const userStatus = useSelector(selectUserStatus);
  const isLoggedIn = useSelector(selectUserLoggedIn);

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

  if (isLoggedIn) {
    return <Redirect to="/rooms" />;
  }

  return (
    <UserForm
      onSubmit={handleSubmit(onSubmit)}
      title="Авторизация"
      buttonTitle="Войти"
      link={<Link to="/reg">Нет аккаунта?</Link>}
      errorMessage={userError && getHumanMessage(userError.message)}
      showLoader={userStatus === 'pending'}
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
    case 'INVALID_PASSWORD':
      return 'Неверный пароль';
    default:
      return '';
  }
}

export default AuthorizationForm;
