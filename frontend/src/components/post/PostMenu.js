import React, { useRef, useState } from 'react';
import MenuItem from './MenuItem';
import useOnClickOutside from '../../helpers/clickOutside';

const PostMenu = ({ userId, postUserId, imagesLength, setShowMenu }) => {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setShowMenu(false));
  return (
    <ul className="post_menu" ref={menuRef}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subTitle="Add This to your saved items"
      />
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit Audiance" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItem icon="date_icon" title="Edit date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subTitle="Items in your trash are deleted after 30 days"
        />
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subTitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
};

export default PostMenu;
