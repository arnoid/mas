export default {
  mutateUser(state, user) {
    state.user = {
      currentUser: user,
    };
  },
};
