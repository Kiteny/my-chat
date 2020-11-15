import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '../../../../../ui';
import { chatActions } from '../../../_chatSlice_';

import './SendForm.scss';

const { sendMessage } = chatActions;

const SendForm = () => {
  const [message, setMessage] = useState('');
  const { chatId } = useParams();

  const dispatch = useDispatch();

  const onSend = async (e) => {
    e.preventDefault();

    dispatch(sendMessage({ chatId, message }));
    setMessage('');
  };
  return (
    <form className="message-form" onSubmit={onSend}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button type="submit" title={<i className="fa fa-paper-plane" ariaHidden="true" />} />
    </form>
  );
};

export default SendForm;
