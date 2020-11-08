import axios from 'axios';

const ChatApi = {
  getChat(accessToken, chatId) {
    return axios(`https://my-chat-1bfb6.firebaseio.com/chats/${chatId}.json?auth=${accessToken}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  sendMessage(accessToken, nameAuthor, chatId, message) {
    return axios(`https://my-chat-1bfb6.firebaseio.com/chats/${chatId}/messages.json?auth=${accessToken}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        message,
        nameAuthor,
        date: new Date().toISOString(),
      },
    });
  },
  subscribeNewMessages(accessToken, chatId, callback) {
    const eventSource = new EventSource(`https://my-chat-1bfb6.firebaseio.com/chats/${chatId}/messages.json?auth=${accessToken}`);
    eventSource.addEventListener('put', (event) => {
      const response = JSON.parse(event.data);

      if (!response.data) {
        return;
      }

      // Если в ответе больше одной записи
      if (response.path === '/') {
        const data = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        callback(data);
      } else {
        const data = [{ id: response.path.slice(1), ...response.data }];

        callback(data);
      }
    });

    return eventSource.close.bind(eventSource);
  },
};

export default ChatApi;
