import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import Stories from '../../components/home/stories';
import './styles.css';
import Post from '../../components/post';

const Home = ({ setPostVisible, posts }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPostVisible={setPostVisible} />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
