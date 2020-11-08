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
  signIn(email, password) {
    return axios(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
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
  async getAccessToken() {
    const refreshToken = this.getRefreshToken();

    const response = await axios(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    });

    const {
      refresh_token: newRefreshToken,
      id_token: idToken,
    } = response.data;

    this.setRefreshToken(newRefreshToken);

    return idToken;
  },
};

export default UserApi;
