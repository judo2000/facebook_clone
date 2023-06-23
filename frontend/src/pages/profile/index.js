import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../functions/reducers';
import axios from 'axios';
import Header from '../../components/header';
import './styles.css';
import Cover from './Cover';
import ProfilePictureInfo from './ProfilePictureInfo';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import CreatePost from '../../components/createPost';
import GridPosts from './GridPosts';
import Post from '../../components/post/';
import Photos from './Photos';
import Friends from './Friends';
import Intro from '../../components/intro';
const Profile = ({ setPostVisible }) => {
  const navigate = useNavigate();

  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const [photos, setPhotos] = useState({});
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
  }, [username]);

  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);

  var visitor = userName === user.username ? false : true;

  const [otherName, setOtherName] = useState();
  const path = `facebook/${userName}/*`;
  const max = 30;
  const sort = 'desc';

  const getProfile = async () => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.ok === false) {
        navigate('/profile');
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfo
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            otherName={otherName}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Intro
                  detailss={profile.details}
                  visitor={visitor}
                  setOtherName={setOtherName}
                />
                <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>- </span>
                  <Link to="/">Terms </Link>
                  <span>- </span>
                  <Link to="/">Advertising</Link>
                  <span>- </span>
                  <Link to="/">
                    Ad Choices <i className="add_choices_icon"></i>
                  </Link>
                  <span>- </span>
                  <Link to="/">Cookies </Link>
                  <span>- </span>
                  <Link to="/">More </Link>
                  <span>- </span>
                  <br />
                  Meta © 2023
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile
                    setPostVisible={setPostVisible}
                  />
                )}
                <GridPosts user={user} />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posta available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
