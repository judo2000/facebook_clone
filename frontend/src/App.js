import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/login';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import CreatePostPopup from './components/createPostPopup';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const App = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [postVisible, setPostVisible] = useState(false);
  return (
    <div>
      {postVisible && (
        <CreatePostPopup user={user} setPostVisible={setPostVisible} />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home setPostVisible={setPostVisible} />} />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
