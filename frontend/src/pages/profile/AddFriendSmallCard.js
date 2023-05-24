const AddFriendSmallCard = ({ item }) => {
  return (
    <div className="addFriendCard">
      <div className="add_friend_img_small">
        <img src={item.profile_picture} alt="" />
      </div>
      <div className="addfriend_info">
        <div className="addfriend_name">
          {item.profile_name.length > 11
            ? `${item.profile_name.substring(0, 11)}...`
            : item.profile_name}
        </div>
        <div className="light_blur_btn">
          <img
            src="../../../icons/addFriend.png"
            alt=""
            className="filter_blue"
          />
          Add friend
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
