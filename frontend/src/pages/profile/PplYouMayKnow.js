import React from 'react';
import { Dots } from '../../svg';
import { stories } from '../../data/home';
import AddFriendSmallCard from './AddFriendSmallCard';

const PplYouMayKnow = () => {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right_ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PplYouMayKnow;
