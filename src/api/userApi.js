import axios from 'axios';
import { API_KEY } from './constants';

const UserApi = {
  signUp(email, password) {
    return axios(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
        returnSecureToken: 'true',
      },
    });
  },
  updateProfile(idToken, displayName) {
    return axios(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        idToken,
        displayName,
        returnSecureToken: 'true',
      },
    });
  },
  getUserData(idToken) {
    return axios(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        idToken,
      },
    });
  },
  setRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  },
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },
};

export default UserApi;
