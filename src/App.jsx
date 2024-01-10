/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/Sidebar/UI';
function App() {
  return (
    <div className='flex flex-row'>
      <SideBar />
      <div className='bg-red-50 w-4/5'>
        <h1>hiha</h1>
        <BrowserRouter>
          <Routes>
            <Route />
            <Route ></Route>
            <Route >
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
