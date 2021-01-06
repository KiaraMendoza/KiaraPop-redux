import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERT_CREATED,
  ADVERT_DELETED,
  ADVERT_LOADED,
  UI_RESET_ERROR
} from './types';

// import { getLoggedUserToken } from './selectors';

import {adverts} from '../api';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = token => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: token,
});

export const authLogin = (crendentials, location) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const token = await api.auth.login(crendentials);
      dispatch(authLoginSuccess(token));
      // history.push('/adverts');
      // Navigate to previously required route
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const advertsLoaded = adverts => {
  return {
    type: ADVERTS_LOADED,
    payload: adverts,
  };
};

export const loadAdverts = (filters) => async (dispatch, getState) => {
  const fetchedAdverts = await adverts.getAdverts(filters);
  dispatch(advertsLoaded(fetchedAdverts.result.rows));
};

export const advertLoaded = advert => {
  return {
    type: ADVERT_LOADED,
    payload: advert,
  };
};

export const loadAdvert = (advertId) => async (dispatch, getState) => {
  const fetchedAdvert = await adverts.getAdvert(advertId);
  dispatch(advertLoaded(fetchedAdvert.result));
};

export const advertCreated = advert => {
  return {
    type: ADVERT_CREATED,
    payload: {
      advert,
    },
  };
};

export const resetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};