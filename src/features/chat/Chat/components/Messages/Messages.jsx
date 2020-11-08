import React from 'react';
import { useSelector } from 'react-redux';

import { chatSelectors } from '../../../_chatSlice_';
import './Messages.scss';

const { selectChatEntities } = chatSelectors;

const Messages = () => {
  const messages = useSelector(selectChatEntities);

  const scrollBottom = (elem) => {
    if (elem) elem.scrollTop = elem?.scrollHeight;
  };

  const renderedMessages = Object.keys(messages).map((key) => (
    <li key={key} className="messages-list__message">
      {messages[key].nameAuthor}
      :
      {' '}
      {messages[key].message}
    </li>
  ));

  return (
    <ul className="messages-list" ref={scrollBottom}>
      {renderedMessages}
    </ul>
  );
};

export default Messages;
