import { Feeling, LiveVideo, Photo } from '../../svg';
import './style.css';

const CreatePost = ({ user, setPostVisible, profile }) => {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src="/images/default.jpg" alt="" />
        <div className="open_post hover2" onClick={() => setPostVisible(true)}>
          What's on your mind, {user?.first_name}?
        </div>
      </div>
      <div className="splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3525f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        {profile ? (
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon"></i>
            Life Event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feeling/activity
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
