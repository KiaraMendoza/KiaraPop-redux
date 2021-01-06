export const getLoggedUserToken = state => state.auth;

export const getAdvertsOnState = state => {
  if (!state.adverts) {
    return null;
  }

  return state.adverts;
};

// const getAdvert = advertId => state => state.adverts.find(a => a.id === advertId);

export const getUi = state => state.ui;