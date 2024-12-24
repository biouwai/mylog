import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalSettings = () => {
  const [avatar, setAvatar] = useState("default-avatar.jpg");
  const [nickname, setNickname] = useState("John Doe");
  const [introduction, setIntroduction] = useState(
    "A simple description about me."
  );
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-personal-settings");
  };

  return (
    <div className="personal-settings-container">
      <h1>个人设置</h1>
      <div className="avatar-section">
        <img src={avatar} alt="Avatar" className="avatar" />
      </div>
      <div className="nickname-section">
        <label htmlFor="nickname">昵称:</label>
        <span>{nickname}</span>
      </div>
      <div className="introduction-section">
        <label htmlFor="introduction">个人介绍:</label>
        <span>{introduction}</span>
      </div>
      <button className="edit-button" onClick={handleEdit}>
        编辑设置
      </button>
    </div>
  );
};

export default PersonalSettings;
