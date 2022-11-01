import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Registration from './components/Registration';
import UserPage from './components/UserPage';

import './App.css';

function App() {
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
