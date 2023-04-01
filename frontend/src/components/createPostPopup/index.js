import { useRef, useState } from 'react';
import './style.css';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../functions/post';
import PulseLoader from 'react-spinners/PulseLoader';
import PostError from './PostError';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { uploadImages } from '../../functions/uploadImages';

const CreatePostPopup = ({ user, setPostVisible }) => {
  const popup = useRef(null);
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  useClickOutside(popup, () => {
    setPostVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === 'ok') {
        setPostVisible(false);
        setBackground('');
        setText('');
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `facebook/${user.username}/post Images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res === 'ok') {
        setPostVisible(false);
        setText('');
        setImages('');
      }
    } else if (text) {
      setLoading(true);
      const res = await createPost(null, null, text, null, user.id, user.token);
      setLoading(false);
      if (res === 'ok') {
        setPostVisible(false);
        setBackground('');
        setText('');
      } else {
        setError(res);
      }
    } else {
      console.log('Nothing');
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setPostVisible(false)}>
            <i className="exit_icon" />
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img
            src={user.picture}
            alt={user.first_name}
            className="box_profile_img"
          />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon" />
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              setText={setText}
              user={user}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => postSubmit()}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
