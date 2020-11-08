import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '../../../ui';
import { chatActions, chatSelectors } from '../_chatSlice_';

import './Chat.scss';

const { sendMessage, subscribeNewMessages, unsubscribeNewMessages } = chatActions;
const { selectChatEntities } = chatSelectors;

const Chat = () => {
  const [message, setMessage] = useState('');
  const { chatId } = useParams();
  const messages = useSelector(selectChatEntities) ?? [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeNewMessages(chatId));
    return () => dispatch(unsubscribeNewMessages());
  }, []);

  const onSend = async (e) => {
    e.preventDefault();

    dispatch(sendMessage({ chatId, message }));
    setMessage('');
  };

  const renderedMessages = Object.keys(messages).map((key) => (
    <li key={key} className="chat__message">
      {messages[key].nameAuthor}
      :
      {' '}
      {messages[key].message}
    </li>
  ));

  return (
    <div className="app-border chat">
      <ul className="chat__messages" ref={(elem) => { if (elem) elem.scrollTop = elem?.scrollHeight; }}>
        {renderedMessages}
      </ul>
      <form className="chat__form" onSubmit={onSend}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button type="submit" title="Отправить" />
      </form>
    </div>
  );
};

export default Chat;
