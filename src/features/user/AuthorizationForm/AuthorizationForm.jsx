import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Field } from '../../../ui';
import UserForm from '../UserForm';

const AuthorizationForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <UserForm
      onSubmit={handleSubmit(onSubmit)}
      title="Авторизация"
      buttonTitle="Авторизация"
      link={<Link to="/reg">Есть аккаунт?</Link>}
    >
      <Field
        title="Логин"
        name="login"
        type="text"
        ref={register({ required: true })}
      />
      <Field
        title="Пароль"
        name="password"
        type="password"
        ref={register({ required: true })}
      />
    </UserForm>
  );
};

export default AuthorizationForm;
