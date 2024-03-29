import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/login';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import CreatePostPopup from './components/createPostPopup';
import { useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { postsReducer } from './functions/reducers';

const App = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [postVisible, setPostVisible] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {postVisible && (
        <CreatePostPopup user={user} setPostVisible={setPostVisible} />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={<Profile setPostVisible={setPostVisible} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setPostVisible} />}
            exact
          />
          <Route
            path="/"
            element={
              <Home
                setPostVisible={setPostVisible}
                posts={posts}
                getAllPosts={getAllPosts}
              />
            }
          />
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
