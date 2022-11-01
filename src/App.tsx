import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addUserData } from './store/user/userSlice';
import Registration from './components/Registration';
import UserPage from './components/UserPage';
import { useGetMeQuery } from './api/authApi';

import './App.css';

function App() {
  const navigate = useNavigate()
  const { data, isSuccess } = useGetMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addUserData({ id: data._id, status: data.status }));
      navigate('/userPage')
    }
  }, [isSuccess]);
  return (
    <div className="App">
      <main >
              <Routes>
                <Route element={<Registration />} path={'/'} />
                <Route element={<UserPage />} path={'/userPage'} />
              </Routes>
            </main>
    </div>
  );
}

export default App;
