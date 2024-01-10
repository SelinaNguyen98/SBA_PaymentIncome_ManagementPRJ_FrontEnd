/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/Sidebar/UI';
import BS_Report from './components/BS_Report/UI/BS_Report';
function App() {
  return (
    <div className='flex flex-row'>
      <SideBar />
      <div className='bg-red-50 w-4/5'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={BS_Report}/>
            <Route />
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
