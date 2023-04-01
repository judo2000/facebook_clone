import { useRef } from 'react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';

const ImagePreview = ({
  text,
  setText,
  user,
  images,
  setImages,
  setShowPrev,
}) => {
  const imageInputRef = useRef(null);

  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackgrounds text={text} setText={setText} user={user} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImage}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => imageInputRef.current.click()}
              >
                <i className="addPhoto_icon"></i>
                Add photos/videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            {console.log(images.length)}
            <div
              className={
                images.length === 1
                  ? 'preview1'
                  : images.length === 2
                  ? 'preview2'
                  : images.length === 3
                  ? 'preview3'
                  : images.length === 4
                  ? 'preview4'
                  : images.length === 5
                  ? 'preview5'
                  : images.length % 2 === 0
                  ? 'preview6'
                  : 'preview6 singulary_grid'
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div className="small_white_circle">
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add photos/videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device</div>
          <span className="addPhone_btn">Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
