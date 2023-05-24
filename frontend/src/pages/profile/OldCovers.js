import React, { useRef } from 'react';
import useClickOutside from '../../helpers/clickOutside';

const OldCovers = ({ photos, setCoverPicture, user, setShow }) => {
  const oldCoverRef = useRef(null);
  useClickOutside(oldCoverRef, () => setShow(false));
  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={oldCoverRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) =>
                    img.folder === `facebook/${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>

          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) =>
                    img.folder === `facebook/${user.username}/post_images`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
