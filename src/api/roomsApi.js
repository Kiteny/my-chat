import axios from 'axios';

const RoomsApi = {
  async addNewRoom(name, accessToken) {
    const response = await axios(`https://my-chat-1bfb6.firebaseio.com/rooms.json?auth=${accessToken}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
      },
    });

    return response.data;
  },
  async getRooms(accessToken) {
    const response = await axios(`https://my-chat-1bfb6.firebaseio.com/rooms.json?auth=${accessToken}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  },
};

export default RoomsApi;
