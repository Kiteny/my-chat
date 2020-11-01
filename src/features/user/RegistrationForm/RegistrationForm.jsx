import React from 'react';
import { useForm } from 'react-hook-form';
import { Field, Button } from '../../../ui';

import './RegistrationForm.scss';

const RegistrationForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      <h2 className="registration-form__title">
        Регистрация
      </h2>
      <div className="registration-form__fields-container">
        <Field
          title="Имя ползователя"
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
      </div>

      <Button title="Регистрация" type="submit" />
    </form>
  );
};

export default RegistrationForm;
