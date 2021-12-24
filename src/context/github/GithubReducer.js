const GithubReducer = (state, { type, payload }) => {
  switch (type) {
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        users: [],
      };

    case 'SEARCH_USERS_BEGIN':
      return {
        ...state,
        users: [],
        loading: true,
      };

    case 'GET_USER_BEGIN':
      return {
        ...state,
        user: {},
        loading: true,
      };

    case 'SEARCH_USERS_END':
      return {
        ...state,
        users: payload.users,
        loading: false,
      };

    case 'GET_USER_END':
      return {
        ...state,
        user: payload.user,
        loading: false,
      };

    default:
      return state;
  }
};

export default GithubReducer;
