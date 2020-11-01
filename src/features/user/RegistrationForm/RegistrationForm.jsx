import React from 'react';
import { useForm } from 'react-hook-form';
import { Field } from '../../../ui';
import UserForm from '../UserForm';

import './RegistrationForm.scss';

const RegistrationForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <UserForm onSubmit={handleSubmit(onSubmit)} title="Регистрация" buttonTitle="Регистрация">
      <Field
        title="Имя"
        name="username"
        type="text"
        ref={register({ required: true })}
      />
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
      <Field
        title="Повторить пароль"
        name="password-repeat"
        type="password"
        ref={register({ required: true })}
      />
    </UserForm>
  );
};

export default RegistrationForm;
