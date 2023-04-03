import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  console.log(userName);
  return <div>Profile</div>;
};

export default Profile;
