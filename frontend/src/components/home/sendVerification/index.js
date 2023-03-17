import { useState } from 'react';
import './style.css';
import axios from 'axios';

const SendVerification = ({ user }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setError('');
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified. Verify your account before it gets deleted
        a month after creating.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        Click here to resend verification link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
