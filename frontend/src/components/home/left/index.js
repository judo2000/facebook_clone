import './style.css';
import LeftLinks from './LeftLinks';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import { useState } from 'react';
import Shortcut from './Shortcut';

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="left_home scrollbar">
      <Link className="left_link">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLinks
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className="left_link hover1" onClick={() => setVisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>Show more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLinks
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover1" onClick={() => setVisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.youtube.com/@AllAboutJudo2000"
          img="../../images/ytb.png"
          name="My YouTube Channel"
        />
        <Shortcut
          link="https://www.instagram.com/judo_scott_2000/"
          img="../../images/insta.png"
          name="My Instagram Page"
        />
      </div>
      <div className="fb_copyright">
        <Link to="/">Privacy </Link>
        <span>- </span>
        <Link to="/">Terms </Link>
        <span>- </span>
        <Link to="/">Advertising</Link>
        <span>- </span>
        <Link to="/">
          Ad Choices <i className="add_choices_icon"></i>
        </Link>
        <span>- </span>
        <Link to="/">Cookies </Link>
        <span>- </span>
        <Link to="/">More </Link>
        <span>- </span>
        <br />
        Meta © 2023
      </div>
    </div>
  );
};

export default LeftHome;
