import client from './client';
import storage from '../utils/storage';

export const login = (credentials) =>
  client.login(credentials).then(auth => {
    if (credentials.remember) {
      storage.set('auth', auth);
    }
    return auth.token;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
  });