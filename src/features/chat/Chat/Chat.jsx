import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import SendForm from './components/SendForm';
import Messages from './components/Messages';

import { chatActions } from '../_chatSlice_';

import './Chat.scss';

const { subscribeNewMessages, unsubscribeNewMessages } = chatActions;

const Chat = () => {
  const { chatId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeNewMessages(chatId));
    return () => dispatch(unsubscribeNewMessages());
  }, []);

  return (
    <div className="app-border chat">
      <div className="chat__top-bar">
        <Link className="chat__back" to="/rooms">
          <i className="fa fa-chevron-left" />
        </Link>
      </div>
      <Messages />
      <SendForm />
    </div>
  );
};

export default Chat;
