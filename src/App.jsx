import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';

const App = () => {
  return (
    <div className='container'>
     <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/creatpost" element={<CreatePost />} />
     </Routes>
    </div>
  )
}

export default App