import React from "react";
import avatar from "../../assets/img/avatar.jpg";
import "./notification.css";

export default () => {
  return (
    <>
      <div className="notification">
        <div className="leftnotif">
          <img src={avatar} alt="" />
        </div>
        <div className="rightnotif">
          <h6> new post from username</h6>
          <span>12:00</span>
        </div>
      </div>
      
    </>
  );
};
