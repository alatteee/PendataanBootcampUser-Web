export const authStore = (set) => ({
  authUser: null,
  userToken: null,

  setUserToken: (token) => {
    set((state) => ({
      ...state,
      userToken: token
    }));
  },

  setAuthUser: (user) => {
    set((state) => ({
      ...state,
      authUser: user,
    }));
  }
});
