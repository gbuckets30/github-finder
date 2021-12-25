import axios from 'axios';

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: url,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const getUserAndRepos = async (login) => {
  try {
    const [user, repos] = await Promise.all([
      github.get(`${url}/users/${login}`),
      github.get(`${url}/users/${login}/repos?sort=created&per_page=10`),
    ]);
    return { user: user.data, repos: repos.data };
  } catch (error) {
    return { user: null, repos: null };
  }
};

export const searchUsers = async (searchText) => {
  const response = await github.get(`/search/users?q=${searchText}`);
  return response.data;
};
