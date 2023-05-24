const MenuItem = ({ icon, title, subTitle, img }) => {
  return (
    <li className="hover1">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className="post_menu_text">
        <span>{title}</span>
        {subTitle && <span className="menu_post_col">{subTitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
