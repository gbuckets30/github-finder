import { createContext, useReducer, useCallback } from 'react';
import GithubReducer from './GithubReducer';

const GithubContext = createContext();

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const getUser = useCallback(async (login) => {
    dispatch({
      type: 'GET_USER_BEGIN',
    });

    const response = await fetch(`${url}/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER_END',
        payload: {
          user: data,
        },
      });
    }
  }, []);

  const searchUsers = async (searchText) => {
    dispatch({
      type: 'SEARCH_USERS_BEGIN',
    });

    const response = await fetch(`${url}/search/users?q=${searchText}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: 'SEARCH_USERS_END',
      payload: {
        users: data.items,
      },
    });
  };

  // can also pass dispatch to the component instead of wrapping the call in a function
  const clearSearchResults = () => {
    dispatch({
      type: 'CLEAR_SEARCH_RESULTS',
    });
  };

  // FOR TESTING PURPOSES
  // const fetchUsers = useCallback(async () => {
  //   dispatch({
  //     type: 'FETCH_USERS_BEGIN',
  //   });

  //   const url = process.env.REACT_APP_GITHUB_URL;
  //   const token = process.env.REACT_APP_GITHUB_TOKEN;

  //   const response = await fetch(`${url}/users`, {
  //     headers: {
  //       Authorization: `token ${token}`,
  //     },
  //   });

  //   const data = await response.json();

  //   dispatch({
  //     type: 'FETCH_USERS_END',
  //     payload: {
  //       users: data,
  //     },
  //   });
  // }, []);

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        loading: state.loading,
        getUser,
        searchUsers,
        clearSearchResults,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
