import { useState } from 'react';
import './style.css';
import Picker from 'emoji-picker-react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';

const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(true);
  const [images, setImages] = useState([]);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
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
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
