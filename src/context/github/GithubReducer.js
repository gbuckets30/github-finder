const GithubReducer = (state, { type, payload }) => {
  switch (type) {
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        users: [],
      };

    case 'GET_USER_DATA_BEGIN':
      return {
        ...state,
        user: {},
        repos: [],
        loading: true,
      };

    case 'SEARCH_USERS_BEGIN':
      return {
        ...state,
        users: [],
        loading: true,
      };

    case 'GET_USER_DATA_END':
      return {
        ...state,
        user: payload.user,
        repos: payload.repos,
        loading: false,
      };

    case 'SEARCH_USERS_END':
      return {
        ...state,
        users: payload.users,
        loading: false,
      };

    default:
      return state;
  }
};

export default GithubReducer;
