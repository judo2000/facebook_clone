import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import Stories from '../../components/home/stories';
import Post from '../../components/post';
import './styles.css';
const Home = ({ setPostVisible, posts, loading, getAllPosts }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPostVisible={setPostVisible} />
        {loading ? (
          <div className="skeleton_loader">
            <HashLoader color="#0973EE" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <Post key={i} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
};
export default Home;
