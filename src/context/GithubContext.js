import { createContext, useState, useCallback } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const url = process.env.REACT_APP_GITHUB_URL;
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(`${url}/users`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const json = await response.json();

    setLoading(false);
    setUsers(json);
  }, []);

  return (
    <GithubContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
