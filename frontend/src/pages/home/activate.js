import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import ActivateForm from './ActivateForm';
import './styles.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useParams();

  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true,
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verified successfully"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
