import React, { useRef } from 'react';
import Detail from './Detail';
import useClickOutside from '../../helpers/clickOutside';

const EditDetails = ({
  details,
  handleChange,
  updateDetails,
  info,
  rel,
  setVisible,
}) => {
  const modal = useRef(null);
  useClickOutside(modal, () => setVisible(false));
  return (
    <div className="blur">
      <div className="postBox infoBox" ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your intro</span>
            <span>Details will be public</span>
          </div>
          <div className="details_header">Other Name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            text="Other Name"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <div className="details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            text="a job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <Detail
            value={details?.workPlace}
            img="job"
            placeholder="Add a work place"
            name="workPlace"
            text="Work Place"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <div className="details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high shcool"
            name="highSchool"
            text="a high school"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="a college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <div className="details_header">Current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <div className="details_header">Hometown</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add a hometown"
            name="hometown"
            text="a hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />

          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Add relationshop status"
            name="relationship"
            text="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
            rel
          />

          <div className="details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="instagram"
            placeholder="Add instagram username"
            name="instagram"
            text="instagram username"
            handleChange={handleChange}
            updateDetails={updateDetails}
            info={info}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
