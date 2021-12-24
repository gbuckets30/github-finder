import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

function UserSearch() {
  const [searchText, setSearchText] = useState('');
  const { users, searchUsers, clearSearchResults } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSearchTextChange = (e) => setSearchText(e.target.value);
  const handleSearchTextClear = () => {
    setSearchText('');
    clearSearchResults();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText === '') {
      setAlert('Please enter something', 'error');
    } else {
      searchUsers(searchText);
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form className='form-control' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              type='text'
              className='w-full pr-40 bg-gray-200 input input-lg text-black'
              placeholder='Search'
              onChange={handleSearchTextChange}
              value={searchText}
            />
            <button
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              type='submit'
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className='btn btn-ghost btn-lg'
            onClick={handleSearchTextClear}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
